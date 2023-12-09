export class MatchmakingDto {
    roomId: string;
    ready: boolean;
    player: string;
    opponents: Array<string>;
}
