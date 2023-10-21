import { Vector2D } from "./Vector";

export class Rectangle {
    public _position: Vector2D;
    public _width: number;
    public _height: number;

    constructor(width: number, height: number,
        x: number, y: number
    ) {
        this._position = new Vector2D(x, y);
        this._width = width;
        this._height = height;
    }

    public isPointInside(point: Vector2D): boolean {
        return point.x >= this._position.x - this._width / 2
            && point.x <= this._position.x + this._width / 2
            && point.y >= this._position.y - this._height / 2
            && point.y <= this._position.y + this._height / 2;
    }

    public get left(): number {
        return this._position.x - this._width / 2;
    }

    public get right(): number {
        return this._position.x + this._width / 2;
    }

    public get top(): number {
        return this._position.y - this._height / 2;
    }

    public get bottom(): number {
        return this._position.y + this._height / 2;
    }

    public get topLeft(): Vector2D {
        return new Vector2D(this.left, this.top);
    }

    public get topRight(): Vector2D {
        return new Vector2D(this.right, this.top);
    }

    public get bottomLeft(): Vector2D {
        return new Vector2D(this.left, this.bottom);
    }

    public get bottomRight(): Vector2D {
        return new Vector2D(this.right, this.bottom);
    }

    public get center(): Vector2D {
        return this._position;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public set width(value: number) {
        this._width = value;
    }

    public set height(value: number) {
        this._height = value;
    }

    public set center(value: Vector2D) {
        this._position = value;
    }
}