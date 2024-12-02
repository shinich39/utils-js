# utils-js

Utilities for javascript development.

## Usage

ESM

```js
import * as utils from "./dist/utils.min.mjs";
```

CJS

```js
const utils = require("./dist/utils.min.cjs");
```

Browser

```html
<script src="./dist/utils.min.js"></script>
<script>
  const { isBoolean, } = window.utils;
</script>
```

- Object type validations

```js
const res = utils.isBoolean(true); // true
const res = utils.isNumber(1); // true
const res = utils.isNumeric("1"); // true
const res = utils.isString("str"); // true
const res = utils.isEmptyString(""); // true
const res = utils.isObject({ a: 1 }); // true
const res = utils.isEmptyObject({}); // true
const res = utils.isNull(null); // true
const res = utils.isArray([0, 1, 2]); // true
const res = utils.isBooleanArray([true, false]); // true
const res = utils.isNumberArray([1, 2, 3]); // true
const res = utils.isStringArray(["a", "b", "c"]); // true
const res = utils.isObjectArray([{ a: 1 }, { a: 2 }, { a: 3 }]); // true
const res = utils.isEmptyArray([]); // true
const res = utils.isFunction(isNaN); // true
const res = utils.isEmpty(undefined); // true
const res = utils.isEmpty(null); // true
const res = utils.isSameType(1, 2); // true
const res = utils.isSameType(null, null); // true
```

- utils.generateRandomNumber(min, max)

```js
const res = utils.generateRandomNumber(0, 1);
// 0 <= n < 1
```

- utils.generateRandomString(min, max)

```js
const res = utils.generateRandomString("ABCDE");
// E
```

- utils.generateObjectId()

```js
const res = utils.generateObjectId();
// 66334bcae2c321000000
```

- utils.generateUUID()

```js
const res = utils.generateUUID();
// 93cbe72f-a5aa-4b31-acee-409a17c1849f
```

- utils.getClampedNumber(num, min, max)

```js
const res = utils.getClampedNumber(10, -5, 2);
// 2
```

- utils.getContainedNumber(num, min, max)

```js
const res = utils.getContainedNumber(-1, 2, 10);
// 7
const res = utils.getContainedNumber(0, 2, 10);
// 8
const res = utils.getContainedNumber(1, 2, 10);
// 9
const res = utils.getContainedNumber(2, 2, 10);
// 2
const res = utils.getContainedNumber(3, 2, 10);
// 3
const res = utils.getContainedNumber(100, 2, 10);
// 4
```

- utils.encryptString(str, salt)

```js
const str = "Lorem ipsum dolor sit amet.";
const salt = "3939";
const encrypted = utils.encryptString(str, salt);
// VA\^ZI@L^WV_VA@PGRTVM

const decrypted = utils.encryptString(encrypted, salt);
// Lorem ipsum dolor sit amet.
```

- utils.splitInt(str)

```js
const str = "Oregano Leaves, 0.5 tsp";
const res = utils.splitInt(str);
// [ 'Oregano Leaves, ', '0', '.', '5', ' tsp' ]
```

- utils.splitFloat(str)

```js
const str = "Oregano Leaves, 0.5 tsp";
const res = utils.splitFloat(str);
// [ 'Oregano Leaves, ', '0.5', ' tsp' ]
```

- utils.getRelativePath(from, to)

```js
const from = "META-INF/container.xml";
const to = "EPUB/styles/default.css";
const res = utils.getRelativePath(from, to);
// ../../EPUB/styles/default.css
```

- utils.toFullWidth(str)

```js
const str = "Lorem ipsum dolor sit amet.";
const res = utils.toFullWidth(str);
// Ｌｏｒｅｍ　ｉｐｓｕｍ　ｄｏｌｏｒ　ｓｉｔ　ａｍｅｔ．
```

- utils.toHalfWidth(str)

```js
const str = "Ｌｏｒｅｍ　ｉｐｓｕｍ　ｄｏｌｏｒ　ｓｉｔ　ａｍｅｔ．";
const res = utils.toHalfWidth(str);
// Lorem ipsum dolor sit amet.
```

- utils.compareString(strA, strB)

