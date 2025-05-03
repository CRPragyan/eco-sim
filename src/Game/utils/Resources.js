import * as THREE from "three";
import Sources from "../Sources";
import EventEmitter from "./EventEmitter.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export default class Resources extends EventEmitter {
  constructor() {
    super();

    this.source = Sources;
    this.items = {};
    this.toLoad = this.source.length;
    this.loaded = 0;

    this.setLoaders();
    this.setLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
    this.loaders.gltfLoader = new GLTFLoader();
  }

  setLoading() {
    for (const source of this.source) {
      if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, file => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(source.path, file => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, file => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;
    if (this.toLoad === this.loaded) {
      this.trigger("ready");
      console.log("Resources loaded");
    }
  }
}
