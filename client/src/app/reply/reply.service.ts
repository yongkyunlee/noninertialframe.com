import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { COMMENTS_COLLECTION, REPLIES_COLLECTION } from '../shared/constants';
import { Reply, ReplyDoc } from './reply.model';

@Injectable({
    providedIn: 'root'
})
export class ReplyService {
    constructor(private afs: AngularFirestore) { }

    getReplies(collection: string, docId: string, commentId: string) {
        return this.afs.collection(collection).doc(docId).collection(COMMENTS_COLLECTION)
                       .doc(commentId).collection(REPLIES_COLLECTION, ref => ref.orderBy('timestamp', 'asc'))
                    .snapshotChanges()
                    .pipe(
                        map(actions => {
                            return actions.map(a => {
                                const reply = a.payload.doc.data();
                                reply.timestamp = reply.timestamp.toDate();
                                return {
                                    id: a.payload.doc.id,
                                    ...reply as Reply
                                };
                            });
                        })
                    );
    }

    createReply(collection: string, docId: string, commentId: string, reply: Reply) {
        return this.afs.collection(collection).doc(docId).collection(COMMENTS_COLLECTION)
                       .doc(commentId).collection(REPLIES_COLLECTION).add(reply);
    }

    updateReply(collection: string, docId: string, commentId: string, replyDoc: ReplyDoc) {
        return this.afs.collection(collection).doc(docId).collection(COMMENTS_COLLECTION)
                       .doc(commentId).collection(REPLIES_COLLECTION)
                       .doc(replyDoc.id).update({
                           content: replyDoc.content
                       });
    }

    deleteReply(collection: string, docId: string, commentId: string, replyId: string) {
        return this.afs.collection(collection).doc(docId).collection(COMMENTS_COLLECTION)
                       .doc(commentId).collection(REPLIES_COLLECTION)
                       .doc(replyId).delete();
    }
}
