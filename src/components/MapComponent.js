// src/components/MapComponent.js

import React, { useState, useEffect } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl";
import mapboxgl from "mapbox-gl"; // 正確導入 mapbox-gl
import "mapbox-gl/dist/mapbox-gl.css";
import "./MapComponent.css";

const MapComponent = ({ pickup, dropoff, deliveryPerson }) => {
  const [viewState, setViewState] = useState({
    longitude: pickup.lng,
    latitude: pickup.lat,
    zoom: 13,
  });

  const [route, setRoute] = useState(null);

  const mapboxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  // 定義路線的樣式
  const routeLayer = {
    id: "route",
    type: "line",
    source: "route",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#FF0000",
      "line-width": 4,
    },
  };

  useEffect(() => {
    if (pickup && dropoff) {
      fetchRoute(pickup, dropoff);
    }
  }, [pickup, dropoff]);

  const fetchRoute = async (pickup, dropoff) => {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickup.lng},${pickup.lat};${dropoff.lng},${dropoff.lat}?geometries=geojson&access_token=${mapboxAccessToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.code === "Ok") {
        const routeData = data.routes[0].geometry;
        setRoute(routeData);

        // 計算包含取餐地點、送達地點和外送員位置的地圖視野
        const coordinates = routeData.coordinates;

        const bounds = coordinates.reduce(
          (bounds, coord) => bounds.extend(coord),
          new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
        );

        // 如果有外送員的位置，將其也包含進去
        if (deliveryPerson) {
          bounds.extend([deliveryPerson.lng, deliveryPerson.lat]);
        }

        const center = bounds.getCenter();
        setViewState({
          longitude: center.lng,
          latitude: center.lat,
          zoom: 13,
        });
      } else {
        console.error("Directions request failed:", data.message);
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  return (
    <div className="map-container">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={mapboxAccessToken}
      >
        {/* 繪製路線 */}
        {route && (
          <Source id="route" type="geojson" data={route}>
            <Layer {...routeLayer} />
          </Source>
        )}

        {/* 取餐地點標記 */}
        <Marker longitude={pickup.lng} latitude={pickup.lat} color="green">
          <div title="取餐地點">📍</div>
        </Marker>

        {/* 送達地點標記 */}
        <Marker longitude={dropoff.lng} latitude={dropoff.lat} color="red">
          <div title="送達地點">🏥</div>
        </Marker>

        {/* 外送員位置標記 */}
        {deliveryPerson && (
          <Marker
            longitude={deliveryPerson.lng}
            latitude={deliveryPerson.lat}
            color="blue"
          >
            <div title="外送員位置">🚴</div>
          </Marker>
        )}
      </Map>
    </div>
  );
};

export default MapComponent;
