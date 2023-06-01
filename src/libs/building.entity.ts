import { AbstractMesh, ISceneLoaderProgressEvent, SceneLoader, Vector3 } from "@babylonjs/core";

import { BuildingScene } from "./BuildingScene";

export class BuildingEntity {
  _ground: AbstractMesh;

  constructor(private readonly _scene: BuildingScene) {
    this._ground = this._scene.getMeshByName("ground")!;
  }

  private _processLoaderProgress(event: ISceneLoaderProgressEvent) {
    const percent = ((event.loaded * 100) / event.total).toFixed(2);
    console.log(percent);
  }

  async loadAssets() {
    const result = await SceneLoader.ImportMeshAsync(
      null,
      "/assets/models/building/",
      "scene.gltf",
      this._scene,
      this._processLoaderProgress
    );

    const env = result.meshes[0];
    env.scaling = new Vector3(0.3, 0.3, 0.3);
    const allMeshes = result.meshes;

    return {
      env,
      allMeshes,
    };
  }
}
