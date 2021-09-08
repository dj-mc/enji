import Engine from './engine.mjs';
import Rectangle from '../rigid-bodies/rectangle.mjs';
import Vector2d from '../lib/vector2d.mjs';

const width = 800;
const height = 450;
const cursor = new Rectangle(new Vector2d(width / 2, height / 2), 2, 2, 0);

export const core_options = {
  width: width,
  height: height,
  collection: [cursor],
  obj_idx: 0
};

const core = new Engine(core_options);

export default core;
