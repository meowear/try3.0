import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, MapPin, Calendar, Star } from "lucide-react";
import { useState } from "react";

interface Order {
  id: string;
  date: string;
  total: number;
  status: "delivered" | "in-transit" | "processing" | "cancelled";
  items: number;
  deliveryDate: string;
  retailerName: string;
  address: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    total: 450,
    status: "delivered",
    items: 3,
    deliveryDate: "2024-01-15",
    retailerName: "Downtown Mart",
    address: "123 Main St, City",
  },
  {
    id: "ORD-002",
    date: "2024-01-14",
    total: 890,
    status: "delivered",
    items: 5,
    deliveryDate: "2024-01-14",
    retailerName: "Central Store",
    address: "456 Park Ave, City",
  },
  {
    id: "ORD-003",
    date: "2024-01-13",
    total: 320,
    status: "in-transit",
    items: 2,
    deliveryDate: "Expected today",
    retailerName: "South Bazaar",
    address: "789 Market Rd, City",
  },
];

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "in-transit":
        return "bg-blue-100 text-blue-700";
      case "processing":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return "✓";
      case "in-transit":
        return "→";
      case "processing":
        return "⟳";
      case "cancelled":
        return "✕";
      default:
        return "?";
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              My Orders
            </h1>
            <p className="text-slate-600">Track and manage your orders</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Orders List */}
            <div className="lg:col-span-2 space-y-4">
              {mockOrders.length > 0 ? (
                mockOrders.map((order) => (
                  <Card
                    key={order.id}
                    className="p-6 cursor-pointer hover:shadow-lg transition border-l-4 border-l-primary-600"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {order.id}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {order.retailerName}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          order.status,
                        )}`}
                      >
                        {getStatusIcon(order.status)}{" "}
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1).replace("-", " ")}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                      <div>
                        <p className="text-xs text-slate-600 mb-1">
                          Order Date
                        </p>
                        <p className="font-semibold text-slate-900 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 mb-1">Items</p>
                        <p className="font-semibold text-slate-900 flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          {order.items} items
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 mb-1">Total</p>
                        <p className="font-semibold text-primary-600">
                          ₹{order.total}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-slate-600">No orders yet</p>
                </Card>
              )}
            </div>

            {/* Order Details */}
            {selectedOrder ? (
              <Card className="p-6 sticky top-24 h-fit">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Order Details
                </h2>

                <div className="space-y-4 pb-6 border-b border-slate-200 mb-6">
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Order ID</p>
                    <p className="font-semibold text-slate-900">
                      {selectedOrder.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Status</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        selectedOrder.status,
                      )}`}
                    >
                      {selectedOrder.status.charAt(0).toUpperCase() +
                        selectedOrder.status.slice(1).replace("-", " ")}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 pb-6 border-b border-slate-200 mb-6">
                  <div>
                    <p className="text-xs text-slate-600 mb-1">
                      Delivery Address
                    </p>
                    <p className="font-semibold text-slate-900 flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{selectedOrder.address}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">
                      Expected Delivery
                    </p>
                    <p className="font-semibold text-slate-900">
                      {selectedOrder.deliveryDate}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full border-primary-300 text-primary-600 hover:bg-primary-50"
                  >
                    Track Package
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-primary-300 text-primary-600 hover:bg-primary-50"
                  >
                    Rate & Review
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="p-6 sticky top-24 h-fit text-center">
                <p className="text-slate-600">
                  Select an order to view details
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
