import initilizationAuthentication from "@/firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

initilizationAuthentication();

const auth = getAuth();

const googleProvider = new GoogleAuthProvider();

export const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const googleLogin = () => {
    return signInWithPopup(auth, googleProvider)
}




