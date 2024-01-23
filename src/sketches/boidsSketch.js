import { ReactP5Wrapper } from "@p5-wrapper/react";
import { useState } from "react";
import Vec2 from "../core/vec2";
import { createNoise3D } from "simplex-noise";
import QuadTree from "../core/quadTree";
import lowSpecMode from "../core/lowSpecMode";

function randomColor() {
  let hue = Math.random() * 360;
  let saturation = 100;
  let lightness = 60;

  // Convert HSL to RGB
  let c = ((1 - Math.abs((2 * lightness) / 100 - 1)) * saturation) / 100;
  let x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  let m = lightness / 100 - c / 2;

  let r, g, b;
  if (0 <= hue && hue < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= hue && hue < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= hue && hue < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= hue && hue < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= hue && hue < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= hue && hue < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return [r, g, b];
}

class Boid {
  constructor(position, p5, radius) {
    this.color = randomColor();
    this.position = position;
    this.velocity = new Vec2(0, 0);
    this.radius = radius;
    this.frame = 0;
    this.appliedForce = Vec2.zero();
  }

  setPosition(value, p5) {
    this.position = value;
  }

  draw(p5) {
    p5.fill(this.color[0], this.color[1], this.color[2]);
    p5.ellipse(
      this.position.x - p5.windowWidth / 2,
      this.position.y - p5.windowHeight / 2,
      this.radius * 2,
      this.radius * 2
    );
  }

  update(boidsQT, p5, state) {
    const speed = 4;
    const noiseScale = 0.005;
    var newPosition = this.position.copy();

    var nearbyBoids = boidsQT.findInRange(newPosition, 120);
    var seperationForce = this.seperation(nearbyBoids).multiply(
      state.seperationMultiplier
    );

    var alignmentForce = this.alignment(nearbyBoids).multiply(
      state.alignmentMultiplier
    );

    var cohesionForce = this.cohesion(nearbyBoids).multiply(
      state.cohesionMultiplier
    );

    var wallReplusion = this.wallRepulsion(p5).multiply(1);
    this.frame++;

    var randomForce = new Vec2(
      state.noiseX(
        this.position.x * noiseScale,
        this.position.y * noiseScale,
        this.frame / 100
      ),
      state.noiseY(
        this.position.x * noiseScale,
        this.position.y * noiseScale,
        this.frame / 100
      )
    )
      .normalize()
      .multiply(state.randomMultiplier);

    var targetVelocity = seperationForce
      .add(alignmentForce)
      .add(cohesionForce)
      .add(randomForce)
      .add(wallReplusion)
      .add(this.appliedForce)
      .normalize();
    this.appliedForce = Vec2.zero();
    this.velocity = this.velocity.lerp(targetVelocity, 0.1);
    newPosition = newPosition.add(this.velocity.copy().multiply(speed));
    this.setPosition(newPosition, p5);
  }

  applyForce(vector) {
    this.appliedForce.add(vector);
  }

  seperation(nearbyBoids) {
    if (nearbyBoids.length === 0) return Vec2.zero();
    let sum = Vec2.zero();
    for (let other of nearbyBoids) {
      var distance = this.position.distance(other.position);
      let difference = other.position
        .copy()
        .subtract(this.position)
        .divide(distance * distance);

      sum = sum.add(difference);
    }
    let result = sum.divide(nearbyBoids.length);
    return result.multiply(-1);
  }

  alignment(nearbyBoids) {
    if (nearbyBoids.length === 0) return Vec2.zero();
    let sum = Vec2.zero();
    for (let other of nearbyBoids) {
      sum = sum.add(other.velocity);
    }
    return sum.divide(nearbyBoids.length).normalize();
  }

  cohesion(nearbyBoids) {
    if (nearbyBoids.length === 0) return Vec2.zero();
    let sum = Vec2.zero();
    for (let other of nearbyBoids) {
      sum = sum.add(other.position);
    }
    return sum.divide(nearbyBoids.length).subtract(this.position);
  }

  wallRepulsion(p5) {
    const boundsMin = new Vec2(p5.windowWidth, p5.windowHeight).multiply(0.2);
    const boundsMax = new Vec2(p5.windowWidth, p5.windowHeight).multiply(0.8);
    let result = Vec2.zero();
    if (this.position.x < boundsMin.x) result.x = boundsMin.x - this.position.x;
    if (this.position.x > boundsMax.x) result.x = boundsMax.x - this.position.x;
    if (this.position.y < boundsMin.y) result.y = boundsMin.y - this.position.y;
    if (this.position.y > boundsMax.y) result.y = boundsMax.y - this.position.y;
    return result.normalize();
  }
}

class SketchState {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.noiseX = createNoise3D();
    this.noiseY = createNoise3D();
  }

  init(numberOfBoids, boidSize, seperation, alignment, cohesion, random, p5) {
    this.numberOfBoids = numberOfBoids;
    this.seperationMultiplier = seperation;
    this.alignmentMultiplier = alignment;
    this.cohesionMultiplier = cohesion;
    this.randomMultiplier = random;
    this.flock = [];
    let width = p5.windowWidth * 2;
    let height = p5.windowHeight * 2;
    this.quadTree = new QuadTree(8, -width, -height, width, height);

    for (let i = 0; i < numberOfBoids; i++) {
      let position = new Vec2(
        p5.random(0, p5.windowWidth),
        p5.random(0, p5.windowHeight)
      );
      this.flock.push(new Boid(position, p5, boidSize));
    }
  }
}

