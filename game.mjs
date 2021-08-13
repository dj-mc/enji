import core from './engine-core/core.mjs';
import Rectangle from './rigid-bodies/rectangle.mjs';
import Vector2d from './lib/vector2d.mjs';

const scene = {
  width: core.width,
  height: core.height,
  up: new Rectangle(new Vector2d(this.width / 2, 0), this.width, 3),
  down: new Rectangle(new Vector2d(this.width / 2, this.height), this.width, 3),
  left: new Rectangle(new Vector2d(0, this.height / 2), 3, this.height),
  right: new Rectangle(new Vector2d(this.width, this.height / 2), 3, this.height)
};

export default scene;
