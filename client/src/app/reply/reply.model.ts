export interface Reply {
    id?: string;
    userId: string;
    nickname: string;
    timestamp: Date;
    content: string;
}

export interface ReplyDoc extends Reply {
    id: string;
}
