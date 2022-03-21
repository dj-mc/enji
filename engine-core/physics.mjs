import core from './core.mjs';

class Physics {
  constructor() {}
  collision() {
    for (let i = 5; i < core.objs_len; i++) {
      for (let j = i + 1; j < core.objs_len; j++) {
        if (core.collection[i].bound_test(core.collection[j])) {
          core.context.strokeStyle = 'green';
          core.collection[i].draw_shape(core.context);
          core.collection[j].draw_shape(core.context);
        }
      }
    }
  }
}

export default Physics;