```js
// Compare characters
const a = "Lorem ipsum dolor sit amet.";
const b = "Lorem ipsum foobar sit aget.";
const res = utils.compareString(a, b);
// {
//   acc: 0.8727272727272727,
//   result: [
//     { type: 0, value: 'Lorem ipsum ' },
//     { type: -1, value: 'd' },
//     { type: 1, value: 'f' },
//     { type: 0, value: 'o' },
//     { type: -1, value: 'l' },
//     { type: 0, value: 'o' },
//     { type: 1, value: 'ba' },
//     { type: 0, value: 'r sit a' },
//     { type: -1, value: 'm' },
//     { type: 1, value: 'g' },
//     { type: 0, value: 'et.' }
//   ]
// }
```

```js
// Compare words
const a = "Lorem ipsum dolor sit amet.".split(/([\s])/g);
const b = "Lorem ipsum foobar sit aget.".split(/([\s])/g);
const res = utils.compareString(a, b);
// {
//   acc: 0.7777777777777778,
//   result: [
//     { type: 0, value: 'Lorem ipsum ' },
//     { type: -1, value: 'dolor' },
//     { type: 1, value: 'foobar' },
//     { type: 0, value: ' sit ' },
//     { type: -1, value: 'amet.' },
//     { type: 1, value: 'aget.' }
//   ]
// }
```

```js
// Get the most similar string
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
// {
//   acc: 0.9629629629629629,
//   result: [
//     { type: 0, value: 'Lorem ipsum ' },
//     { type: -1, value: 'd' },
//     { type: 1, value: 'b' },
//     { type: 0, value: 'olor sit amet.' }
//   ],
//   orig: 'Lorem ipsum bolor sit amet.'
// }
```

- utils.compareObject(a, b)

```js
const a = "a2";
const b = "a10";
const res = utils.compareObject(a, b);
// -1
```

- utils.parseCommand(str)

```js
const str = "git commit -m \"update 'many' features\" -f true";
const res = utils.parseCommand(str);
// [ 'git', 'commit', '-m', "update 'many' features", '-f', 'true' ]
```

- utils.parseQueryString(str)

```js
const str = "https://www.google.com/search?q=bing&page=10&page=39";
const res = utils.parseQueryString(str);
// { q: [ 'bing' ], page: [ '10', '39' ] }

const str = "q=bing&page=10&page=39";
const res = utils.parseQueryString(str);
// { q: [ 'bing' ], page: [ '10', '39' ] }
```

- utils.parseTemplate(str, obj)

```js
const str = "${a} ${b.bb.bbb} ${c[cc]['ccc'][2]} amet.";
const obj = {
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
};
const res = utils.parseTemplate(str, obj);
// Lorem ipsum dolor sit amet.
```

- utils.parsePath(str)

```js
const str = "EPUB/styles/default.css";
const res = utils.parsePath(str);
// {
//   dirs: [ 'EPUB', 'styles' ],
//   filename: 'default',
//   basename: 'default.css',
//   dirname: 'EPUB/styles',
//   extname: '.css'
// }
```

```js
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

  return arr
    .map(item => item.dirs.slice(dirIndex)
    .concat([item.basename]).join("/"));
}

const arr = [
  "EPUB/inner/styles/default.css",
  "EPUB/inner/styles/style.css",
  "EPUB/inner/images/image1.jpg",
  "./EPUB/inner/images/image1.png",
  "EPUB/inner/images/1/image1.jpg",
  "./EPUB/index.js",
];

const res = removeRootDirectories(arr);
// [
//   'inner/styles/default.css',
//   'inner/styles/style.css',
//   'inner/images/image1.jpg',
//   'inner/images/image1.png',
//   'inner/images/1/image1.jpg',
//   'index.js'
// ]
```

- utils.getMinValue(arr)

```js
const arr = [1, 2, 3, 4, 5, 6];
const res = utils.getMinValue(arr);
// 1
```

- utils.getMaxValue(arr)

```js
const arr = [1, 2, 3, 4, 5, 6];
const res = utils.getMaxValue(arr);
// 6
```

- utils.getMeanValue(arr)

```js
const arr = [1, 2, 3, 4, 5, 6];
const res = utils.getMeanValue(arr);
// 3.5
```

- utils.getModeValue(arr)

```js
const arr = [1, 2, 3, 3, 4, 5, 6];
const res = utils.getModeValue(arr);
// 3
```

- utils.getRandomValue(arr)

```js
const arr = [1, 2, 3, 4, 5, 6];
const res = utils.getRandomValue(arr);
// 3
```

- utils.createArray(len, value)

