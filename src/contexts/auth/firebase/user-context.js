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

  const [authStates, setAuthStates] = React.useState({
    isAuthenticated: false,
    error: null,
    isLoading: true,
  });

  const [userData, setUserData] = React.useState({
    uid: "",
    org_id: "",
    org_name: "",
    role: "",
    name: "",
    first_name: "",
    last_name: "",
    avatar: 'avatar-default.jpg',
  });

  const [orgData, setOrgData] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      logger.debug('[Auth] onAuthStateChanged:', user);
      // User is signing in
      if (user) {
        try {
          const fetchedUserData = await getUserData(user.uid); // Grabs the user doc on Firestore (uid)
          setUserData({
            uid: user.uid,
            org_id: fetchedUserData.org_id,
            org_name: fetchedUserData.org_name,
            role: fetchedUserData.role,
            name: fetchedUserData.name,
            first_name: fetchedUserData.first_name,
            last_name: fetchedUserData.last_name,
            avatar: 'avatar-default.jpg',
          });
          setOrgData(fetchedUserData.org_data);
          setAuthStates({
            isAuthenticated: true,
            error: null,
            isLoading: false,
          });

        } catch (error) {
          logger.debug('[Auth] Error fetching userData:', error);
          setAuthStates({
            isAuthenticated: false,
            error,
            isLoading: false,
          });
        }
      } else {
        // User is logging out
        setAuthStates({
          isAuthenticated: false,
          error: null,
          isLoading: false,
        });
      }
    });

    // Func grabs user doc from Firestore
    const getUserData = async (uid) => {
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
        role: userdata.role,
        name: `${userdata.first_name} ${userdata.last_name}`,
        first_name: userdata.first_name,
        last_name: userdata.last_name,
        org_name: orgDoc.data()?.name || '',
        avatar: 'avatar-default.jpg',
        org_data: orgDoc.data() || '',
      };
    }

    return () => unsubscribe();
  }, [firebaseAuth, firestore]);

  return (
    <UserContext.Provider value={{...authStates, userData, orgData}}>
      {children}
    </UserContext.Provider>
  );
}

export const UserConsumer = UserContext.Consumer;