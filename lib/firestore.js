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
  return firestore
    .collection('sites')
    .add(data)
}
export function createFeedback(data) {
  return firestore
    .collection('feedback')
    .add(data)
}
