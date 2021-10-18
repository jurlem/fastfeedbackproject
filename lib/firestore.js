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
export function updateSiteSettings(id, data) {
  return firestore
    .collection('sites')
    .doc(id)
    .update({ settings: data })
}

export async function deleteSite(id) {
  firestore.collection('sites').doc(uid).delete()

  const snapshot = await firestore.collection('sites')
    .where('siteId', '==', id)
    .get()
  const feedback = []
  const batch = firestore.batch


  snapshot.forEach((doc) => {
    batch.delete(doc.ref)
  })
  return batch.commit()
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
