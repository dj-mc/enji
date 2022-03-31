class State {
  constructor() {
    // Object persistence
    this.collection = [];
    // Index of current object selected
    this.obj_idx = 0;
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
      console.error('Unknown error!', err);
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
}

const CurrentState = new State();

export default CurrentState;