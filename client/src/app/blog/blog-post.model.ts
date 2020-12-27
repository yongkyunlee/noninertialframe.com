export interface NewBlogPost {
    titleEng: string;
    titleKor: string;
    date: string;
    keywordsEng: string[];
    keywordsKor: string[];
    category: string;
    contentEng: string;
    contentKor: string;
}

export interface BlogPost extends NewBlogPost {
    id: string;
}
