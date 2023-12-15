import { Game } from './Game';
import { Player } from './Player';

export class Room {
    public id: string;
    public game: Game | null = null;
    private _gameMode: string = '1v1';
    public gameLoop: NodeJS.Timeout | null = null;
    public leftTeam: Array<Player> = new Array<Player>();
    public rightTeam: Array<Player> = new Array<Player>();
    public spectators: Array<Player> = new Array<Player>();
    private _teamLength: number = 1;

    constructor(data: Partial<Room> = {}) {
        this.id = data.id;
        if (data.gameMode) {
            this._gameMode = data.gameMode;
            if (this.gameMode === '1v1') {
                this._teamLength = 1;
            } else if (this.gameMode === '2v2') {
                this._teamLength = 2;
            } else {
                throw new Error('Wrong game mode'); // Custom error
            }
        }
    }

    add_leftTeam(player: Player) {
        if (this.leftTeam.length <= this._teamLength) {
            this.leftTeam.push(player);
            player.roomId = this.id;
        } else {
            throw new Error('Room is full'); // Custom error
        }
    }

    add_rightTeam(player: Player) {
        if (this.rightTeam.length <= this._teamLength) {
            this.rightTeam.push(player);
            player.roomId = this.id;
        } else {
            throw new Error('Room is full'); // Custom error
        }
    }

    add_player(player: Player) {
        if (this.leftTeam.length < this._teamLength) {
            this.add_leftTeam(player);
        } else if (this.rightTeam.length < this._teamLength) {
            this.add_rightTeam(player);
        } else {
            throw new Error('Room is full'); // Custom error
        }
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

    get gameMode(): string {
        return this.gameMode;
    }

    set gameMode(gameMode: string) {
        if (gameMode === '1v1') {
            this._teamLength = 1;
            while (this.rightTeam.length > this._teamLength) {
                this.remove_rightTeam(this.rightTeam[0]);
            }
            while (this.leftTeam.length > this._teamLength) {
                this.remove_leftTeam(this.leftTeam[0]);
            }
        } else if (gameMode === '2v2') {
            this._teamLength = 2;
        } else {
            throw new Error('Wrong game mode'); // Custom error
        }
    }
}
