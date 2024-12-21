"use strict";

import { isObject, isArray, isFunction } from "./type.js";
import { copyObject } from "./object.js";
import { generateRandomNumber } from "./number.js";
import { compareObject } from "./compare.js";

/**
 * Fill array to deepcopied values.
 * @param {number} len
 * @param {*} value
 * @returns {array}
 */
function createArray(len, value) {
  let arr = new Array(len);
  if (isFunction(value)) {
    for (let i = 0; i < len; i++) {
      arr[i] = value(i);
    }
  } else if (isObject(value)) {
    for (let i = 0; i < len; i++) {
      arr[i] = copyObject(value);
    }
  } else if (isArray(value)) {
    for (let i = 0; i < len; i++) {
      arr[i] = copyObject(value);
    }
  } else if (typeof value !== "undefined") {
    for (let i = 0; i < len; i++) {
      arr[i] = value;
    }
  }
  return arr;
}
/**
 * Get minimum value in array.
 * @param {number[]} arr
 * @returns {number}
 */
function getMinValue(arr) {
  return arr.reduce(function (prev, curr) {
    if (curr < prev) {
      return curr;
    } else {
      return prev;
    }
  }, arr[0] || 0);
}
/**
 * Get maximum value in array.
 * @param {number[]} arr
 * @returns {number}
 */
function getMaxValue(arr) {
  return arr.reduce(function (prev, curr) {
    if (curr > prev) {
      return curr;
    } else {
      return prev;
    }
  }, arr[0] || 0);
}
/**
 * Get arithmetic mean.
 * @param {number[]} arr
 * @returns {number}
 */
function getMeanValue(arr) {
  return (
    arr.reduce(function (prev, curr) {
      return prev + curr;
    }, 0) / arr.length
  );
}
/**
 * Get most frequent value in array.
 * @param {any[]} arr
 * @returns {any}
 */
function getModeValue(arr) {
  let seen = {},
    maxValue = arr[0],
    maxCount = 1;
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    if (!seen[value]) {
      seen[value] = 1;
    } else {
      seen[value] += 1;
    }
    if (seen[value] > maxCount) {
      maxValue = value;
      maxCount = seen[value];
    }
  }
  return maxValue;
}
/**
 * Sort array ascending order.
 * Order of types:
 * [undefined, null, boolean, number, string, object, array, function]
 * @param {array} arr
 * @param {boolean|undefined} desc descending
 * @returns {array}
 */
function sortArray(arr, desc) {
  desc = Boolean(desc);
  return arr.sort(function (a, b) {
    if (desc) {
      return !compareObject(a, b);
    } else {
      return compareObject(a, b);
    }
  });
}
/**
 *
 * @param {object[]} arr
 * @param {string|string[]} sorter ["name", "-age", "height"]
 * @returns
 */
function sortBy(arr, sorter) {
  if (typeof sorter === "string") {
    sorter = sorter.split(" ").filter(Boolean);
  }
  return arr.sort(function (a, b) {
    for (const key of sorter) {
      const d = /^-/.test(key),
        k = key.replace(/^-/, ""),
        r = compareObject(a[k], b[k]);
      if (r !== 0) {
        if (d) {
          return -r;
        } else {
          return r;
        }
      }
    }
    return 0;
  });
}
/**
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * @param {array} arr
 * @returns {array}
 */
function shuffleArray(arr) {
  let i = arr.length;
  while (i > 0) {
    let j = Math.floor(Math.random() * i);
    i--;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
/**
 * Get random value in array.
 * @param {array} arr
 * @returns {any}
 */
function getRandomValue(arr) {
  return arr[Math.floor(generateRandomNumber(0, arr.length))];
}
/**
 * Get all cases.
 * @param {array[]} arr e.g. [[1,2,3],[4,5,6,7],[8,9,10]]
 * @returns {array}
 */
function spreadArray(arr) {
  function getFirstIndexes(a) {
    if (a.length < 1) {
      return;
    }
    let result = [];
    for (let i = 0; i < a.length; i++) {
      result.push(0);
    }
    return result;
  }

  function getNextIndexes(a, indexes) {
    for (let i = a.length - 1; i >= 0; i--) {
      // Decrease current index
      if (indexes[i] < a[i].length - 1) {
        indexes[i] += 1;
        return indexes;
      }
      // Reset current index
      indexes[i] = 0;
    }
    return;
  }

  function getValues(a, indexes) {
    let result = [];
    for (let i = 0; i < a.length; i++) {
      result.push(a[i][indexes[i]]);
    }
    return result;
  }

  function exec() {
    let result = [];
    let indexes = getFirstIndexes(arr);
    while (indexes) {
      result.push(getValues(arr, indexes));
      indexes = getNextIndexes(arr, indexes);
    }
    return result;
  }

  return exec();
}

export {
  createArray,
  getMinValue,
  getMaxValue,
  getMeanValue,
  getModeValue,
  sortArray,
  sortBy,
  shuffleArray,
  getRandomValue,
  spreadArray,
};
