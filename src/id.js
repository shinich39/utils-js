"use strict";

let __index = 0;

/**
 * Generate object id
 * https://www.mongodb.com/docs/manual/reference/method/ObjectId/
 * @param {number} time unix time: Date.now() / 1000
 * @param {number} index
 * @returns {string}
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
    Math.floor(time).toString(16) +
    "xxxxxxxxxx".replace(/x/g, function (v) {
      return Math.floor(Math.random() * 16).toString(16);
    }) +
    Math.floor(index).toString(16).padStart(6, "0")
  );
}
/**
 * Generate uuid v4
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

export { generateObjectId, generateUUID };
