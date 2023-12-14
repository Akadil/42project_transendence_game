export class Player {
    public socketId: string;
    public userId: string;
    public username: string;
    public roomId: string;
    public isLive: boolean;
    public authenticated: boolean;

    constructor(data: Partial<Player> = {}) {
        this.socketId = data.socketId || '-1';
        this.userId = data.userId || '-1';
        this.username = data.username || 'Unknown';
        this.roomId = data.roomId || '-1';
        this.isLive = data.isLive || false;
        this.authenticated = data.authenticated || false;
    }
}
