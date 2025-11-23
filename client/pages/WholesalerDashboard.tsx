import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Package, Users, TrendingUp } from "lucide-react";

export default function WholesalerDashboard() {
  const stats = [
    {
      title: "Total Inventory",
      value: "5,240",
      icon: Package,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Active Retailers",
      value: "48",
      icon: Users,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Monthly Revenue",
      value: "₹2,45,000",
      icon: BarChart,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Growth",
      value: "+18%",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const retailerOrders = [
    {
      id: "RET-2001",
      retailer: "Downtown Mart",
      items: 125,
      total: "₹15,250",
      date: "2024-01-15",
      status: "delivered",
    },
    {
      id: "RET-2002",
      retailer: "Central Store",
      items: 89,
      total: "₹11,450",
      date: "2024-01-14",
      status: "processing",
    },
    {
      id: "RET-2003",
      retailer: "South Bazaar",
      items: 156,
      total: "₹19,800",
      date: "2024-01-13",
      status: "delivered",
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
              Wholesaler Dashboard
            </h1>
            <p className="text-slate-600">
              Manage wholesale inventory and retailer orders
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
            {/* Retailer Orders */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6">
                  Retailer Orders
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-semibold text-slate-900">
                          Order ID
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-900">
                          Retailer
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
                      {retailerOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="border-b border-slate-200 hover:bg-slate-50 transition"
                        >
                          <td className="py-3 px-4 font-semibold text-slate-900">
                            {order.id}
                          </td>
                          <td className="py-3 px-4 text-slate-700">
                            {order.retailer}
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
                                  : "bg-blue-100 text-blue-700"
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
                    Add New Product
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-primary-300 text-primary-600 hover:bg-primary-50"
                  >
                    Update Pricing
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-primary-300 text-primary-600 hover:bg-primary-50"
                  >
                    Manage Retailers
                  </Button>
                </div>
              </Card>

              {/* Top Retailers */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Top Retailers
                </h2>
                <div className="space-y-3">
                  {[
                    { name: "Downtown Mart", orders: 245, status: "active" },
                    { name: "Central Store", orders: 189, status: "active" },
                    { name: "South Bazaar", orders: 156, status: "active" },
                  ].map((retailer, index) => (
                    <div
                      key={index}
                      className="pb-3 border-b border-slate-200 last:border-b-0"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-slate-900">
                          {retailer.name}
                        </p>
                        <span className="text-xs font-semibold text-primary-600">
                          {retailer.orders} orders
                        </span>
                      </div>
                      <p className="text-xs text-green-600 font-medium">
                        ✓ {retailer.status}
                      </p>
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
