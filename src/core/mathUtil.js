export default class MathUtil {
  static clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  static divOr0(a, b) {
    if (a === 0 && b === 0) return 0;
    return a / b;
  }

  static lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }

  static randomInt(minInclusive, maxExclusive) {
    return Math.floor(
      Math.random() * (maxExclusive - minInclusive) + minInclusive
    );
  }
}
