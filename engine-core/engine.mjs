import CurrentState from './state.mjs';

class Engine {
  constructor(options) {
    // Canvas size
    this.width = options.width;
    this.height = options.height;

    // Grab canvas and set it up
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Object persistence
    CurrentState.collection = options.collection.slice();
    // Index of current object selected
    CurrentState.obj_idx = options.obj_idx;

    // Frame/sec
    this.lag_time = 0;
    this.frame_rate = 60;
    this.frame_time = 1 / this.frame_rate;
    this.ms_per_frame = 1000 * this.frame_time;

    // Track time
    this.current_time = null;
    this.elapsed_time = null;
    this.previous_time = Date.now();
  }

  draw_collection() {
    this.context.clearRect(0, 0, this.width, this.height);
    for (let i = 0; i < CurrentState.objs_len; i++) {
      this.context.strokeStyle = CurrentState.obj_idx === i ? 'red' : 'blue';
      CurrentState.collection[i].draw_shape(this.context);
    }
  }

  echo_collection() {
    const i = CurrentState.obj_idx;
    const ui = document.querySelector('#echo');
    if (0 < CurrentState.objs_len) {
      ui.textContent = `
            \r\nobj_idx: ${i}
            \r\ntype: ${CurrentState.collection[i].shape}
            \r\nx: ${CurrentState.collection[i].center.x.toPrecision(3)}
            \r\ny: ${CurrentState.collection[i].center.y.toPrecision(3)}
            \r\nangle: ${CurrentState.collection[i].angle.toPrecision(3)}
            `;
    } else if (0 === CurrentState.objs_len) ui.textContent = 'No objects';
  }

  update_collection_ctx() {
    for (let i = 0; i < CurrentState.objs_len; i++) {
      CurrentState.collection[i].update_gravity(this.context);
    }
  }

  run_engine_cycle() {
    requestAnimationFrame(() => {
      this.run_engine_cycle(); // Game loop
    });
    // Calculate lag_time
    this.current_time = Date.now();
    this.elapsed_time = this.current_time - this.previous_time;
    this.previous_time = this.current_time;
    this.lag_time += this.elapsed_time;
    // Ensure update frequency matches fps
    while (this.lag_time >= this.ms_per_frame) {
      this.lag_time -= this.ms_per_frame;
      this.update_collection_ctx();
    }
    this.draw_collection();
    this.echo_collection();
  }

  init_engine() {
    console.log('Initializing engine...');
    this.run_engine_cycle();
  }
}

export default Engine;
