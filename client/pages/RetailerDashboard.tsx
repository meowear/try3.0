import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, ShoppingBag, TrendingUp, AlertCircle } from "lucide-react";

export default function RetailerDashboard() {
  const stats = [
    {
      title: "Total Products",
      value: "248",
      icon: ShoppingBag,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Total Orders",
      value: "1,245",
      icon: BarChart,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Revenue",
      value: "₹45,230",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Low Stock Items",
      value: "23",
      icon: AlertCircle,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-1001",
      customer: "John Doe",
      items: 3,
      total: "₹450",
      status: "delivered",
    },
    {
      id: "ORD-1002",
      customer: "Jane Smith",
      items: 5,
      total: "₹890",
      status: "processing",
    },
    {
      id: "ORD-1003",
      customer: "Bob Johnson",
      items: 2,
      total: "₹320",
      status: "pending",
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Retailer Dashboard
            </h1>
            <p className="text-slate-600">
              Manage your inventory, orders, and sales
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-slate-600 text-sm mb-2">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-slate-900">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Orders */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6">
                  Recent Orders
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-semibold text-slate-900">
                          Order ID
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-900">
                          Customer
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-900">
                          Items
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-900">
                          Total
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-900">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="border-b border-slate-200 hover:bg-slate-50 transition"
                        >
                          <td className="py-3 px-4 font-semibold text-slate-900">
                            {order.id}
                          </td>
                          <td className="py-3 px-4 text-slate-700">
                            {order.customer}
                          </td>
                          <td className="py-3 px-4 text-slate-700">
                            {order.items}
                          </td>
                          <td className="py-3 px-4 font-semibold text-slate-900">
                            {order.total}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                order.status === "delivered"
                                  ? "bg-green-100 text-green-700"
                                  : order.status === "processing"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <Card className="p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full border-primary-300 text-primary-600 hover:bg-primary-50"
                  >
                    Add Product
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-primary-300 text-primary-600 hover:bg-primary-50"
                  >
                    Manage Inventory
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-primary-300 text-primary-600 hover:bg-primary-50"
                  >
                    View All Orders
                  </Button>
                </div>
              </Card>

              {/* Stock Status */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Stock Status
                </h2>
                <div className="space-y-3">
                  {[
                    { name: "Fresh Apples", stock: 15, status: "low" },
                    { name: "Tomatoes", stock: 45, status: "ok" },
                    { name: "Eggs", stock: 8, status: "critical" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="pb-3 border-b border-slate-200 last:border-b-0"
                    >
                      <p className="text-sm font-medium text-slate-900 mb-1">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              item.status === "critical"
                                ? "bg-red-500"
                                : item.status === "low"
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }`}
                            style={{
                              width: `${item.stock}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-600">
                          {item.stock}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
