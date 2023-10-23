/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   test_instance_nature.js                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: akalimol <akalimol@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/23 11:17:09 by akalimol          #+#    #+#             */
/*   Updated: 2023/10/23 18:38:14 by akalimol         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/**
 * @brief  This file is used to test the nature of the instance.
 * 
 * @attention   I runned another test in test_instance_nature2.js
 * 
 * @result  It doesn't work. The instance is not the same.
 * @result  2 and 2 are printed.
 */
class B {
    constructor(parent) {
        this._parent = parent;
        if (this === this._parent._b1) {
            this._value = 1;
        } else {
            this._value = 2;
        }
    }

    get value() {
        return this._value;
    }
}

class A {
    constructor() {
        this._b1 = new B(this);
        this._b2 = new B(this);
    }

    operation() {
        console.log(this._b1.value);    // 2
        console.log(this._b2.value);    // 2
    }

    get b1() {
        return this._b1;
    }

    get b2() {
        return this._b2;
    }
}

const a = new A();

a.operation();
