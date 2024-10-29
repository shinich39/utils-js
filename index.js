"use strict";

const BASE64_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const TYPE_PRIORITY = [
  isUndefined,
  isNull,
  isBoolean,
  isNumber,
  isString,
  isObject,
  isArray,
  isFunction,
];
let __uniq__ = 0;

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
    obj.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") === ""
  ); // trim
}
/**
 *
 * @param {*} obj
 * @returns {boolean}
 */
function isObject(obj) {
  return typeof obj === "object" && obj !== null;
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
  return (isNull(objA) && isNull(objB)) || (typeof objA === typeof objB && objA.constructor === objB.constructor);
}
/**
 *
 * @param {number} min
 * @param {number} max
 * @returns {number} min <= n < max
 */
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
/**
 * 
 * @param {array} data [[x, y], ...]
 * @param {number} time value between 0 and 1
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
 * @param {array} data [[x, y], ...]
 * @param {function} cb function([x, y], ms, timoutId|null)
 * @param {number} time default 1000
 * @param {number} tick default 10
 */
function setAnimation(data, cb, time, tick) {
  if (!time) {
    time = 1000;
  }
  if (!tick) {
    tick = 10;
  }
  let now = 0,
      d = getBezierPoint(data, now / time, now);

  cb(d, now, anim());

  function anim() {
    now += tick;
    d = getBezierPoint(data, now / time);
    return setTimeout(function() {
      if (now < time) {
        cb(d, now, anim());
      } else {
        cb(d, now, null);
      }
    }, tick);
  }
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
 * 
 * @param {string} path 
 * @returns {string}
 */
function getExtension(path) {
  return /\.[^\\\/]/.test(path) ? 
    "." + path.split(".").pop() : 
    "";
}
/**
 * 
 * @param {string} path 
 * @param {string|null} ext e.g. ".jpg", ".png",".txt" ...
 * @returns {string}
 */
function getFilename(path, ext) {
  if (typeof ext === "string") {
    path = path.replace(new RegExp(ext+"$"), "");
  }
  return path.replace(/[\\\/]$/, "").split(/[\\\/]/).pop();
}
/**
 * 
 * @param {string} path 
 * @returns {string}
 */
function getDirectoryPath(path) {
  return path
    .replace(/[^\\\/]+?[\\\/]?$/, "")
    .replace(/(.)[\\\/]$/, "$1") || ".";
}
/**
 * 
 * @param {string} from 
 * @param {string} to 
 * @returns {string}
 */
function getRelativePath(from, to) {
  from = from.replace(/[\\\/]/g, "/").replace(/^\.?\//, "");
  to = to.replace(/[\\\/]/g, "/").replace(/^\.?\//, "");

  if (!from.endsWith("/")) {
    from += "/";
  }
  if (!to.endsWith("/")) {
    to += "/";
  }

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
    .replace(/[^\S\r\n]/g, function (ch) {
      return " ";
    });
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
    .replace(/[^\S\r\n]/g, function (ch) {
      return "　";
    });
}
/**
 * Get diff between two strings.
 * @param {string} strA
 * @param {string} strB
 * @returns {{ acc: number, result: Array<{ type: number, value: string }> }}
 */
function compareString(strA, strB) {
  // Create DP
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

  // Match a to b
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

  // Write diffs
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
          prev.value = itemA + prev.value; // add to prev
        } else {
          res.push({ type: MATCH, value: itemA });
        }
        matches++;
        i--;
        j--;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
        if (prev && prev.type === INSERT) {
          prev.value = itemB + prev.value; // add to prev
        } else {
          res.push({ type: INSERT, value: itemB });
        }
        j--;
      } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
        if (prev && prev.type === DELETE) {
          prev.value = itemA + prev.value; // add to prev
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
 * Generate object id
 * @returns {string}
 */
function generateObjectId() {
  return (
    Math.floor(new Date().getTime() / 1000).toString(16) +
    "xxxxxx".replace(/x/g, function (v) {
      return Math.floor(Math.random() * 16).toString(16);
    }) +
    (__uniq__++).toString(16).padStart(6, "0")
  );
}
/**
 * Generate uuid v4
 * @returns {string}
 */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
/**
 * Encrypt string with xor cipher
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
 * Ref. https://github.com/mathiasbynens/base64
 * @param {string} str
 * @param {string|undefined} type mimetype
 * @returns {string} base64
 */
function toBase64(str, type) {
  str = String(str);
  if (/[^\0-\xFF]/.test(str)) {
    // Note: no need to special-case astral symbols here, as surrogates are
    // matched, and the input is supposed to only contain ASCII anyway.
    throw new Error(
      "The string to be encoded contains characters outside of the Latin1 range.",
    );
  }
  let padding = str.length % 3;
  let output = "";
  let position = -1;
  let a;
  let b;
  let c;
  let buffer;
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
      BASE64_CHARACTERS.charAt((buffer >> 18) & 0x3f) +
      BASE64_CHARACTERS.charAt((buffer >> 12) & 0x3f) +
      BASE64_CHARACTERS.charAt((buffer >> 6) & 0x3f) +
      BASE64_CHARACTERS.charAt(buffer & 0x3f);
  }

  if (padding == 2) {
    a = str.charCodeAt(position) << 8;
    b = str.charCodeAt(++position);
    buffer = a + b;
    output +=
      BASE64_CHARACTERS.charAt(buffer >> 10) +
      BASE64_CHARACTERS.charAt((buffer >> 4) & 0x3f) +
      BASE64_CHARACTERS.charAt((buffer << 2) & 0x3f) +
      "=";
  } else if (padding == 1) {
    buffer = str.charCodeAt(position);
    output +=
      BASE64_CHARACTERS.charAt(buffer >> 2) +
      BASE64_CHARACTERS.charAt((buffer << 4) & 0x3f) +
      "==";
  }

  return (type ? `data:${type};base64,` : "") + output;
}
/**
 * Ref. https://github.com/mathiasbynens/base64
 * @param {string} str base64
 * @returns {string}
 */
function fromBase64(str) {
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
      "Invalid character: the string to be decoded is not correctly encoded.",
    );
  }
  let bitCounter = 0;
  let bitStorage;
  let buffer;
  let output = "";
  let position = -1;
  while (++position < length) {
    buffer = BASE64_CHARACTERS.indexOf(str.charAt(position));
    bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
    // Unless this is the first of a group of 4 characters…
    if (bitCounter++ % 4) {
      // …convert the first 8 bits to a single ASCII character.
      output += String.fromCharCode(
        0xff & (bitStorage >> ((-2 * bitCounter) & 6)),
      );
    }
  }
  return output;
}
/**
 * Parse string command to array.
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
 * Parse query string in url.
 * @param {string} str
 * @returns {object}
 */
