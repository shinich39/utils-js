"use strict";

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
  isUndefined,
  isSameType,
};
