import * as THREE from "three";

import Game from "../Game.js";
import Lights from "./Lights.js";
import Floor from "./Floor.js";
import Fox from "./Fox.js";

export default class World {
  constructor() {
    this.game = new Game();
    this.scene = this.game.scene;
    this.resources = this.game.resource;

    console.log(this.resources);

    this.resources.on("ready", () => {
      this.lights = new Lights();
      this.fox = new Fox();
      this.floor = new Floor();
    });
  }

  update() {
    if (this.fox) {
      this.fox.update();
    }
  }
}
