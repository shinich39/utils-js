import * as utils from "../index.js";
import path from "node:path";
// import * as utils from "./util.mjs";
// const utils = require("./dist/util.cjs");

console.log("isBoolean", utils.isBoolean(true));
console.log("isNumber", utils.isNumber(1));
console.log("isNumeric", utils.isNumeric("1"));
console.log("isString", utils.isString("str"));
console.log("isEmptyString", utils.isEmptyString(""));
console.log("isObject", utils.isObject({ a: 1 }));
console.log("isEmptyObject", utils.isEmptyObject({}));
console.log("isNull", utils.isNull(null));
console.log("isArray", utils.isArray([0, 1, 2]));
console.log("isBooleanArray", utils.isBooleanArray([true, false]));
console.log("isNumberArray", utils.isNumberArray([1, 2, 3]));
console.log("isStringArray", utils.isStringArray(["a", "b", "c"]));
console.log("isObjectArray", utils.isObjectArray([{ a: 1 }, { a: 2 }, { a: 3 }]));
console.log("isEmptyArray", utils.isEmptyArray([]));
console.log("isFunction", utils.isFunction(isNaN));
console.log("isEmpty", utils.isEmpty(undefined));
console.log("isEmpty", utils.isEmpty(null));
console.log("isSameType", utils.isSameType(1, 2));
console.log("isSameType", utils.isSameType(null, null));

console.log("getRandomNumber", utils.getRandomNumber(0, 1));

utils.setAnimation([[0, 0], [0.25, 1], [0.5, 1], [1, 1]], function([x, y], now, timer) {
  console.log(`setAnimation ${now}: ${x} ${y}`);
}, 1, 1);

console.log("generateObjectId", utils.generateObjectId());
console.log("generateUUID", utils.generateUUID());
console.log("encryptString", utils.encryptString("Lorem ipsum dolor sit amet.", "3939"));

console.log("toBase64", utils.toBase64("Lorem ipsum dolor sit amet.", "image/jpeg"));
console.log("fromBase64", utils.fromBase64("TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQu"));

console.log("splitInt", utils.splitInt("Oregano Leaves, 0.5 tsp"));
console.log("splitFloat", utils.splitFloat("Oregano Leaves, 0.5 tsp"));

console.log("getExtension", utils.getExtension("EPUB/styles/default.css"));
console.log("getExtension", utils.getExtension("EPUB/styles/default.tar.gz"));
console.log("getFilename", utils.getFilename("EPUB/styles/default.css"));
console.log("getFilename", utils.getFilename("EPUB/styles/default.css", utils.getExtension("EPUB/styles/default.css")));
console.log("getDirectoryPath", utils.getDirectoryPath("EPUB/styles/default.css"), path.dirname("EPUB/styles/default.css"));
console.log("getDirectoryPath", utils.getDirectoryPath("EPUB/styles/"), path.dirname("EPUB/styles/"));
console.log("getDirectoryPath", utils.getDirectoryPath("EPUB/styles"), path.dirname("EPUB/styles"));
console.log("getDirectoryPath", utils.getDirectoryPath("./"), path.dirname("./"));
console.log("getDirectoryPath", utils.getDirectoryPath("."), path.dirname("."));
console.log("getDirectoryPath", utils.getDirectoryPath(""), path.dirname(""));
console.log("getRelativePath", utils.getRelativePath("META-INF/container.xml", "EPUB/styles/default.css"));
console.log("getRelativePath", utils.getRelativePath("META-INF/container.xml", "META-INF/container.xml"));

console.log("toFullWidth", utils.toFullWidth("Lorem ipsum dolor sit amet."));
console.log("toHalfWidth", utils.toHalfWidth("Ｌｏｒｅｍ　ｉｐｓｕｍ　ｄｏｌｏｒ　ｓｉｔ　ａｍｅｔ．"));

console.log("compareString", utils.compareString("Lorem ipsum dolor sit amet.", "Lorem ipsum foobar sit aget."));
console.log("compareObject", utils.compareObject("a2", "a10"));

console.log("parseCommand", utils.parseCommand("git commit -m \"update 'many' features\" -f true"));

console.log("parseQueryString", utils.parseQueryString("https://www.google.com/search?q=bing&page=10&page=39"));

console.log("parseTemplate", utils.parseTemplate("${a} ${b.bb.bbb} ${c[cc]['ccc'][2]} amet.", {
  a: "Lorem ipsum",
  b: {
    bb: {
      bbb: "dolor",
    },
  },
  c: {
    cc: {
      ccc: ["A", "B", "sit"],
    }
  } 
}));

console.log("getMinValue", utils.getMinValue([1, 2, 3, 4, 5, 6]));
console.log("getMaxValue", utils.getMaxValue([1, 2, 3, 4, 5, 6]));
console.log("getMeanValue", utils.getMeanValue([1, 2, 3, 4, 5, 6]));
console.log("getModeValue", utils.getModeValue([1, 2, 3, 4, 5, 6]));
console.log("getRandomValue", utils.getRandomValue([1, 2, 3, 4, 5, 6]));

console.log("createArray", utils.createArray(5, (index) => index));

console.log("sortArray", utils.sortArray(["a-10", "b-2", true, "b-11", "a-9", null, 1, false]));

console.log("sortObject", utils.sortObject( [{
  type: "a",
  age: 10,
  height: 150,
},{
  type: "d",
  age: 13,
  height: 130,
},{
  type: "b",
  age: 12,
  height: 140,
},{
  type: "b",
  age: 11,
  height: 170,
}], ["type", "-age", "height"]));

console.log("shuffleArray", utils.shuffleArray([1, 2, 3, 4, 5, 6]));

console.log("spreadArray", utils.spreadArray([
  [1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10],
]));

console.log("copyObject", utils.copyObject( {
  a: {
    b: "A",
  },
}));

console.log("groupByKey", utils.groupByKey([
  { name: "john", age: 10 },
  { name: "john", age: 15 },
  { name: 1, age: 10 },
  { name: {}, age: 9 },
  { name: [], age: 9 },
  { name: true, age: 9 },
], "name"));

console.log("queryObject", utils.queryObject({
  name: "John",
}, {
  $and: [{
    name: "John",
  }, {
    name: {
      $eq: "John",
    }
  }, {
    name: {
      $ne: "Bob",
    }
  }, {
    name: {
      $re: /^John$/
    }
  }, {
    name: {
      $exists: true,
    },
  }, {
    name: {
      $in: ["Bob", "John"],
    },
  }, {
    name: {
      $nin: ["Bob", "Mike"],
    },
  }, {
    $not: {
      name: "Bob"
    }
  }],
}));

console.log("getContainedSize", utils.getContainedSize({ width: 5, height: 10 }, { width: 20, height: 20 }));
console.log("getCoveredSize", utils.getCoveredSize({ width: 5, height: 10 }, { width: 20, height: 20 }));

utils.wait(100).then(() => console.log("wait 100ms"));

var i = 0;
async function promiseOne() { return i++; }
const promises = [promiseOne, promiseOne, promiseOne];
utils.promiseAll(promises).then((res) => console.log("promiseAll", res))


