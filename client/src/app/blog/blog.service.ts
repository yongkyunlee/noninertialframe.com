import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { BlogPost } from './blog-post.model';
import { BLOG_COLLECTION } from '../shared/constants';

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    constructor(private afs: AngularFirestore) { }

    // private mockBlogSnippets$: BehaviorSubject<BlogPost[]> = new BehaviorSubject<BlogPost[]>(mockBlogPostData);

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
                            ...a.payload.doc.data() as BlogPost
                        };
                    });
                })
            );
        // return this.mockBlogSnippets$.pipe(
        //     map(posts => [posts.find(post => post.titleEng === titleEng)])
        // );
    }

    getRecentBlogPosts(count: number) {
        return this.afs.collection(
                BLOG_COLLECTION, ref => ref.orderBy('date', 'desc').limit(count))
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

    createBlogPost(blogPost: BlogPost) {
        return this.afs.collection<BlogPost>(BLOG_COLLECTION).add(blogPost);
    }

    updateBlogPost(docId: string, blogPost: BlogPost) {
        return this.afs.collection<BlogPost>(BLOG_COLLECTION).doc(docId).update(blogPost);
    }
}
