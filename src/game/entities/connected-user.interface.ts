interface Room {
    roomId: string;                     // Just in case
    gameId: number;                     // id of the game, to easy access
    gameLoop: NodeJS.Timeout | null;  // To delete the setInterval()
    leftTeam: Array<Player>;
    rightTeam: Array<Player>;
    isLive: boolean;
}
