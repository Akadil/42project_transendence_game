/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   test_instance_nature2.js                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: akalimol <akalimol@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/23 18:35:57 by akalimol          #+#    #+#             */
/*   Updated: 2023/10/23 18:39:40 by akalimol         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/**
 * @brief  This file is used to test the nature of the instance.
 * 
 * @result  It works. The instance can identify itself.
 */
class B {
    constructor(parent) {
        this._parent = parent;
    }

    something() {
        if (this === this._parent._b1) {
            console.log("I am b1");
        } else {
            console.log("I am b2");
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

a.b1.something();   // I am b1
a.b2.something();   // I am b2