```js
const res = utils.createArray(5, 1);
// [ 1, 1, 1, 1, 1 ]

const res = utils.createArray(5, (index) => index);
// [ 0, 1, 2, 3, 4 ]

const res = utils.createArray(5, []);
res[0].push(1);
// [ [1], [], [], [], [] ]
```

- utils.sortArray(arr, desc)

```js
const arr = ["a-10", "b-2", true, "b-11", "a-9", null, 1, false];
const res = utils.sortArray(arr, false);
// [null, false, true, 1, 'a-9', 'a-10', 'b-2', 'b-11']
```

- utils.sortBy(arr, sorter)

```js
const arr = [{
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
}];
const sorter = ["type", "-age", "height"];
// const sorter = "type -age height";
const res = utils.sortBy(arr, sorter);
// [
//   { age: 10, height: 150, type: 'a' },
//   { age: 12, height: 140, type: 'b' },
//   { age: 11, height: 170, type: 'b' },
//   { age: 13, height: 130, type: 'd' }
// ]
```

- utils.shuffleArray(arr)

```js
const arr = [1, 2, 3, 4, 5, 6];
const res = utils.shuffleArray(arr);
// [ 5, 1, 2, 4, 6, 3 ]
```

- utils.spreadArray(arr)

```js
const arr = [
  [1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10],
];

const res = utils.spreadArray(arr);
// [
//   [ 1, 4, 8 ], [ 1, 4, 9 ], [ 1, 4, 10 ],
//   [ 1, 5, 8 ], [ 1, 5, 9 ], [ 1, 5, 10 ],
//   [ 1, 6, 8 ], [ 1, 6, 9 ], [ 1, 6, 10 ],
//   [ 1, 7, 8 ], [ 1, 7, 9 ], [ 1, 7, 10 ],
//   [ 2, 4, 8 ], [ 2, 4, 9 ], [ 2, 4, 10 ],
//   [ 2, 5, 8 ], [ 2, 5, 9 ], [ 2, 5, 10 ],
//   [ 2, 6, 8 ], [ 2, 6, 9 ], [ 2, 6, 10 ],
//   [ 2, 7, 8 ], [ 2, 7, 9 ], [ 2, 7, 10 ],
//   [ 3, 4, 8 ], [ 3, 4, 9 ], [ 3, 4, 10 ],
//   [ 3, 5, 8 ], [ 3, 5, 9 ], [ 3, 5, 10 ],
//   [ 3, 6, 8 ], [ 3, 6, 9 ], [ 3, 6, 10 ],
//   [ 3, 7, 8 ], [ 3, 7, 9 ], [ 3, 7, 10 ]
// ]
```

- utils.copyObject(obj)

```js
const obj = {
  a: {
    b: "A",
  },
};
const clone = utils.copyObject(obj);
clone.a.b = "B";
// obj: { a: { b: "A" } }
// clone: { a: { b: "B" } }
```

- utils.groupByKey(obj, key)

```js
const arr = [
  { name: "john", age: 10 },
  { name: "john", age: 15 },
  { name: 1, age: 10 },
  { name: {}, age: 9 },
  { name: [], age: 9 },
  { name: true, age: 9 },
];
const key = "name";
const res = utils.groupByKey(arr, key);
// {
//   '1': [ { name: 1, age: 10 } ],
//   john: [ { name: 'john', age: 10 }, { name: 'john', age: 15 } ],
//   '[object Object]': [ { name: {}, age: 9 } ],
//   '': [ { name: [], age: 9 } ],
//   true: [ { name: true, age: 9 } ]
// }
```

- utils.queryObject(obj, qry)

Please check [MongoDB Query](https://www.mongodb.com/docs/mongodb-shell/crud/read/) for more details.  

```js
const obj = {
  name: "John",
};

const qry = {
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
  }]
};

const res = utils.queryObject(obj, qry);
// true
```

- utils.getContainedSize(src, dst)

```js
const src = { width: 5, height: 10 };
const dst = { width: 20, height: 20 };
const res = utils.getContainedSize(src, dst);
// { width: 10, height: 20 }
```

- utils.getCoveredSize(src, dst)

```js
const src = { width: 5, height: 10 };
const dst = { width: 20, height: 20 };
const res = utils.getCoveredSize(src, dst);
// { width: 20, height: 40 }
```

- utils.wait(delay)

```js
await utils.wait(1000); // ms
```

- utils.promiseAll(funcs)

```js
let i = 0;
async function a() {
  return i++;
}
const funcs = [a, a, a];
const res = await utils.promiseAll(funcs);
// [0,1,2]
```

## References
