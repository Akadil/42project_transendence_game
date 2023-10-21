import { Vector2D } from "./Vector";

export class Ball {
    private _radius: number;
    private _position: Vector2D;
    private _velocity: Vector2D;

    constructor(x: number, y: number, radius: number) {
        this._position = new Vector2D(x, y);
        this._velocity = new Vector2D(1, 0);
        this._radius = radius;
    }

    public get position(): Vector2D {
        return this._position;
    }

    public get velocity(): Vector2D {
        return this._velocity;
    }

    public get radius(): number {
        return this._radius;
    }

    public set position(value: Vector2D) {
        this._position = value;
    }

    public set velocity(value: Vector2D) {
        this._velocity = value;
    }

    public set radius(value: number) {
        this._radius = value;
    }
}