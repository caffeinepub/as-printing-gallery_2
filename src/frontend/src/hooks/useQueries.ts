import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product, QuoteRequest } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitQuoteRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (request: QuoteRequest) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitQuoteRequest(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quoteRequests"] });
    },
  });
}
