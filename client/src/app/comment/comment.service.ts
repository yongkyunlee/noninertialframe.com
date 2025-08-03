import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { COMMENTS_COLLECTION } from '../shared/constants';

import { Comment, CommentDoc } from './comment.model';

@Injectable({
    providedIn: 'root'
})
export class CommentSerivce {
    constructor(private afs: AngularFirestore) { }

    getComments(collectionName: string, docId: string): Observable<CommentDoc[]> {
        return this.afs.collection(collectionName).doc(docId).collection(
                COMMENTS_COLLECTION, ref => ref.orderBy('timestamp', 'desc'))
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(a => {
                        const comment = a.payload.doc.data() as Comment;
                        if (comment.timestamp && (comment.timestamp as any).toDate) {
                            comment.timestamp = (comment.timestamp as any).toDate();
                        }
                        return {
                            id: a.payload.doc.id,
                            ...comment
                        } as CommentDoc;
                    });
                })
            );
    }

    createComment(collectionName: string, docId: string, comment: Comment) {
        return this.afs.collection(collectionName).doc(docId).collection(COMMENTS_COLLECTION)
                       .add(comment);
    }

    updateComment(collectionName: string, docId: string, commentDoc: CommentDoc) {
        return this.afs.collection(collectionName).doc(docId).collection(COMMENTS_COLLECTION)
                       .doc(commentDoc.id).update({
                           content: commentDoc.content
                       });
    }

    deleteComment(collectionName: string, docId: string, commentId: string) {
        return this.afs.collection(collectionName).doc(docId).collection(COMMENTS_COLLECTION)
                       .doc(commentId).delete();
    }
}
