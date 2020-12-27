export interface ProjectSnippet {
    titleEng: string;
    titleKor: string;
    descriptionEng: string;
    descriptionKor: string;
    notesKor: string[];
    notesEng: string[];
    links: { [key: string]: string };
    date: string; // date is for ordering purpose
}

export interface ProjectDoc extends ProjectSnippet {
    id: string;
}
