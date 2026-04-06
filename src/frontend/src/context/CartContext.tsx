import { createContext, useContext, useEffect, useState } from "react";
import type { IceCreamFlavor } from "../hooks/useQueries";

export interface CartItem {
  flavorId: bigint;
  flavorName: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (flavor: IceCreamFlavor) => void;
  removeItem: (flavorId: bigint) => void;
  updateQty: (flavorId: bigint, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "ice-cream-cart";

function serializeItems(items: CartItem[]): string {
  return JSON.stringify(
    items.map((item) => ({ ...item, flavorId: item.flavorId.toString() })),
  );
}

function deserializeItems(raw: string): CartItem[] {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item: any) => ({
      ...item,
      flavorId: BigInt(item.flavorId),
    }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? deserializeItems(stored) : [];
    } catch {
      return [];
    }
  });
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, serializeItems(items));
  }, [items]);

  function addItem(flavor: IceCreamFlavor) {
    // Resolve imageUrl from Motoko optional (?Text = [] | [string])
    const resolvedImageUrl: string | undefined = Array.isArray(flavor.imageUrl)
      ? (flavor.imageUrl[0] ?? undefined)
      : ((flavor.imageUrl as string | undefined) ?? undefined);

    setItems((prev) => {
      const existing = prev.find((i) => i.flavorId === flavor.id);
      if (existing) {
        return prev.map((i) =>
          i.flavorId === flavor.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [
        ...prev,
        {
          flavorId: flavor.id,
          flavorName: flavor.name,
          price: flavor.price,
          quantity: 1,
          imageUrl: resolvedImageUrl,
        },
      ];
    });
  }

  function removeItem(flavorId: bigint) {
    setItems((prev) => prev.filter((i) => i.flavorId !== flavorId));
  }

  function updateQty(flavorId: bigint, qty: number) {
    if (qty <= 0) {
      removeItem(flavorId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.flavorId === flavorId ? { ...i, quantity: qty } : i)),
    );
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        totalItems,
        totalPrice,
        isDrawerOpen,
        setDrawerOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
