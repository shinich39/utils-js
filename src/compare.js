"use strict";

import {
  isBoolean,
  isNumber,
  isString,
  isObject,
  isNull,
  isArray,
  isFunction,
  isUndefined,
} from "./type.js";

/**
 * get diff between two strings
 * @param {string} strA
 * @param {string} strB
 * @returns {{ acc: number, result: Array<{ type: number, value: string }> }}
 */
function compareString(strA, strB) {

  // create dynamic table
  function C(a, b) {
    const dp = [];
    for (let i = 0; i < a.length + 1; i++) {
      dp.push([]);
      for (let j = 0; j < b.length + 1; j++) {
        dp[i][j] = 0;
      }
    }
    return dp;
  }

  // match a to b
  function M(dp, a, b) {
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        // 1 more characters in DP
        if (a[i - 1] === b[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }
    return dp;
  }

  // write diffs
  function P(dp, a, b) {
    let MATCH = 0,
      INSERT = 1,
      DELETE = -1,
      res = [],
      matches = 0,
      i = a.length,
      j = b.length;
    while (i > 0 || j > 0) {
      const prev = res[res.length - 1];
      const itemA = a[i - 1];
      const itemB = b[j - 1];
      if (i > 0 && j > 0 && itemA === itemB) {
        if (prev && prev.type === MATCH) {
          prev.value = itemA + prev.value; 
        } else {
          res.push({ type: MATCH, value: itemA });
        }
        matches++;
        i--;
        j--;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
        if (prev && prev.type === INSERT) {
          prev.value = itemB + prev.value; 
        } else {
          res.push({ type: INSERT, value: itemB });
        }
        j--;
      } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
        if (prev && prev.type === DELETE) {
          prev.value = itemA + prev.value;
        } else {
          res.push({ type: DELETE, value: itemA });
        }
        i--;
      }
    }
    return {
      acc: (matches * 2) / (a.length + b.length),
      result: res.reverse(),
    };
  }

  return P(M(C(strA, strB), strA, strB), strA, strB);
}
/**
 *
 * @param {*} a
 * @param {*} b
 * @returns {number}
 */
function compareObject(a, b) {
  const priority = [
    isUndefined,
    isNull,
    isBoolean,
    isNumber,
    isString,
    isObject,
    isArray,
    isFunction,
  ];

  const aIdx = priority.findIndex(function (fn) {
    return fn(a);
  });

  const bIdx = priority.findIndex(function (fn) {
    return fn(b);
  });

  if (aIdx !== bIdx) {
    return aIdx - bIdx;
  } else if (aIdx === 0 || aIdx === 1) {
    // undefined, null
    return 0;
  } else if (aIdx === 2) {
    // boolean
    if (a !== b) {
      return 0;
    } else if (a) {
      return 1;
    } else {
      return -1;
    }
  } else if (aIdx === 3) {
    // number
    return a - b;
  } else if (aIdx === 4) {
    // string
    return a.localeCompare(b, undefined, {
      numeric: true,
    });
  } else if (aIdx === 5) {
    // object
    return Object.keys(a).length - Object.keys(b).length;
  } else if (aIdx === 6) {
    // array
    return a.length - b.length;
  } else {
    // function, others
    return 0;
  }
}

export { compareString, compareObject };
