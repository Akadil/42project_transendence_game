import { Rectangle } from "./Rectangle";

export class Court {
    private _dimension: Rectangle;

    constructor(width: number, height: number, x: number, y: number) {
        this._dimension = new Rectangle(width, height, x, y);
    }

    public get dimension(): Rectangle {
        return this._dimension;
    }
}