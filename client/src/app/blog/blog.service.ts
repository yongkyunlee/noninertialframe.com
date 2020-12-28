import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { filter, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { BlogPost, NewBlogPost } from './blog-post.model';
import { mockBlogPostData } from '../shared/mock-data.data';
import { BLOG_COLLECTION } from '../shared/constants';

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    constructor(private afs: AngularFirestore) { }

    private mockBlogSnippets$: BehaviorSubject<BlogPost[]> = new BehaviorSubject<BlogPost[]>(mockBlogPostData);

    getBlogSnippets() {
        return this.afs.collection(
                BLOG_COLLECTION, ref => ref.orderBy('date', 'desc'))
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(a => {
                        return {
                            id: a.payload.doc.id,
                            ...a.payload.doc.data() as NewBlogPost
                        };
                    });
                })
            );
        // return this.mockBlogSnippets$;
    }

    getBlogFieldValues(fields: string[]) {
        return this.afs.collection(BLOG_COLLECTION)
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(a => {
                        const data = a.payload.doc.data() as any;
                        const fieldValues: { [key: string]: string } = { };
                        for (const field of fields) {
                            fieldValues[field] = data[field];
                        }
                        return fieldValues;
                    });
                })
            );
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
                            ...a.payload.doc.data() as NewBlogPost
                        };
                    });
                })
            );
        // return this.mockBlogSnippets$.pipe(
        //     map(posts => [posts.find(post => post.titleEng === titleEng)])
        // );
    }

    uploadBlogPost(blogPost: NewBlogPost) {
        return this.afs.collection<NewBlogPost>(BLOG_COLLECTION).add(blogPost);
    }

    updateBlogPost(docId: string, blogPost: NewBlogPost) {
        return this.afs.collection<NewBlogPost>(BLOG_COLLECTION).doc(docId).set(blogPost);
    }
}