function parseQueryString(str) {
  const qs = str.indexOf("?") > -1 ? str.split("?").pop() : str;
  let result = {};
  for (const [key, value] of new URLSearchParams(qs).entries()) {
    if (!result[key]) {
      result[key] = [value];
    } else {
      result[key].push(value);
    }
  }
  return result;
}
/**
 * Parse $ + key in string.  
 * Dot notation supported.
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
    let target = obj;
    let keys = item.substring(2, item.length - 1)
      .split(/\.|\[['"]?|['"]?\]/)
      .filter(Boolean);
    let key = keys.pop();

    while(typeof target === "object" && keys.length > 0) {
      target = target[keys.shift()];
    }

    if (typeof target !== "object") {
      return "";
    }

    return target[key] || "";
  });
}
/**
 * Fill array to deepcopied value.
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
    return curr < prev ? curr : prev;
  }, arr[0] || 0);
}
/**
 * Get maximum value in array.
 * @param {number[]} arr
 * @returns {number}
 */
function getMaxValue(arr) {
  return arr.reduce(function (prev, curr) {
    return curr > prev ? curr : prev;
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
    seen[value] = seen[value] ? seen[value] + 1 : 1;
    if (seen[value] > maxCount) {
      maxValue = value;
      maxCount = seen[value];
    }
  }
  return maxValue;
}
/**
 * 
 * @param {*} a 
 * @param {*} b 
 * @returns {number}
 */
function compareObject(a, b) {
  const aIdx = TYPE_PRIORITY.findIndex(function (fn) {
    return fn(a);
  });

  const bIdx = TYPE_PRIORITY.findIndex(function (fn) {
    return fn(b);
  });

  if (aIdx !== bIdx) {
    return aIdx - bIdx;
  } else if (aIdx === 0 || aIdx === 1) {
    // undefined, null
    return 0;
  } else if (aIdx === 2) {
    // boolean
    return a !== b ? (a ? 1 : -1) : 0;
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
 * Sort array ascending order.  
 * Order of types:  
 * [undefined, null, boolean, number, string, object, array, function]
 * @param {array} arr
 * @param {boolean|undefined} desc descending
 * @returns {array}
 */
function sortArray(arr, desc) {
  desc = Boolean(desc);
  return arr.sort(function(a, b) {
    return desc ? !compareObject(a, b) : compareObject(a, b);
  });
}
/**
 * 
 * @param {object[]} arr 
 * @param {string|string[]} sorter ["name", "-age", "height"]
 * @returns 
 */
function sortObject(arr, sorter) {
  if (typeof sorter === "string") {
    sorter = sorter.split(" ").filter(Boolean);
  }
  return arr.sort(function(a, b) {
    for (const key of sorter) {
      const d = /^-/.test(key);
      const k = key.replace(/^-/, "");
      const r = compareObject(a[k], b[k]);
      if (r !== 0) {
        return d ? -r : r;
      }
    }
    return 0;
  });
}
/**
 * Ref. https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
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
  return arr[Math.floor(getRandomNumber(0, arr.length))];
}
/**
 *
 * @param {array[]} arr e.g. [[1,2,3],[4,5,6,7],[8,9,10]]
 * @returns {array}
 */
function spreadArray(arr) {
  function getFirstIndexes(a) {
    if (a.length < 1) {
      return;
    }
    const result = [];
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
    const result = [];
    for (let i = 0; i < a.length; i++) {
      result.push(a[i][indexes[i]]);
    }
    return result;
  }

  const result = [];
  let indexes = getFirstIndexes(arr);
  while (indexes) {
    const values = getValues(arr, indexes);
    result.push(values);
    indexes = getNextIndexes(arr, indexes);
  }
  return result;
}
/**
 * Deepcopy
 * @param {object|array} obj
 * @returns {object|array}
 */
function copyObject(obj) {
  const result = isArray(obj) ? [] : {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = isObject(value) && !isNull(value) ? copyObject(value) : value;
  }
  return result;
}
/**
 *
 * @param {object[]} arr
 * @param {string} key
 * @returns {object}
 */
function groupByKey(arr, key) {
  const group = {};
  for (const obj of arr) {
    if (!group[String(obj[key])]) {
      group[String(obj[key])] = [obj];
    } else {
      group[String(obj[key])].push(obj);
    }
  }
  return group;
}
/**
 * Query operator list:  
 * $and, $nand, $or, $nor, $in, $nin, $gt, $gte, $lt, $lte, $eq, $ne, $fn, $re  
 * https://www.mongodb.com/docs/manual/tutorial/query-documents/
 * @param {object} obj
 * @param {object} qry
 * @returns {boolean}
 */
function queryObject(obj, qry) {
  const QUERY_OPERATORS = {
    and: ["$and"],
    notAnd: ["$notAnd", "$nand"],
    or: ["$or"],
    notOr: ["$notOr", "$nor"],
    not: ["$not"],
    include: ["$include", "$in"],
    exclude: ["$exclude", "$nin"],
    greaterThan: ["$greaterThan", "$gt"],
    greaterThanOrEqual: ["$greaterThanOrEqual", "$gte"],
    lessThan: ["$lessThan", "$lt"],
    lessThanOrEqual: ["$lessThanOrEqual", "$lte"],
    equal: ["$equal", "$eq"],
    notEqual: ["$notEqual", "$neq", "$ne"],
    exists: ["$exists"],
    function: ["$function", "$func", "$fn"],
    regexp: ["$regexp", "$regex", "$re", "$reg"],
  };

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
    if (QUERY_OPERATORS.and.indexOf(o) > -1) {
      for (const v of q) {
        if (!A(d, v)) {
          return false;
        }
      }
      return true;
    } else if (QUERY_OPERATORS.notAnd.indexOf(o) > -1) {
      return !C(d, q, "$and");
    } else if (QUERY_OPERATORS.or.indexOf(o) > -1) {
      for (const v of q) {
        if (A(d, v)) {
          return true;
        }
      }
      return false;
    } else if (QUERY_OPERATORS.notOr.indexOf(o) > -1) {
      return !C(d, q, "$or");
    } else if (QUERY_OPERATORS.not.indexOf(o) > -1) {
      return !A(d, q);
    } else if (QUERY_OPERATORS.include.indexOf(o) > -1) {
      if (isArray(d)) {
        for (const v of d) {
          if (!C(v, q, "$include")) {
            return false;
          }
        }
        return true;
      } else {
        for (const v of q) {
          if (C(d, v, "$equal")) {
            return true;
          }
        }
        return false;
      }
    } else if (QUERY_OPERATORS.exclude.indexOf(o) > -1) {
      return !C(d, q, "$include");
    } else if (QUERY_OPERATORS.greaterThan.indexOf(o) > -1) {
      return d > q;
    } else if (QUERY_OPERATORS.greaterThanOrEqual.indexOf(o) > -1) {
      return d >= q;
    } else if (QUERY_OPERATORS.lessThan.indexOf(o) > -1) {
      return d < q;
    } else if (QUERY_OPERATORS.lessThanOrEqual.indexOf(o) > -1) {
      return d <= q;
    } else if (QUERY_OPERATORS.equal.indexOf(o) > -1) {
      if (isArray(d) && isArray(q)) {
        if (d.length !== q.length) {
          return false;
        }
        for (let i = 0; i < q.length; i++) {
          if (!C(d[i], q[i], "$equal")) {
            return false;
          }
        }
        return true;
      } else {
        return d === q;
      }
    } else if (QUERY_OPERATORS.notEqual.indexOf(o) > -1) {
      return !C(d, q, "$equal");
    } else if (QUERY_OPERATORS.exists.indexOf(o) > -1) {
      return (d !== null && d !== undefined) === Boolean(q);
    } else if (QUERY_OPERATORS.function.indexOf(o) > -1) {
      return q(d);
    } else if (QUERY_OPERATORS.regexp.indexOf(o) > -1) {
      return q.test(d);
    } else if (!isObject(d)) {
      return false;
    } else if (isObject(q)) {
      return A(d[o], q);
    } else {
      return C(d[o], q, "$equal");
    }
  }

  return A(obj, qry);
}
/**
 *
 * @param {{ width: number, height: number }} src source size
 * @param {{ width: number, height: number }} dst destination size
 * @returns {{width: number, height: number}}
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
 * @param {{ width: number, height: number }} src source size
 * @param {{ width: number, height: number }} dst destination size
 * @returns {{width: number, height: number}}
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
 * @param {number} delay ms
 * @returns {Promise<void>}
 */
function wait(delay) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, delay);
  });
}
/**
 * Ref. https://stackoverflow.com/questions/24586110/resolve-promises-one-after-another-i-e-in-sequence
 * @param {function[]} funcs The functions will return promise.
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

export {
  isBoolean,
  isNumber,
  isNumeric,
  isString,
  isEmptyString,
  isObject,
  isEmptyObject,
  isNull,
  isArray,
  isBooleanArray,
  isNumberArray,
  isStringArray,
  isObjectArray,
  isEmptyArray,
  isFunction,
  isEmpty,
  isSameType,
  getRandomNumber,
  getBezierPoint,
  setAnimation,
  generateObjectId,
  generateUUID,
  encryptString,
  toBase64,
  fromBase64,
  splitInt,
  splitFloat,
  getExtension,
  getFilename,
  getDirectoryPath,
  getRelativePath,
  toHalfWidth,
  toFullWidth,
  compareString,
  compareObject,
  parseCommand,
  parseQueryString,
  parseTemplate,
  getMinValue,
  getMaxValue,
  getMeanValue,
  getModeValue,
  getRandomValue,
  createArray,
  sortArray,
  sortObject,
  shuffleArray,
  spreadArray,
  copyObject,
  groupByKey,
  queryObject,
  getContainedSize,
  getCoveredSize,
  wait,
  promiseAll,
};
