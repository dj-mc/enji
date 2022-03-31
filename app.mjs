import core from './engine-core/core.mjs';
import key_down_e from './controller.mjs';
import load_scene from './game.mjs';

document.addEventListener('keydown', (e) => {
  key_down_e(e);
});

window.onload = () => {
  core.init_engine();
  load_scene();
};
