import core from '../engine-core/core.mjs';
import Vector2d from '../lib/vector2d.mjs';

class RigidShape {
  constructor(center = new Vector2d(0, 0)) {
    this.angle = 0;
    this.center = center;
    this.init_obj = () => {
      core.append_obj(this);
    };
  }
}

export default RigidShape;
