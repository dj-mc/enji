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
      console.log('Pressed F');
      let r = new Rectangle(
        new Vector2d(CurrentState.current_obj.center.x, CurrentState.current_obj.center.y),
        Math.random() * 30 + 10,
        Math.random() * 30 + 10
      );
      r.init_shape();
      break;
    case 'KeyG':
      console.log('Pressed G');
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

    // Toggle fixture (gravity) of selected object
    case 'KeyH':
      CurrentState.current_obj.is_fixed = CurrentState.current_obj.is_fixed === true ? false : true;
      break;

    // Selection
    case 'ArrowUp':
      console.log('Pressed ArrowUp');
      CurrentState.set_obj_idx(CurrentState.obj_idx + 1);
      break;
    case 'ArrowDown':
      console.log('Pressed ArrowDown');
      CurrentState.set_obj_idx(CurrentState.obj_idx - 1);
      break;
    case 'ArrowLeft':
      console.log('Pressed ArrowLeft');
      CurrentState.set_obj_idx(0);
      break;
    case 'ArrowRight':
      console.log('Pressed ArrowRight');
      CurrentState.set_obj_idx(CurrentState.objs_len - 1);
      break;
  }

  // Number keys 0 to 9
  if (keyWhich >= 48 && keyWhich <= 57) {
    let minus48 = keyWhich - 48;
    console.log(`Pressed ${minus48}`);
    if (minus48 < CurrentState.objs_len) {
      CurrentState.set_obj_idx(minus48);
    }
  }

  console.log(CurrentState.objs_len);
};

export default key_down_e;
