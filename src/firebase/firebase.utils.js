import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';;


const config = {
    apiKey: "AIzaSyAVvGgdwU6urSTEmgMAnRjdI5BgcgchQtQ",
    authDomain: "e-com-react-1126a.firebaseapp.com",
    projectId: "e-com-react-1126a",
    storageBucket: "e-com-react-1126a.appspot.com",
    messagingSenderId: "752021762440",
    appId: "1:752021762440:web:6492881b1333f529ce0a3d"
  };


  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
    return userRef;
  };

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase