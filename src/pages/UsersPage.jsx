// src/pages/UsersPage.jsx

import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
  message,
  Tag,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const UsersPage = () => {
  // 初始用戶資料
  const initialUsers = [
    // 高雄市立鳳山醫院 客戶
    {
      id: "cust1",
      name: "Adfwcky",
      address: "高雄市立鳳山醫院 830高雄市鳳山區經武路42之1號",
      phone: "",
      username: "Adfwcky",
    },
    {
      id: "cust2",
      name: "appleameli",
      address: "高雄市立鳳山醫院 830高雄市鳳山區經武路42之1號",
      phone: "",
      username: "appleameli",
    },
    {
      id: "cust3",
      name: "az232369",
      address: "高雄市立鳳山醫院 830高雄市鳳山區經武路42之1號",
      phone: "",
      username: "az232369",
    },
    {
      id: "cust4",
      name: "cheeseMary0411",
      address: "高雄市立鳳山醫院 830高雄市鳳山區經武路42之1號",
      phone: "",
      username: "cheeseMary0411",
    },
    {
      id: "cust5",
      name: "helios7328i",
      address: "高雄市立鳳山醫院 830高雄市鳳山區經武路42之1號",
      phone: "",
      username: "helios7328i",
    },
    {
      id: "cust6",
      name: "hyo0911133688",
      address: "高雄市立鳳山醫院 830高雄市鳳山區經武路42之1號",
      phone: "",
      username: "hyo0911133688",
    },
    {
      id: "cust7",
      name: "jessica231720",
      address: "高雄市立鳳山醫院 830高雄市鳳山區經武路42之1號",
      phone: "",
      username: "jessica231720",
    },
    {
      id: "cust8",
      name: "johnccy2002",
      address: "高雄市立鳳山醫院 830高雄市鳳山區經武路42之1號",
      phone: "",
      username: "johnccy2002",
    },
    {
      id: "cust9",
      name: "Kitty3pei",
      address: "高雄市立鳳山醫院 830高雄市鳳山區經武路42之1號",
      phone: "",
      username: "Kitty3pei",
    },
    {
      id: "cust10",
      name: "Lee500925",
      address: "高雄市立鳳山醫院 830高雄市鳳山區經武路42之1號",
      phone: "",
      username: "Lee500925",
    },
    {
      id: "cust11",
      name: "michelephoenix",
      address: "高雄市立鳳山醫院 830高雄市鳳山區經武路42之1號",
      phone: "",
      username: "michelephoenix",
    },
    {
      id: "cust12",
      name: "troy0614",
      address: "高雄市立鳳山醫院 830高雄市鳳山區經武路42之1號",
      phone: "",
      username: "troy0614",
    },
    {
      id: "cust13",
      name: "winnie870107",
      address: "高雄市立鳳山醫院 830高雄市鳳山區經武路42之1號",
      phone: "",
      username: "winnie870107",
    },
    {
      id: "cust14",
      name: "zloase",
      address: "高雄市立鳳山醫院 830高雄市鳳山區經武路42之1號",
      phone: "",
      username: "zloase",
    },

    // 高雄市鳳山戶政事務所 客戶
    {
      id: "cust15",
      name: "0961131419",
      address: "高雄市鳳山戶政事務所 83062高雄市鳳山區經武路34巷1號",
      phone: "0961131419",
      username: "",
    },
    {
      id: "cust16",
      name: "0963105528",
      address: "高雄市鳳山戶政事務所 83062高雄市鳳山區經武路34巷1號",
      phone: "0963105528",
      username: "",
    },
    {
      id: "cust17",
      name: "0937166585",
      address: "高雄市鳳山戶政事務所 83062高雄市鳳山區經武路34巷1號",
      phone: "0937166585",
      username: "",
    },
    {
      id: "cust18",
      name: "0928079566",
      address: "高雄市鳳山戶政事務所 83062高雄市鳳山區經武路34巷1號",
      phone: "0928079566",
      username: "",
    },
    {
      id: "cust19",
      name: "0903230094",
      address: "高雄市鳳山戶政事務所 83062高雄市鳳山區經武路34巷1號",
      phone: "0903230094",
      username: "",
    },
    {
      id: "cust20",
      name: "0933492587",
      address: "高雄市鳳山戶政事務所 83062高雄市鳳山區經武路34巷1號",
      phone: "0933492587",
      username: "",
    },
    {
      id: "cust21",
      name: "0935290291",
      address: "高雄市鳳山戶政事務所 83062高雄市鳳山區經武路34巷1號",
      phone: "0935290291",
      username: "",
    },
    {
      id: "cust22",
      name: "0935458308",
      address: "高雄市鳳山戶政事務所 83062高雄市鳳山區經武路34巷1號",
      phone: "0935458308",
      username: "",
    },
    {
      id: "cust23",
      name: "0966216758",
      address: "高雄市鳳山戶政事務所 83062高雄市鳳山區經武路34巷1號",
      phone: "0966216758",
      username: "",
    },
    {
      id: "cust24",
      name: "0978982342",
      address: "高雄市鳳山戶政事務所 83062高雄市鳳山區經武路34巷1號",
      phone: "0978982342",
      username: "",
    },
    {
      id: "cust25",
      name: "0937165958",
      address: "高雄市鳳山戶政事務所 83062高雄市鳳山區經武路34巷1號",
      phone: "0937165958",
      username: "",
    },
    {
      id: "cust26",
      name: "0920351155",
      address: "高雄市鳳山戶政事務所 83062高雄市鳳山區經武路34巷1號",
      phone: "0920351155",
      username: "",
    },
    {
      id: "cust27",
      name: "0960550505",
      address: "高雄市鳳山戶政事務所 83062高雄市鳳山區經武路34巷1號",
      phone: "0960550505",
      username: "",
    },
    {
      id: "cust28",
      name: "0906663407",
      address: "高雄市鳳山戶政事務所 83062高雄市鳳山區經武路34巷1號",
      phone: "0906663407",
      username: "",
    },
    {
      id: "cust29",
      name: "0900305339",
      address: "高雄市鳳山戶政事務所 83062高雄市鳳山區經武路34巷1號",
      phone: "0900305339",
      username: "",
    },
    {
      id: "cust30",
      name: "0975177510",
      address: "高雄市鳳山戶政事務所 83062高雄市鳳山區經武路34巷1號",
      phone: "0975177510",
      username: "",
    },
    {
      id: "cust31",
      name: "0970599179",
      address: "高雄市鳳山戶政事務所 83062高雄市鳳山區經武路34巷1號",
      phone: "0970599179",
      username: "",
    },
    {
      id: "cust32",
      name: "0909530415",
      address: "高雄市鳳山戶政事務所 83062高雄市鳳山區經武路34巷1號",
      phone: "0909530415",
      username: "",
    },
    {
      id: "cust33",
      name: "0921000648",
      address: "高雄市鳳山戶政事務所 83062高雄市鳳山區經武路34巷1號",
      phone: "0921000648",
      username: "",
    },

    // 消防隊 客戶
    {
      id: "cust34",
      name: "361557",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "361557",
      username: "",
    },
    {
      id: "cust35",
      name: "918881896",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "918881896",
      username: "",
    },
    {
      id: "cust36",
      name: "921172307",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "921172307",
      username: "",
    },
    {
      id: "cust37",
      name: "925221971",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "925221971",
      username: "",
    },
    {
      id: "cust38",
      name: "928877138",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "928877138",
      username: "",
    },
    {
      id: "cust39",
      name: "972030375",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "972030375",
      username: "",
    },
    {
      id: "cust40",
      name: "975335881",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "975335881",
      username: "",
    },
    {
      id: "cust41",
      name: "976140628",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "976140628",
      username: "",
    },
    {
      id: "cust42",
      name: "a0918829129",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "a0918829129",
      username: "",
    },
    {
      id: "cust43",
      name: "a0922279129",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "a0922279129",
      username: "",
    },
    {
      id: "cust44",
      name: "a0968956090",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "a0968956090",
      username: "",
    },
    {
      id: "cust45",
      name: "A990316",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "A990316",
      username: "",
    },
    {
      id: "cust46",
      name: "Aa0917582688",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "Aa0917582688",
      username: "",
    },
    {
      id: "cust47",
      name: "Bella",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "",
      username: "Bella",
    },
    {
      id: "cust48",
      name: "biosheep",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "",
      username: "biosheep",
    },
    {
      id: "cust49",
      name: "djcola007",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "",
      username: "djcola007",
    },
    {
      id: "cust50",
      name: "flyfree",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "",
      username: "flyfree",
    },
    {
      id: "cust51",
      name: "gromit",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "",
      username: "gromit",
    },
    {
      id: "cust52",
      name: "Joanmay",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "",
      username: "Joanmay",
    },
    {
      id: "cust53",
      name: "joyce197996",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "",
      username: "joyce197996",
    },
    {
      id: "cust54",
      name: "kings761210",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "",
      username: "kings761210",
    },
    {
      id: "cust55",
      name: "Kmyi",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "",
      username: "Kmyi",
    },
    {
      id: "cust56",
      name: "lk6050",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "",
      username: "lk6050",
    },
    {
      id: "cust57",
      name: "love7477",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "",
      username: "love7477",
    },
    {
      id: "cust58",
      name: "max",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "",
      username: "max",
    },
    {
      id: "cust59",
      name: "nikkoforest",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "",
      username: "nikkoforest",
    },
    {
      id: "cust60",
      name: "rod",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "",
      username: "rod",
    },
    {
      id: "cust61",
      name: "s169196",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "",
      username: "s169196",
    },
    {
      id: "cust62",
      name: "shan33",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "",
      username: "shan33",
    },
    {
      id: "cust63",
      name: "Soar1996",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "",
      username: "Soar1996",
    },
    {
      id: "cust64",
      name: "tel",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "",
      username: "tel",
    },
    {
      id: "cust65",
      name: "u0972908178",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "",
      username: "u0972908178",
    },
    {
      id: "cust66",
      name: "vincent0312",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "",
      username: "vincent0312",
    },
    {
      id: "cust67",
      name: "viv",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "",
      username: "viv",
    },
    {
      id: "cust68",
      name: "Yulicky",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "",
      username: "Yulicky",
    },
    {
      id: "cust69",
      name: "yusue0821",
      address: "消防隊 830高雄市鳳山區經武路40號",
      phone: "",
      username: "yusue0821",
    },

    // 高雄市鳳山區衛生所 客戶
    {
      id: "cust70",
      name: "",
      address: "高雄市鳳山區衛生所 830高雄市鳳山區經武路34巷2號",
      phone: "",
      username: "",
    },

    // 高雄市政府消防局第三大隊鳳山分隊 客戶
    {
      id: "cust71",
      name: "",
      address: "高雄市政府消防局第三大隊鳳山分隊 830高雄市鳳山區經武路36號",
      phone: "",
      username: "",
    },

    // 鳳儀書院 客戶
    {
      id: "cust72",
      name: "",
      address: "鳳儀書院 830高雄市鳳山區鳳明街62號",
      phone: "",
      username: "",
    },

    // 財政部高雄國稅局鳳山分局 客戶
    {
      id: "cust73",
      name: "",
      address: "財政部高雄國稅局鳳山分局 830高雄市鳳山區曹公路55之1號",
      phone: "",
      username: "",
    },

    // 高雄市鳳山區曹公國民小學 客戶
    {
      id: "cust74",
      name: "",
      address: "高雄市鳳山區曹公國民小學 830高雄市鳳山區曹公路6號",
      phone: "",
      username: "",
    },

    // 台北富邦銀行 前金分行 客戶
    {
      id: "cust75",
      name: "",
      address: "台北富邦銀行 前金分行 801高雄市前金區中華四路293號",
      phone: "",
      username: "",
    },

    // 新光銀行 高雄分行 客戶
    {
      id: "cust76",
      name: "20231222",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "20231222",
      username: "",
    },
    {
      id: "cust77",
      name: "0903133171",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "0903133171",
      username: "",
    },
    {
      id: "cust78",
      name: "0905298982",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "0905298982",
      username: "",
    },
    {
      id: "cust79",
      name: "0910550202",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "0910550202",
      username: "",
    },
    {
      id: "cust80",
      name: "0911034679",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "0911034679",
      username: "",
    },
    {
      id: "cust81",
      name: "0915921870",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "0915921870",
      username: "",
    },
    {
      id: "cust82",
      name: "0919454515",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "0919454515",
      username: "",
    },
    {
      id: "cust83",
      name: "0919909406",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "0919909406",
      username: "",
    },
    {
      id: "cust84",
      name: "0921633057",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "0921633057",
      username: "",
    },
    {
      id: "cust85",
      name: "0922092537",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "0922092537",
      username: "",
    },
    {
      id: "cust86",
      name: "0928876103",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "0928876103",
      username: "",
    },
    {
      id: "cust87",
      name: "0928877138",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "0928877138",
      username: "",
    },
    {
      id: "cust88",
      name: "0931061095",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "0931061095",
      username: "",
    },
    {
      id: "cust89",
      name: "0933701813",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "0933701813",
      username: "",
    },
    {
      id: "cust90",
      name: "0937367338",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "0937367338",
      username: "",
    },
    {
      id: "cust91",
      name: "0966442679",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "0966442679",
      username: "",
    },
    {
      id: "cust92",
      name: "0968332958",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "0968332958",
      username: "",
    },
    {
      id: "cust93",
      name: "0972030375",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "0972030375",
      username: "",
    },
    {
      id: "cust94",
      name: "0975335881",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "0975335881",
      username: "",
    },
    {
      id: "cust95",
      name: "0975788878",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "0975788878",
      username: "",
    },
    {
      id: "cust96",
      name: "0984298628",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "0984298628",
      username: "",
    },
    {
      id: "cust97",
      name: "0988107681",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "0988107681",
      username: "",
    },
    {
      id: "cust98",
      name: "0989930318",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "0989930318",
      username: "",
    },
    {
      id: "cust99",
      name: "a0968956090",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "a0968956090",
      username: "",
    },
    {
      id: "cust100",
      name: "A990316",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "A990316",
      username: "",
    },
    {
      id: "cust101",
      name: "Aa0917582688",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "Aa0917582688",
      username: "",
    },
    {
      id: "cust102",
      name: "Bella",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "",
      username: "Bella",
    },
    {
      id: "cust103",
      name: "bruce639908",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "",
      username: "bruce639908",
    },
    {
      id: "cust104",
      name: "candy32143",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "",
      username: "candy32143",
    },
    {
      id: "cust105",
      name: "gzgto72326",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "",
      username: "gzgto72326",
    },
    {
      id: "cust106",
      name: "ianchent",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "",
      username: "ianchent",
    },
    {
      id: "cust107",
      name: "istina126",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "",
      username: "istina126",
    },
    {
      id: "cust108",
      name: "joyce197996",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "",
      username: "joyce197996",
    },
    {
      id: "cust109",
      name: "kings761210",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "",
      username: "kings761210",
    },
    {
      id: "cust110",
      name: "kissching13",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "",
      username: "kissching13",
    },
    {
      id: "cust111",
      name: "Kwgamersno1",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "",
      username: "Kwgamersno1",
    },
    {
      id: "cust112",
      name: "lc407900",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "",
      username: "lc407900",
    },
    {
      id: "cust113",
      name: "lisa890416",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "",
      username: "lisa890416",
    },
    {
      id: "cust114",
      name: "mushroom42426",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "",
      username: "mushroom42426",
    },
    {
      id: "cust115",
      name: "s186576",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "s186576",
      username: "s186576",
    },
    {
      id: "cust116",
      name: "shan33",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "",
      username: "shan33",
    },
    {
      id: "cust117",
      name: "Sherry1214",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "",
      username: "Sherry1214",
    },
    {
      id: "cust118",
      name: "Szuheng",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "",
      username: "Szuheng",
    },
    {
      id: "cust119",
      name: "tiffany",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "",
      username: "tiffany",
    },
    {
      id: "cust120",
      name: "txxd",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "",
      username: "txxd",
    },
    {
      id: "cust121",
      name: "u0972908178",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "",
      username: "u0972908178",
    },
    {
      id: "cust122",
      name: "Uu12345678",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "",
      username: "Uu12345678",
    },
    {
      id: "cust123",
      name: "xinyunxie",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "",
      username: "xinyunxie",
    },
    {
      id: "cust124",
      name: "yishanlin",
      address: "新光銀行 高雄分行 802045高雄市苓雅區青年二路105號",
      phone: "",
      username: "yishanlin",
    },

    // 高雄市立高雄女子高級中學 客戶
    {
      id: "cust125",
      name: "",
      address: "高雄市立高雄女子高級中學 801高雄市前金區五福三路122號",
      phone: "",
      username: "",
    },

    // 高雄市新興區信義國民小學 客戶
    {
      id: "cust126",
      name: "",
      address: "高雄市新興區信義國民小學 800高雄市新興區中正三路32號",
      phone: "",
      username: "",
    },

    // 高雄市政府消防局第一大隊新興分隊 客戶
    {
      id: "cust127",
      name: "",
      address: "高雄市政府消防局第一大隊新興分隊 800高雄市新興區中正三路3號",
      phone: "",
      username: "",
    },

    // 高雄市政府警察局新興分局中正三路派出所 客戶
    {
      id: "cust128",
      name: "",
      address:
        "高雄市政府警察局新興分局中正三路派出所 800高雄市新興區中正三路3號",
      phone: "",
      username: "",
    },

    // 其他客戶資料（根據需求可繼續添加）
  ];

  const [users, setUsers] = useState(initialUsers);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [form] = Form.useForm();

  // 打開新增用戶的對話框
  const showAddModal = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // 打開編輯用戶的對話框
  const showEditModal = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  // 處理對話框的提交
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingUser) {
          // 編輯模式
          const updatedUsers = users.map((user) =>
            user.id === editingUser.id ? { ...user, ...values } : user
          );
          setUsers(updatedUsers);
          message.success("用戶資料已更新");
        } else {
          // 新增模式
          const newUser = {
            id: `cust${users.length + 1}`,
            ...values,
          };
          setUsers([...users, newUser]);
          message.success("用戶已新增");
        }
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // 處理取消操作
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // 處理刪除用戶
  const handleDelete = (id) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
    message.success("用戶已刪除");
  };

  // 定義表格的欄位
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "8%",
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "名稱",
      dataIndex: "name",
      key: "name",
      width: "15%",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => text || <Tag color="red">未提供</Tag>,
    },
    {
      title: "地址",
      dataIndex: "address",
      key: "address",
      width: "25%",
      sorter: (a, b) => a.address.localeCompare(b.address),
      render: (text) => text || <Tag color="orange">未提供</Tag>,
    },
    {
      title: "電話",
      dataIndex: "phone",
      key: "phone",
      width: "15%",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
      render: (text) => text || <Tag color="orange">未提供</Tag>,
    },
    {
      title: "會員用戶名",
      dataIndex: "username",
      key: "username",
      width: "15%",
      sorter: (a, b) => a.username.localeCompare(b.username),
      render: (text) => text || <Tag color="orange">未提供</Tag>,
    },
    {
      title: "操作",
      key: "actions",
      width: "22%",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            icon={<EditOutlined />}
            style={{ marginRight: 8 }}
            onClick={() => showEditModal(record)}
          >
            編輯
          </Button>
          <Popconfirm
            title="確定要刪除這個用戶嗎？"
            onConfirm={() => handleDelete(record.id)}
            okText="是"
            cancelText="否"
          >
            <Button type="danger" icon={<DeleteOutlined />}>
              刪除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h2>使用者資料管理</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showAddModal}
        style={{ marginBottom: "16px" }}
      >
        新增使用者
      </Button>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        bordered
      />

      <Modal
        title={editingUser ? "編輯使用者" : "新增使用者"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="儲存"
      >
        <Form
          form={form}
          layout="vertical"
          name="userForm"
          initialValues={{
            id: "",
            name: "",
            address: "",
            phone: "",
            username: "",
          }}
        >
          <Form.Item
            name="id"
            label="ID"
            rules={[
              {
                required: true,
                message: "請輸入用戶ID",
              },
            ]}
          >
            <Input disabled={!!editingUser} placeholder="自動生成" />
          </Form.Item>

          <Form.Item
            name="name"
            label="名稱"
            rules={[
              {
                required: false,
                message: "請輸入用戶名稱",
              },
            ]}
          >
            <Input placeholder="輸入用戶名稱" />
          </Form.Item>

          <Form.Item
            name="address"
            label="地址"
            rules={[
              {
                required: false,
                message: "請輸入地址",
              },
            ]}
          >
            <Input placeholder="輸入地址" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="電話"
            rules={[
              {
                required: false,
                message: "請輸入電話",
              },
            ]}
          >
            <Input placeholder="輸入電話" />
          </Form.Item>

          <Form.Item
            name="username"
            label="會員用戶名"
            rules={[
              {
                required: false,
                message: "請輸入會員用戶名",
              },
            ]}
          >
            <Input placeholder="輸入會員用戶名" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersPage;
