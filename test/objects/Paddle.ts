import { Rectangle } from "./Rectangle";
import { Vector2D } from "./Vector";

export class Paddle {
    private _dimensions: Rectangle;

    constructor(x: number, y: number, width: number, height: number) {
        this._dimensions = new Rectangle(x, y, width, height);
    }

    public get position(): Vector2D {
        return this._dimensions.position();
    }

    public get dimensions(): Rectangle {
        return this._dimensions;
    }

    public set position(value: Vector2D) {
        this._dimensions.position = value;
    }

    public set dimensions(value: Rectangle) {
        this._dimensions = value;
    }
}