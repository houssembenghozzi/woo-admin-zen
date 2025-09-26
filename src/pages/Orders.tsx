import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, Download, Eye, Edit } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { ShoppingCart, Clock, CheckCircle, XCircle } from "lucide-react";

// Mock data
const ordersData = [
  {
    id: "#1234",
    customer: "John Doe",
    email: "john@example.com",
    total: "$129.00",
    status: "Delivered",
    date: "2024-09-25",
    items: 3,
  },
  {
    id: "#1235", 
    customer: "Jane Smith",
    email: "jane@example.com",
    total: "$89.50",
    status: "Processing",
    date: "2024-09-25",
    items: 2,
  },
  {
    id: "#1236",
    customer: "Mike Johnson", 
    email: "mike@example.com",
    total: "$199.99",
    status: "Shipped",
    date: "2024-09-24",
    items: 1,
  },
  {
    id: "#1237",
    customer: "Sarah Wilson",
    email: "sarah@example.com", 
    total: "$45.00",
    status: "Pending",
    date: "2024-09-24",
    items: 4,
  },
  {
    id: "#1238",
    customer: "Tom Brown",
    email: "tom@example.com",
    total: "$299.99",
    status: "Cancelled",
    date: "2024-09-23",
    items: 2,
  },
];

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const orderStats = {
    total: ordersData.length,
    pending: ordersData.filter(o => o.status === "Pending").length,
    processing: ordersData.filter(o => o.status === "Processing").length,
    delivered: ordersData.filter(o => o.status === "Delivered").length,
  };

  return (
    <div className="flex-1 space-y-6 p-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Orders</h1>
          <p className="text-muted-foreground">Manage and track all your store orders</p>
        </div>
        <Button className="bg-gradient-primary hover:bg-primary-hover shadow-primary">
          <Download className="w-4 h-4 mr-2" />
          Export Orders
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Orders"
          value={orderStats.total.toString()}
          subtitle="All time orders"
          icon={ShoppingCart}
        />
        <MetricCard
          title="Pending Orders"
          value={orderStats.pending.toString()}
          subtitle="Awaiting processing"
          icon={Clock}
          variant="warning"
        />
        <MetricCard
          title="Processing"
          value={orderStats.processing.toString()}
          subtitle="Currently processing"
          icon={ShoppingCart}
          variant="info"
        />
        <MetricCard
          title="Delivered"
          value={orderStats.delivered.toString()}
          subtitle="Successfully delivered"
          icon={CheckCircle}
          variant="success"
        />
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Order Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search orders, customers, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Orders Table */}
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Order ID</TableHead>
                  <TableHead className="font-semibold">Customer</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Total</TableHead>
                  <TableHead className="font-semibold">Items</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-card-hover">
                    <TableCell className="font-medium text-primary">
                      {order.id}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-foreground">{order.customer}</div>
                        <div className="text-sm text-muted-foreground">{order.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">
                      {order.total}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {order.items} items
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(order.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <XCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No orders found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}