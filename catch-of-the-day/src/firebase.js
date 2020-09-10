import firebase from "firebase/app"
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  appId: process.env.REACT_APP_ID
})

const firebaseDB = firebaseApp.database()

export { firebaseApp }
export default firebaseDB