import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

type RegistrationStep = "details" | "role";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const { setUser } = useAppContext();
  const [step, setStep] = useState<RegistrationStep>("details");
  const [selectedRole, setSelectedRole] = useState<
    "customer" | "retailer" | "wholesaler" | null
  >(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep("role");
    }
  };

  const handleRegister = (role: "customer" | "retailer" | "wholesaler") => {
    setUser({
      id: Math.random().toString(),
      name: formData.name,
      email: formData.email,
      role,
      location: formData.location,
    });

    // Navigate to appropriate dashboard
    navigate(`/${role}`);
  };

  const handleBack = () => {
    setStep("details");
    setSelectedRole(null);
  };

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

        {step === "details" ? (
          /* Registration Form */
          <div className="max-w-md mx-auto">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Create Account
              </h2>

              <form className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition ${
                      errors.name ? "border-red-500" : "border-slate-300"
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition ${
                      errors.email ? "border-red-500" : "border-slate-300"
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition ${
                      errors.phone ? "border-red-500" : "border-slate-300"
                    }`}
                    placeholder="+91 9999999999"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition ${
                      errors.location ? "border-red-500" : "border-slate-300"
                    }`}
                    placeholder="City/Area"
                  />
                  {errors.location && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.location}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition ${
                      errors.password ? "border-red-500" : "border-slate-300"
                    }`}
                    placeholder="At least 6 characters"
                  />
                  {errors.password && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-slate-300"
                    }`}
                    placeholder="Re-enter password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Next Button */}
                <Button
                  onClick={handleNext}
                  className="w-full mt-6 bg-primary-600 hover:bg-primary-700 text-lg py-6"
                >
                  Next
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                {/* Login Link */}
                <p className="text-center text-slate-600 text-sm mt-4">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    Login here
                  </button>
                </p>
              </form>
            </Card>
          </div>
        ) : (
          /* Role Selection */
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Welcome, {formData.name}!
              </h2>
              <p className="text-slate-600">Select your role to get started</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  id: "customer",
                  title: "Customer",
                  description: "Browse products, manage cart, and place orders",
                  icon: "🛒",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  id: "retailer",
                  title: "Retailer",
                  description: "Manage inventory, track sales, and orders",
                  icon: "🏪",
                  color: "from-purple-500 to-purple-600",
                },
                {
                  id: "wholesaler",
                  title: "Wholesaler",
                  description: "Manage wholesale inventory and pricing",
                  icon: "📦",
                  color: "from-orange-500 to-orange-600",
                },
              ].map((role) => (
                <Card
                  key={role.id}
                  className={`p-6 cursor-pointer transition transform hover:scale-105 ${
                    selectedRole === role.id
                      ? "border-primary-500 border-2 bg-primary-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                  onClick={() => setSelectedRole(role.id as any)}
                >
                  <div className="text-4xl mb-4">{role.icon}</div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {role.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    {role.description}
                  </p>
                  {selectedRole === role.id && (
                    <Button
                      onClick={() => handleRegister(role.id as any)}
                      className="w-full bg-primary-600 hover:bg-primary-700"
                    >
                      Continue as {role.title}
                    </Button>
                  )}
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button
                variant="outline"
                onClick={handleBack}
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Back to Details
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
