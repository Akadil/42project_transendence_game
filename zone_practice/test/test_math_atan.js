/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   test_math_atan.js                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: akalimol <akalimol@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/23 19:19:45 by akalimol          #+#    #+#             */
/*   Updated: 2023/10/23 19:25:00 by akalimol         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/**
 * @brief   Test atan function.
 * 
 * @result  Works, but gives radians, not degrees
 */
function test_atan() {
    console.log(`For the values: {x: 1, y: 0} -> ` + Math.atan2(0, 1) * 180 / Math.PI);
    console.log(`For the values: {x: 1, y: 1} -> ` + Math.atan2(1, 1) * 180 / Math.PI);
    console.log(`For the values: {x: 0, y: 1} -> ` + Math.atan2(1, 0) * 180 / Math.PI);
    console.log(`For the values: {x: -1, y: 1} -> ` + Math.atan2(1, -1) * 180 / Math.PI);
    console.log(`For the values: {x: -1, y: 0} -> ` + Math.atan2(0, -1) * 180 / Math.PI);
}

console.log("Test atan function");
test_atan();