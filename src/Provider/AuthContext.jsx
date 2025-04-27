import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebase.config';
import firebase from "firebase/compat/app";


// Create Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe(); 
  }, []);

  const googleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await auth.signInWithPopup(provider);
      const user = result.user;
      console.log('Google sign-in successful:', user);
      return user; 
    } catch (error) {
      console.error('Google sign-in error:', error.message);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await auth.signOut();
      console.log('User logged out');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
