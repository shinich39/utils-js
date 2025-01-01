"use strict";

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
    d = getBezierPoint(data, currentTime / time, currentTime);

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

export { getBezierPoint, setAnimation };
