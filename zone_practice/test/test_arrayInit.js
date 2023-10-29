/**
 * @brief       Check if the array is initialized correctly
 * 
 * @result      It is not the way to initialize an array
 */
function checkArrayInit() {
    const games = ["id", "game", "room", "playerOne", "playerOneReady", "playerTwo", "playerTwoReady", "isLive"];
    games.push({
        "id": 0,
        "game": 0,
        "room": 0,
        "playerOne": 0,
        "playerOneReady": 0,
        "playerTwo": 0,
        "playerTwoReady": 0,
        "isLive": 0
    })

    console.log("The array is: ", games);
    console.log("The array is: ", games[8]);
}

checkArrayInit();