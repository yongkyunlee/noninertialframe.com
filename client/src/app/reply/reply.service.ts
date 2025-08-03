import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, query, orderBy, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { COMMENTS_COLLECTION, REPLIES_COLLECTION } from '../shared/constants';
import { Reply, ReplyDoc } from './reply.model';

@Injectable({
    providedIn: 'root'
})
export class ReplyService {
    private firestore = inject(Firestore);

    getReplies(collectionName: string, docId: string, commentId: string): Observable<ReplyDoc[]> {
        const repliesCollection = collection(this.firestore, collectionName, docId, COMMENTS_COLLECTION, commentId, REPLIES_COLLECTION);
        const q = query(repliesCollection, orderBy('timestamp', 'asc'));
        return collectionData(q, { idField: 'id' }).pipe(
            map(replies => {
                return replies.map(reply => {
                    if (reply['timestamp'] && (reply['timestamp'] as { toDate?: () => Date }).toDate) {
                        reply['timestamp'] = (reply['timestamp'] as { toDate: () => Date }).toDate();
                    }
                    return reply as ReplyDoc;
                });
            })
        );
    }

    createReply(collectionName: string, docId: string, commentId: string, reply: Reply) {
        const repliesCollection = collection(this.firestore, collectionName, docId, COMMENTS_COLLECTION, commentId, REPLIES_COLLECTION);
        return addDoc(repliesCollection, reply);
    }

    updateReply(collectionName: string, docId: string, commentId: string, replyDoc: ReplyDoc) {
        const replyDocRef = doc(this.firestore, collectionName, docId, COMMENTS_COLLECTION, commentId, REPLIES_COLLECTION, replyDoc.id);
        return updateDoc(replyDocRef, {
            content: replyDoc.content
        });
    }

    deleteReply(collectionName: string, docId: string, commentId: string, replyId: string) {
        const replyDocRef = doc(this.firestore, collectionName, docId, COMMENTS_COLLECTION, commentId, REPLIES_COLLECTION, replyId);
        return deleteDoc(replyDocRef);
    }
}
