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

    // Object persistence and index of current object selected
    this.collection = options.collection;
    this.obj_idx = options.obj_idx;
  }

  get objs_len() {
    return this.collection.length;
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
      console.error(err);
    }
  }

  append_obj(obj) {
    this.collection.push(obj);
  }

  delete_obj(idx) {
    if (this.collection[idx]) {
      this.collection = this.collection.slice(idx, 1);
    }
  }

  draw_collection() {
    this.context.clearRect(0, 0, this.width, this.height);
    for (let i = 0; i < this.objs_len; i++) {
      this.context.strokeStyle = this.obj_idx === i ? 'red' : 'blue';
      this.collection[i].draw_me(this.context);
    }
  }

  echo_collection() {
    const ui = document.querySelector('#echo');
    if (0 < this.objs_len) {
      ui.textContent = `
      obj_idx: ${this.obj_idx}
      \nX: ${this.collection[this.obj_idx].center.x.toPrecision(3)}
      \nY: ${this.collection[this.obj_idx].center.y.toPrecision(3)}
      `;
    } else if (0 === this.objs_len) ui.textContent = 'No objects';
  }

  run_engine_cycle() {
    requestAnimationFrame(() => {
      this.run_engine_cycle();
    });
    this.draw_collection();
    this.echo_collection();
  }

  init_engine() {
    console.log('Initializing engine...');
    this.run_engine_cycle();
  }
}

export default Engine;
