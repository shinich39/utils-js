"use strict";

/**
 *
 * @param {{ width: number, height: number }} src source size
 * @param {{ width: number, height: number }} dst destination size
 * @returns {{ width: number, height: number }}
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
 * @returns {{ width: number, height: number }}
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

export { getContainedSize, getCoveredSize };
