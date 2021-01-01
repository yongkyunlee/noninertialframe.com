import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { BLOG_COLLECTION, COMMENT_COLLECTION, REPLY_COLLECTION } from './constants';

export { recordCreateComment, recordUpdateComment, recordDeleteComment } from './user-activity/comment-activity';
export { recordCreateReply, recordUpdateReply, recordDeleteReply } from './user-activity/reply-activity';

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

export const updateNCommentsOnCreate = functions.firestore
    .document(`${BLOG_COLLECTION}/{postId}/${COMMENT_COLLECTION}/{commentId}`)
    .onCreate((snap, context) => {
        admin.firestore().collection(BLOG_COLLECTION).doc(context.params.postId).update({
            nComments: admin.firestore.FieldValue.increment(1),
        })
        .then(() => {
            console.log(`${BLOG_COLLECTION}/${context.params.postId} nComments incremeneted`);
        })
        .catch(err => {
            console.error(err);
        });
    });

export const updateNCommentsOnDelete = functions.firestore
    .document(`${BLOG_COLLECTION}/{postId}/${COMMENT_COLLECTION}/{commentId}`)
    .onDelete((snap, context) => {
        admin.firestore().collection(BLOG_COLLECTION).doc(context.params.postId).update({
            nComments: admin.firestore.FieldValue.increment(-1),
        })
        .then(() => {
            console.log(`${BLOG_COLLECTION}/${context.params.postId} nComments decremented`);
        })
        .catch(err => {
            console.error(err);
        });
    });

export const updateNRepliesOnCreate = functions.firestore
    .document(`${BLOG_COLLECTION}/{postId}/${COMMENT_COLLECTION}/{commentId}/${REPLY_COLLECTION}/{replyId}`)
    .onCreate((snap, context) => {
        admin.firestore().collection(BLOG_COLLECTION).doc(context.params.postId)
            .collection(COMMENT_COLLECTION).doc(context.params.commentId).update({
                nReplies: admin.firestore.FieldValue.increment(1),
            })
        .then(() => {
            console.log(`${BLOG_COLLECTION}/${context.params.postId}/${COMMENT_COLLECTION}/${context.params.commentId} nReplies incremented`);
        })
        .catch(err => {
            console.error(err);
        });
    });

export const updateNRepliesOnDelete = functions.firestore
    .document(`${BLOG_COLLECTION}/{postId}/${COMMENT_COLLECTION}/{commentId}/${REPLY_COLLECTION}/{replyId}`)
    .onDelete((snap, context) => {
        admin.firestore().collection(BLOG_COLLECTION).doc(context.params.postId)
            .collection(COMMENT_COLLECTION).doc(context.params.commentId).update({
                nReplies: admin.firestore.FieldValue.increment(-1),
            })
        .then(() => {
            console.log(`${BLOG_COLLECTION}/${context.params.postId}/${COMMENT_COLLECTION}/${context.params.commentId} nReplies decremented`);
        })
        .catch(err => {
            console.error(err);
        });
    });
