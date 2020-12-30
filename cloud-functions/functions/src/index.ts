import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { BLOG_COLLECTION, USER_ACTIVITY_COLLECTION } from './constants';

admin.initializeApp();

const auth = admin.auth();


interface ClaimsDocumentData extends admin.firestore.DocumentData {
    _lastCommitted?: admin.firestore.Timestamp
}

export const mirrorCustomClaims = functions.firestore
    .document('user-claims/{uid}')
    .onWrite(async (change, context) => {
        const beforeData: ClaimsDocumentData = change.before.data() || {};
        const afterData: ClaimsDocumentData = change.after.data() || {};

        // skip updates where _lastCommitted field changed
        const skipUpdate = beforeData._lastCommitted && afterData._lastCommitted &&
                           !beforeData._lastCommitted.isEqual(afterData._lastCommitted);
        if (skipUpdate) {
            return;
        }

        // Create a new JSON payload and check that it's under 1000 characters
        const { _lastCommitted, ...newClaims } = afterData;
        const stringifiedClaims = JSON.stringify(newClaims);
        if (stringifiedClaims.length > 1000) {
            console.error("Custom claims object string > 1000 characters");
            return;
        }

        const uid = context.params.uid;
        await auth.setCustomUserClaims(uid, newClaims);
        await change.after.ref.update({
            _lastCommitted: admin.firestore.FieldValue.serverTimestamp(),
            ...newClaims,
        });
    });

export const recordCreateComment = functions.firestore
    .document(`${BLOG_COLLECTION}/{postId}/comments/{commentId}`)
    .onCreate((snap, context) => {
        const newComment = snap.data();
        const newActivity = {
            action: 'create',
            timestamp: newComment.timestamp,
            postId: context.params.postId,
            commentId: context.params.commentId,
            content: newComment.content,
            createdAt: newComment.timestamp,
            nickname: newComment.nickname,
        };

        admin.firestore().collection(USER_ACTIVITY_COLLECTION).doc(newComment.userId)
                .collection('comments').add(newActivity)
            .then(() => {
                console.log(newActivity);
            })
            .catch(err => {
                console.error(err);
            });
    });

export const recordUpdateComment = functions.firestore
    .document(`${BLOG_COLLECTION}/{postId}/comments/{commentId}`)
    .onUpdate((change, context) => {
        const newComment = change.after.data();
        const previousComment = change.before.data();
        const newActivity = {
            action: 'update',
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            postId: context.params.postId,
            commentId: context.params.commentId,
            newContent: newComment.content,
            previousContent: previousComment.content,
            createdAt: previousComment.timestamp,
            nickname: previousComment.nickname,
        };

        admin.firestore().collection(USER_ACTIVITY_COLLECTION).doc(previousComment.userId)
                .collection('comments').add(newActivity)
            .then(() => {
                console.log(newActivity);
            })
            .catch(err => {
                console.error(err);
            });
    });

export const recordDeleteComment = functions.firestore
    .document(`${BLOG_COLLECTION}/{postId}/comments/{commentId}`)
    .onDelete((snap, context) => {
        const deletedComment = snap.data();
        const newActivity = {
            action: 'delete',
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            postId: context.params.postId,
            commentId: context.params.commentId,
            content: deletedComment.content,
            createdAt: deletedComment.timestamp,
            nickname: deletedComment.nickname,
        };

        admin.firestore().collection(USER_ACTIVITY_COLLECTION).doc(deletedComment.userId)
                .collection('comments').add(newActivity)
            .then(() => {
                console.log(newActivity);
            })
            .catch(err => {
                console.error(err);
            });
    });