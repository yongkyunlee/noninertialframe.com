import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, orderBy, limit, where, addDoc, doc, updateDoc } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { BlogPost, BlogPostDoc } from './blog-post.model';
import { BLOG_COLLECTION } from '../shared/constants';

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    constructor(private firestore: Firestore) { }

    getBlogSnippets(): Observable<BlogPostDoc[]> {
        const blogCollection = collection(this.firestore, BLOG_COLLECTION);
        const q = query(blogCollection, orderBy('date', 'desc'));
        return collectionData(q, { idField: 'id' }) as Observable<BlogPostDoc[]>;
    }

    getBlogFieldValues(fields: string[]): Observable<any[]> {
        const blogCollection = collection(this.firestore, BLOG_COLLECTION);
        return collectionData(blogCollection).pipe(
            map(docs => {
                return docs.map(data => {
                    const fieldValues: { [key: string]: string } = { };
                    for (const field of fields) {
                        fieldValues[field] = (data as any)[field];
                    }
                    return fieldValues;
                });
            })
        );
    }

    getBlogPostByTitle(titleEng: string): Observable<BlogPostDoc[]> {
        const blogCollection = collection(this.firestore, BLOG_COLLECTION);
        const q = query(blogCollection, where('titleEng', '==', titleEng));
        return collectionData(q, { idField: 'id' }) as Observable<BlogPostDoc[]>;
    }

    getRecentBlogPosts(count: number): Observable<BlogPostDoc[]> {
        const blogCollection = collection(this.firestore, BLOG_COLLECTION);
        const q = query(blogCollection, orderBy('date', 'desc'), limit(count));
        return collectionData(q, { idField: 'id' }) as Observable<BlogPostDoc[]>;
    }

    createBlogPost(blogPost: BlogPost) {
        const blogCollection = collection(this.firestore, BLOG_COLLECTION);
        return addDoc(blogCollection, blogPost);
    }

    updateBlogPost(docId: string, blogPost: BlogPost) {
        const blogDoc = doc(this.firestore, BLOG_COLLECTION, docId);
        return updateDoc(blogDoc, { ...blogPost });
    }
}