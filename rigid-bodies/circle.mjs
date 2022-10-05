import RigidShape from './rigid-shape.mjs';
import Vector2d from '../lib/vector2d.mjs';

class Circle extends RigidShape {
  constructor(center = new Vector2d(0, 0), radius = 1) {
    super(center);
    this.shape = 'RigidShape :: Circle';
    this.radius = radius;
    this.bound_radius = radius;
    this.start_point = new Vector2d(center.x, center.y - radius);
  }

  draw_shape(ctx) {
    // Circle arc
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI, true);
    // Radius line
    ctx.moveTo(this.start_point.x, this.start_point.y);
    ctx.lineTo(this.center.x, this.center.y);
    ctx.closePath();
    ctx.stroke();
  }

  rotate_shape(angle) {
    this.angle += angle; // Counter-clockwise
    this.start_point = this.start_point.rotate(this.center, angle);
    return this;
  }

  move_towards(vect) {
    this.start_point = this.start_point.add(vect);
    this.center = this.center.add(vect);
    return this;
  }

  collided_circle_circle(c1, c2, collision_info) {
    const vector_c1_c2 = c2.center.subtract(c1.center);
    const radius_sum = c1.radius + c2.radius;
    const distance = vector_c1_c2.v_length;

    if (distance > Math.sqrt(radius_sum ** 2)) {
      return false; // No overlap found
    }

    if (distance !== 0) {
      // Possible overlap found
      const normalized_c2_c1 = vector_c1_c2.scalar(-1).normalized;
      const radius_c2 = normalized_c2_c1.scalar(c2.radius);

      collision_info.set_info(
        radius_sum - distance,
        vector_c1_c2.normalized,
        c2.center.add(radius_c2)
      );
    } else {
      // Both circles' centers occupy the same position
      if (c1.radius > c2.radius) {
        // c1 is larger than c2
        collision_info.set_info(
          radius_sum,
          new Vector2d(0, -1),
          c1.center.add(new Vector2d(0, c1.radius))
        );
      } else {
        // c2 is bigger than c1
        collision_info.set_info(
          radius_sum,
          new Vector2d(0, -1),
          c2.center.add(new Vector2d(0, c2.radius))
        );
      }
    }
    return true;
  }

  collision_test(other_shape, collision_info) {
    let status = false;
    if (other_shape.shape === 'RigidShape :: Circle') {
      // Two colliding circles
      status = this.collided_circle_circle(this, other_shape, collision_info);
    } else {
      // Not two colliding circles
      status = false;
    }
    return status;
  }
}

export default Circle;
