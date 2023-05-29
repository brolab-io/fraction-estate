import { Color4, HemisphericLight, Vector3 } from "@babylonjs/core";
import { MyScene } from "./MyScene";

export class Environment {
  private _scene: MyScene;

  constructor(scene: MyScene) {
    this._scene = scene;
  }

  public async load() {
    this._scene.createDefaultEnvironment({
      createSkybox: false,
      groundSize: 100,
      enableGroundShadow: false,
      groundYBias: 1,
    });
    this._createSkybox();
    this._createLighting();
    // Remove default purple skybox
    this._scene.clearColor = new Color4(0, 0, 0, 0);
    // Remove default ground
    // this._scene.getMeshByName("ground")?.dispose();
  }

  private _createSkybox() {}

  private _createLighting() {
    const light = new HemisphericLight("light", new Vector3(0, 10, 0), this._scene);
    light.intensity = 0.7;
  }
}
