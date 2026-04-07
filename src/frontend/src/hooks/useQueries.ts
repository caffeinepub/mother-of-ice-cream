import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Order as BackendOrder,
  OrderItem as BackendOrderItem,
  ContactMessage,
  IceCreamFlavor,
  IceCreamFlavorInput,
  IceCreamFlavorUpdate,
} from "../backend.d";
import { useActor } from "./useActor";

export type {
  IceCreamFlavor,
  IceCreamFlavorInput,
  IceCreamFlavorUpdate,
  ContactMessage,
};

export interface OrderItem {
  flavorId: bigint;
  flavorName: string;
  quantity: bigint;
  price: number;
}

export type Order = BackendOrder;

export function useAllFlavors() {
  const { actor, isFetching: actorFetching } = useActor();
  const query = useQuery<IceCreamFlavor[]>({
    queryKey: ["flavors", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllFlavors();
    },
    enabled: !!actor && !actorFetching,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
  };
}

export function useFeaturedFlavors() {
  const { actor, isFetching: actorFetching } = useActor();
  const query = useQuery<IceCreamFlavor[]>({
    queryKey: ["flavors", "featured"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedFlavors();
    },
    enabled: !!actor && !actorFetching,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
  };
}

export function useFlavorsByCategory(category: string) {
  const { actor, isFetching: actorFetching } = useActor();
  const query = useQuery<IceCreamFlavor[]>({
    queryKey: ["flavors", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      if (category === "All") return actor.getAllFlavors();
      return actor.getFlavorsByCategory(category);
    },
    enabled: !!actor && !actorFetching,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
  };
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useContactMessages() {
  const { actor, isFetching: actorFetching } = useActor();
  const query = useQuery<ContactMessage[]>({
    queryKey: ["contactMessages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContactMessages();
    },
    enabled: !!actor && !actorFetching,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
  };
}

export function useAddFlavor() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: IceCreamFlavorInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.addFlavor(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flavors"] });
    },
  });
}

export function useUpdateFlavor() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      update,
    }: { id: bigint; update: IceCreamFlavorUpdate }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateFlavor(id, update);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flavors"] });
    },
  });
}

export function useDeleteFlavor() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteFlavor(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flavors"] });
    },
  });
}

export function useClearAllFlavors() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.clearAllFlavors();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flavors"] });
    },
  });
}

export function useToggleAvailability() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.toggleAvailability(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flavors"] });
    },
  });
}

export function useToggleFeatured() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.toggleFeatured(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flavors"] });
    },
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactMessage(name, email, message);
    },
  });
}

export function usePlaceOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      customerName,
      customerPhone,
      deliveryAddress,
      items,
      totalAmount,
      utrReference,
      paymentMethod,
    }: {
      customerName: string;
      customerPhone: string;
      deliveryAddress: string;
      items: BackendOrderItem[];
      totalAmount: number;
      utrReference: string;
      paymentMethod: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.placeOrder(
        customerName,
        customerPhone,
        deliveryAddress,
        items,
        totalAmount,
        utrReference,
        paymentMethod,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useGetOrders() {
  const { actor, isFetching: actorFetching } = useActor();
  const query = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getOrders();
    },
    enabled: !!actor && !actorFetching,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
  };
}

export function useUpdateOrderStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: bigint; status: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateOrderStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useDeleteOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteOrder(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useDeleteContactMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (timestamp: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteContactMessage(timestamp);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contactMessages"] });
    },
  });
}

export function useGetUpiId() {
  const { actor, isFetching } = useActor();
  return useQuery<string | null>({
    queryKey: ["upiId"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getUpiId();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetUpiId() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.setUpiId(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["upiId"] });
    },
  });
}

export function useSeedDefaultFlavors() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.seedDefaultFlavors();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flavors"] });
    },
  });
}
