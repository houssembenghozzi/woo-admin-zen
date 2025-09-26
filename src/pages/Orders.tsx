import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/StatusBadge";
import { OrderEditDialog } from "@/components/OrderEditDialog";
import { Search, Filter, Eye, Edit, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockOrders = [
  {
    id: "001",
    customer: "Fatma Haggui",
    email: "fatma@example.com",
    phone: "23188730",
    phone2: "",
    address: "Cité El moez, route Gabes, sfax",
    city: "Sfax",
    product: "Ceinture amincissante",
    quantity: 1,
    price: 39,
    total: 46,
    deliveryFee: 0,
    shippingFee: 7,
    status: "En attente",
    date: "2024-01-15",
    deliveryCompany: "JETPACK",
    privateNote: "",
    clientNote: "",
  },
  {
    id: "002", 
    customer: "Ahmed Ben Ali",
    email: "ahmed@example.com",
    phone: "98765432",
    phone2: "12345678",
    address: "Avenue Habib Bourguiba, Tunis",
    city: "Tunis",
    product: "Legging avec crochet",
    quantity: 2,
    price: 44,
    total: 95,
    deliveryFee: 0,
    shippingFee: 7,
    status: "Confirmée",
    date: "2024-01-14",
    deliveryCompany: "DHL Express",
    privateNote: "Client VIP",
    clientNote: "Livraison rapide demandée",
  },
  {
    id: "003",
    customer: "Sarra Mansouri",
    email: "sarra@example.com", 
    phone: "55512345",
    phone2: "",
    address: "Route de Sousse, Monastir",
    city: "Monastir",
    product: "Bluetooth Speaker",
    quantity: 1,
    price: 79,
    total: 86,
    deliveryFee: 0,
    shippingFee: 7,
    status: "Livrée",
    date: "2024-01-13",
    deliveryCompany: "PosteTunisie",
    privateNote: "",
    clientNote: "",
  },
  {
    id: "004",
    customer: "Karim Trabelsi",
    email: "karim@example.com",
    phone: "44456789",
    phone2: "",
    address: "Centre ville, Sfax",
    city: "Sfax",
    product: "Phone Case",
    quantity: 3,
    price: 20,
    total: 67,
    deliveryFee: 0,
    shippingFee: 7,
    status: "Retournée",
    date: "2024-01-12",
    deliveryCompany: "Aramex",
    privateNote: "Client difficile",
    clientNote: "",
  },
];

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [orders, setOrders] = useState(mockOrders);

  const handleEditOrder = (order: any) => {
    setSelectedOrder(order);
    setIsEditDialogOpen(true);
  };

  const handleSaveOrder = (updatedOrder: any) => {
    setOrders(orders.map(order => 
      order.id === updatedOrder.id ? updatedOrder : order
    ));
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground">
          Manage and track all your store orders
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <Card className="border-border bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-foreground">Recent Orders</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search orders..."
                  className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button variant="outline" className="border-border hover:bg-secondary">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Order</TableHead>
                  <TableHead className="text-muted-foreground">Customer</TableHead>
                  <TableHead className="text-muted-foreground">Product</TableHead>
                  <TableHead className="text-muted-foreground">Amount</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Date</TableHead>
                  <TableHead className="text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="border-border hover:bg-secondary/50">
                    <TableCell className="text-foreground font-medium">#{order.id}</TableCell>
                    <TableCell className="text-foreground">{order.customer}</TableCell>
                    <TableCell className="text-foreground">{order.product}</TableCell>
                    <TableCell className="text-foreground">{order.total} TND</TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">{order.date}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-secondary">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border-border">
                          <DropdownMenuItem className="hover:bg-secondary cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="hover:bg-secondary cursor-pointer"
                            onClick={() => handleEditOrder(order)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <OrderEditDialog
        order={selectedOrder}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSaveOrder}
      />
    </div>
  );
}