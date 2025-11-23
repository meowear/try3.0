import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
import { ArrowLeft, Check, MapPin, Clock, CreditCard } from "lucide-react";

type PaymentMethod = "credit-card" | "debit-card" | "upi" | "cod";
type DeliveryType = "standard" | "express";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, user, clearCart } = useAppContext();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("standard");
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("credit-card");

  // Delivery address
  const [address, setAddress] = useState({
    street: "",
    city: "",
    zipCode: "",
    phone: "",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee =
    deliveryType === "express" ? 100 : subtotal > 500 ? 0 : 50;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !address.street ||
      !address.city ||
      !address.zipCode ||
      !address.phone
    ) {
      alert("Please fill in all address fields");
      return;
    }

    // Simulate order placement
    const newOrderId = `ORD-${Date.now()}`;
    setOrderId(newOrderId);
    setOrderPlaced(true);

    // Clear cart after successful order
    setTimeout(() => {
      clearCart();
    }, 1000);
  };

  if (orderPlaced) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-50 py-12">
          <div className="container mx-auto px-4 max-w-md">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Order Placed Successfully!
              </h1>
              <p className="text-slate-600 mb-6">
                Thank you for shopping with Live MART
              </p>

              <Card className="p-6 mb-6">
                <p className="text-sm text-slate-600 mb-2">Order ID</p>
                <p className="text-2xl font-bold text-primary-600 mb-4">
                  {orderId}
                </p>
                <p className="text-sm text-slate-600 mb-2">
                  Estimated Delivery
                </p>
                <p className="text-lg font-semibold text-slate-900">
                  {deliveryType === "express" ? "30-45 minutes" : "2-3 hours"}
                </p>
              </Card>

              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-between text-slate-700 pb-3 border-b border-slate-200">
                  <span>Order Total</span>
                  <span className="font-bold text-lg">₹{total}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => {
                    navigate("/customer");
                  }}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-lg py-6"
                >
                  Continue Shopping
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/orders")}
                  className="w-full border-primary-300 text-primary-600 hover:bg-primary-50 text-lg py-6"
                >
                  View My Orders
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-slate-50 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
              Your cart is empty
            </h1>
            <Button
              onClick={() => navigate("/customer")}
              className="bg-primary-600 hover:bg-primary-700"
            >
              Back to Shopping
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/cart")}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Cart
            </button>
            <h1 className="text-4xl font-bold text-slate-900">Checkout</h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                {/* Delivery Address */}
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <MapPin className="w-5 h-5 text-primary-600" />
                    <h2 className="text-xl font-bold text-slate-900">
                      Delivery Address
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={address.street}
                      onChange={(e) =>
                        setAddress({ ...address, street: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="City"
                        value={address.city}
                        onChange={(e) =>
                          setAddress({ ...address, city: e.target.value })
                        }
                        className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      />
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        value={address.zipCode}
                        onChange={(e) =>
                          setAddress({ ...address, zipCode: e.target.value })
                        }
                        className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={address.phone}
                      onChange={(e) =>
                        setAddress({ ...address, phone: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                  </div>
                </Card>

                {/* Delivery Type */}
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Clock className="w-5 h-5 text-primary-600" />
                    <h2 className="text-xl font-bold text-slate-900">
                      Delivery Type
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        id: "standard",
                        label: "Standard Delivery",
                        time: "2-3 hours",
                        price: subtotal > 500 ? "₹0" : "₹50",
                      },
                      {
                        id: "express",
                        label: "Express Delivery",
                        time: "30-45 minutes",
                        price: "₹100",
                      },
                    ].map((option) => (
                      <label
                        key={option.id}
                        className={`p-4 border rounded-lg cursor-pointer transition ${
                          deliveryType === option.id
                            ? "border-primary-500 bg-primary-50"
                            : "border-slate-300"
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="delivery"
                            value={option.id}
                            checked={
                              deliveryType === (option.id as DeliveryType)
                            }
                            onChange={(e) =>
                              setDeliveryType(e.target.value as DeliveryType)
                            }
                            className="w-4 h-4"
                          />
                          <span className="ml-3 flex-1">
                            <div className="font-semibold text-slate-900">
                              {option.label}
                            </div>
                            <div className="text-sm text-slate-600">
                              {option.time} • {option.price}
                            </div>
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </Card>

                {/* Payment Method */}
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <CreditCard className="w-5 h-5 text-primary-600" />
                    <h2 className="text-xl font-bold text-slate-900">
                      Payment Method
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: "credit-card", label: "Credit Card" },
                      { id: "debit-card", label: "Debit Card" },
                      { id: "upi", label: "UPI" },
                      { id: "cod", label: "Cash on Delivery" },
                    ].map((option) => (
                      <label
                        key={option.id}
                        className={`p-4 border rounded-lg cursor-pointer transition ${
                          paymentMethod === option.id
                            ? "border-primary-500 bg-primary-50"
                            : "border-slate-300"
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="payment"
                            value={option.id}
                            checked={
                              paymentMethod === (option.id as PaymentMethod)
                            }
                            onChange={(e) =>
                              setPaymentMethod(e.target.value as PaymentMethod)
                            }
                            className="w-4 h-4"
                          />
                          <span className="ml-3 font-semibold text-slate-900">
                            {option.label}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </Card>

                {/* Place Order Button */}
                <Button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-lg py-6"
                >
                  Place Order • ₹{total}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="text-xl font-bold text-slate-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-slate-200">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-slate-700">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-semibold text-slate-900">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-slate-200">
                  <div className="flex justify-between text-slate-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Tax (5%)</span>
                    <span className="font-semibold">₹{tax}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Delivery</span>
                    <span className="font-semibold">
                      {deliveryFee === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-slate-900">Total</span>
                  <span className="font-bold text-primary-600">₹{total}</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
