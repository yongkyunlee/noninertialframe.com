export interface Comment {
    userId: string;
    nickname: string;
    timestamp: Date;
    content: string;
}

export interface CommentDoc extends Comment {
    id: string;
}
