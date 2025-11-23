import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQuantity } = useAppContext();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = subtotal > 500 ? 0 : 50;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/customer")}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </button>
            <h1 className="text-4xl font-bold text-slate-900">Shopping Cart</h1>
          </div>

          {cart.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <Card key={item.id} className="p-6 flex gap-4">
                    {/* Product Image */}
                    <div className="w-32 h-32 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-primary-600 font-semibold mb-4">
                        ₹{item.price}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity - 1)
                          }
                          className="p-2 border border-slate-300 rounded-lg hover:bg-slate-100 transition"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-lg font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2 border border-slate-300 rounded-lg hover:bg-slate-100 transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Total and Remove */}
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900 mb-4">
                        ₹{item.price * item.quantity}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">
                    Order Summary
                  </h2>

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
                      <span>Delivery Fee</span>
                      <span className="font-semibold">
                        {deliveryFee === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          `₹${deliveryFee}`
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between text-lg mb-6">
                    <span className="font-semibold text-slate-900">Total</span>
                    <span className="font-bold text-primary-600">₹{total}</span>
                  </div>

                  {subtotal < 500 && (
                    <p className="text-sm text-amber-700 bg-amber-50 p-3 rounded-lg mb-6">
                      Free delivery on orders above ₹500
                    </p>
                  )}

                  <Button
                    onClick={() => navigate("/checkout")}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-lg py-6"
                  >
                    Proceed to Checkout
                  </Button>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                Your cart is empty
              </h2>
              <p className="text-slate-600 mb-8">
                Add some products to get started
              </p>
              <Button
                onClick={() => navigate("/customer")}
                className="bg-primary-600 hover:bg-primary-700"
              >
                Start Shopping
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
