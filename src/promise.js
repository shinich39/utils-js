"use strict";

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

export { wait, promiseAll };
