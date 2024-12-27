// ==================== 外送員配送模擬數據 ====================

import dayjs from "dayjs";

// 外送員配送數據
export const deliveryData = [
  {
    deliveryId: "DEL1001",
    orderId: "ORD123462",
    deliveryPerson: "陳大明",
    pickUpTime: dayjs("2024-11-11T16:25:00"),
    deliveryTime: dayjs("2024-11-11T16:55:00"),
    route: [
      { lat: 22.62, lng: 120.3 }, // 餐廳位置
      { lat: 22.625, lng: 120.42 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.8,
  },
  {
    deliveryId: "DEL1002",
    orderId: "ORD123463",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-11-19T12:15:00"),
    deliveryTime: dayjs("2024-11-19T12:40:00"),
    route: [
      { lat: 22.63, lng: 120.29 }, // 餐廳位置
      { lat: 22.63, lng: 120.29 }, // 用戶位置（同位置）
    ],
    status: "已完成",
    rating: 4.9,
  },
  {
    deliveryId: "DEL1003",
    orderId: "ORD123464",
    deliveryPerson: "張小華",
    pickUpTime: dayjs("2024-11-19T12:15:00"),
    deliveryTime: dayjs("2024-11-19T12:55:00"),
    route: [
      { lat: 22.63, lng: 120.29 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "配送中",
    rating: null,
  },
  {
    deliveryId: "DEL1004",
    orderId: "ORD1059",
    deliveryPerson: "陳大明",
    pickUpTime: dayjs("2024-09-16T09:55:00"),
    deliveryTime: dayjs("2024-09-16T10:25:00"),
    route: [
      { lat: 22.64, lng: 120.315 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.7,
  },
  {
    deliveryId: "DEL1005",
    orderId: "ORD1060",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-09-17T12:15:00"),
    deliveryTime: dayjs("2024-09-17T12:50:00"),
    route: [
      { lat: 22.63, lng: 120.295 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.9,
  },
  {
    deliveryId: "DEL1006",
    orderId: "ORD1061",
    deliveryPerson: "林小紅",
    pickUpTime: dayjs("2024-09-18T14:40:00"),
    deliveryTime: dayjs("2024-09-18T15:05:00"),
    route: [
      { lat: 22.64, lng: 120.288 }, // 餐廳位置
      { lat: 22.63, lng: 120.29 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.6,
  },
  {
    deliveryId: "DEL1007",
    orderId: "ORD1062",
    deliveryPerson: "陳大明",
    pickUpTime: dayjs("2024-09-19T16:25:00"),
    deliveryTime: dayjs("2024-09-19T16:55:00"),
    route: [
      { lat: 22.64, lng: 120.315 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.8,
  },
  {
    deliveryId: "DEL1008",
    orderId: "ORD1063",
    deliveryPerson: "林小紅",
    pickUpTime: dayjs("2024-10-01T18:40:00"),
    deliveryTime: dayjs("2024-10-01T19:00:00"),
    route: [
      { lat: 22.635, lng: 120.298 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.7,
  },
  {
    deliveryId: "DEL1009",
    orderId: "ORD1064",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-10-02T19:35:00"),
    deliveryTime: dayjs("2024-10-02T20:00:00"),
    route: [
      { lat: 22.635, lng: 120.292 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.5,
  },
  {
    deliveryId: "DEL1010",
    orderId: "ORD1065",
    deliveryPerson: "林小紅",
    pickUpTime: dayjs("2024-10-03T19:35:00"),
    deliveryTime: dayjs("2024-10-03T20:15:00"),
    route: [
      { lat: 22.63, lng: 120.3 }, // 餐廳位置
      { lat: 22.62, lng: 120.43 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.6,
  },
  {
    deliveryId: "DEL1011",
    orderId: "ORD1066",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-10-04T22:00:00"),
    deliveryTime: dayjs("2024-10-04T22:25:00"),
    route: [
      { lat: 22.635, lng: 120.292 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.7,
  },
  {
    deliveryId: "DEL1012",
    orderId: "ORD1067",
    deliveryPerson: "林小紅",
    pickUpTime: dayjs("2024-10-05T08:00:00"),
    deliveryTime: dayjs("2024-10-05T08:20:00"),
    route: [
      { lat: 22.635, lng: 120.298 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.9,
  },
  {
    deliveryId: "DEL1013",
    orderId: "ORD1068",
    deliveryPerson: "陳大明",
    pickUpTime: dayjs("2024-10-06T10:05:00"),
    deliveryTime: dayjs("2024-10-06T10:30:00"),
    route: [
      { lat: 22.64, lng: 120.315 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.8,
  },
  {
    deliveryId: "DEL1014",
    orderId: "ORD1069",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-10-07T13:40:00"),
    deliveryTime: dayjs("2024-10-07T14:05:00"),
    route: [
      { lat: 22.63, lng: 120.295 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.6,
  },
  {
    deliveryId: "DEL1015",
    orderId: "ORD1070",
    deliveryPerson: "林小紅",
    pickUpTime: dayjs("2024-11-01T14:45:00"),
    deliveryTime: dayjs("2024-11-01T15:10:00"),
    route: [
      { lat: 22.64, lng: 120.288 }, // 餐廳位置
      { lat: 22.63, lng: 120.29 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.7,
  },
  {
    deliveryId: "DEL1016",
    orderId: "ORD1071",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-11-01T14:45:00"),
    deliveryTime: dayjs("2024-11-01T15:20:00"),
    route: [
      { lat: 22.63, lng: 120.295 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.5,
  },
  {
    deliveryId: "DEL1017",
    orderId: "ORD1072",
    deliveryPerson: "陳大明",
    pickUpTime: dayjs("2024-11-02T08:25:00"),
    deliveryTime: dayjs("2024-11-02T08:50:00"),
    route: [
      { lat: 22.64, lng: 120.315 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.8,
  },
  {
    deliveryId: "DEL1018",
    orderId: "ORD1073",
    deliveryPerson: "林小紅",
    pickUpTime: dayjs("2024-11-03T18:25:00"),
    deliveryTime: dayjs("2024-11-03T18:45:00"),
    route: [
      { lat: 22.63, lng: 120.3 }, // 餐廳位置
      { lat: 22.62, lng: 120.43 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.6,
  },
  {
    deliveryId: "DEL1019",
    orderId: "ORD1074",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-11-04T22:10:00"),
    deliveryTime: dayjs("2024-11-04T22:35:00"),
    route: [
      { lat: 22.635, lng: 120.292 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.7,
  },
  {
    deliveryId: "DEL1020",
    orderId: "ORD1075",
    deliveryPerson: "陳大明",
    pickUpTime: dayjs("2024-11-05T22:00:00"),
    deliveryTime: dayjs("2024-11-05T22:25:00"),
    route: [
      { lat: 22.63, lng: 120.315 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.9,
  },
  {
    deliveryId: "DEL1021",
    orderId: "ORD1076",
    deliveryPerson: "陳大明",
    pickUpTime: dayjs("2024-11-06T22:00:00"),
    deliveryTime: dayjs("2024-11-06T22:25:00"),
    route: [
      { lat: 22.63, lng: 120.315 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.7,
  },
  {
    deliveryId: "DEL1022",
    orderId: "ORD1077",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-11-07T09:10:00"),
    deliveryTime: dayjs("2024-11-07T09:30:00"),
    route: [
      { lat: 22.63, lng: 120.295 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.9,
  },
  {
    deliveryId: "DEL1023",
    orderId: "ORD1078",
    deliveryPerson: "陳大明",
    pickUpTime: dayjs("2024-11-08T08:05:00"),
    deliveryTime: dayjs("2024-11-08T08:30:00"),
    route: [
      { lat: 22.63, lng: 120.295 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.8,
  },
  {
    deliveryId: "DEL1024",
    orderId: "ORD1079",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-11-09T15:05:00"),
    deliveryTime: dayjs("2024-11-09T15:30:00"),
    route: [
      { lat: 22.63, lng: 120.295 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.6,
  },
  {
    deliveryId: "DEL1025",
    orderId: "ORD1080",
    deliveryPerson: "陳大明",
    pickUpTime: dayjs("2024-12-01T17:25:00"),
    deliveryTime: dayjs("2024-12-01T17:50:00"),
    route: [
      { lat: 22.64, lng: 120.32 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.7,
  },
  {
    deliveryId: "DEL1026",
    orderId: "ORD1081",
    deliveryPerson: "林小紅",
    pickUpTime: dayjs("2024-12-02T20:05:00"),
    deliveryTime: dayjs("2024-12-02T20:25:00"),
    route: [
      { lat: 22.63, lng: 120.3 }, // 餐廳位置
      { lat: 22.62, lng: 120.43 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.5,
  },
  {
    deliveryId: "DEL1027",
    orderId: "ORD1082",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-12-03T22:10:00"),
    deliveryTime: dayjs("2024-12-03T22:35:00"),
    route: [
      { lat: 22.635, lng: 120.292 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.7,
  },
  {
    deliveryId: "DEL1028",
    orderId: "ORD1083",
    deliveryPerson: "林小紅",
    pickUpTime: dayjs("2024-12-04T20:05:00"),
    deliveryTime: dayjs("2024-12-04T20:25:00"),
    route: [
      { lat: 22.63, lng: 120.3 }, // 餐廳位置
      { lat: 22.62, lng: 120.43 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.6,
  },
  {
    deliveryId: "DEL1029",
    orderId: "ORD1084",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-12-05T19:55:00"),
    deliveryTime: dayjs("2024-12-05T20:20:00"),
    route: [
      { lat: 22.63, lng: 120.295 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.5,
  },
  {
    deliveryId: "DEL1030",
    orderId: "ORD1085",
    deliveryPerson: "林小紅",
    pickUpTime: dayjs("2024-12-06T20:05:00"),
    deliveryTime: dayjs("2024-12-06T20:25:00"),
    route: [
      { lat: 22.63, lng: 120.3 }, // 餐廳位置
      { lat: 22.62, lng: 120.43 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.6,
  },
  {
    deliveryId: "DEL1031",
    orderId: "ORD1086",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-12-07T13:40:00"),
    deliveryTime: dayjs("2024-12-07T14:05:00"),
    route: [
      { lat: 22.635, lng: 120.292 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.7,
  },
  {
    deliveryId: "DEL1032",
    orderId: "ORD1087",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-12-08T12:05:00"),
    deliveryTime: dayjs("2024-12-08T12:25:00"),
    route: [
      { lat: 22.63, lng: 120.3 }, // 餐廳位置
      { lat: 22.62, lng: 120.43 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.5,
  },
  {
    deliveryId: "DEL1033",
    orderId: "ORD1088",
    deliveryPerson: "陳大明",
    pickUpTime: dayjs("2024-12-09T10:25:00"),
    deliveryTime: dayjs("2024-12-09T10:50:00"),
    route: [
      { lat: 22.64, lng: 120.315 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.8,
  },
  {
    deliveryId: "DEL1034",
    orderId: "ORD1089",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-12-10T20:05:00"),
    deliveryTime: dayjs("2024-12-10T20:25:00"),
    route: [
      { lat: 22.63, lng: 120.3 }, // 餐廳位置
      { lat: 22.62, lng: 120.43 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.6,
  },
  {
    deliveryId: "DEL1035",
    orderId: "ORD1090",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-12-11T22:10:00"),
    deliveryTime: dayjs("2024-12-11T22:35:00"),
    route: [
      { lat: 22.635, lng: 120.292 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.7,
  },
  {
    deliveryId: "DEL1036",
    orderId: "ORD1091",
    deliveryPerson: "林小紅",
    pickUpTime: dayjs("2024-12-12T20:05:00"),
    deliveryTime: dayjs("2024-12-12T20:25:00"),
    route: [
      { lat: 22.63, lng: 120.3 }, // 餐廳位置
      { lat: 22.62, lng: 120.43 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.5,
  },
  {
    deliveryId: "DEL1037",
    orderId: "ORD1092",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-12-13T22:10:00"),
    deliveryTime: dayjs("2024-12-13T22:35:00"),
    route: [
      { lat: 22.635, lng: 120.292 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.7,
  },
  {
    deliveryId: "DEL1038",
    orderId: "ORD1093",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-12-14T19:25:00"),
    deliveryTime: dayjs("2024-12-14T19:50:00"),
    route: [
      { lat: 22.63, lng: 120.295 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.6,
  },
  {
    deliveryId: "DEL1039",
    orderId: "ORD1094",
    deliveryPerson: "林小紅",
    pickUpTime: dayjs("2024-12-15T19:35:00"),
    deliveryTime: dayjs("2024-12-15T20:00:00"),
    route: [
      { lat: 22.63, lng: 120.3 }, // 餐廳位置
      { lat: 22.62, lng: 120.43 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.5,
  },
  {
    deliveryId: "DEL1040",
    orderId: "ORD1095",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-12-16T22:10:00"),
    deliveryTime: dayjs("2024-12-16T22:35:00"),
    route: [
      { lat: 22.635, lng: 120.292 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.7,
  },
  {
    deliveryId: "DEL1041",
    orderId: "ORD1096",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-12-17T19:25:00"),
    deliveryTime: dayjs("2024-12-17T19:55:00"),
    route: [
      { lat: 22.63, lng: 120.295 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.8,
  },
  {
    deliveryId: "DEL1042",
    orderId: "ORD1097",
    deliveryPerson: "林小紅",
    pickUpTime: dayjs("2024-12-18T13:40:00"),
    deliveryTime: dayjs("2024-12-18T14:05:00"),
    route: [
      { lat: 22.64, lng: 120.288 }, // 餐廳位置
      { lat: 22.63, lng: 120.29 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.7,
  },
  {
    deliveryId: "DEL1043",
    orderId: "ORD1098",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-12-19T18:35:00"),
    deliveryTime: dayjs("2024-12-19T19:00:00"),
    route: [
      { lat: 22.63, lng: 120.295 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.5,
  },
  {
    deliveryId: "DEL1044",
    orderId: "ORD1099",
    deliveryPerson: "林小紅",
    pickUpTime: dayjs("2024-12-20T12:05:00"),
    deliveryTime: dayjs("2024-12-20T12:25:00"),
    route: [
      { lat: 22.63, lng: 120.3 }, // 餐廳位置
      { lat: 22.62, lng: 120.43 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.6,
  },
  {
    deliveryId: "DEL1045",
    orderId: "ORD1100",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-12-21T22:10:00"),
    deliveryTime: dayjs("2024-12-21T22:35:00"),
    route: [
      { lat: 22.635, lng: 120.292 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.7,
  },
  {
    deliveryId: "DEL1046",
    orderId: "ORD1101",
    deliveryPerson: "林小紅",
    pickUpTime: dayjs("2024-12-22T20:05:00"),
    deliveryTime: dayjs("2024-12-22T20:25:00"),
    route: [
      { lat: 22.63, lng: 120.3 }, // 餐廳位置
      { lat: 22.62, lng: 120.43 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.5,
  },
  {
    deliveryId: "DEL1047",
    orderId: "ORD1102",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-12-23T22:10:00"),
    deliveryTime: dayjs("2024-12-23T22:35:00"),
    route: [
      { lat: 22.635, lng: 120.292 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.7,
  },
  {
    deliveryId: "DEL1048",
    orderId: "ORD1103",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-12-24T19:25:00"),
    deliveryTime: dayjs("2024-12-24T19:55:00"),
    route: [
      { lat: 22.63, lng: 120.295 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.8,
  },
  {
    deliveryId: "DEL1049",
    orderId: "ORD1104",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-12-25T09:10:00"),
    deliveryTime: dayjs("2024-12-25T09:35:00"),
    route: [
      { lat: 22.63, lng: 120.295 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.7,
  },
  {
    deliveryId: "DEL1050",
    orderId: "ORD1105",
    deliveryPerson: "林小紅",
    pickUpTime: dayjs("2024-12-26T18:20:00"),
    deliveryTime: dayjs("2024-12-26T18:40:00"),
    route: [
      { lat: 22.635, lng: 120.298 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.9,
  },
  {
    deliveryId: "DEL1051",
    orderId: "ORD1106",
    deliveryPerson: "林小紅",
    pickUpTime: dayjs("2024-12-27T19:55:00"),
    deliveryTime: dayjs("2024-12-27T20:15:00"),
    route: [
      { lat: 22.63, lng: 120.3 }, // 餐廳位置
      { lat: 22.62, lng: 120.43 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.6,
  },
  {
    deliveryId: "DEL1052",
    orderId: "ORD1107",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-12-28T13:40:00"),
    deliveryTime: dayjs("2024-12-28T14:05:00"),
    route: [
      { lat: 22.635, lng: 120.292 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.7,
  },
  {
    deliveryId: "DEL1053",
    orderId: "ORD1108",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-12-29T12:05:00"),
    deliveryTime: dayjs("2024-12-29T12:25:00"),
    route: [
      { lat: 22.63, lng: 120.3 }, // 餐廳位置
      { lat: 22.62, lng: 120.43 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.5,
  },
  {
    deliveryId: "DEL1054",
    orderId: "ORD1109",
    deliveryPerson: "陳大明",
    pickUpTime: dayjs("2024-12-30T10:25:00"),
    deliveryTime: dayjs("2024-12-30T10:50:00"),
    route: [
      { lat: 22.64, lng: 120.315 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.8,
  },
  {
    deliveryId: "DEL1055",
    orderId: "ORD1110",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2024-12-31T22:10:00"),
    deliveryTime: dayjs("2024-12-31T22:35:00"),
    route: [
      { lat: 22.635, lng: 120.292 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.7,
  },
  {
    deliveryId: "DEL1056",
    orderId: "ORD1111",
    deliveryPerson: "林小紅",
    pickUpTime: dayjs("2025-01-01T20:05:00"),
    deliveryTime: dayjs("2025-01-01T20:25:00"),
    route: [
      { lat: 22.63, lng: 120.3 }, // 餐廳位置
      { lat: 22.62, lng: 120.43 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.5,
  },
  {
    deliveryId: "DEL1057",
    orderId: "ORD1112",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2025-01-02T22:10:00"),
    deliveryTime: dayjs("2025-01-02T22:35:00"),
    route: [
      { lat: 22.635, lng: 120.292 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.7,
  },
  {
    deliveryId: "DEL1058",
    orderId: "ORD1113",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2025-01-03T19:25:00"),
    deliveryTime: dayjs("2025-01-03T19:55:00"),
    route: [
      { lat: 22.63, lng: 120.295 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.8,
  },
  {
    deliveryId: "DEL1059",
    orderId: "ORD1114",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2025-01-04T09:10:00"),
    deliveryTime: dayjs("2025-01-04T09:35:00"),
    route: [
      { lat: 22.63, lng: 120.295 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.7,
  },
  {
    deliveryId: "DEL1060",
    orderId: "ORD1115",
    deliveryPerson: "林小紅",
    pickUpTime: dayjs("2025-01-05T18:20:00"),
    deliveryTime: dayjs("2025-01-05T18:40:00"),
    route: [
      { lat: 22.635, lng: 120.298 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.9,
  },
  {
    deliveryId: "DEL1061",
    orderId: "ORD1116",
    deliveryPerson: "林小紅",
    pickUpTime: dayjs("2025-01-06T20:05:00"),
    deliveryTime: dayjs("2025-01-06T20:25:00"),
    route: [
      { lat: 22.63, lng: 120.3 }, // 餐廳位置
      { lat: 22.62, lng: 120.43 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.6,
  },
  {
    deliveryId: "DEL1062",
    orderId: "ORD1117",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2025-01-07T13:40:00"),
    deliveryTime: dayjs("2025-01-07T14:05:00"),
    route: [
      { lat: 22.635, lng: 120.292 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.7,
  },
  {
    deliveryId: "DEL1063",
    orderId: "ORD1118",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2025-01-08T12:05:00"),
    deliveryTime: dayjs("2025-01-08T12:25:00"),
    route: [
      { lat: 22.63, lng: 120.3 }, // 餐廳位置
      { lat: 22.62, lng: 120.43 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.5,
  },
  {
    deliveryId: "DEL1064",
    orderId: "ORD1119",
    deliveryPerson: "陳大明",
    pickUpTime: dayjs("2025-01-09T10:25:00"),
    deliveryTime: dayjs("2025-01-09T10:50:00"),
    route: [
      { lat: 22.64, lng: 120.315 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.8,
  },
  {
    deliveryId: "DEL1065",
    orderId: "ORD1120",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2025-01-10T22:10:00"),
    deliveryTime: dayjs("2025-01-10T22:35:00"),
    route: [
      { lat: 22.635, lng: 120.292 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.7,
  },
  {
    deliveryId: "DEL1066",
    orderId: "ORD1121",
    deliveryPerson: "林小紅",
    pickUpTime: dayjs("2025-01-11T20:05:00"),
    deliveryTime: dayjs("2025-01-11T20:25:00"),
    route: [
      { lat: 22.63, lng: 120.3 }, // 餐廳位置
      { lat: 22.62, lng: 120.43 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.5,
  },
  {
    deliveryId: "DEL1067",
    orderId: "ORD1122",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2025-01-12T22:10:00"),
    deliveryTime: dayjs("2025-01-12T22:35:00"),
    route: [
      { lat: 22.635, lng: 120.292 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.7,
  },
  {
    deliveryId: "DEL1068",
    orderId: "ORD1123",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2025-01-13T19:25:00"),
    deliveryTime: dayjs("2025-01-13T19:55:00"),
    route: [
      { lat: 22.63, lng: 120.295 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.8,
  },
  {
    deliveryId: "DEL1069",
    orderId: "ORD1124",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2025-01-14T09:05:00"),
    deliveryTime: dayjs("2025-01-14T09:30:00"),
    route: [
      { lat: 22.63, lng: 120.295 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.7,
  },
  {
    deliveryId: "DEL1070",
    orderId: "ORD1130",
    deliveryPerson: "陳大明",
    pickUpTime: dayjs("2025-01-15T19:35:00"),
    deliveryTime: dayjs("2025-01-15T20:00:00"),
    route: [
      { lat: 22.63, lng: 120.295 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.5,
  },
  {
    deliveryId: "DEL1071",
    orderId: "ORD1131",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2025-01-16T14:35:00"),
    deliveryTime: dayjs("2025-01-16T15:00:00"),
    route: [
      { lat: 22.64, lng: 120.288 }, // 餐廳位置
      { lat: 22.63, lng: 120.29 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.7,
  },
  {
    deliveryId: "DEL1072",
    orderId: "ORD1132",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2025-01-17T19:35:00"),
    deliveryTime: dayjs("2025-01-17T20:00:00"),
    route: [
      { lat: 22.63, lng: 120.295 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.6,
  },
  {
    deliveryId: "DEL1073",
    orderId: "ORD1133",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2025-01-18T19:55:00"),
    deliveryTime: dayjs("2025-01-18T20:20:00"),
    route: [
      { lat: 22.63, lng: 120.3 }, // 餐廳位置
      { lat: 22.62, lng: 120.43 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.5,
  },
  {
    deliveryId: "DEL1074",
    orderId: "ORD1134",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2025-01-19T19:35:00"),
    deliveryTime: dayjs("2025-01-19T20:00:00"),
    route: [
      { lat: 22.63, lng: 120.295 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.8,
  },
  {
    deliveryId: "DEL1075",
    orderId: "ORD1135",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2025-01-20T10:20:00"),
    deliveryTime: dayjs("2025-01-20T10:45:00"),
    route: [
      { lat: 22.64, lng: 120.315 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.8,
  },
  {
    deliveryId: "DEL1076",
    orderId: "ORD1136",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2025-01-21T19:35:00"),
    deliveryTime: dayjs("2025-01-21T20:00:00"),
    route: [
      { lat: 22.63, lng: 120.3 }, // 餐廳位置
      { lat: 22.62, lng: 120.43 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.6,
  },
  {
    deliveryId: "DEL1077",
    orderId: "ORD1137",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2025-01-22T22:10:00"),
    deliveryTime: dayjs("2025-01-22T22:35:00"),
    route: [
      { lat: 22.635, lng: 120.292 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.7,
  },
  {
    deliveryId: "DEL1078",
    orderId: "ORD1138",
    deliveryPerson: "黃小明",
    pickUpTime: dayjs("2025-01-23T19:35:00"),
    deliveryTime: dayjs("2025-01-23T20:00:00"),
    route: [
      { lat: 22.63, lng: 120.295 }, // 餐廳位置
      { lat: 22.63, lng: 120.31 }, // 用戶位置
    ],
    status: "已完成",
    rating: 4.8,
  },
  // ==================== 更多配送數據 ====================
  // 根據需要繼續添加更多配送數據，確保每個訂單有對應的配送信息
];
