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
    error: null,
    isLoading: true,
  });

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      logger.debug('[Auth] onAuthStateChanged:', user);
      if (user) {
        try {
          const fetchedUserData = await getUserData(user.uid);
          setState({
            user: {
              id: user.uid,
              email: user.email,
              ...fetchedUserData, // Spread all fetched user data into state
            },
            error: null,
            isLoading: false,
          });
        } catch (error) {
          logger.debug('[Auth] Error fetching userData:', error);
          setState((prev) => ({
            ...prev,
            user: null,
            error,
            isLoading: false,
          }));
        }
      } else {
        setState({
          user: null,
          error: null,
          isLoading: false,
        });
      }
    });

    async function getUserData(uid) {
      const userDocRef = doc(firestore, 'users', uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        logger.debug(`[Auth] userData document not found for ${uid}`);
        throw new Error('User data not found');
      }

      const userdata = userDoc.data();
      logger.debug('[Auth] userData:', userdata);

      const orgDocRef = doc(firestore, 'orgs', userdata.org_id);
      const orgDoc = await getDoc(orgDocRef);

      if (!orgDoc.exists()) {
        logger.debug(`[Auth] orgData document not found for ${userdata.org_id}`);
      }

      logger.debug('[Auth] orgData:', orgDoc.data());
      

      return {
        org_id: userdata.org_id,
        name: `${userdata.first_name} ${userdata.last_name}`,
        first_name: userdata.first_name,
        last_name: userdata.last_name,
        org_name: orgDoc.data()?.name || '',
        avatar: 'avatar-default.jpg',
        org_data: orgDoc.data() || '',
        isFetching: false,
      };
    }

    return () => unsubscribe();
  }, [firebaseAuth, firestore]);

  const getIdToken = () => {
    return firebaseAuth.currentUser?.getIdToken();
  };

  return (
    <UserContext.Provider value={{...state, getIdToken }}>
      {children}
    </UserContext.Provider>
  );
}

export const UserConsumer = UserContext.Consumer;