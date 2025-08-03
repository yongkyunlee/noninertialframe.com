import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { COMMENTS_COLLECTION, REPLIES_COLLECTION } from '../shared/constants';
import { Reply, ReplyDoc } from './reply.model';

@Injectable({
    providedIn: 'root'
})
export class ReplyService {
    constructor(private afs: AngularFirestore) { }

    getReplies(collectionName: string, docId: string, commentId: string): Observable<ReplyDoc[]> {
        return this.afs.collection(collectionName).doc(docId).collection(COMMENTS_COLLECTION)
                       .doc(commentId).collection(REPLIES_COLLECTION, ref => ref.orderBy('timestamp', 'asc'))
                    .snapshotChanges()
                    .pipe(
                        map(actions => {
                            return actions.map(a => {
                                const reply = a.payload.doc.data() as Reply;
                                if (reply.timestamp && (reply.timestamp as any).toDate) {
                                    reply.timestamp = (reply.timestamp as any).toDate();
                                }
                                return {
                                    id: a.payload.doc.id,
                                    ...reply
                                } as ReplyDoc;
                            });
                        })
                    );
    }

    createReply(collectionName: string, docId: string, commentId: string, reply: Reply) {
        return this.afs.collection(collectionName).doc(docId).collection(COMMENTS_COLLECTION)
                       .doc(commentId).collection(REPLIES_COLLECTION).add(reply);
    }

    updateReply(collectionName: string, docId: string, commentId: string, replyDoc: ReplyDoc) {
        return this.afs.collection(collectionName).doc(docId).collection(COMMENTS_COLLECTION)
                       .doc(commentId).collection(REPLIES_COLLECTION)
                       .doc(replyDoc.id).update({
                           content: replyDoc.content
                       });
    }

    deleteReply(collectionName: string, docId: string, commentId: string, replyId: string) {
        return this.afs.collection(collectionName).doc(docId).collection(COMMENTS_COLLECTION)
                       .doc(commentId).collection(REPLIES_COLLECTION)
                       .doc(replyId).delete();
    }
}
