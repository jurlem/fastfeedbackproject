import firebase from './firebase'

const firestore = firebase.firestore();

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true })
}
// this adds data to uid

export function createSite(data) {
  const site = firestore.collection('sites').doc()
  site.set(data)
  return site
}
export function createFeedback(data) {
  return firestore
    .collection('feedback')
    .add(data)
}
export function deleteFeedback(uid) {
  return firestore
    .collection('feedback').doc(uid).update({ status: 'removed' })
  // instead of .delete() we do sof delete where update status
}


export async function updateFeedback(id, newValue) {
  return firestore
    .collection('feedback')
    .doc(id)
    .update(newValue)
}
