import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyAlJ1uc_GA8WZeF-9FWYIOlcZ-cPlL4CS0',
  authDomain: 'treez-db-baik.firebaseapp.com',
  databaseURL: 'https://treez-db-baik.firebaseio.com',
  projectId: 'treez-db-baik',
  storageBucket: 'treez-db-baik.appspot.com',
  messagingSenderId: '1412534576',
  appId: '1:1412534576:web:853bd992c457958bd3f8f5',
  measurementId: 'G-4DFZJNYYJL'
}

export const createUserProfileDocument = async (
  userAuth: firebase.User | null,
  additionalData?: any
) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

export const addCollections = async (collectionKey: string, items: any) => {
  const collectionRef = firestore.collection(collectionKey)

  const batch = firestore.batch()
  items.forEach((i: any) => {
    const newDocRef = collectionRef.doc()
    batch.set(newDocRef, i)
  })

  return await batch.commit()
}

export const convertSnapshotToMap = (
  inventory: firebase.firestore.QuerySnapshot
) => {
  const transformedInventory = inventory.docs.map(
    (doc: firebase.firestore.QueryDocumentSnapshot) => {
      const { title, items } = doc.data()

      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      }
    }
  )
  return transformedInventory
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
