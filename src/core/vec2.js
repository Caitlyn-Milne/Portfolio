import MathUtil from "./mathUtil";

export default class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distance(other) {
    var diffX = this.x - other.x;
    var diffY = this.y - other.y;
    return Math.sqrt(diffX * diffX + diffY * diffY);
  }

  add(other) {
    this.x = this.x + other.x;
    this.y = this.y + other.y;
    return this;
  }

  subtract(other) {
    this.x = this.x - other.x;
    this.y = this.y - other.y;
    return this;
  }

  divide(other) {
    if (other instanceof Vec2) {
      this.x = MathUtil.divOr0(this.x, other.x);
      this.y = MathUtil.divOr0(this.y, other.y);
    }
    if (typeof other == "number") {
      this.x = MathUtil.divOr0(this.x, other);
      this.y = MathUtil.divOr0(this.y, other);
    }
    return this;
  }

  multiply(other) {
    if (other instanceof Vec2) {
      this.x = this.x * other.x;
      this.y = this.y * other.y;
    }
    if (typeof other == "number") {
      this.x = this.x * other;
      this.y = this.y * other;
    }
    return this;
  }

  magnitudeSquared() {
    return this.x * this.x + this.y * this.y;
  }

  magnitude() {
    return Math.sqrt(this.magnitudeSquared());
  }

  normalize() {
    return this.divide(this.magnitude());
  }

  lerp(other, amount) {
    return new Vec2(
      MathUtil.lerp(this.x, other.x, amount),
      MathUtil.lerp(this.y, other.y, amount)
    );
  }

  copy() {
    return new Vec2(this.x, this.y);
  }

  static zero() {
    return new Vec2(0, 0);
  }
}
