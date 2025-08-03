export interface BlogPost {
    id?: string;
    titleEng: string;
    titleKor: string;
    date: string;
    keywordsEng: string[];
    keywordsKor: string[];
    category: string;
    contentEng: string;
    contentKor: string;
    nComments: number;
}

export interface BlogPostDoc extends BlogPost {
    id: string;
}
