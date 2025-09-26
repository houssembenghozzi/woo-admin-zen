import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/MetricCard";
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  RotateCcw,
  BarChart3,
  PieChart,
  MapPin
} from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
  LineChart,
  Line
} from "recharts";

const deliveryData = [
  { date: "Sep 19", delivered: 18, pending: 2, returned: 13 },
  { date: "Sep 20", delivered: 41, pending: 2, returned: 13 },
  { date: "Sep 21", delivered: 25, pending: 1, returned: 2 },
  { date: "Sep 22", delivered: 32, pending: 4, returned: 1 },
  { date: "Sep 23", delivered: 18, pending: 5, returned: 2 },
  { date: "Sep 24", delivered: 45, pending: 3, returned: 1 },
  { date: "Sep 25", delivered: 28, pending: 2, returned: 4 },
];

const performanceData = [
  { date: "Sep 19", orders: 15, delivered: 12, returned: 3 },
  { date: "Sep 20", orders: 45, delivered: 35, returned: 10 },
  { date: "Sep 21", orders: 30, delivered: 25, returned: 5 },
  { date: "Sep 22", orders: 75, delivered: 65, returned: 10 },
  { date: "Sep 23", orders: 38, delivered: 32, returned: 6 },
  { date: "Sep 24", orders: 52, delivered: 45, returned: 7 },
];

const regionData = [
  { name: "Ben Arous", value: 30, color: "#8B5CF6" },
  { name: "Tunis", value: 25, color: "#A78BFA" },
  { name: "Sfax", value: 20, color: "#C4B5FD" },
  { name: "Sousse", value: 15, color: "#DDD6FE" },
  { name: "Others", value: 10, color: "#EDE9FE" },
];

export default function Analytics() {
  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">
          Delivery performance and order insights
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Orders in Transit"
          value="18"
          subtitle="Currently shipping"
          icon={Package}
          variant="info"
          trend={{ value: "5.2%", isPositive: true }}
        />
        <MetricCard
          title="In Transit"
          value="2"
          subtitle="Processing orders"
          icon={ShoppingCart}
          variant="warning"
          trend={{ value: "12%", isPositive: false }}
        />
        <MetricCard
          title="Delivered"
          value="41"
          subtitle="Successfully delivered"
          icon={TrendingUp}
          variant="success"
          trend={{ value: "18%", isPositive: true }}
        />
        <MetricCard
          title="Returned"
          value="13"
          subtitle="Returns processed"
          icon={RotateCcw}
          variant="warning"
          trend={{ value: "3%", isPositive: false }}
        />
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <BarChart3 className="h-5 w-5" />
              Delivery Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Delivered</span>
                <span className="text-sm font-medium text-success">75.9%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: "75.9%" }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Returned</span>
                <span className="text-sm font-medium text-destructive">24.1%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-destructive h-2 rounded-full" style={{ width: "24.1%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <PieChart className="h-5 w-5" />
              Average Delivery Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-32">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-8 border-secondary relative">
                  <div className="w-24 h-24 rounded-full border-8 border-t-primary border-r-primary border-b-transparent border-l-transparent transform rotate-45 absolute"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">10h</div>
                      <div className="text-xs text-muted-foreground">47m 1s</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Order Performance</CardTitle>
            <p className="text-sm text-muted-foreground">Daily order tracking</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="delivered" fill="hsl(var(--success))" name="Delivered" />
                <Bar dataKey="returned" fill="hsl(var(--destructive))" name="Returned" />
                <Bar dataKey="orders" fill="hsl(var(--primary))" name="Total Orders" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Regional Performance</CardTitle>
            <p className="text-sm text-muted-foreground">Delivery rates by region</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                  className="outline-none"
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {regionData.map((region, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: region.color }}
                  ></div>
                  <span className="text-xs text-muted-foreground">{region.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Performance Table */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <MapPin className="h-5 w-5" />
            Regional Performance Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Region</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Pending</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">In Transit</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Delivered</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Returned</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Total Orders</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { region: "Ben Arous", pending: 1, transit: 0, delivered: 1, returned: 2, total: 4 },
                  { region: "Jendouba", pending: 0, transit: 0, delivered: 0, returned: 1, total: 1 },
                  { region: "Sfax", pending: 1, transit: 0, delivered: 4, returned: 1, total: 6 },
                  { region: "Sidi Bou Zid", pending: 0, transit: 0, delivered: 1, returned: 0, total: 1 },
                  { region: "Sousse", pending: 1, transit: 0, delivered: 3, returned: 1, total: 5 },
                  { region: "Tunis", pending: 4, transit: 0, delivered: 13, returned: 4, total: 21 },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-border">
                    <td className="py-3 px-4 text-sm text-foreground">{row.region}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{row.pending}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{row.transit}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{row.delivered}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{row.returned}</td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}