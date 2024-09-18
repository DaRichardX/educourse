import * as React from 'react';

import { DataContext } from '@/contexts/data/data-context';

export function useUser() {
  const context = React.useContext(DataContext);

  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }

  return context;
}
