export interface Reply {
    userId: string;
    nickname: string;
    timestamp: Date;
    content: string;
}

export interface ReplyDoc extends Reply {
    id: string;
}