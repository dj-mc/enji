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
      CurrentState.update_collection_ctx();
    }
    CurrentState.draw_collection();
    CurrentState.echo_collection();
  }

  init_engine() {
    console.log('Initializing engine...');
    this.run_engine_cycle();
  }
}

export default Engine;
