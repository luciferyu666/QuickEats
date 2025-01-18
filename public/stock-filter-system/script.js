document.getElementById("fetch-data").addEventListener("click", fetchData);
document.getElementById("place-order").addEventListener("click", placeOrder);

let priceChartInstance = null;
let indicatorChartInstance = null;
let currentChartType = "line";

async function fetchData() {
  const ticker = document.getElementById("ticker").value || "2330.TW";
  const timeframe = document.getElementById("timeframe").value;
  const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart`;

  try {
    const response = await fetch(
      `${url}?interval=${timeframe}&symbol=${ticker}&region=US`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "50e3d87c67msh21f01fd6718b9bep19464bjsn032441b7e4c9",
          "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const stockData = data.chart.result[0].indicators.quote[0];
    const timestamps = data.chart.result[0].timestamp;

    const rows = timestamps
      .map((time, index) => {
        const close = stockData.close[index];
        const high = stockData.high[index];
        const low = stockData.low[index];

        const rsi = calculateRSI(stockData.close, index);
        const williamsR = calculateWilliamsR(
          stockData.high,
          stockData.low,
          stockData.close,
          index
        );
        const sma = calculateSMA(stockData.close, index, 20);
        const bollingerBands = calculateBollingerBands(
          stockData.close,
          index,
          20
        );

        return `
        <tr>
          <td>${new Date(time * 1000).toLocaleString()}</td>
          <td>${close ? close.toFixed(2) : "N/A"}</td>
          <td>${rsi ? rsi.toFixed(2) : "N/A"}</td>
          <td>${williamsR ? williamsR.toFixed(2) : "N/A"}</td>
          <td>${sma ? sma.toFixed(2) : "N/A"}</td>
          <td>${bollingerBands ? bollingerBands.upper.toFixed(2) : "N/A"}</td>
          <td>${bollingerBands ? bollingerBands.lower.toFixed(2) : "N/A"}</td>
        </tr>
      `;
      })
      .join("");

    document.getElementById("data-body").innerHTML = rows;

    updateCharts(timestamps, stockData.close, stockData.high, stockData.low);
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(`數據抓取失敗: ${error.message}`);
  }
}

function updateCharts(timestamps, prices, highs, lows) {
  if (priceChartInstance) priceChartInstance.destroy();
  if (indicatorChartInstance) indicatorChartInstance.destroy();

  const smaData = prices.map((_, index) => calculateSMA(prices, index, 20));
  const bollingerBandsUpper = prices.map(
    (_, index) => calculateBollingerBands(prices, index, 20)?.upper
  );
  const bollingerBandsLower = prices.map(
    (_, index) => calculateBollingerBands(prices, index, 20)?.lower
  );

  const priceCtx = document.getElementById("price-chart").getContext("2d");
  priceChartInstance = new Chart(priceCtx, {
    type: currentChartType,
    data: {
      labels: timestamps.map((time) => new Date(time * 1000).toLocaleString()),
      datasets: [
        {
          label: "收盤價",
          data: prices,
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          fill: false,
        },
        {
          label: "SMA",
          data: smaData,
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 2,
          borderDash: [5, 5],
          fill: false,
        },
        {
          label: "布林帶 (上)",
          data: bollingerBandsUpper,
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          fill: false,
        },
        {
          label: "布林帶 (下)",
          data: bollingerBandsLower,
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
          fill: false,
        },
      ],
    },
  });

  const indicatorCtx = document
    .getElementById("indicator-chart")
    .getContext("2d");
  indicatorChartInstance = new Chart(indicatorCtx, {
    type: currentChartType,
    data: {
      labels: timestamps.map((time) => new Date(time * 1000).toLocaleString()),
      datasets: [
        {
          label: "RSI",
          data: prices.map((_, index) => calculateRSI(prices, index)),
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          fill: false,
        },
      ],
    },
  });
}

function calculateRSI(prices, index) {
  if (index < 14) return null;
  const gains = [];
  const losses = [];
  for (let i = index - 13; i <= index; i++) {
    const change = prices[i] - prices[i - 1];
    if (change > 0) gains.push(change);
    else losses.push(-change);
  }
  const avgGain = gains.reduce((a, b) => a + b, 0) / gains.length;
  const avgLoss = losses.reduce((a, b) => a + b, 0) / losses.length;
  if (avgLoss === 0) return 100;
  const rs = avgGain / avgLoss;
  return 100 - 100 / (1 + rs);
}

function calculateWilliamsR(highs, lows, closes, index) {
  if (index < 14) return null;
  const high = Math.max(...highs.slice(index - 13, index + 1));
  const low = Math.min(...lows.slice(index - 13, index + 1));
  return ((high - closes[index]) / (high - low)) * -100;
}

function calculateSMA(prices, index, period) {
  if (index < period - 1) return null;
  const slice = prices.slice(index - period + 1, index + 1);
  return slice.reduce((sum, price) => sum + price, 0) / slice.length;
}

function calculateBollingerBands(prices, index, period) {
  if (index < period - 1) return null;
  const sma = calculateSMA(prices, index, period);
  const slice = prices.slice(index - period + 1, index + 1);
  const variance =
    slice.reduce((sum, price) => sum + Math.pow(price - sma, 2), 0) /
    slice.length;
  const stdDev = Math.sqrt(variance);
  return { upper: sma + 2 * stdDev, lower: sma - 2 * stdDev };
}

function placeOrder() {
  const status = document.getElementById("trade-status");
  status.innerHTML = "模擬下單成功！";
  status.style.color = "green";
}

document.getElementById("chart-type-toggle").addEventListener("change", (e) => {
  currentChartType = e.target.value;
  const prices = priceChartInstance.data.datasets[0].data;
  const timestamps = priceChartInstance.data.labels.map(
    (label) => new Date(label).getTime() / 1000
  );
  updateCharts(timestamps, prices);
});
