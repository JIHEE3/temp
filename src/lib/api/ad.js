// import client from "./client";
// import qs from "qs";

// export const adcodeList = ({
//   cmd = 'getList',
//   tab_type = 'main',
//   sdate = '2019-09-05',
//   edate = '2019-09-05',
//   adExchange_flag = 'Y',
//   plat_code,
//   prdt_code,
//   tp_code
// }) =>
//   client.post(
//     '/v2/media_report/ajax/ctrProcess.php',
//     qs.stringify({
//       cmd,
//       tab_type,
//       sdate,
//       edate,
//       adExchange_flag,
//       plat_code,
//       prdt_code,
//       tp_code
//     })

export const adcodeList = ({
  cmd = "getList",
  tab_type = "main",
  sdate = "2019-09-05",
  edate = "2019-09-05",
  adExchange_flag = "Y",
  plat_code,
  prdt_code,
  tp_code
}) => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve([
        { name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
        { name: "Donut", calories: 452, fat: 25.0, carbs: 51, protein: 4.9 },
        { name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
        {
          name: "Frozen yoghurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9
        },
        { name: "Honeycomb", calories: 408, fat: 3.2, carbs: 87, protein: 6.5 },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3
        },
        {
          name: "Jelly Bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0
        },
        { name: "KitKat", calories: 518, fat: 26.0, carbs: 65, protein: 7.0 },
        { name: "Lollipop", calories: 392, fat: 0.2, carbs: 98, protein: 0.0 },
        { name: "Marshmallow", calories: 318, fat: 0, carbs: 81, protein: 2.0 },
        { name: "Nougat", calories: 360, fat: 19.0, carbs: 9, protein: 37.0 },
        { name: "Oreo", calories: 437, fat: 18.0, carbs: 63, protein: 4.0 }
      ]);
    }, 3000);
  });
};
