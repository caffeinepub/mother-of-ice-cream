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
    deleteFlavor(id: bigint): Promise<void>;
    getAllContactMessages(): Promise<Array<ContactMessage>>;
    getAllFlavors(): Promise<Array<IceCreamFlavor>>;
    getAvailableFlavors(): Promise<Array<IceCreamFlavor>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFeaturedFlavors(): Promise<Array<IceCreamFlavor>>;
    getFlavor(id: bigint): Promise<IceCreamFlavor>;
    getFlavorsByCategory(category: string): Promise<Array<IceCreamFlavor>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchFlavors(searchTerm: string): Promise<Array<IceCreamFlavor>>;
    submitContactMessage(name: string, email: string, message: string): Promise<void>;
    toggleAvailability(id: bigint): Promise<void>;
    toggleFeatured(id: bigint): Promise<void>;
    updateFlavor(id: bigint, input: IceCreamFlavorUpdate): Promise<void>;
}
