import RigidShape from './rigid-shape.mjs';
import Vector2d from '../lib/vector2d.mjs';

class Circle extends RigidShape {
  constructor(center = new Vector2d(0, 0), radius = 1, fixed = true) {
    super(center);
    this.shape = 'RigidShape :: Circle';
    this.radius = radius;
    this.startPoint = new Vector2d(center.x, center.y - radius);
    this.fixed = fixed;
  }

  draw_shape(ctx) {
    // Circle arc
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI, true);
    // Radius line
    ctx.moveTo(this.startPoint.x, this.startPoint.y);
    ctx.lineTo(this.center.x, this.center.y);
    ctx.closePath();
    ctx.stroke();
  }

  rotate_shape(angle) {
    this.angle += angle; // Counter-clockwise
    this.startPoint = this.startPoint.rotate(this.center, angle);
    return this;
  }

  move_towards(vect) {
    this.startPoint = this.startPoint.add(vect);
    this.center = this.center.add(vect);
    return this;
  }
}

export default Circle;
