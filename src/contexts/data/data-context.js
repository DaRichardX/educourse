'use client';

import * as React from 'react';

import { db, getFirestore, getDoc, doc } from 'firebase/firestore';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';
import { useUserData } from '@/hooks/use-user-data';

export const DataContext = React.createContext(undefined);

export function DataProvider({ children }) {
    const userState = useUser();
    const userData = useUserData();

    const isAuthenticated = React.useMemo(() => {
        return userState.user !== null;
      }, [userState]);

    const firestore = getFirestore();

    // Function to fetch the list of students from Firestore
  const getTotalSignups = async () => {
    if (!verf){
      return "ERR";
      //user not authenticated or something gone wrong (data fucked up)
    }

    try {
      const schoolID = userData.org_id; // Get the school ID from userData
      //const signupsCollection = collection(firestore, `orgs/${schoolID}/capstone_schedule/signups`);
      const signupsDocRef = doc(firestore, `orgs/${schoolID}/capstone_schedule/signups`);
      const signupsDocSnapshot = await getDoc(signupsDocRef);
      const signupsData = signupsDocSnapshot.data();
      logger.debug("[Data] Signups: ", signupsData)


      // Get the total number of signups
      const totalSignups = Object.keys(signupsData).length;

      return totalSignups;
    } catch (error) {
      logger.error('[Data] Error fetching students list: ', error);
      return "ERR";
    }
  };

  const verf = () => {
    if (!isAuthenticated) {
      logger.error('[Data].verf: User not authenticated.');
      return false;
    }
    // else if(!userState.userData?.school){
    //   logger.error('School ID is missing, please contact support.'); 
    //   return false;
    // }

    return true;
  }


  const get = {
    getTotalSignups
  }

  const action = {

  }


    return <DataContext.Provider value={{get, action}}>{children}</DataContext.Provider>;
}



export const DataConsumer = DataContext.Consumer;
