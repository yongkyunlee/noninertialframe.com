import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Comment, CommentDoc } from './comment.model';

@Injectable({
    providedIn: 'root'
})
export class CommentSerivce {
    constructor(private afs: AngularFirestore) { }

    getComments(collection: string, docId: string) {
        return this.afs.collection(collection).doc(docId).collection(
                'comments', ref => ref.orderBy('timestamp', 'desc'))
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(a => {
                        return {
                            id: a.payload.doc.id,
                            ...a.payload.doc.data() as Comment
                        };
                    });
                })
            );
    }

    createComment(collection: string, docId: string, comment: Comment) {
        return this.afs.collection(collection).doc(docId).collection('comments')
                       .add(comment);
    }

    updateComment(collection: string, docId: string, commentId: string, comment: Comment) {
        return this.afs.collection(collection).doc(docId).collection('comments')
                       .doc(commentId).set(comment);
    }

    deleteComment(collection: string, docId: string, commentId: string) {
        return this.afs.collection(collection).doc(docId).collection('comments')
                       .doc(docId).delete();
    }
}
