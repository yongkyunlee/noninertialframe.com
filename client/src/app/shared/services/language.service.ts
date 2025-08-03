import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    language = localStorage.getItem('language') ? localStorage.getItem('language') as string
                                                : 'english';

    chooseLanguage(language: string) {
        this.language = language;
        localStorage.setItem('language', language);
    }
}
