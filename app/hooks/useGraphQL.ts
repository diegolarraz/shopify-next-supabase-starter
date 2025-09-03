"use client";
import { type TypedDocumentNode } from "@graphql-typed-document-node/core";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import request from "graphql-request";

const url = `shopify:admin/api/2024-10/graphql.json`;

export function useGraphQL<TResult, TVariables = Record<string, unknown>>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables
): UseQueryResult<TResult> {
  return useQuery({
    queryKey: [(document.definitions[0] as { name: { value: string } }).name.value, variables],
    queryFn: async () => request(url, document, variables as any), // eslint-disable-line @typescript-eslint/no-explicit-any
  });
}
