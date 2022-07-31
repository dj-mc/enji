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
}

export default Circle;
