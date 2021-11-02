class Vector2d {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // Values

  get len() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
  get normalized() {
    const L = this.len;
    if (L > 0) return new Vector2d(this.x / L, this.y / L);
  }
  distance(vect) {
    const x = this.x - vect.x;
    const y = this.y - vect.y;
    return Math.sqrt(x ** 2 + y ** 2);
  }
  dot_product(vect) {
    return this.x * vect.x + this.y * vect.y;
  }
  cross_product(vect) {
    return this.x * vect.y - this.y * vect.x;
  }

  // new Vector2d()

  add(vect) {
    return new Vector2d(this.x + vect.x, this.y + vect.y);
  }
  subtract(vect) {
    return new Vector2d(this.x - vect.x, this.y - vect.y);
  }
  scalar(scale) {
    return new Vector2d(scale * this.x, scale * this.y);
  }
  rotate(center, angle) {
    const r = [];
    const x = this.x - center.x;
    const y = this.y - center.y;
    r[0] = x * Math.cos(angle) - y * Math.sin(angle);
    r[1] = x * Math.sin(angle) + y * Math.cos(angle);
    r[0] += center.x;
    r[1] += center.y;
    return new Vector2d(r[0], r[1]);
  }
}

// Tests

try {
  function assert_eq(a, b) {
    if (a !== b) {
      throw new Error(`${a} !== ${b}`);
    }
  }

  const vect = new Vector2d(-3, 4);

  assert_eq(vect.len, 5);
  assert_eq(vect.normalized.x, -0.6);
  assert_eq(vect.normalized.y, 0.8);

  const other_v = new Vector2d(-4, 3);

  assert_eq(vect.add(other_v).x, new Vector2d(-7, 7).x);
  assert_eq(vect.add(other_v).y, new Vector2d(-7, 7).y);
  assert_eq(vect.distance(other_v), Math.sqrt(2));
} catch (err) {
  console.error(err);
}

export default Vector2d;
