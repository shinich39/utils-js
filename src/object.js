"use strict";

import { isObject, isArray } from "./type.js";

/**
 * Deep copy
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
    if (isObject(value)) {
      result[key] = copyObject(value);
    } else {
      result[key] = value;
    }
  }
  return result;
}
/**
 * Array to object
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
 * Query operator list:
 * $and, $nand, $or, $nor, $in, $nin, $gt, $gte, $lt, $lte, $eq, $ne, $exists, $fn, $re
 * https://www.mongodb.com/docs/manual/tutorial/query-documents/
 * @param {object} obj
 * @param {object} qry
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

export { copyObject, groupByKey, queryObject };
