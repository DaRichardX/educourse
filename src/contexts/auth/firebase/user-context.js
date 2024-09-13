'use client';

import * as React from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { getFirebaseAuth } from '@/lib/auth/firebase/client';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { logger } from '@/lib/default-logger';

export const UserContext = React.createContext(undefined);

export function UserProvider({ children }) {
  const [firebaseAuth] = React.useState(getFirebaseAuth());
  const firestore = getFirestore();

  const [state, setState] = React.useState({
    user: null,
    userData: null,
    error: null,
    isLoading: true,
  });

  async function getUserData(uid) {
    try {
      const userDocRef = doc(firestore, 'users', uid); // Reference to the user's document
      const userDoc = await getDoc(userDocRef); // Fetch the document from Firestore

      if (userDoc.exists()) {
        const userdata = userDoc.data();
        logger.debug('[Auth] userData:', userdata);

        setState((prev) => ({
          ...prev,
          user:
            {
                id: uid,
                email: userdata.email,
                name: `${userdata.first_name} ${userdata.last_name}`,
                avatar: "avatar-default.jpg",
            },
          userData: userdata,
          error: null,
          isLoading: false,
        }));

        return userdata;
      } 
        logger.debug(`[Auth] userData document not found for ${  uid}`);
      
    } catch (error) {
      logger.debug('[Auth] Error fetching userData:', error);
    }
  }

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      logger.debug('[Auth] onAuthStateChanged:', user);

      if(user){
        setState((prev) => ({
          ...prev,
          user: user
            ? {
                id: user.uid,
                email: user.email,
                name: "Loading...",
                avatar: "avatar-default.jpg",
              }
            : null,
          error: null,
          isLoading: false,
        }));
        getUserData(user.uid);
      }else{
        setState((prev) => ({
          ...prev,
          user: user
            ? {
                id: user.uid,
                email: user.email ?? undefined,
                name: user.displayName ?? undefined,
                avatar: user.photoURL ?? undefined,
              }
            : null,
          error: null,
          isLoading: false,
        }));

      }
    });


    

    return () => {
      unsubscribe();
    };
  }, [firebaseAuth]);

  return <UserContext.Provider value={{ ...state }}>{children}</UserContext.Provider>;
}

export const UserConsumer = UserContext.Consumer;
