import core from '../engine-core/core.mjs';
import Vector2d from '../lib/vector2d.mjs';

class RigidShape {
  constructor(center = new Vector2d(0, 0)) {
    this.angle = 0;
    this.center = center;
  }

  init_shape() {
    // This could be bad. Better solution: call this automatically during
    // construction time?
    core.append_obj(this);
  }

  update_gravity() {
    // Canvas origin (0,0) starts at top left-hand corner, so as y becomes more
    // positive, the cavas is traced downward along the y-axis
    if (this.center.y < core.height && this.fixed === false) {
      this.move_towards(new Vector2d(0, 1));
    }
  }
}

export default RigidShape;
