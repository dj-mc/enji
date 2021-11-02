import load_scene from './game.mjs';
import Circle from '../rigid-bodies/circle.mjs';
import Rectangle from '../rigid-bodies/rectangle.mjs';
import Vector2d from '../lib/vector2d.mjs';

// Design choices:
// Use an event handler where ecore is a parameter expecting a
// singleton instance of the Engine class (core).
// Or make key_down_e a method of Engine or its instance core?
// e.g. core.key_down_handler(e) or inside class Engine.

const key_down_e = function (e, ecore) {
  let keyCode = e.code;
  let keyWhich = e.which;

  switch (keyCode) {
    case 'KeyF':
      console.log('Pressed F');
      let r = new Rectangle(
        new Vector2d(ecore.current_obj.center.x, ecore.current_obj.center.y),
        Math.random() * 30 + 10,
        Math.random() * 30 + 10
      );
      r.init_shape();
      break;

    case 'KeyG':
      console.log('Pressed G');
      let c = new Circle(
        new Vector2d(ecore.current_obj.center.x, ecore.current_obj.center.y),
        Math.random() * 10 + 20
      );
      c.init_shape();
      break;

    // Movement
    case 'KeyW':
      ecore.current_obj.move_towards(new Vector2d(0, -10));
      break;
    case 'KeyA':
      ecore.current_obj.move_towards(new Vector2d(-10, 0));
      break;
    case 'KeyS':
      ecore.current_obj.move_towards(new Vector2d(0, 10));
      break;
    case 'KeyD':
      ecore.current_obj.move_towards(new Vector2d(10, 0));
      break;

    // Rotation
    case 'KeyQ':
      ecore.current_obj.rotate_shape(-0.1);
      break;
    case 'KeyE':
      ecore.current_obj.rotate_shape(0.1);
      break;

    // Reset
    case 'KeyR':
      load_scene();
      break;
    // Delete
    case 'KeyT':
      ecore.delete_obj(ecore.obj_idx);
    // Toggle fixture (gravity) of selected object
    case 'KeyH':
      ecore.current_obj.is_fixed = ecore.current_obj.is_fixed === true ? false : true;
      break;

    // Selection
    case 'ArrowUp':
      console.log('Pressed ArrowUp');
      ecore.set_obj_idx(ecore.obj_idx + 1);
      break;
    case 'ArrowDown':
      console.log('Pressed ArrowDown');
      ecore.set_obj_idx(ecore.obj_idx - 1);
      break;
    case 'ArrowLeft':
      console.log('Pressed ArrowLeft');
      ecore.set_obj_idx(0);
      break;
    case 'ArrowRight':
      console.log('Pressed ArrowRight');
      ecore.set_obj_idx(ecore.objs_len - 1);
      break;
  }

  // Number keys 0 to 9
  if (keyWhich >= 48 && keyWhich <= 57) {
    let minus48 = keyWhich - 48;
    console.log(`Pressed ${minus48}`);
    if (minus48 < ecore.objs_len) {
      ecore.set_obj_idx(minus48);
    }
  }

  console.log(ecore.objs_len);
};

export default key_down_e;
