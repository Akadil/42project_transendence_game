import { Game } from './Game';
import { Player } from './Player';

export class Room {
    public id: string;
    public game: Game | null = null;
    public leftTeam: Array<Player> = new Array<Player>();
    public rightTeam: Array<Player> = new Array<Player>();
    public gameLoop: NodeJS.Timeout | null = null;

    constructor(data: Partial<Room> = {}) {
        this.id = data.id;
        if (data.leftTeam) {
            this.add_leftTeam(data.leftTeam[0]);
        }
        if (data.rightTeam) {
            this.add_rightTeam(data.rightTeam[0]);
        }
    }

    add_leftTeam(player: Player) {
        this.leftTeam.push(player);
        player.roomId = this.id;
    }

    add_rightTeam(player: Player) {
        this.rightTeam.push(player);
        player.roomId = this.id;
    }

    remove_leftTeam(player: Player) {
        const index = this.leftTeam.indexOf(player);

        if (index > -1) {
            this.leftTeam.splice(index, 1);
            player.roomId = '-1';
        }
    }

    remove_rightTeam(player: Player) {
        const index = this.rightTeam.indexOf(player);

        if (index > -1) {
            this.rightTeam.splice(index, 1);
            player.roomId = '-1';
        }
    }
}
