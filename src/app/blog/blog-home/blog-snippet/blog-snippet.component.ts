import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-blog-snippet',
    templateUrl: './blog-snippet.component.html',
    styleUrls: ['./blog-snippet.component.scss']
})
export class BlogSnippetComponent {
    @Input() title: string;
    @Input() date: string;
    @Input() keywords: string[];
    @Input() category: string;
}
