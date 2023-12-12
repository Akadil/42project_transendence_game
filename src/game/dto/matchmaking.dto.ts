export class MatchmakingDto {
    status_code: number = 200;
    ready: boolean = false;
    message: string = 'Ok';
    roomId: string;
    player: string;
    opponents: Array<string>;
}
