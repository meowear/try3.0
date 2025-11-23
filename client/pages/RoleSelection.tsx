import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext, type UserRole } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Store, TrendingUp } from "lucide-react";

export default function RoleSelection() {
  const { setUser } = useAppContext();
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState("");

  const handleLogin = (role: UserRole) => {
    if (!userName.trim()) return;

    setUser({
      id: Math.random().toString(),
      name: userName,
      email: `${userName.toLowerCase()}@livemart.com`,
      role,
      location: "Current Location",
    });
  };

  const roles: Array<{
    id: UserRole;
    title: string;
    description: string;
    icon: typeof ShoppingCart;
    color: string;
  }> = [
    {
      id: "customer",
      title: "Customer",
      description: "Browse products, manage cart, and place orders",
      icon: ShoppingCart,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "retailer",
      title: "Retailer",
      description: "Manage inventory, track sales, and orders",
      icon: Store,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "wholesaler",
      title: "Wholesaler",
      description: "Manage wholesale inventory and pricing",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
            Live MART
          </h1>
          <p className="text-xl text-slate-600">Online Delivery System</p>
        </div>

        {/* Login Form */}
        <div className="max-w-md mx-auto mb-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Get Started
          </h2>
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg mb-6 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
          />
          <p className="text-sm text-slate-600 mb-4">
            Select your role to continue
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Card
                key={role.id}
                className={`p-6 cursor-pointer transition transform hover:scale-105 ${
                  selectedRole === role.id
                    ? "border-primary-500 border-2 bg-primary-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${role.color} flex items-center justify-center mb-4`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {role.title}
                </h3>
                <p className="text-sm text-slate-600">{role.description}</p>
                {selectedRole === role.id && (
                  <div className="mt-4 flex gap-2">
                    <Button
                      onClick={() => handleLogin(role.id)}
                      disabled={!userName.trim()}
                      className="flex-1 bg-primary-600 hover:bg-primary-700"
                    >
                      Continue
                    </Button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {selectedRole && userName.trim() && (
          <div className="text-center">
            <Button
              onClick={() => handleLogin(selectedRole)}
              size="lg"
              className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8"
            >
              Login as{" "}
              {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
