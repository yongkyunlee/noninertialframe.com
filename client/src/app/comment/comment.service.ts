import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, where, orderBy, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { COMMENTS_COLLECTION } from '../shared/constants';

import { Comment, CommentDoc } from './comment.model';

@Injectable({
    providedIn: 'root'
})
export class CommentSerivce {
    constructor(private firestore: Firestore) { }

    getComments(collectionName: string, docId: string): Observable<CommentDoc[]> {
        const commentsCollection = collection(this.firestore, collectionName, docId, COMMENTS_COLLECTION);
        const q = query(commentsCollection, orderBy('timestamp', 'desc'));
        return collectionData(q, { idField: 'id' }).pipe(
            map(comments => {
                return comments.map(comment => {
                    if (comment['timestamp'] && (comment['timestamp'] as any).toDate) {
                        comment['timestamp'] = (comment['timestamp'] as any).toDate();
                    }
                    return comment as CommentDoc;
                });
            })
        );
    }

    createComment(collectionName: string, docId: string, comment: Comment) {
        const commentsCollection = collection(this.firestore, collectionName, docId, COMMENTS_COLLECTION);
        return addDoc(commentsCollection, comment);
    }

    updateComment(collectionName: string, docId: string, commentDoc: CommentDoc) {
        const commentDocRef = doc(this.firestore, collectionName, docId, COMMENTS_COLLECTION, commentDoc.id);
        return updateDoc(commentDocRef, {
            content: commentDoc.content
        });
    }

    deleteComment(collectionName: string, docId: string, commentId: string) {
        const commentDocRef = doc(this.firestore, collectionName, docId, COMMENTS_COLLECTION, commentId);
        return deleteDoc(commentDocRef);
    }
}
