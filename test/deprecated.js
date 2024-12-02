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
// Example
const data = [[0, 0], [0.25, 1], [0.5, 1], [1, 1]];
const time = 1000; // ms
const tick = 10; // ms
const res = setAnimation(data, function([x, y], now, timer) {
  console.log(`${now}: ${x} ${y}`);
  // ...
  // 970: 0.9556682499999999 0.999973
  // 980: 0.970298 0.999992
  // 990: 0.9850747499999999 0.999999
  // 1000: 1 1
  
  if (!timer) {
    // end
  } else {
    // stop
    clearTimeout(timer);
  }
}, time, tick);
/**
 *
 * @param {string} path
 * @returns {string}
 */
function getExtension(path) {
  if (/\.[^\\\/.]+?$/.test(path)) {
    return "." + path.split(".").pop();
  } else {
    return "";
  }
}
/**
 *
 * @param {string} path
 * @param {string|null} ext e.g. ".jpg", ".png",".txt" ...
 * @returns {string}
 */
function getFilename(path, ext) {
  if (typeof ext === "string") {
    path = path.replace(new RegExp(ext + "$"), "");
  }
  return path
    .replace(/[\\\/]$/, "")
    .split(/[\\\/]/)
    .pop();
}
/**
 *
 * @param {string} path
 * @returns {string}
 */
function getDirectoryPath(path) {
  return path.replace(/[^\\\/]+[\\\/]?$/, "").replace(/[\\\/]+$/, "") || ".";
}
/**
 * Ref. https://github.com/mathiasbynens/base64
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
 * Ref. https://github.com/mathiasbynens/base64
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