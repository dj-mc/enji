import Vector2d from '../lib/vector2d.mjs';
import RigidShape from './rigid-shape.mjs';

class Rectangle extends RigidShape {
  constructor(center = new Vector2d(0, 0), width = 1, height = 1) {
    super(center);
    this.width = width;
    this.height = height;

    //            norm[0]
    // vert[0] # ========= # vert[1]
    // norm[3] | rectangle | norm[1]
    // vert[3] # ========= # vert[2]
    //            norm[2]

    this.vertices = [];

    this.vertices[0] = new Vector2d(center.x - width / 2, center.y - height / 2);
    this.vertices[1] = new Vector2d(center.x + width / 2, center.y - height / 2);
    this.vertices[2] = new Vector2d(center.x + width / 2, center.y + height / 2);
    this.vertices[3] = new Vector2d(center.x - width / 2, center.y + height / 2);

    this.normals = [];

    this.normals[0] = this.vertices[1].subtract(this.vertices[2]);
    this.normals[0] = this.normals[0].normalized;

    this.normals[1] = this.vertices[2].subtract(this.vertices[3]);
    this.normals[1] = this.normals[1].normalized;

    this.normals[2] = this.vertices[3].subtract(this.vertices[0]);
    this.normals[2] = this.normals[2].normalized;

    this.normals[3] = this.vertices[0].subtract(this.vertices[1]);
    this.normals[3] = this.normals[3].normalized;
  }

  draw_me(ctx) {
    ctx.save();
    ctx.translate(this.vertices[0].x, this.vertices[0].y);
    ctx.rotate(this.angle);
    ctx.strokeRect(0, 0, this.width, this.height);
    ctx.restore();
  }
}

export default Rectangle;
