import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "recommender-d7989.firebaseapp.com",
  databaseURL: "https://recommender-d7989.firebaseio.com",
  projectId: "recommender-d7989",
  storageBucket: "recommender-d7989.appspot.com",
  messagingSenderId: "209342714581",
  appId: "1:209342714581:web:8442e4e28c54fbc4"
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  isInitialized(){
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout(){
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name
    });
  }

  getCurrentUsername(){
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  async getRecommendations() {
    const recommendations = await this.db.collection('recommendations').get();
    return recommendations;
  }

  addRecommendation(recommendation) {
    if(!this.auth.currentUser) {
      return alert('Not Authorized');
    }
    return this.db.collection('recommendations').add({
      recommendation
    })
  }

  deleteRecommendation(id) {
    return this.db.collection('recommendation').doc(id).delete();
  }

}

export default new Firebase();