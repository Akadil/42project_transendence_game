/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Vector.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: akalimol <akalimol@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/23 12:31:01 by akalimol          #+#    #+#             */
/*   Updated: 2023/10/23 19:30:16 by akalimol         ###   ########.fr       */
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

        this._x = this._x * Math.cos(angle) - this._y * Math.sin(angle);
        this._y = this._x * Math.sin(angle) + this._y * Math.cos(angle);
    }

    /* ********************************************************************** */
    /* Getters and Setters */
    /* ********************************************************************** */
    get x() { return this._x; }
    get y() { return this._y; }
    get angle() { return Math.atan2(this._y, this._x) * 180 / Math.PI; }
    set x(value) { this._x = value; }
    set y(value) { this._y = value; }
}