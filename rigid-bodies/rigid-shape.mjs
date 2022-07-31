import Vector2d from '../lib/vector2d.mjs';
import CurrentState from '../engine-core/state.mjs';
// import core_options from '../engine-core/options.mjs';

class RigidShape {
  constructor(center = new Vector2d(0, 0)) {
    this.angle = 0;
    this.center = center;
    this.bound_radius = 0;
  }

  init_shape() {
    CurrentState.append_obj(this);
  }

  update_gravity() {
    // Canvas origin (0,0) starts at top left-hand corner, so as y becomes more
    // positive, the canvas is traced downward along the y-axis
    // if (this.center.y < core_options.height) {
    //   this.move_towards(new Vector2d(0, 1));
    // }
  }

  bound_test(other_shape) {
    const overlapping = true;
    const sum_of_radii = other_shape.bound_radius + this.bound_radius;
    const distance_between = other_shape.center.subtract(this.center).v_length;
    if (sum_of_radii < distance_between) {
      return !overlapping;
    }
    return overlapping;
  }
}

export default RigidShape;
