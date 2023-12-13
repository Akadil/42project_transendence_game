import { Game } from "../objects/Game";

export interface Room {
    id: string;
    game: Game | null;
    leftTeam: Array<Player>;
    rightTeam: Array<Player>;
    
    gameLoop: NodeJS.Timeout | null;  // The loop of the game
    isLive: boolean;                    // Is the game live
}
