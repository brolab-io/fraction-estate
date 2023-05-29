import {
  AbstractMesh,
  ActionManager,
  Color3,
  ExecuteCodeAction,
  ISceneLoaderProgressEvent,
  SceneLoader,
  StandardMaterial,
} from "@babylonjs/core";
import { MyScene } from "./MyScene";

export class CityEntity {
  _ground: AbstractMesh;

  constructor(private readonly _scene: MyScene) {
    this._ground = this._scene.getMeshByName("ground")!;
  }

  private _processLoaderProgress(event: ISceneLoaderProgressEvent) {
    const percent = ((event.loaded * 100) / event.total).toFixed(2);
    console.log(percent);
  }

  async loadAssets() {
    const result = await SceneLoader.ImportMeshAsync(
      null,
      "/assets/models/",
      "model-city.glb",
      this._scene,
      this._processLoaderProgress
    );

    const env = result.meshes[0];
    const allMeshes = result.meshes;

    const HOVER_COLOR = Color3.FromHexString("#00ff00");
    const DEFAULT_COLOR = Color3.FromHexString("#8152ca");
    const ACTIVE_COLOR = Color3.FromHexString("#ff0000");

    for (const mesh of allMeshes) {
      if (mesh.name.toLowerCase().startsWith("cube")) {
        const material = new StandardMaterial("cubeMat", this._scene);
        material.diffuseColor = DEFAULT_COLOR;
        mesh.material = material;
        // Handle click to change color
        mesh.actionManager = new ActionManager(this._scene);
        mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
            material.diffuseColor = ACTIVE_COLOR;
          })
        );
        // Handle hover to change color
        mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, () => {
            material.diffuseColor = HOVER_COLOR;
          })
        );

        mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, () => {
            material.diffuseColor = DEFAULT_COLOR;
          })
        );
      }
    }

    return {
      env,
      allMeshes,
    };
  }
}
