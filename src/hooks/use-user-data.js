import * as React from 'react';

import { UserContext } from '@/contexts/auth/user-context';

export function useUserData() {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error('useUserData must be used within a UserProvider');
  }

  return context.userData;
}