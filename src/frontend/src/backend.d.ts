import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface IceCreamFlavorInput {
    name: string;
    isAvailable: boolean;
    description: string;
    imageUrl?: string;
    isFeatured: boolean;
    category: string;
    price: number;
}
export type Time = bigint;
export interface ContactMessage {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface OrderItem {
    flavorId: bigint;
    flavorName: string;
    quantity: bigint;
    price: number;
}
export interface IceCreamFlavor {
    id: bigint;
    name: string;
    isAvailable: boolean;
    description: string;
    imageUrl?: string;
    isFeatured: boolean;
    category: string;
    price: number;
}
export interface IceCreamFlavorUpdate {
    name?: string;
    isAvailable?: boolean;
    description?: string;
    imageUrl?: string;
    isFeatured?: boolean;
    category?: string;
    price?: number;
}
export interface Order {
    id: bigint;
    razorpayPaymentId: string;
    customerName: string;
    status: string;
    deliveryAddress: string;
    customerPhone: string;
    razorpayOrderId: string;
    totalAmount: number;
    timestamp: Time;
    items: Array<OrderItem>;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addFlavor(flavorInput: IceCreamFlavorInput): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteContactMessage(timestamp: Time): Promise<void>;
    deleteFlavor(id: bigint): Promise<void>;
    deleteOrder(id: bigint): Promise<void>;
    getAllContactMessages(): Promise<Array<ContactMessage>>;
    getAllFlavors(): Promise<Array<IceCreamFlavor>>;
    getAvailableFlavors(): Promise<Array<IceCreamFlavor>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFeaturedFlavors(): Promise<Array<IceCreamFlavor>>;
    getFlavor(id: bigint): Promise<IceCreamFlavor>;
    getFlavorsByCategory(category: string): Promise<Array<IceCreamFlavor>>;
    getOrders(): Promise<Array<Order>>;
    getOrdersByPhone(phone: string): Promise<Array<Order>>;
    getRazorpayKeyId(): Promise<string | null>;
    getUpiId(): Promise<string | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    placeOrder(customerName: string, customerPhone: string, deliveryAddress: string, items: Array<OrderItem>, totalAmount: number, razorpayOrderId: string, razorpayPaymentId: string): Promise<bigint>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchFlavors(searchTerm: string): Promise<Array<IceCreamFlavor>>;
    setRazorpayKeyId(key: string): Promise<void>;
    setUpiId(id: string): Promise<void>;
    submitContactMessage(name: string, email: string, message: string): Promise<void>;
    toggleAvailability(id: bigint): Promise<void>;
    toggleFeatured(id: bigint): Promise<void>;
    updateFlavor(id: bigint, input: IceCreamFlavorUpdate): Promise<void>;
    updateOrderStatus(id: bigint, status: string): Promise<void>;
}
