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
    this.collection = options.collection.slice();
    // Index of current object selected
    this.obj_idx = options.obj_idx;

    // Frame/sec
    this.lag_time = 0;
    this.frame_rate = 60;
    this.frame_time = 1 / this.frame_rate;
    this.ms_per_frame = 1000 * this.frame_time;

    // Track time
    this.current_time = null;
    this.elasped_time = null;
    this.previous_time = Date.now();
  }

  get objs_len() {
    return this.collection.length;
  }

  get current_obj() {
    return this.collection[this.obj_idx];
  }

  set_obj_idx(idx = 0) {
    try {
      if (this.objs_len === 0) {
        this.obj_idx = 0;
        return;
      } else if (0 <= idx && idx <= this.objs_len - 1) {
        this.obj_idx = idx;
        return;
      } else {
        throw new Error(`${idx} isn't between 0 and ${this.objs_len - 1}`);
      }
    } catch (err) {
      console.error('Uknown error!', err);
    }
  }

  append_obj(obj) {
    this.collection.push(obj);
  }

  delete_obj(idx) {
    if (this.collection[idx]) {
      let new_col = this.collection.slice();
      new_col.splice(idx, 1);
      this.collection = new_col.slice();
      if (0 <= this.obj_idx - 1) this.obj_idx = this.obj_idx - 1;
    }
  }

  clear_collection() {
    this.collection = [];
  }

  draw_collection() {
    this.context.clearRect(0, 0, this.width, this.height);
    for (let i = 0; i < this.objs_len; i++) {
      this.context.strokeStyle = this.obj_idx === i ? 'red' : 'blue';
      this.collection[i].draw_shape(this.context);
    }
  }

  echo_collection() {
    const ui = document.querySelector('#echo');
    if (0 < this.objs_len) {
      ui.textContent = `
      \r\nobj_idx: ${this.obj_idx}
      \r\ntype: ${this.collection[this.obj_idx].shape}
      \r\nx: ${this.collection[this.obj_idx].center.x.toPrecision(3)}
      \r\ny: ${this.collection[this.obj_idx].center.y.toPrecision(3)}
      \r\nangle: ${this.collection[this.obj_idx].angle.toPrecision(3)}
      `;
    } else if (0 === this.objs_len) ui.textContent = 'No objects';
  }

  update_collection_ctx() {
    for (let i = 0; i < this.objs_len; i++) {
      this.collection[i].update_gravity(this.context);
    }
  }

  run_engine_cycle() {
    requestAnimationFrame(() => {
      this.run_engine_cycle(); // Game loop
    });
    // Calculate lag_time
    this.current_time = Date.now();
    this.elasped_time = this.current_time - this.previous_time;
    this.previous_time = this.current_time;
    this.lag_time += this.elasped_time;
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
