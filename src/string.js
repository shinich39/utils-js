"use strict";

import { isObject, isArray } from "./type.js";

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
    bitStorage;
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
  // Normalize
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

export {
  generateRandomString,
  splitInt,
  splitFloat,
  toBase64,
  fromBase64,
  getRelativePath,
  toHalfWidth,
  toFullWidth,
  encryptString,
  parseCommand,
  parseQueryString,
  parseTemplate,
  parsePath,
};
