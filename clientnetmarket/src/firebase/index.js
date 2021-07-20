import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDv5HuveA6WKMW1bOULl-KlCsIjrNIYCIU",
  authDomain: "marketnet-ac902.firebaseapp.com",
  projectId: "marketnet-ac902",
  storageBucket: "marketnet-ac902.appspot.com",
  messagingSenderId: "232238479096",
  appId: "1:232238479096:web:7c78a97c49a734ac282d0d",
};

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

//servicio de bd
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    const uploadProcess = storage
      .ref(`images/${file.name}-${file.lastModified}`)
      .put(file);

    uploadProcess.on(
      "state_changed",
      (snapshot) => console.log("la imagen se esta subiendo", snapshot),
      reject,
      () => {
        storage
          .ref("images")
          .child(`${file.name}-${file.lastModified}`)
          .getDownloadURL()
          .then(resolve);
      }
    );
  });
};
