import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { BLOG_COLLECTION, REPLY_COLLECTION, USER_ACTIVITY_COLLECTION,
         REPLY_ACTIVITY_COLLECTION } from './constants';

export const recordCreateReply = functions.firestore
    .document(`${BLOG_COLLECTION}/{postId}/comments/{commentId}/${REPLY_COLLECTION}/{replyId}`)
    .onCreate((snap, context) => {
        const newReply = snap.data();
        const newActivity = {
            action: 'create',
            timestamp: newReply.timestamp,
            postId: context.params.postId,
            commentId: context.params.commentId,
            replyId: context.params.replyId,
            content: newReply.content,
            createdAt: newReply.timestamp,
            nickname: newReply.nickname,
        };

        admin.firestore().collection(USER_ACTIVITY_COLLECTION).doc(newReply.userId)
                .collection(REPLY_ACTIVITY_COLLECTION).add(newActivity)
            .then(() => {
                console.log(newActivity);
            })
            .catch(err => {
                console.error(err);
            });
    });

export const recordUpdateReply = functions.firestore
    .document(`${BLOG_COLLECTION}/{postId}/comments/{commentId}/${REPLY_COLLECTION}/{replyId}`)
    .onUpdate((change, context) => {
        const newReply = change.after.data();
        const previousReply = change.before.data();
        const newActivity = {
            action: 'update',
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            postId: context.params.postId,
            commentId: context.params.commentId,
            replyId: context.params.replyId,
            newContent: newReply.content,
            previousContent: previousReply.content,
            createdAt: previousReply.timestamp,
            nickname: previousReply.nickname,
        };

        admin.firestore().collection(USER_ACTIVITY_COLLECTION).doc(previousReply.userId)
                .collection(REPLY_ACTIVITY_COLLECTION).add(newActivity)
            .then(() => {
                console.log(newActivity);
            })
            .catch(err => {
                console.error(err);
            });
    });

export const recordDeleteReply = functions.firestore
    .document(`${BLOG_COLLECTION}/{postId}/comments/{commentId}/${REPLY_COLLECTION}/{replyId}`)
    .onDelete((snap, context) => {
        const deletedReply = snap.data();
        const newActivity = {
            action: 'delete',
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            postId: context.params.postId,
            commentId: context.params.commentId,
            replyId: context.params.replyId,
            content: deletedReply.content,
            createdAt: deletedReply.timestamp,
            nickname: deletedReply.nickname,
        };

        admin.firestore().collection(USER_ACTIVITY_COLLECTION).doc(deletedReply.userId)
                .collection(REPLY_ACTIVITY_COLLECTION).add(newActivity)
            .then(() => {
                console.log(newActivity);
            })
            .catch(err => {
                console.error(err);
            });
    });