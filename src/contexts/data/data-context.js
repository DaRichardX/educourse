'use client';

import * as React from 'react';

import { getFirebaseAuth } from '@/lib/auth/firebase/client';
import { getFirestore, collection, getDocs } from 'firebase/firestore';import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';

export const DataContext = React.createContext(undefined);

export function DataProvider({ children }) {
    const userState = useUser();

    const isAuthenticated = React.useMemo(() => {
        return userState.user !== null;
      }, [userState]);

    const firestore = getFirestore();

    // Function to fetch the list of students from Firestore
  const getStudentList = async () => {
    if (!isAuthenticated) {
      logger.error('User is not authenticated.');
      return [];
    }else if(!userState.userData?.school){
      logger.error('School ID is missing, please contact support.'); 
      return [];
    }

    try {
      const schoolID = userState.userData.school; // Get the school ID from userData
      const studentsCollection = collection(firestore, `schools/${schoolID}/students`);
      const studentsSnapshot = await getDocs(studentsCollection);
      const studentsList = studentsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      return studentsList;
    } catch (error) {
      logger.error('Error fetching students list: ', error);
      return [];
    }
  };


    return <DataContext.Provider value={getStudentList}>{children}</DataContext.Provider>;
}

export const DataConsumer = DataContext.Consumer;
