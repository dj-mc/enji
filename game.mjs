import core from './engine-core/core.mjs';
import core_options from './engine-core/co.mjs';
import CurrentState from './engine-core/state.mjs';
import Rectangle from './rigid-bodies/rectangle.mjs';
import Vector2d from './lib/vector2d.mjs';

function load_core_options() {
  core.width = core_options.width;
  core.height = core_options.height;

  CurrentState.clear_collection();
  CurrentState.collection = core_options.collection.slice();
  CurrentState.obj_idx = core_options.obj_idx;
}

function load_borders() {
  const width = core_options.width;
  const height = core_options.height;

  const borders = {
    // Edge boundaries of scene
    n: new Rectangle(new Vector2d(width / 2, 0), width, 2),
    e: new Rectangle(new Vector2d(width, height / 2), 2, height),
    s: new Rectangle(new Vector2d(width / 2, height), width, 2),
    w: new Rectangle(new Vector2d(0, height / 2), 2, height)
  };

  Object.keys(borders).forEach((wall) => {
    borders[wall].init_shape();
  });
}

function load_scene() {
  load_core_options();
  load_borders();
}

export default load_scene;
