(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.utils = {}));
})(this, (function (exports) { 'use strict';

  /**
   *
   * @param {*} obj
   * @returns {boolean}
   */
  function isBoolean(obj) {
    return typeof obj === "boolean";
  }
  /**
   *
   * @param {*} obj
   * @returns {boolean}
   */
  function isNumber(obj) {
    return typeof obj === "number" && !Number.isNaN(obj) && Number.isFinite(obj);
  }
  /**
   *
   * @param {*} obj
   * @returns {boolean}
   */
  function isNumeric(obj) {
    if (isString(obj)) {
      return !Number.isNaN(parseFloat(obj)) && Number.isFinite(parseFloat(obj));
    } else {
      return isNumber(obj);
    }
  }
  /**
   *
   * @param {*} obj
   * @returns {boolean}
   */
  function isString(obj) {
    return typeof obj === "string";
  }
  /**
   *
   * @param {*} obj
   * @returns {boolean}
   */
  function isEmptyString(obj) {
    return (
      isString(obj) &&
      // trim
      obj.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") === ""
    ); 
  }
  /**
   *
   * @param {*} obj
   * @returns {boolean}
   */
  function isObject(obj) {
    return typeof obj === "object" && obj !== null && !isArray(obj);
    // return (
    //   typeof obj === "object" &&
    //   obj !== null &&
    //   obj.constructor === Object &&
    //   Object.getPrototypeOf(obj) === Object.prototype
    // );
  }
  /**
   *
   * @param {*} obj
   * @returns {boolean}
   */
  function isEmptyObject(obj) {
    return isObject(obj) && Object.keys(obj).length === 0;
  }
  /**
   *
   * @param {*} obj
   * @returns {boolean}
   */
  function isNull(obj) {
    return typeof obj === "object" && obj === null;
  }
  /**
   *
   * @param {*} obj
   * @returns {boolean}
   */
  function isArray(obj) {
    if (Array && Array.isArray) {
      return Array.isArray(obj);
    } else {
      return Object.prototype.toString.call(obj) === "[object Array]";
    }
  }
  /**
   *
   * @param {*} obj
   * @returns {boolean}
   */
  function isBooleanArray(obj) {
    if (!isArray(obj)) {
      return false;
    }
    for (const item of obj) {
      if (!isBoolean(item)) {
        return false;
      }
    }
    return true;
  }
  /**
   *
   * @param {*} obj
   * @returns {boolean}
   */
  function isNumberArray(obj) {
    if (!isArray(obj)) {
      return false;
    }
    for (const item of obj) {
      if (!isNumber(item)) {
        return false;
      }
    }
    return true;
  }
  /**
   *
   * @param {*} obj
   * @returns {boolean}
   */
  function isStringArray(obj) {
    if (!isArray(obj)) {
      return false;
    }
    for (const item of obj) {
      if (!isString(item)) {
        return false;
      }
    }
    return true;
  }
  /**
   *
   * @param {*} obj
   * @returns {boolean}
   */
  function isObjectArray(obj) {
    if (!isArray(obj)) {
      return false;
    }
    for (const item of obj) {
      if (!isObject(item)) {
        return false;
      }
    }
    return true;
  }
  /**
   *
   * @param {*} obj
   * @returns {boolean}
   */
  function isEmptyArray(obj) {
    return isArray(obj) && obj.length === 0;
  }
  /**
   *
   * @param {*} obj
   * @returns {boolean}
   */
  function isFunction(obj) {
    return typeof obj === "function";
  }
  /**
   *
   * @param {*} obj
   * @returns {boolean}
   */
  function isEmpty(obj) {
    return obj === undefined || isNull(obj);
  }
  /**
   *
   * @param {*} obj
   * @returns {boolean}
   */
  function isUndefined(obj) {
    return obj === undefined;
  }
  /**
   *
   * @param {*} objA
   * @param {*} objB
   * @returns {boolean}
   */
  function isSameType(objA, objB) {
    return (
      (isNull(objA) && isNull(objB)) ||
      (typeof objA === typeof objB && objA.constructor === objB.constructor)
    );
  }

  /**
   * deep copy
   * @param {object|array} obj
   * @returns {object|array}
   */
  function copyObject(obj) {
    let result;
    if (isArray(obj)) {
      result = [];
    } else {
      result = {};
    }
    for (const [key, value] of Object.entries(obj)) {
      if (isObject(value) || isArray(value)) {
        result[key] = copyObject(value);
      } else {
        result[key] = value;
      }
    }
    return result;
  }
  /**
   * 
   * @param {object|array} obj 
   * @returns {array}
   */
  function objectEntries(obj) {
    const A = function(acc, cur, prevKey) {
      for (const [key, value] of Object.entries(cur)) {
        B(acc, prevKey, key, value);
      }
      return acc;
    };

    const B = function(acc, prevKey, currKey, currValue) {
      let nextKey;
      if (!prevKey) {
        nextKey = currKey;
      } else {
        nextKey = prevKey + "." + currKey;
      }
      if (isObject(currValue) || isArray(currValue)) {
        A(acc, currValue, nextKey);
      } else {
        acc[nextKey] = currValue;
      }
    };

    return A({}, obj);
  }
  /**
   * array to object
   * @param {object[]} arr
   * @param {string} key
   * @returns {object}
   */
  function groupByKey(arr, key) {
    let group = {};
    for (const obj of arr) {
      const k = String(obj[key]);
      if (!group[k]) {
        group[k] = [obj];
      } else {
        group[k].push(obj);
      }
    }
    return group;
  }
  /**
   * https://www.mongodb.com/docs/manual/tutorial/query-documents/
   * @param {object} obj
   * @param {object} qry
   * @param {object[]} qry.$and
   * @param {object[]} qry.$nand
   * @param {object[]} qry.$or
   * @param {object[]} qry.$nor
   * @param {any[]} qry.$in
   * @param {any[]} qry.$nin
   * @param {number} qry.$gt
   * @param {number} qry.$gte
   * @param {number} qry.$lt
   * @param {number} qry.$lte
   * @param {any} qry.$eq
   * @param {any} qry.$ne
   * @param {any} qry.$exists
   * @param {function} qry.$fn
   * @param {RegExp} qry.$re
   * @returns {boolean}
   */
  function queryObject(obj, qry) {
    function A(d, q) {
      for (const [key, value] of Object.entries(q)) {
        if (!B(d, value, key.split("."))) {
          return false;
        }
      }
      return true;
    }

    function B(d, q, k) {
      const o = k.shift();
      if (k.length > 0) {
        if (isObject(d)) {
          return B(d[o], q, k);
        } else {
          return false;
        }
      }
      return C(d, q, o);
    }

    function C(d, q, o) {
      if (o === "$and") {
        for (const v of q) {
          if (!A(d, v)) {
            return false;
          }
        }
        return true;
      } else if (o === "$nand") {
        return !C(d, q, "$and");
      } else if (o === "$or") {
        for (const v of q) {
          if (A(d, v)) {
            return true;
          }
        }
        return false;
      } else if (o === "$nor") {
        return !C(d, q, "$or");
      } else if (o === "$not") {
        return !A(d, q);
      } else if (o === "$in") {
        if (isArray(d)) {
          for (const v of d) {
            if (!C(v, q, "$in")) {
              return false;
            }
          }
          return true;
        } else {
          for (const v of q) {
            if (C(d, v, "$eq")) {
              return true;
            }
          }
          return false;
        }
      } else if (o === "$nin") {
        return !C(d, q, "$in");
      } else if (o === "$gt") {
        return d > q;
      } else if (o === "$gte") {
        return d >= q;
      } else if (o === "$lt") {
        return d < q;
      } else if (o === "$lte") {
        return d <= q;
      } else if (o === "$eq") {
        if (isArray(d) && isArray(q)) {
          if (d.length !== q.length) {
            return false;
          }
          for (let i = 0; i < q.length; i++) {
            if (!C(d[i], q[i], "$eq")) {
              return false;
            }
          }
          return true;
        } else {
          return d === q;
        }
      } else if (o === "$ne") {
        return !C(d, q, "$eq");
      } else if (o === "$exists") {
        return (d !== null && d !== undefined) === Boolean(q);
      } else if (o === "$fn") {
        return q(d);
      } else if (o === "$re") {
        return q.test(d);
      } else if (!isObject(d)) {
        return false;
      } else if (isObject(q)) {
        return A(d[o], q);
      } else {
        return C(d[o], q, "$eq");
      }
    }

    return A(obj, qry);
  }
  /**
   * 
   * @param {object} obj 
   * @param {object} updt 
   * @param {object} updt.$set
   * @param {object} updt.$unset
   * @param {object} updt.$push
   * @param {object} updt.$pushAll
   * @param {object} updt.$pull
   * @param {object} updt.$pullAll
   * @param {object} updt.$addToSet
   * @param {object} updt.$addToSetAll
   */
  function updateObject(obj, updt) {
    for (const operator of Object.keys(updt)) {
      for (let [keys, value] of Object.entries(updt[operator])) {
        keys = keys.split(".");

        let target = obj,
          key = keys.pop();

        while (isObject(target) && keys.length > 0) {
          target = target[keys.shift()];
        }

        if (!isObject(target)) {
          continue;
        }

        if (operator === "$set") {
          if (target[key] !== value) {
            target[key] = value;
          }
        } else if (operator === "$unset") {
          if (!!value) {
            delete target[key];
          }
        } else if (operator === "$push") {
          target[key].push(value);
        } else if (operator === "$pushAll") {
          for (const v of value) {
            target[key].push(v);
          }
        } else if (operator === "$pull") {
          for (let i = target[key].length; i >= 0; i--) {
            if (target[key][i] === value) {
              target[key].splice(i, 1);
              break;
            }
          }
        } else if (operator === "$pullAll") {
          const prev = target[key];
          target[key] = [];
          for (const v of prev) {
            if (value.indexOf(v) === -1) {
              target[key].push(v);
            }
          }
        } else if (operator === "$addToSet") {
          if (target[key].indexOf(value) === -1) {
            target[key].push(value);
          }
        } else if (operator === "$addToSetAll") {
          for (const v of value) {
            if (target[key].indexOf(v) === -1) {
              target[key].push(v);
            }
          }
        }
      }
    }
    return obj;
  }

  /**
   *
   * @param {number} min
   * @param {number} max
   * @returns {number} min <= n < max
   */
  function generateRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
  /**
   *
   * @param {number} num
   * @param {number} min
   * @param {number} max
   * @returns {number} min <= n <= max
   */
  function getClampedNumber(num, min, max) {
    return Math.min(max, Math.max(num, min));
  }
  /**
   *
   * @param {number} num
   * @param {number} min
   * @param {number} max
   * @returns {number} min <= n < max
   */
  function getContainedNumber(num, min, max) {
    num -= min;
    max -= min;

    if (num < 0) {
      num = (num % max) + max;
    }

    if (num >= max) {
      num = num % max;
    }

    return num + min;
  }

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

  /**
   * fill array to deepcopied values
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
   * get maximum value in array
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
   * get arithmetic mean
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
   * get most frequent value in array
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
   * sort array ascending order  
   * order: [undefined, null, boolean, number, string, object, array, function]
   * @param {array} arr
   * @param {boolean|undefined} desc - descending
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
   * @param {string|string[]} sorter - e.g. ["name", "-age", "height"]
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
   * get random value in array
   * @param {array} arr
   * @returns {any}
   */
  function getRandomValue(arr) {
    return arr[Math.floor(generateRandomNumber(0, arr.length))];
  }
  /**
   * get all cases
   * @param {array[]} arr - e.g. [[1,2,3],[4,5,6,7],[8,9,10]]
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
        // decrease current index
        if (indexes[i] < a[i].length - 1) {
          indexes[i] += 1;
          return indexes;
        }

        // reset current index
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

  /**
   *
   * @param {array[]} data - [[x, y], ...]
   * @param {number} time - value between 0 and 1
   * @returns {[x, y]}
   */
  function getBezierPoint(data, time) {
    if (data.length === 1) {
      return data[0];
    }
    let d = [];
    for (let i = 0; i < data.length - 1; i++) {
      let x = (1 - time) * data[i][0] + time * data[i + 1][0];
      let y = (1 - time) * data[i][1] + time * data[i + 1][1];
      d.push([x, y]);
    }
    return getBezierPoint(d, time);
  }
  /**
   *
   * @param {array[]} data - [[x, y], ...]
   * @param {function} cb - ([x, y], currentTime, Timeout) => { ... }
   * @param {number} time - ms default 1000
   * @param {number} tick - ms default 100
   */
  function setAnimation(data, cb, time, tick) {
    if (!time) {
      time = 1000;
    }
    if (!tick) {
      tick = 100;
    }
    let currentTime = 0,
      d = getBezierPoint(data, currentTime / time);

    cb(d, currentTime, anim());

    function anim() {
      currentTime += tick;
      d = getBezierPoint(data, currentTime / time);
      return setTimeout(function () {
        if (currentTime < time) {
          cb(d, currentTime, anim());
        } else {
          cb(d, currentTime, null);
        }
      }, tick);
    }
  }

  let __index = 0;

  /**
   * generate object id  
   * https://www.mongodb.com/docs/manual/reference/method/ObjectId/
   * @param {number} time - unix time: Date.now() / 1000
   * @param {number} index
   * @returns {string} 24 characters
   */
  function generateObjectId(time, index) {
    if (time) {
      time = new Date(time).getTime() / 1000;
    } else {
      time = new Date().getTime() / 1000;
    }
    if (!index) {
      index = __index++;
    } else {
      __index = index;
    }
    return (
      // 8 chars
      Math.floor(time).toString(16) +
      // 10 chars
      "xxxxxxxxxx".replace(/x/g, function (v) {
        return Math.floor(Math.random() * 16).toString(16);
      }) +
      // 6 chars
      Math.floor(index).toString(16).padStart(6, "0")
    );
  }
  /**
   * generate uuid v4
   * @returns {string}
   */
  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      let r = (Math.random() * 16) | 0,
        v;
      if (c == "x") {
        v = r;
      } else {
        v = (r & 0x3) | 0x8;
      }
      return v.toString(16);
    });
  }

  /**
   *
   * @param {number} delay - ms
   * @returns {Promise<void>}
   */
  function wait(delay) {
    return new Promise(function (resolve) {
      return setTimeout(resolve, delay);
    });
  }
  /**
   * https://stackoverflow.com/questions/24586110/resolve-promises-one-after-another-i-e-in-sequence
   * @param {function[]} funcs - the functions will return promise
   * @returns {Promise<array>}
   */
  function promiseAll(funcs) {
    return funcs.reduce(function (prevPromise, currFunction) {
      return prevPromise.then(function (prev) {
        return currFunction().then(function (curr) {
          return prev.concat([curr]);
        });
      });
    }, Promise.resolve([]));
  }

  /**
   *
   * @param {{ width: number, height: number }} src - source size
   * @param {{ width: number, height: number }} dst - destination size
   * @returns {{ width: number, height: number }}
   */
  function getContainedSize(src, dst) {
    const aspectRatio = src.width / src.height;
    if (aspectRatio < dst.width / dst.height) {
      return {
        width: dst.height * aspectRatio,
        height: dst.height,
      };
    } else {
      return {
        width: dst.width,
        height: dst.width / aspectRatio,
      };
    }
  }
  /**
   *
   * @param {{ width: number, height: number }} src - source size
   * @param {{ width: number, height: number }} dst - destination size
   * @returns {{ width: number, height: number }}
   */
  function getCoveredSize(src, dst) {
    const aspectRatio = src.width / src.height;
    if (aspectRatio < dst.width / dst.height) {
      return {
        width: dst.width,
        height: dst.width / aspectRatio,
      };
    } else {
      return {
        width: dst.height * aspectRatio,
        height: dst.height,
      };
    }
  }

  /**
   *
   * @param {string} charset
   * @returns {string}
   */
  function generateRandomString(charset) {
    return charset.charAt(Math.floor(Math.random() * charset.length));
  }
  /**
   *
   * @param {string} str
   * @returns {string}
   */
  function splitInt(str) {
    return str.split(/([0-9]+)/);
  }
  /**
   *
   * @param {string} str
   * @returns {string}
   */
  function splitFloat(str) {
    return str.split(/([0-9]+\.[0-9]+)+/);
  }
  /**
   * https://github.com/mathiasbynens/base64
   * @param {string} str
   * @param {string|undefined} type mimetype
   * @returns {string} base64
   */
  function toBase64(str, type) {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    str = String(str);
    if (/[^\0-\xFF]/.test(str)) {
      // Note: no need to special-case astral symbols here, as surrogates are
      // matched, and the input is supposed to only contain ASCII anyway.
      throw new Error(
        "The string to be encoded contains characters outside of the Latin1 range."
      );
    }
    let padding = str.length % 3,
      output = "",
      position = -1,
      a,
      b,
      c,
      buffer;
    // Make sure any padding is handled outside of the loop.
    let length = str.length - padding;

    while (++position < length) {
      // Read three bytes, i.e. 24 bits.
      a = str.charCodeAt(position) << 16;
      b = str.charCodeAt(++position) << 8;
      c = str.charCodeAt(++position);
      buffer = a + b + c;
      // Turn the 24 bits into four chunks of 6 bits each, and append the
      // matching character for each of them to the output.
      output +=
        charset.charAt((buffer >> 18) & 0x3f) +
        charset.charAt((buffer >> 12) & 0x3f) +
        charset.charAt((buffer >> 6) & 0x3f) +
        charset.charAt(buffer & 0x3f);
    }

    if (padding == 2) {
      a = str.charCodeAt(position) << 8;
      b = str.charCodeAt(++position);
      buffer = a + b;
      output +=
        charset.charAt(buffer >> 10) +
        charset.charAt((buffer >> 4) & 0x3f) +
        charset.charAt((buffer << 2) & 0x3f) +
        "=";
    } else if (padding == 1) {
      buffer = str.charCodeAt(position);
      output +=
        charset.charAt(buffer >> 2) + charset.charAt((buffer << 4) & 0x3f) + "==";
    }

    if (type) {
      return "data:" + type + ";base64," + output;
    } else {
      return output;
    }
  }
  /**
   * https://github.com/mathiasbynens/base64
   * @param {string} str base64
   * @returns {string}
   */
  function fromBase64(str) {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    str = String(str)
      .replace(/^data:([A-Za-z-+\/]+);[A-Za-z0-9]+,/, "")
      .replace(/[\t\n\f\r ]/g, "");
    let length = str.length;
    if (length % 4 == 0) {
      str = str.replace(/==?$/, "");
      length = str.length;
    }
    // http://whatwg.org/C#alphanumeric-ascii-characters
    if (length % 4 == 1 || /[^+a-zA-Z0-9/]/.test(str)) {
      throw new Error(
        "Invalid character: the string to be decoded is not correctly encoded."
      );
    }
    let bitCounter = 0,
      bitStorage,
      buffer,
      output = "",
      position = -1;
    while (++position < length) {
      buffer = charset.indexOf(str.charAt(position));
      if (bitCounter % 4) {
        bitStorage = bitStorage * 64 + buffer;
      } else {
        bitStorage = buffer;
      }
      // Unless this is the first of a group of 4 characters…
      if (bitCounter++ % 4) {
        // …convert the first 8 bits to a single ASCII character.
        output += String.fromCharCode(
          0xff & (bitStorage >> ((-2 * bitCounter) & 6))
        );
      }
    }
    return output;
  }
  /**
   *
   * @param {string} from
   * @param {string} to
   * @returns {string}
   */
  function getRelativePath(from, to) {
    from = (from + "/").replace(/[\\\/]+/g, "/").replace(/^\.?\//, "");
    to = (to + "/").replace(/[\\\/]+/g, "/").replace(/^\.?\//, "");

    let result = "";
    while (!to.startsWith(from)) {
      result += "../";
      from = from.substring(0, from.lastIndexOf("/", from.length - 2) + 1);
    }
    result += to.substring(from.length, to.length);

    return result.replace(/[\\\/]$/, "");
  }
  /**
   *
   * @param {string} str
   * @returns {string}
   */
  function toHalfWidth(str) {
    return str
      .replace(/[！-～]/g, function (ch) {
        return String.fromCharCode(ch.charCodeAt(0) - 0xfee0);
      })
      .replace(/[^\S\r\n]/g, " ");
  }
  /**
   *
   * @param {string} str
   * @returns {string}
   */
  function toFullWidth(str) {
    return str
      .replace(/[!-~]/g, function (ch) {
        return String.fromCharCode(ch.charCodeAt(0) + 0xfee0);
      })
      .replace(/[^\S\r\n]/g, "　");
  }
  /**
   * encrypt string with xor cipher
   * @param {string} str
   * @param {string} salt
   * @returns {string}
   */
  function encryptString(str, salt) {
    if (salt.length === 0) {
      return str;
    }
    let res = "",
      i = 0;
    while (salt.length < str.length) {
      salt += salt;
    }
    while (i < str.length) {
      res += String.fromCharCode(str.charCodeAt(i) ^ salt.charCodeAt(i));
      i++;
    }
    return res;
  }
  /**
   * parse string command to array
   * @param {string} str
   * @returns {string[]}
   * @example
   * parseCommand("git commit -m \'update \\'many\\' features\' -f true")
   * // ['git', 'commit', '-m', "update \\'many\\' features", '-f', 'true']
   */
  function parseCommand(str) {
    let result = [],
      i = 0,
      tmp = str.replace(/\\'|\\"/g, "00"),
      bracket = null,
      part = "";
    while (i < str.length) {
      if (!bracket) {
        if (tmp[i] === "'" || tmp[i] === '"') {
          bracket = str[i];
        } else if (tmp[i] === " ") {
          if (part !== "") {
            result.push(part);
            part = "";
          }
        } else {
          part += str[i];
        }
      } else {
        if (tmp[i] === bracket) {
          result.push(part);
          part = "";
          bracket = null;
        } else {
          part += str[i];
        }
      }
      i++;
    }
    if (part.trim() !== "") {
      result.push(part);
    }
    return result;
  }
  /**
   * parse query string in url.
   * @param {string} str
   * @returns {object}
   */
  function parseQueryString(str) {
    let parts = str.split("?").pop().split("&"),
      result = {};
    for (const part of parts) {
      const kv = part.split("=").map(decodeURIComponent);
      if (!result[kv[0]]) {
        result[kv[0]] = [decodeURIComponent(kv[1])];
      } else {
        result[kv[0]].push(decodeURIComponent(kv[1]));
      }
    }
    return result;
  }
  /**
   * parse $ + key in string  
   * dot notation supported
   * @param {string} str
   * @param {object} obj
   * @returns {string}
   * @example
   * const str = "${color.name} sky";
   * const obj = {color:{name:"blue"}};
   * parseTemplate(str, obj); // "blue sky"
   */
  function parseTemplate(str, obj) {
    return str.replace(/\$\{[^}]*?\}/g, function (item) {
      let target = obj,
        keys = item
          .substring(2, item.length - 1)
          .split(/\.|\[['"]?|['"]?\]/)
          .filter(Boolean),
        key = keys.pop();
      while (isObject(target) && keys.length > 0) {
        target = target[keys.shift()];
      }

      if (!isObject(target) && !isArray(target)) {
        return "";
      } else {
        return target[key];
      }
    });
  }
  /**
   *
   * @param {string} str
   * @returns {object}
   */
  function parsePath(str) {

    // normalize path
    // backslashes to slash
    // remove last slash
    // remove first dot
    str = str
      .replace(/[\\\/]+/g, "/")
      .replace(/\/$/, "")
      .replace(/^\.?\//, "");

    let dirs = str.split("/"),
      filename = "",
      basename = "",
      dirname = ".",
      extname = "";

    if (dirs.length > 0) {
      basename = dirs.pop();
      if (/\.[^\\\/.]+?$/.test(basename)) {
        extname = "." + basename.split(".").pop();
      }
      filename = basename.replace(new RegExp(extname + "$"), "");
    }

    if (dirs.length > 0) {
      dirname = dirs.join("/");
    }

    return {
      dirs,
      filename,
      basename,
      dirname,
      extname,
    };
  }

  // https://www.w3schools.com/html/html_entities.asp
  const HTML_ENTITIES = [
    ["&", "&amp;"],
    [" ", "&nbsp;"],
    ["<", "&lt;"],
    [">", "&gt;"],
    ['\"', "&quot;"],
    ["\'", "&apos;"],
    ["¢", "&cent;"],
    ["£", "&pound;"],
    ["¥", "&yen;"],
    ["€", "&euro;"],
    ["©", "&copy;"],
    ["®", "&reg;"],
  ];

  const ATTR_ENTITIES = [
    ["<", "&lt;"],
    [">", "&gt;"],
    ['\"', "&quot;"],
    ["\'", "&apos;"],
  ];

  function normalizeLineBreakers(str) {
    return str.replace(/\r\n/g, "\n");
  }

  function normalizeTag(str) {
    return str
      .replace(/^\</, "")
      .replace(/([^\<][!?/])?\>$/, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function isText(node) {
    return node.tag === null;
  }

  function findLastIndex(arr, func) {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (func(arr[i], i, arr)) {
        return i;
      }
    }
    return -1;
  }

  function encodeStr(str) {
    return encodeURIComponent(str);
  }

  function decodeStr(str) {
    return decodeURIComponent(str);
  }

  function escapeStr(str) {
    for (let i = 0; i < HTML_ENTITIES.length; i++) {
      str = str.replace(
        new RegExp(HTML_ENTITIES[i][0], "g"),
        HTML_ENTITIES[i][1]
      );
    }
    return str;
  }

  function unescapeStr(str) {
    for (let i = HTML_ENTITIES.length - 1; i >= 0; i--) {
      str = str.replace(
        new RegExp(HTML_ENTITIES[i][1], "g"),
        HTML_ENTITIES[i][0]
      );
    }
    return str;
  }

  function escapeAttr(str) {
    for (let i = 0; i < ATTR_ENTITIES.length; i++) {
      str = str.replace(
        new RegExp(ATTR_ENTITIES[i][0], "g"),
        ATTR_ENTITIES[i][1]
      );
    }
    return str;
  }

  function convertComments(str) {
    return str.replace(/<!--([\s\S]*?)-->/g, function (...args) {
      return `<!-->${encodeStr(args[1])}</!-->`;
    });
  }

  function encodeScripts(str) {
    return str.replace(
      /(<script(?:[\s\S]*?)>)([\s\S]*?)(<\/script>)/g,
      function (...args) {
        return `${args[1]}${encodeStr(args[2])}${args[3]}`;
      }
    );
  }

  function encodeContents(str) {
    return str.replace(/(>)([\s\S]*?)(<)/g, function (...args) {
      return `${args[1]}${escapeStr(args[2])}${args[3]}`;
    });
  }

  function encodeAttributes(str) {
    function func(...args) {
      return `=${encodeStr(args[1])} `;
    }
    return str.replace(/\='([^'>]*?)'/g, func).replace(/\="([^">]*?)"/g, func);
  }

  function parseTag(str) {
    let arr = normalizeTag(str).split(/\s/);
    let result = {};
    result.tag = arr[0] || "";
    result.closer = null;
    result.content = null;
    result.attributes = {};
    result.children = [];
    result.isClosing = /^\//.test(result.tag);
    result.isClosed = result.isClosing;
    result.tag = result.tag.replace(/^\//, "");

    for (let i = 1; i < arr.length; i++) {
      let [key, value] = arr[i].split("=");
      if (key.length > 0) {
        if (typeof value === "string") {
          // escape quotation marks in attribute value
          result.attributes[key] = decodeStr(value);
        } else {
          // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes
          // the values "true" and "false" are not allowed on boolean attributes.
          // to represent a false value, the attribute has to be omitted altogether.
          result.attributes[key] = true;
        }
      }
    }

    return result;
  }

  /**
   * 
   * @param {string} str 
   * @returns {object}
   */
  function strToDom(str) {
    str = encodeAttributes(
      encodeContents(encodeScripts(convertComments(normalizeLineBreakers(str))))
    );

    let offset = 0,
      re = /<[^>]*?>/g,
      match,
      children = [],
      nodes = [],
      obj;

    while ((match = re.exec(str))) {
      // read text content
      let content = str.substring(offset, match.index).trim();
      if (content.length > 0) {
        obj = {
          // isClosed: true,
          // isClosing: false,
          tag: null,
          closer: null,
          content: unescapeStr(content),
          attributes: {},
          children: [],
        };

        children.push(obj);
      }

      // read tag
      obj = parseTag(match[0]);
      if (!obj.isClosing) {
        // tag is opening tag
        children.push(obj);
        nodes.push(obj);
      } else {
        // tag is closing tag
        // add children to tag
        let i = findLastIndex(children, function (item) {
          return !item.isClosed && item.tag === obj.tag;
        });

        if (i > -1) {
          children[i].isClosed = true;
          children[i].children = children.splice(i + 1, children.length - i + 1);

          // decode contents of the scripts and comments
          if (["script", "!--"].indexOf(children[i].tag) > -1) {
            for (let j = 0; j < children[i].children.length; j++) {
              if (isText(children[i].children[j])) {
                children[i].children[j].content = decodeStr(
                  children[i].children[j].content
                );
              }
            }
          }
        }
      }

      offset = re.lastIndex;
    }

    // read last content
    let lastContent = str.substring(offset).trim();
    if (lastContent.length > 0) {
      obj = {
        // isClosed: true,
        // isClosing: false,
        tag: null,
        closer: null,
        content: unescapeStr(lastContent),
        attributes: {},
        children: [],
      };

      children.push(obj);
    }

    for (let node of nodes) {
      if (node.tag.toUpperCase() === "!DOCTYPE") {
        // html doctype declaration
        // https://www.w3schools.com/tags/tag_doctype.ASP
        node.closer = "";
      } else if (node.tag.toLowerCase() === "?xml") {
        // xml Prolog
        // <?xml version="1.0" encoding="utf-8"?>
        // https://www.w3schools.com/xml/xml_syntax.asp
        node.closer = "?";
      } else if (node.tag === "!--") {
        // html comment
        // https://www.w3schools.com/tags/tag_comment.asp
        node.closer = "--";
      } else if (!node.isClosed) {
        // self-closing tag, empty tag
        // likes <img ... />
        // required for xhtml
        node.closer = " /";
      }

      // remove unused attributes
      delete node.isClosed;
      delete node.isClosing;
    }

    return {
      tag: null,
      closer: null,
      content: null,
      attributes: {},
      children: children,
    };
  }

  function objToAttr(obj) {
    let result = "";
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === "string") {
        result += ` ${k}="${escapeAttr(v)}"`;
      } else if (v === true) {
        result += ` ${k}`;
      }
    }
    return result;
  }
  /**
   * 
   * @param {object} obj 
   * @returns {string}
   */
  function domToStr(obj) {
    const { tag, closer, attributes, content, children } = obj;
    let result = "";

    // node
    if (typeof tag === "string") {
      result += `<${tag}`;

      if (typeof attributes === "object") {
        result += objToAttr(attributes);
      }

      if (typeof closer !== "string") {
        result += ">";
      }

      if (Array.isArray(children)) {
        for (const child of children) {
          result += domToStr(child);
        }
      }

      if (typeof closer === "string") {
        result += `${closer}>`;
      } else {
        result += `</${tag}>`;
      }
    } // text content
    else if (typeof content === "string") {
      result = content;
    } // root Node
    else {
      if (Array.isArray(children)) {
        for (const child of children) {
          result += domToStr(child);
        }
      }
    }

    return result;
  }

  exports.compareObject = compareObject;
  exports.compareString = compareString;
  exports.copyObject = copyObject;
  exports.createArray = createArray;
  exports.domToStr = domToStr;
  exports.encryptString = encryptString;
  exports.fromBase64 = fromBase64;
  exports.generateObjectId = generateObjectId;
  exports.generateRandomNumber = generateRandomNumber;
  exports.generateRandomString = generateRandomString;
  exports.generateUUID = generateUUID;
  exports.getBezierPoint = getBezierPoint;
  exports.getClampedNumber = getClampedNumber;
  exports.getContainedNumber = getContainedNumber;
  exports.getContainedSize = getContainedSize;
  exports.getCoveredSize = getCoveredSize;
  exports.getMaxValue = getMaxValue;
  exports.getMeanValue = getMeanValue;
  exports.getMinValue = getMinValue;
  exports.getModeValue = getModeValue;
  exports.getRandomValue = getRandomValue;
  exports.getRelativePath = getRelativePath;
  exports.groupByKey = groupByKey;
  exports.isArray = isArray;
  exports.isBoolean = isBoolean;
  exports.isBooleanArray = isBooleanArray;
  exports.isEmpty = isEmpty;
  exports.isEmptyArray = isEmptyArray;
  exports.isEmptyObject = isEmptyObject;
  exports.isEmptyString = isEmptyString;
  exports.isFunction = isFunction;
  exports.isNull = isNull;
  exports.isNumber = isNumber;
  exports.isNumberArray = isNumberArray;
  exports.isNumeric = isNumeric;
  exports.isObject = isObject;
  exports.isObjectArray = isObjectArray;
  exports.isSameType = isSameType;
  exports.isString = isString;
  exports.isStringArray = isStringArray;
  exports.isUndefined = isUndefined;
  exports.objectEntries = objectEntries;
  exports.parseCommand = parseCommand;
  exports.parsePath = parsePath;
  exports.parseQueryString = parseQueryString;
  exports.parseTemplate = parseTemplate;
  exports.promiseAll = promiseAll;
  exports.queryObject = queryObject;
  exports.setAnimation = setAnimation;
  exports.shuffleArray = shuffleArray;
  exports.sortArray = sortArray;
  exports.sortBy = sortBy;
  exports.splitFloat = splitFloat;
  exports.splitInt = splitInt;
  exports.spreadArray = spreadArray;
  exports.strToDom = strToDom;
  exports.toBase64 = toBase64;
  exports.toFullWidth = toFullWidth;
  exports.toHalfWidth = toHalfWidth;
  exports.updateObject = updateObject;
  exports.wait = wait;

}));
