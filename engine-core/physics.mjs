import CurrentState from './state.mjs';

class Physics {
  constructor() {}

  collision() {
    // 5 = borders + cursor
    for (let i = 5; i < CurrentState.objs_len; i++) {
      for (let j = i + 1; j < CurrentState.objs_len; j++) {
        if (CurrentState.collection[i].bound_test(CurrentState.collection[j])) {
          CurrentState.context.strokeStyle = 'green';
          console.log('Found collision');
          CurrentState.collection[i].draw_shape(CurrentState.context);
          CurrentState.collection[j].draw_shape(CurrentState.context);
        }
      }
    }
  }
}

const phys = new Physics();

export { phys };
