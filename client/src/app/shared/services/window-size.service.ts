import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WindowSizeService {
    screenWidth: number = window.innerWidth;
    smallScreenMaxWidth = 800;
}
