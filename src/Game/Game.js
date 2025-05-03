import * as THREE from "three";

import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import Sizes from "./utils/Sizes.js";
import Time from "./utils/Time.js";

import World from "./World/World.js";
import Resources from "./utils/Resources.js";
import Debug from "./utils/Debug.js";

let instance = null;

export default class Game {
  constructor(canvas) {
    if (instance) {
      return instance;
    }
    instance = this;

    this.debug = new Debug();
    this.canvas = canvas;
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.resource = new Resources();
    this.renderer = new Renderer();
    this.world = new World();

    this.sizes.on("resize", () => {
      this.resize();
    });

    this.time.on("tick", () => {
      this.update();
    });

    //Test Mesh
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
    this.world.update();
  }
}
