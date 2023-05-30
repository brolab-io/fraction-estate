import { AbstractMesh, ArcRotateCamera, Engine, Mesh, Scene, Vector3 } from "@babylonjs/core";
import { Environment } from "./environment";
import { CityEntity } from "./city.entity";

export class MyScene extends Scene {
  private _camera!: ArcRotateCamera;
  private _environment: Environment = new Environment(this);

  constructor(private engine: Engine) {
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

  private _calculatePanningSensibility() {
    const minRadius = 250;
    const maxRadius = 10000;
    const minSensibility = 50;
    const maxSensibility = 5;

    const clampedRadius = Math.max(minRadius, Math.min(maxRadius, this._camera.radius));
    const normalizedRadius = (clampedRadius - minRadius) / (maxRadius - minRadius);
    const mappedSensibility =
      (1 - normalizedRadius) * minSensibility + normalizedRadius * maxSensibility;

    this._camera.panningSensibility = mappedSensibility;
  }

  private setupCamera(target: Mesh | AbstractMesh) {
    const canvas = this.engine.getRenderingCanvas();
    this._camera = new ArcRotateCamera("orbitCamera", 0, 0, 0, Vector3.Zero(), this);
    this._camera.setPosition(new Vector3(0, 0, -10));
    this._camera.setTarget(Vector3.Zero());
    this._camera.attachControl(target || canvas, true);
    this._camera.lowerRadiusLimit = 250;
    this._camera.upperRadiusLimit = 10000;
    this._camera.wheelDeltaPercentage = 0.1;

    this._camera.maxZ = 100000;

    // Set camera to top view
    this._camera.beta = 1;
    this._camera.radius = 3500;

    // update camera every frame
    this.registerBeforeRender(() => {
      this._calculatePanningSensibility();
    });
  }

  private async _loadAssets() {
    const sanboxEntities = new CityEntity(this);
    return sanboxEntities.loadAssets();
  }
}
