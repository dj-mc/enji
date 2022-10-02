import core_options from './options.mjs';

class State {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.collection = [];
    this.obj_idx = 0; // Index of current object selected in UI
  }

  get objs_len() {
    return this.collection.length;
  }

  get current_obj() {
    return this.collection[this.obj_idx];
  }

  set_obj_idx(idx = 0) {
    if (this.objs_len === 0) {
      this.obj_idx = 0;
      return;
    } else if (0 <= idx && idx <= this.objs_len - 1) {
      this.obj_idx = idx;
      return;
    } else {
      return;
    }
  }

  append_obj(obj) {
    this.collection.push(obj);
  }

  delete_obj(idx) {
    if (this.collection[idx]) {
      let new_collection = this.collection.slice();
      new_collection.splice(idx, 1);
      this.collection = new_collection.slice();
      if (0 <= this.obj_idx - 1) this.obj_idx = this.obj_idx - 1;
    }
  }

  clear_collection() {
    this.collection = [];
  }

  draw_collection() {
    this.context.clearRect(0, 0, core_options.width, core_options.height);
    for (let i = 0; i < this.objs_len; i++) {
      this.context.strokeStyle = this.obj_idx === i ? 'red' : 'blue';
      this.collection[i].draw_shape(this.context);
    }
  }

  echo_collection() {
    const i = this.obj_idx;
    const ui = document.querySelector('#echo');
    if (0 < this.objs_len) {
      ui.textContent = `
            \r\nobj_idx: ${i}
            \r\ntype: ${this.collection[i].shape}
            \r\nx: ${this.collection[i].center.x.toPrecision(3)}
            \r\ny: ${this.collection[i].center.y.toPrecision(3)}
            \r\nangle: ${this.collection[i].angle.toPrecision(3)}
            `;
    } else if (0 === this.objs_len) ui.textContent = 'No objects';
  }

  update_collection_ctx() {
    for (let i = 0; i < this.objs_len; i++) {
      this.collection[i].update_gravity(this.context);
    }
  }
}

const CurrentState = new State();

export default CurrentState;
