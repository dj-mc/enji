import CurrentState from './state.mjs';
import CollisionData from '../lib/collision.mjs';

class Physics {
  constructor() {}

  static draw_collision_info(collision_info, context) {
    context.beginPath();
    context.moveTo(collision_info.start.x, collision_info.start.y);
    context.lineTo(collision_info.end.x, collision_info.end.y);
    context.closePath();
    context.strokeStyle = 'Orange';
    context.stroke();
  }

  static collision() {
    // 5 = borders + cursor
    const collision_data = new CollisionData();
    for (let i = 5; i < CurrentState.objs_len; i++) {
      for (let j = i + 1; j < CurrentState.objs_len; j++) {
        // Check bound and collision tests
        if (CurrentState.collection[i].bound_test(CurrentState.collection[j])) {
          if (
            CurrentState.collection[i].collision_test(CurrentState.collection[j], collision_data)
          ) {
            if (
              // Validate a collision: ensure that its normal vector is pointing
              // towards the opposing object being tested. Use the sign of the
              // dot product between the collision's normal vector and the
              // difference vector of their centers.
              collision_data
                .get_normal_vector()
                .dot_product(
                  CurrentState.collection[j].center.subtract(CurrentState.collection[i].center)
                ) < 0
            ) {
              collision_data.change_direction();
            }
            this.draw_collision_info(collision_data, CurrentState.context);
          }
        }
      }
    }
  }
}

export default Physics;
