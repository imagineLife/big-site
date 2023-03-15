import React from 'react';
import { QueryClientProvider } from 'react-query';

export default function ReactQueryWrapper({ children, queryClient }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