function DrawQuadTree(quadTree, p5, color) {
  let quads = [];

  let stack = [];
  stack.push(quadTree.root);
  while (stack.length > 0) {
    let quad = stack.pop();
    quads.push(quad);
    quad.children.forEach((child) => {
      stack.push(child);
    });
  }
  p5.stroke(color);
  p5.strokeWeight(2);
  p5.noFill();
  quads.forEach((quad) => {
    let bounds = quad.bounds;
    let x = bounds.xMin;
    let y = bounds.yMin;
    let w = bounds.xMax - x;
    let h = bounds.yMax - y;
    p5.rect(x - p5.windowWidth / 2, y - p5.windowHeight / 2, w, h);
  });
  p5.noStroke();
}

function sketch(p5) {
  let sketchState = new SketchState();
  let numberOfBoids = lowSpecMode ? 150 : 400;
  sketchState.init(numberOfBoids, 6, 1100, 2, 0.12, 1.2, p5);

  p5.setup = () => {
    p5.noStroke();
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);

    var pixelDensity = (1080 / p5.windowWidth + 1080 / p5.windowHeight) / 2;
    pixelDensity *= lowSpecMode ? 0.5 : 1;
    p5.pixelDensity(pixelDensity);
    console.log(pixelDensity);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);

    var pixelDensity = (1080 / p5.windowWidth + 1080 / p5.windowHeight) / 2;
    pixelDensity *= lowSpecMode ? 0.5 : 1;
    p5.pixelDensity(pixelDensity);
    console.log(pixelDensity);
  };

  p5.draw = () => {
    p5.background(0);
    p5.noStroke();
    sketchState.quadTree.clear();
    sketchState.flock.forEach((boid, index, boids) => {
      sketchState.quadTree.add(boid, boid.position);
    });

    DrawQuadTree(sketchState.quadTree, p5, 40);

    var mousePosition = new Vec2(p5.mouseX, p5.mouseY);
    if (!lowSpecMode) {
      let attractedBoidsCount = 0;
      sketchState.quadTree.findInRange(mousePosition, 100).forEach((boid) => {
        if (++attractedBoidsCount < 70) {
          let diff = mousePosition.copy().subtract(boid.position);
          boid.applyForce(diff);
        }
      });
    }

    for (let boid of sketchState.flock) {
      boid.update(sketchState.quadTree, p5, sketchState);
      boid.draw(p5);
    }
  };
}

const MySketch = () => {
  const [sketchState, setSketchState] = useState(new SketchState());

  return <ReactP5Wrapper sketch={sketch} sketchState={sketchState} />;
};

export default MySketch;
