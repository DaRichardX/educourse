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

  const [userData, setUserData] = React.useState({
    id: null,
    org_id: "",
    email: "",
    name: "",
    first_name: "",
    last_name: "",
    name_org: "",
    avatar: "",
    org_data: "",
    isFetching: false,
  });

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      logger.debug('[Auth] onAuthStateChanged:', user);
      if(user){
        await getUserData(user.uid); //sets the userData state (mainly used for info display)
        setState((prev) => ({ //sets the state state (mainly used for auth)
          ...prev,
          user:
            {
                id: user.uid,
                email: user.email,
                avatar: "avatar-default.jpg",
            },
          error: null,
          isLoading: false,
        }));    
      }else{
        //signout, user doesn't exist
        setUserData((prev) => ({
          ...prev,
          id: null,
          org_id: "",
          email: "",
          name: "",
          first_name: "",
          last_name: "",
          name_org: "",
          avatar: "",
          org_data: "",
        }));
        setState((prev) => ({
          ...prev,
          user: null,
          error: null,
          isLoading: false,
        }));
      }
    });

    async function getUserData(uid) {//only sets userData
      setUserData((prev) => ({
        ...prev,
        isFetching: true
      }));

      //succes
      try {
        const userDocRef = doc(firestore, 'users', uid); // Reference to the user's document
        const userDoc = await getDoc(userDocRef); // Fetch the document from Firestore

        if (!userDoc.exists()) {
          logger.debug(`[Auth] userData document not found for ${  uid}`);
          return;
        }

        const userdata = userDoc.data(); //fetched userdata from /users/uid
        logger.debug('[Auth] userData:', userdata);

        const orgDocRef = doc(firestore, 'orgs', userdata.org_id); // Reference to the user's org's document
        const orgDoc = await getDoc(orgDocRef); // Fetch the document from Firestore

        if(!orgDoc.exists){
          logger.debug(`[Auth] orgData document not found for ${  userdata.org_id}`);
        }

        logger.debug('[Auth] orgData:', orgDoc.data());

        setUserData((prev) => ({
          ...prev,
          id: uid,
          org_id: userdata.org_id,
          email: userdata.email,
          name: `${userdata.first_name} ${userdata.last_name}`,
          first_name: userdata.first_name,
          last_name: userdata.last_name,
          name_org: `${orgDoc.data().name}`,
          avatar: "avatar-default.jpg",
          org_data: orgDoc.data(),
          isFetching: false
        }));
        //success
      } catch (error) {
        logger.debug('[Auth] Error fetching userData:', error);
        setUserData((prev) => ({
          ...prev,
          isFetching: false
        }));
      }
    }
    

    return () => {
      unsubscribe();
    };
  }, [firebaseAuth, firestore]);

  return <UserContext.Provider value={{state, userData}}>{children}</UserContext.Provider>;
}

export const UserConsumer = UserContext.Consumer;
