export class MatchmakingDto {
    status_code: number;
    ready: boolean;
    message: string;
    roomId: string;
    player: string;
    opponents: Array<string>;

    constructor(data: Partial<MatchmakingDto> = {}) {
        this.status_code = data.status_code || 200;
        this.ready = data.ready || false;
        this.message = data.message || 'OK';
        this.roomId = data.roomId || '0';
        this.player = data.player || '-1';
        this.opponents = new Array<string>();
    }
}
