import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

import { BlogSnippet } from './models/blog-snippet.model';
import { mockBlogSnippetData } from '../shared/mock-data.data';

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    constructor(private afs: AngularFirestore) { }

    private mockBlogSnippets$: BehaviorSubject<any[]> = new BehaviorSubject<BlogSnippet[]>(mockBlogSnippetData);

    getBlogSnippets() {
        // return this.afs.collection(
        //         'blog-snippets', ref => ref.orderBy('date', 'desc'))
        //     .snapshotChanges()
        //     .pipe(
        //         map(actions => {
        //             return actions.map(a => {
        //                 return {
        //                     id: a.payload.doc.id,
        //                     ...a.payload.doc.data() as BlogSnippet
        //                 };
        //             });
        //         })
        //     );
        return this.mockBlogSnippets$;
    }

    getBlogPosts() {

    }

    getBlogPostByTitle(title: string) {

    }
}
