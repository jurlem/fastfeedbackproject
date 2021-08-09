import firebase from './firebase'

const firestore = fireabse.firestore()

export function createuser(uid, data) {
  return firestore
    .collection('users')
    .document(uid)
    .set({ uid, ...data }, { merge: true })
}