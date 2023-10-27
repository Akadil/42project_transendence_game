/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   test_multiplication2.js                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: akalimol <akalimol@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/27 15:53:14 by akalimol          #+#    #+#             */
/*   Updated: 2023/10/27 15:53:21 by akalimol         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/**
 * @brief   this one works
 */
function testMultiplication() {
    let num = 8;

    num /= 2 * 2;

    console.log(num);
}

/**
 * @brief   this one doesn't work
 */
function testMultiplicationConst() {
    const num = 8;

    num *= 2 * 2;

    console.log(num);
}

testMultiplication();
testMultiplicationConst();