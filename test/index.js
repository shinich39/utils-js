import * as utils from "../dist/utils.min.mjs";
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

console.log("generateRandomNumber", utils.generateRandomNumber(0, 1));
console.log("generateRandomString", utils.generateRandomString("ABCDE"));
console.log("generateObjectId", utils.generateObjectId());
console.log("generateUUID", utils.generateUUID());

console.log("getClampedNumber", utils.getClampedNumber(10, -5, 2));
console.log("getContainedNumber", utils.getContainedNumber(-3, -2, 10));
console.log("getContainedNumber", utils.getContainedNumber(0, 2, 10));
console.log("getContainedNumber", utils.getContainedNumber(100, 2, 10));

console.log("getBezierPoint", utils.getBezierPoint([[0,0], [0.7,0.7], [0.7,0.7], [0.7,0.7], [1,1]], 0.7));
console.log("getBezierPoint", utils.getBezierPoint([[0,0], [0.5,0.5], [1,1]], 0.7));
console.log("getBezierPoint", utils.getBezierPoint([[0,0], [0,0], [0,0], [1,1]], 0.7));

utils.setAnimation([[0,0], [0,0], [0,0], [1,1]], function(point, time, timeout) {
  console.log("setAnimation", point, `${time / 100}s`);
  if (time >= 500) {
    clearTimeout(timeout);
  }
});

console.log("encryptString", utils.encryptString("Lorem ipsum dolor sit amet.", "3939"));

console.log("splitInt", utils.splitInt("Oregano Leaves, 0.5 tsp"));
console.log("splitFloat", utils.splitFloat("Oregano Leaves, 0.5 tsp"));

console.log("toBase64", utils.toBase64("Oregano Leaves, 0.5 tsp"));
console.log("fromBase64", utils.fromBase64(utils.toBase64("Oregano Leaves, 0.5 tsp")));

console.log("getRelativePath", utils.getRelativePath("META-INF/container.xml", "EPUB/styles/default.css"));
console.log("getRelativePath", utils.getRelativePath("META-INF/container.xml", "META-INF/container.xml"));

console.log("toFullWidth", utils.toFullWidth("Lorem ipsum dolor sit amet."));
console.log("toHalfWidth", utils.toHalfWidth("Ｌｏｒｅｍ　ｉｐｓｕｍ　ｄｏｌｏｒ　ｓｉｔ　ａｍｅｔ．"));

console.log("compareString", utils.compareString("Lorem ipsum dolor sit amet.", "Lorem ipsum foobar sit aget."));
;(() => {
  const str = "Lorem ipsum dolor sit amet.";
  const arr = [
    "Lorem dolor sit amet.",
    "Lorem sit amet.",
    "Lorem ipsum sit amet.",
    "Lorem ipsum bolor sit amet.",
  ];
  
  const res = arr.reduce(function(prev, curr) {
    const r = utils.compareString(str, curr);
    if (!prev || prev.acc < r.acc) {
      r.orig = curr;
      return r;
    } else {
      return prev;
    }
  }, null);

  console.log("compareString", res);
})();

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

;(() => {
  const str = "EPUB/styles/default.css";
  console.log("parsePath", utils.parsePath(str));
})();

// Remove subdirs
;(() => {
  let arr = [
    "EPUB/EPUB2/styles/default.css",
    "EPUB/EPUB2/styles/style.css",
    "EPUB/EPUB2/images/image1.jpg",
    "./EPUB/EPUB2/images/image1.png",
    "EPUB/EPUB2/images/1/image1.jpg",
    "./EPUB/index.js",
  ];
      
  function removeRootDirectories(arr) {
    arr = arr.map(utils.parsePath);
  
    let dirIndex = 0,
        isMatched = true;
    while(isMatched) {
      for (let i = 1; i < arr.length; i++) {
        if (arr[0].dirs[dirIndex] !== arr[i].dirs[dirIndex]) {
          isMatched = false;
          break;
        }
      }
      if (isMatched) {
        dirIndex++;
      }
    }
  
    arr = arr.map(item => item.dirs.slice(dirIndex).concat([item.basename]).join("/"));
    return arr;
  }

  console.log("parsePath", removeRootDirectories(arr))
})();

console.log("getMinValue", utils.getMinValue([1, 2, 3, 4, 5, 6]));
console.log("getMaxValue", utils.getMaxValue([1, 2, 3, 4, 5, 6]));
console.log("getMeanValue", utils.getMeanValue([1, 2, 3, 4, 5, 6]));
console.log("getModeValue", utils.getModeValue([1, 2, 3, 4, 5, 6]));
console.log("getRandomValue", utils.getRandomValue([1, 2, 3, 4, 5, 6]));

console.log("createArray", utils.createArray(5, (index) => index));

console.log("sortArray", utils.sortArray(["a-10", "b-2", true, "b-11", "a-9", null, 1, false]));

console.log("sortBy", utils.sortBy( [{
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