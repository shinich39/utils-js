"use strict";

import { isObject, isArray } from "./type.js";

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
    if (isObject(value)) {
      result[key] = copyObject(value);
    } else {
      result[key] = value;
    }
  }
  return result;
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

export { copyObject, groupByKey, queryObject, updateObject };
