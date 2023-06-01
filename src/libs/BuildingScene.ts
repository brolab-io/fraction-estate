import {
  AbstractMesh,
  ArcRotateCamera,
  Engine,
  FreeCamera,
  Mesh,
  Scene,
  Vector3,
} from "@babylonjs/core";
import { Environment } from "./environment";
import { BuildingEntity } from "./building.entity";

export class BuildingScene extends Scene {
  private _camera!: ArcRotateCamera;
  private _environment: Environment = new Environment(this);

  constructor(private engine: Engine, ref: any) {
    super(engine);

    this._loadAssets().then(async (result) => {
      this.setupCamera(result.env);
      await this._environment.load();
      engine.runRenderLoop(() => {
        this.render();
      });

      window.addEventListener("resize", () => {
        this.engine.resize();
      });
      this.bindInpspector();
      ref.current.hide();
    });
  }

  private bindInpspector() {
    // Enable Inspector when pressing ctrl + alt + I
    window.addEventListener("keydown", (ev) => {
      // Ctrl+Alt+I
      if (ev.ctrlKey && ev.altKey && ev.code === "KeyI") {
        if (this.debugLayer.isVisible()) {
          this.debugLayer.hide();
        } else {
          this.debugLayer.show();
        }
      }
    });
  }

  private setupCamera(target: Mesh | AbstractMesh) {
    this._camera = new ArcRotateCamera("orbitCamera", 0, 1, 500, Vector3.Zero(), this);
    const canvas = this.engine.getRenderingCanvas();
    // Set camera properties
    // this._camera.setTarget(Vector3.Zero());
    this._camera.attachControl(canvas, true);
    this._camera.wheelDeltaPercentage = 0.05;
    this._camera.radius = 1000;
    // Enable keyboard input for camera movement
    // arrow keys
    // this._camera.keysUp.push(38);
    // this._camera.keysDown.push(40);
    // this._camera.keysLeft.push(37);
    // this._camera.keysRight.push(39);

    // this._camera.keysUp.push(87); // W key
    // this._camera.keysDown.push(83); // S key
    // this._camera.keysLeft.push(65); // A key
    // this._camera.keysRight.push(68); // D key

    // this._camera.speed = 10;

    // // press space to move camera up
    // this._camera.keysUpward.push(32);
    // // press shift to move camera down
    // this._camera.keysDownward.push(16);
  }

  private async _loadAssets() {
    const sanboxEntities = new BuildingEntity(this);
    return sanboxEntities.loadAssets();
  }
}
