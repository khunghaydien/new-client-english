"use client";
import { client } from "@/lib/applloClient";
import { ApolloProvider } from "@apollo/client";
import React, { ReactNode } from "react";

function ApolloClientProvider({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloClientProvider;
