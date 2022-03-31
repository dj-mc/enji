import Vector2d from '../lib/vector2d.mjs';
import CurrentState from '../engine-core/state.mjs';
import core_options from '../engine-core/options.mjs';

class RigidShape {
  constructor(center = new Vector2d(0, 0)) {
    this.angle = 0;
    this.center = center;
  }

  init_shape() {
    // This could be bad. Better solution: call this automatically during
    // construction time?
    CurrentState.append_obj(this);
  }

  update_gravity() {
    // Canvas origin (0,0) starts at top left-hand corner, so as y becomes more
    // positive, the canvas is traced downward along the y-axis
    if (this.center.y < core_options.height && this.is_fixed === false) {
      this.move_towards(new Vector2d(0, 1));
    }
  }
}

export default RigidShape;
