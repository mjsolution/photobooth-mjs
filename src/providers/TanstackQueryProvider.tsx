"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { FC, PropsWithChildren } from "react";

export const queryClient = new QueryClient();

const TanstackQueryProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TanstackQueryProvider;
