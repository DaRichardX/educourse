"use client";
// ain't no way bro forgot 'use client' for Next.js

import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState(null);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};