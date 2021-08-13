import core from './engine-core/core.mjs';
import Rectangle from '../rigid-bodies/rectangle.mjs';
import Circle from '../rigid-bodies/circle.mjs';
import Vector2d from '../lib/vector2d.mjs';

const keyDownEvent = function (e, engine_core) {
  let keyCode = e.code;
  let keyWhich = e.which;

  switch (keyCode) {
    case 'KeyF':
      console.log('Pressed F');
      let r = new Rectangle(
        new Vector2d(
          Math.random() * engine_core.width * 0.8,
          Math.random() * engine_core.height * 0.8
        ),
        Math.random() * 30 + 10,
        Math.random() * 30 + 10
      );
      console.log(r);
      r.draw_me(engine_core.context);
      r.init_obj();
      break;

    case 'KeyG':
      console.log('Pressed G');
      let c = new Circle(
        new Vector2d(
          Math.random() * engine_core.width * 0.8,
          Math.random() * engine_core.height * 0.8
        ),
        Math.random() * 10 + 20
      );
      console.log(c);
      c.draw_me(engine_core.context);
      c.init_obj();
      break;

    case 'ArrowUp':
      console.log('Pressed ArrowUp');
      engine_core.set_obj_idx(engine_core.obj_idx + 1);
      break;

    case 'ArrowDown':
      console.log('Pressed ArrowDown');
      engine_core.set_obj_idx(engine_core.obj_idx - 1);
      break;

    case 'ArrowLeft':
      console.log('Pressed ArrowLeft');
      break;

    case 'ArrowRight':
      console.log('Pressed ArrowRight');
      break;
  }

  // Number keys 0 to 9
  if (keyWhich >= 48 && keyWhich <= 57) {
    let minus48 = keyWhich - 48;
    console.log(`Pressed ${minus48}`);
    if (minus48 < engine_core.objs_len) {
      engine_core.set_obj_idx(minus48);
    }
  }

  console.log(engine_core.objs_len);
};

document.addEventListener('keydown', (e) => {
  keyDownEvent(e, core);
});

window.onload = () => {
  core.init_engine();
};
