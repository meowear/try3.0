import { Link } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, LogOut } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { user, logout, cart } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!user) return null;

  const cartTotal = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navigationItems =
    user.role === "customer"
      ? [
          { label: "Home", path: "/customer" },
          { label: "Orders", path: "/orders" },
          { label: "Cart", path: "/cart" },
        ]
      : user.role === "retailer"
        ? [
            { label: "Dashboard", path: "/retailer" },
            { label: "Inventory", path: "/retailer/inventory" },
            { label: "Orders", path: "/retailer/orders" },
          ]
        : [
            { label: "Dashboard", path: "/wholesaler" },
            { label: "Inventory", path: "/wholesaler/inventory" },
            { label: "Pricing", path: "/wholesaler/pricing" },
          ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to={user.role === "customer" ? "/customer" : `/${user.role}`}
            className="text-2xl font-bold text-primary-600"
          >
            Live MART
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-slate-600 hover:text-primary-600 transition font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Info and Actions */}
          <div className="flex items-center gap-4">
            {user.role === "customer" && (
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartTotal > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartTotal}
                    </span>
                  )}
                </Button>
              </Link>
            )}

            {/* User Menu */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-slate-900">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500 capitalize">{user.role}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  logout();
                  window.location.href = "/";
                }}
                className="text-slate-600 hover:text-red-600"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-slate-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-slate-200 flex flex-col gap-3">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-slate-600 hover:text-primary-600 transition font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
