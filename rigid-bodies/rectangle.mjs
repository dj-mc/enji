import RigidShape from './rigid-shape.mjs';
import Vector2d from '../lib/vector2d.mjs';

class Rectangle extends RigidShape {
  constructor(center = new Vector2d(0, 0), width = 1, height = 1, fixed = true) {
    super(center);
    this.shape = 'RigidShape :: Rectangle';
    this.width = width;
    this.height = height;
    this.fixed = fixed;
    this.vertices = [];
    this.normals = [];

    //            norm[0]
    // vert[0] # ========= # vert[1]
    // norm[3] | rectangle | norm[1]
    // vert[3] # ========= # vert[2]
    //            norm[2]

    this.vertices[0] = new Vector2d(center.x - width / 2, center.y - height / 2);
    this.vertices[1] = new Vector2d(center.x + width / 2, center.y - height / 2);
    this.vertices[2] = new Vector2d(center.x + width / 2, center.y + height / 2);
    this.vertices[3] = new Vector2d(center.x - width / 2, center.y + height / 2);
    this.set_normals();
  }

  set_normals() {
    for (let i = 0; i < 4; i++) {
      let i_plus1 = i + 1 < 4 ? i + 1 : 0;
      let i_plus2 = i + 2 < 4 ? i + 2 : 0;
      this.normals[i] = this.vertices[i_plus1].subtract(this.vertices[i_plus2]);
      this.normals[i] = this.normals[i].normalized;
    }
  }

  draw_shape(ctx) {
    ctx.save();
    ctx.translate(this.vertices[0].x, this.vertices[0].y);
    ctx.rotate(this.angle);
    ctx.strokeRect(0, 0, this.width, this.height);
    ctx.restore();
  }

  rotate_shape(angle) {
    this.angle += angle;
    for (let i = 0; i < this.vertices.length; i++) {
      this.vertices[i] = this.vertices[i].rotate(this.center, angle);
    }
    this.set_normals();
    return this;
  }

  move_towards(vect) {
    for (let i = 0; i < this.vertices.length; i++) {
      this.vertices[i] = this.vertices[i].add(vect);
    }
    this.center = this.center.add(vect);
    return this;
  }
}

export default Rectangle;
