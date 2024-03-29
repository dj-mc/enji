import load_scene from './game.mjs';
import CurrentState from './engine-core/state.mjs';
import Circle from '../rigid-bodies/circle.mjs';
import Rectangle from '../rigid-bodies/rectangle.mjs';
import Vector2d from '../lib/vector2d.mjs';

const key_down_e = function (e) {
  let keyCode = e.code;
  let keyWhich = e.which;

  switch (keyCode) {
    // Shapes
    case 'KeyF':
      let r = new Rectangle(
        new Vector2d(CurrentState.current_obj.center.x, CurrentState.current_obj.center.y),
        Math.random() * 30 + 10,
        Math.random() * 30 + 10
      );
      r.init_shape();
      break;
    case 'KeyG':
      let c = new Circle(
        new Vector2d(CurrentState.current_obj.center.x, CurrentState.current_obj.center.y),
        Math.random() * 10 + 20
      );
      c.init_shape();
      break;

    // Movement
    case 'KeyW':
      CurrentState.current_obj.move_towards(new Vector2d(0, -10));
      break;
    case 'KeyA':
      CurrentState.current_obj.move_towards(new Vector2d(-10, 0));
      break;
    case 'KeyS':
      CurrentState.current_obj.move_towards(new Vector2d(0, 10));
      break;
    case 'KeyD':
      CurrentState.current_obj.move_towards(new Vector2d(10, 0));
      break;

    // Rotation
    case 'KeyQ':
      CurrentState.current_obj.rotate_shape(-0.1);
      break;
    case 'KeyE':
      CurrentState.current_obj.rotate_shape(0.1);
      break;

    // Reset
    case 'KeyR':
      load_scene();
      break;

    // Delete
    case 'KeyT':
      CurrentState.delete_obj(CurrentState.obj_idx);
      break;

    // Selection
    case 'ArrowUp':
      CurrentState.set_obj_idx(CurrentState.obj_idx + 1);
      break;
    case 'ArrowDown':
      CurrentState.set_obj_idx(CurrentState.obj_idx - 1);
      break;
    case 'ArrowLeft':
      CurrentState.set_obj_idx(0);
      break;
    case 'ArrowRight':
      CurrentState.set_obj_idx(CurrentState.objs_len - 1);
      break;
  }

  // Number keys 0 to 9
  if (keyWhich >= 48 && keyWhich <= 57) {
    let minus48 = keyWhich - 48;
    if (minus48 < CurrentState.objs_len) {
      CurrentState.set_obj_idx(minus48);
    }
  }
};

export default key_down_e;
