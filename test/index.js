import * as utils from "../index.js";
// import * as utils from "./util.mjs";
// const utils = require("./dist/util.cjs");

// const arr = [{
//   age: 10,
//   height: 150,
//   type: "a",
// },{
//   age: 13,
//   height: 130,
//   type: "d",
// },{
//   age: 12,
//   height: 140,
//   type: "b",
// },{
//   age: 11,
//   height: 170,
//   type: "b",
// }];

// // const sorter = ["type", "-age", "height"];
// const sorter = "type -age height";

// console.log(utils.sortBy(arr, sorter));

const data = [[0, 0], [0.25, 1], [0.5, 1], [1, 1]];
const time = 1000;
const tick = 10;
const res = utils.setAnimation(data, function([x, y], now, timer) {
  console.log(`${now}:`, x, y,);
}, time, tick);

// const str = "git commit -m \"update 'many' features\" -f true";
// const res = utils.parseCommand(str);
// console.log(res)