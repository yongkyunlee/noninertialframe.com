import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { COMMENTS_COLLECTION } from '../shared/constants';

import { Comment, CommentDoc } from './comment.model';

@Injectable({
    providedIn: 'root'
})
export class CommentSerivce {
    constructor(private afs: AngularFirestore) { }

    getComments(collection: string, docId: string) {
        return this.afs.collection(collection).doc(docId).collection(
                COMMENTS_COLLECTION, ref => ref.orderBy('timestamp', 'desc'))
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(a => {
                        const comment = a.payload.doc.data();
                        comment.timestamp = comment.timestamp.toDate();
                        return {
                            id: a.payload.doc.id,
                            ...comment as Comment
                        };
                    });
                })
            );
    }

    createComment(collection: string, docId: string, comment: Comment) {
        return this.afs.collection(collection).doc(docId).collection(COMMENTS_COLLECTION)
                       .add(comment);
    }

    updateComment(collection: string, docId: string, commentDoc: CommentDoc) {
        return this.afs.collection(collection).doc(docId).collection(COMMENTS_COLLECTION)
                       .doc(commentDoc.id).update({
                           content: commentDoc.content
                       });
    }

    deleteComment(collection: string, docId: string, commentId: string) {
        return this.afs.collection(collection).doc(docId).collection(COMMENTS_COLLECTION)
                       .doc(commentId).delete();
    }
}
