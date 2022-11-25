import React, { createContext, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.init';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const loginWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }

    // logOut
    const logout = () => {
        return signOut(auth);
    }

    // Update profile

    const updateUser = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }
    const authInfo = {
        user,
        setLoader,
        createUser,
        signIn,
        logout,
        updateUser,
        loginWithGoogle
    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;