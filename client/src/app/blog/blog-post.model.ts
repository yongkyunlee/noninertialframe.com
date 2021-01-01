export interface BlogPost {
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
