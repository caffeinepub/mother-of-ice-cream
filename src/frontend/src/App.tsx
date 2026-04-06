import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/context/CartContext";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useLocation,
} from "@tanstack/react-router";
import React, { Suspense, lazy } from "react";

// Silence unused import warnings from tanstack router re-exports used in children
void Link;
void useLocation;

const HomePage = lazy(() => import("@/pages/HomePage"));
const MenuPage = lazy(() => import("@/pages/MenuPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const AdminPage = lazy(() => import("@/pages/AdminPage"));

const PageFallback = (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
  </div>
);

const rootRoute = createRootRoute({
  component: () => (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={PageFallback}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
        <Toaster richColors position="top-right" />
      </div>
    </CartProvider>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const menuRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/menu",
  component: MenuPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  menuRoute,
  aboutRoute,
  contactRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Suppress unused React import warning — needed for JSX in some environments
void React;

export default function App() {
  return <RouterProvider router={router} />;
}
