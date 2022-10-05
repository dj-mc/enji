import Vector2d from './vector2d.mjs';

class CollisionData {
  // The normal vector of a collision is depicted below.
  // Its depth is measured start to end.
  // The direction of the normal vector implies we're using the
  // left shape's frame of reference.
  //     _____________
  //    |     .......|__________
  //    |     .      |         |
  //    |     .      |         |
  //    |     .normal|vector   |
  //    start *----->* end     |
  //    |     .depth is its distance
  //    |     .      |         |
  //    |     .......|_________|
  //    |____________|

  constructor() {
    this.depth = 0;
    this.normal_vector = new Vector2d(0, 0);
    this.start = new Vector2d(0, 0);
    this.end = new Vector2d(0, 0);
  }

  get_normal_vector() {
    return this.normal_vector;
  }
  set_normal_vector(in_normal_v) {
    this.normal_vector = in_normal_v;
  }

  get_depth() {
    return this.depth;
  }
  set_depth(in_depth) {
    this.depth = in_depth;
  }

  set_info(in_depth, in_normal_v, in_start) {
    this.depth = in_depth;
    this.normal_vector = in_normal_v;
    this.start = in_start;
    this.end = in_start.add(in_normal_v.scalar(in_depth));
  }

  change_direction() {
    // Multiply normal vector by -1
    this.normal_vector = this.get_normal_vector().scalar(-1);
    // Swap values of start with end
    const temp = this.start;
    this.start = this.end;
    this.end = temp;
  }
}

export default CollisionData;
