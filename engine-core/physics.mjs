import CurrentState from './state.mjs';

class Physics {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
  }
  collision() {
    for (let i = 5; i < CurrentState.objs_len; i++) {
      for (let j = i + 1; j < CurrentState.objs_len; j++) {
        if (CurrentState.collection[i].bound_test(CurrentState.collection[j])) {
          this.context.strokeStyle = 'green';
          CurrentState.collection[i].draw_shape(this.context);
          CurrentState.collection[j].draw_shape(this.context);
        }
      }
    }
  }
}

export default Physics;
