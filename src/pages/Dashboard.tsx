import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge } from "@/components/StatusBadge";
import {
  DollarSign,
  ShoppingCart,
  Package,
  TrendingUp,
  Clock,
  Users,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data
const dailyOrders = [
  { date: "Sep 17", orders: 12, revenue: 1390 },
  { date: "Sep 18", orders: 19, revenue: 969 },
  { date: "Sep 19", orders: 15, revenue: 688 },
  { date: "Sep 20", orders: 18, revenue: 848 },
  { date: "Sep 21", orders: 16, revenue: 740 },
  { date: "Sep 22", orders: 17, revenue: 800 },
  { date: "Sep 23", orders: 22, revenue: 979 },
  { date: "Sep 24", orders: 14, revenue: 557 },
  { date: "Sep 25", orders: 13, revenue: 551 },
];

const orderStatusData = [
  { name: "Delivered", value: 85, color: "#10B981" },
  { name: "Processing", value: 12, color: "#F59E0B" },
  { name: "Cancelled", value: 3, color: "#EF4444" },
];

const recentOrders = [
  { id: "#1234", customer: "John Doe", total: "$129.00", status: "Delivered", time: "2 hours ago" },
  { id: "#1235", customer: "Jane Smith", total: "$89.50", status: "Processing", time: "4 hours ago" },
  { id: "#1236", customer: "Mike Johnson", total: "$199.99", status: "Shipped", time: "6 hours ago" },
  { id: "#1237", customer: "Sarah Wilson", total: "$45.00", status: "Pending", time: "8 hours ago" },
];

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-6 p-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value="$12,426"
          subtitle="221 orders this month"
          icon={DollarSign}
          trend={{ value: "12.5%", isPositive: true }}
          variant="success"
        />
        <MetricCard
          title="Orders Today"
          value="24"
          subtitle="8 more than yesterday"
          icon={ShoppingCart}
          trend={{ value: "8.2%", isPositive: true }}
        />
        <MetricCard
          title="Products Sold"
          value="1,423"
          subtitle="This month"
          icon={Package}
          trend={{ value: "3.1%", isPositive: false }}
        />
        <MetricCard
          title="Conversion Rate"
          value="3.2%"
          subtitle="From website traffic"
          icon={TrendingUp}
          trend={{ value: "0.5%", isPositive: true }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Orders Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Daily Orders</CardTitle>
            <p className="text-sm text-muted-foreground">Orders over the last 10 days</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyOrders}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar 
                  dataKey="orders" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status Pie Chart */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Order Status</CardTitle>
            <p className="text-sm text-muted-foreground">Current order distribution</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {orderStatusData.map((entry) => (
                <div key={entry.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {entry.name} ({entry.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Recent Orders</CardTitle>
          <p className="text-sm text-muted-foreground">Latest orders from your store</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-card-hover rounded-lg border border-border">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <StatusBadge status={order.status} />
                  <div className="text-right">
                    <p className="font-medium text-foreground">{order.total}</p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {order.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}