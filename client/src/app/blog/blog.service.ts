import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { BlogPost, BlogPostDoc } from './blog-post.model';
import { BLOG_COLLECTION } from '../shared/constants';

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    constructor(private afs: AngularFirestore) { }

    getBlogSnippets(): Observable<BlogPostDoc[]> {
        return this.afs.collection(BLOG_COLLECTION, ref => ref.orderBy('date', 'desc'))
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(a => {
                        return {
                            id: a.payload.doc.id,
                            ...a.payload.doc.data() as BlogPost
                        } as BlogPostDoc;
                    });
                })
            );
    }

    getBlogFieldValues(fields: string[]): Observable<any[]> {
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

    getBlogPostByTitle(titleEng: string): Observable<BlogPostDoc[]> {
        return this.afs.collection(BLOG_COLLECTION, ref => ref.where('titleEng', '==', titleEng))
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(a => {
                        return {
                            id: a.payload.doc.id,
                            ...a.payload.doc.data() as BlogPost
                        } as BlogPostDoc;
                    });
                })
            );
    }

    getRecentBlogPosts(count: number): Observable<BlogPostDoc[]> {
        return this.afs.collection(BLOG_COLLECTION, ref => ref.orderBy('date', 'desc').limit(count))
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(a => {
                        return {
                            id: a.payload.doc.id,
                            ...a.payload.doc.data() as BlogPost
                        } as BlogPostDoc;
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