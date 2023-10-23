/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   test_empty_if.js                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: akalimol <akalimol@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/23 18:49:21 by akalimol          #+#    #+#             */
/*   Updated: 2023/10/23 18:52:08 by akalimol         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/**
 * @brief   check if I can have empty body in if statement
 * 
 * @result  Yes, I can have
 */
function checkIfStatement() {
    let a = 1;

    if (a == 2) { }
    else if (a == 1) {
        console.log("a is 1");
    }
    else {
        console.log("a is not 1");
    }
}

checkIfStatement();
console.log("end");