import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useAppContext } from "./context/AppContext";
import RoleSelection from "./pages/RoleSelection";
import CustomerHome from "./pages/CustomerHome";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import OrdersPage from "./pages/Orders";
import RetailerDashboard from "./pages/RetailerDashboard";
import WholesalerDashboard from "./pages/WholesalerDashboard";
import PlaceholderPage from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAppContext();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function HomeRoute() {
  const { user } = useAppContext();
  return user ? <Navigate to={`/${user.role}`} replace /> : <RoleSelection />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Role Selection / Home */}
      <Route path="/" element={<HomeRoute />} />

      {/* Customer Routes */}
      <Route
        path="/customer"
        element={
          <ProtectedRoute>
            <CustomerHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/product/:id"
        element={
          <ProtectedRoute>
            <PlaceholderPage title="Product Details" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />

      {/* Retailer Routes */}
      <Route
        path="/retailer"
        element={
          <ProtectedRoute>
            <RetailerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/retailer/inventory"
        element={
          <ProtectedRoute>
            <PlaceholderPage title="Manage Inventory" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/retailer/orders"
        element={
          <ProtectedRoute>
            <PlaceholderPage title="Orders" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/retailer/sales"
        element={
          <ProtectedRoute>
            <PlaceholderPage title="Sales Report" />
          </ProtectedRoute>
        }
      />

      {/* Wholesaler Routes */}
      <Route
        path="/wholesaler"
        element={
          <ProtectedRoute>
            <WholesalerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wholesaler/inventory"
        element={
          <ProtectedRoute>
            <PlaceholderPage title="Wholesale Inventory" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wholesaler/pricing"
        element={
          <ProtectedRoute>
            <PlaceholderPage title="Pricing Management" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wholesaler/retailers"
        element={
          <ProtectedRoute>
            <PlaceholderPage title="Manage Retailers" />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

declare global {
  interface Window {
    __REACT_ROOT__?: ReturnType<typeof createRoot>;
  }
}

const rootElement = document.getElementById("root");
if (rootElement) {
  if (!window.__REACT_ROOT__) {
    window.__REACT_ROOT__ = createRoot(rootElement);
  }
  window.__REACT_ROOT__.render(<App />);
}
