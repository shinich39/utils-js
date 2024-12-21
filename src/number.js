"use strict";

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

export { generateRandomNumber, getClampedNumber, getContainedNumber };
