/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Vector.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: akalimol <akalimol@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/23 12:31:01 by akalimol          #+#    #+#             */
/*   Updated: 2023/10/26 18:09:14 by akalimol         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/**
 * @brief   Represents a vector in the game.
 * 
 * @attention  Maybe I have to add the angle of the vector
 */
export class Vector {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    /**
     * @param angle - The angle is in degrees 
     */
    rotate(angle) {
        angle = angle * Math.PI / 180;
        let oldX = this._x;
        let oldY = this._y;

        this._x = oldX * Math.cos(angle) - oldY * Math.sin(angle);
        this._y = oldX * Math.sin(angle) + oldY * Math.cos(angle);
    }

    /* ********************************************************************** */
    /* Getters and Setters */
    /* ********************************************************************** */
    get x() { return this._x; }
    get y() { return this._y; }
    get angle() { return Math.atan2(this._y, this._x) * 180 / Math.PI; }
    get length() { return Math.sqrt(this._x ** 2 + this._y ** 2); }
    set x(value) { this._x = value; }
    set y(value) { this._y = value; }
}