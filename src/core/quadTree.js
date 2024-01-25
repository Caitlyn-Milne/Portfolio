import MathUtil from "./mathUtil";
import Vec2 from "./vec2";

class Boundary {
  constructor(xMin, yMin, xMax, yMax) {
    this.xMin = xMin;
    this.yMin = yMin;
    this.xMax = xMax;
    this.yMax = yMax;
    this.xMid = (xMin + xMax) / 2;
    this.yMid = (yMin + yMax) / 2;
  }

  contains(x, y) {
    return this.xMin <= x && x < this.xMax && this.yMin <= y && y < this.yMax;
  }

  closestPoint(x, y) {
    let resultX = MathUtil.clamp(x, this.xMin, this.xMax);
    let resultY = MathUtil.clamp(y, this.yMin, this.yMax);
    return new Vec2(resultX, resultY);
  }
}

class QuadTreeEntry {
  constructor(data, position) {
    this.data = data;
    this.position = position;
  }
}

let quadPool = [];

function retrieveQuad(capacity, bounds) {
  if (quadPool.length > 0) {
    let quad = quadPool.pop();
    quad.capacity = capacity;
    quad.bounds = bounds;
    quad.children = [];
    quad.entries = [];
    return quad;
  }
  return new Quad(capacity, bounds);
}

function returnQuad(quad) {
  let stack = [];

  stack.push(quad);
  while (stack.length > 0) {
    let that = stack.pop();
    quadPool.push(that);
    for (let child of that.children) {
      stack.push(child);
    }
  }
}

class Quad {
  constructor(capacity, bounds) {
    this.capacity = capacity;
    this.bounds = bounds;
    this.children = [];
    this.entries = [];
  }

  add(entry) {
    let stack = [];

    stack.push(this);

    while (stack.length > 0) {
      let that = stack.pop();

      if (that.children.length === 0) {
        that.entries.push(entry);
        if (that.entries.length > that.capacity) {
          that.quadify();
          stack.push(...this.children);
          break;
        }
      }

      for (let child of that.children) {
        if (child.bounds.contains(entry.position.x, entry.position.y)) {
          stack.push(child);
          break;
        }
      }
    }
  }

  quadify() {
    let b = this.bounds;
    this.children = [];
    this.children.push(this.createChild(b.xMin, b.yMin, b.xMid, b.yMid)); // Top left
    this.children.push(this.createChild(b.xMid, b.yMin, b.xMax, b.yMid)); // Top right
    this.children.push(this.createChild(b.xMin, b.yMid, b.xMid, b.yMax)); // Bottom left
    this.children.push(this.createChild(b.xMid, b.yMid, b.xMax, b.yMax)); // Bottom right

    let entries = this.entries;
    this.entries = [];

    for (let entry of entries) {
      for (let child of this.children) {
        if (child.bounds.contains(entry.position.x, entry.position.y)) {
          child.entries.push(entry);
          break;
        }
      }
    }
  }

  createChild(xMin, yMin, xMax, yMax) {
    let bounds = new Boundary(xMin, yMin, xMax, yMax);
    return retrieveQuad(this.capacity, bounds);
  }

  findInRange(positon, exclusiveRange, result) {
    let stack = [];

    stack.push(this);
    while (stack.length > 0) {
      let that = stack.pop();

      if (that.children.length === 0) {
        for (let entry of that.entries) {
          if (entry.position.distance(positon) < exclusiveRange) {
            result.push(entry.data);
          }
        }
      }

      for (let child of that.children) {
        let closestPoint = child.bounds.closestPoint(positon.x, positon.y);
        let distance = closestPoint.distance(positon);

        if (distance < exclusiveRange) {
          stack.push(child);
        }
      }
    }
  }
}

class QuadTree {
  constructor(capacity, xMin, yMin, xMax, yMax) {
    let bounds = new Boundary(xMin, yMin, xMax, yMax);
    this.root = retrieveQuad(capacity, bounds);
  }

  add(data, position) {
    let entry = new QuadTreeEntry(data, position);
    this.root.add(entry);
  }

  findInRange(positon, exclusiveRange) {
    let result = [];
    this.root.findInRange(positon, exclusiveRange, result);
    return result;
  }

  clear() {
    let c = this.root.capacity;
    let b = this.root.bounds;
    returnQuad(this.root);
    this.root = retrieveQuad(c, b);
  }
}

export default QuadTree;
