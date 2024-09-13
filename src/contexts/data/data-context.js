'use client';

import * as React from 'react';

import { getFirebaseAuth } from '@/lib/auth/firebase/client';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';

export const DataContext = React.createContext(undefined);

export function DataProvider({ children }) {
    const user = useUser().user;

    const isAuthenticated = React.useMemo(() => {
        return user !== null;
      }, [user]);

    const firestore = getFirestore();


    return <DataContext.Provider value={}>{children}</DataContext.Provider>;
}

export const DataConsumer = DataContext.Consumer;
