import { Component, Input } from '@angular/core';
import { BlogSnippet } from '../../models/blog-snippet.model';

@Component({
    selector: 'app-blog-snippet',
    templateUrl: './blog-snippet.component.html',
    styleUrls: ['./blog-snippet.component.scss']
})
export class BlogSnippetComponent {
    @Input() language: string;
    @Input() blogSnippet: BlogSnippet;
}
