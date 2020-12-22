import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { BlogPost } from './models/blog-post.model';
import { mockBlogPostData } from '../shared/mock-data.data';
import { BLOG_COLLECTION } from '../shared/constants';

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    constructor(private afs: AngularFirestore) { }

    private mockBlogSnippets$: BehaviorSubject<any[]> = new BehaviorSubject<BlogPost[]>(mockBlogPostData);

    getBlogSnippets() {
        return this.afs.collection(
                BLOG_COLLECTION, ref => ref.orderBy('date', 'desc'))
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(a => {
                        return {
                            id: a.payload.doc.id,
                            ...a.payload.doc.data() as BlogPost
                        };
                    });
                })
            );
        // return this.mockBlogSnippets$;
    }

    getBlogPostByTitle(titleEng: string) {
        return this.afs.collection(
                BLOG_COLLECTION, ref => ref.where('titleEng', '==', titleEng))
                .snapshotChanges()
                .pipe(
                    map(actions => {
                        return actions.map(a => {
                            return {
                                id: a.payload.doc.id,
                                ...a.payload.doc.data() as BlogPost
                            };
                        });
                    })
                );
    }
}
