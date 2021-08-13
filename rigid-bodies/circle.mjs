import Vector2d from '../lib/vector2d.mjs';
import RigidShape from './rigid-shape.mjs';

class Circle extends RigidShape {
  constructor(center = new Vector2d(0, 0), radius = 1) {
    super(center);
    this.radius = radius;
    this.startPoint = new Vector2d(center.x, center.y - radius);
  }

  draw_me(ctx) {
    // Circle arc
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI, true);
    // Radius line
    ctx.moveTo(this.startPoint.x, this.startPoint.y);
    ctx.lineTo(this.center.x, this.center.y);
    ctx.closePath();
    ctx.stroke();
  }
}

export default Circle;
