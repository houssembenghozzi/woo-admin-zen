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
import { Search, Filter, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { Package, AlertTriangle, DollarSign, Boxes } from "lucide-react";

// Mock data
const productsData = [
  {
    id: "17",
    name: "Wireless Headphones",
    image: "/api/placeholder/60/60",
    price: "$79.99",
    cost: "$45.00",
    stock: 24,
    status: "Published",
    category: "Electronics",
    sku: "WH-001",
  },
  {
    id: "16",
    name: "Smart Watch",
    image: "/api/placeholder/60/60", 
    price: "$199.99",
    cost: "$120.00",
    stock: 12,
    status: "Published",
    category: "Electronics",
    sku: "SW-002",
  },
  {
    id: "14",
    name: "Laptop Stand",
    image: "/api/placeholder/60/60",
    price: "$49.99",
    cost: "$25.00",
    stock: 0,
    status: "Out of Stock",
    category: "Accessories",
    sku: "LS-003",
  },
  {
    id: "8",
    name: "USB-C Cable",
    image: "/api/placeholder/60/60",
    price: "$19.99",
    cost: "$8.00",
    stock: 156,
    status: "Published",
    category: "Accessories",
    sku: "UC-004",
  },
  {
    id: "7",
    name: "Phone Case",
    image: "/api/placeholder/60/60",
    price: "$24.99",
    cost: "$12.00",
    stock: 89,
    status: "Draft",
    category: "Accessories",
    sku: "PC-005",
  },
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredProducts = productsData.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || product.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesCategory = categoryFilter === "all" || product.category.toLowerCase() === categoryFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const productStats = {
    total: productsData.length,
    published: productsData.filter(p => p.status === "Published").length,
    outOfStock: productsData.filter(p => p.stock === 0).length,
    lowStock: productsData.filter(p => p.stock > 0 && p.stock < 10).length,
  };

  const totalStockValue = productsData.reduce((acc, product) => {
    const price = parseFloat(product.price.replace('$', ''));
    return acc + (price * product.stock);
  }, 0);

  return (
    <div className="flex-1 space-y-6 p-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog and inventory</p>
        </div>
        <Button className="bg-gradient-primary hover:bg-primary-hover shadow-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Products"
          value={productStats.total.toString()}
          subtitle="In your catalog"
          icon={Package}
        />
        <MetricCard
          title="Published"
          value={productStats.published.toString()}
          subtitle="Live products"
          icon={Boxes}
          variant="success"
        />
        <MetricCard
          title="Stock Value"
          value={`$${totalStockValue.toLocaleString()}`}
          subtitle="Total inventory value"
          icon={DollarSign}
          variant="info"
        />
        <MetricCard
          title="Low Stock"
          value={productStats.lowStock.toString()}
          subtitle="Need restocking"
          icon={AlertTriangle}
          variant="warning"
        />
      </div>

      {/* Product Management */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Product Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search products by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="out of stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Table */}
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Product</TableHead>
                  <TableHead className="font-semibold">SKU</TableHead>
                  <TableHead className="font-semibold">Price</TableHead>
                  <TableHead className="font-semibold">Stock</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} className="hover:bg-card-hover">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{product.name}</div>
                          <div className="text-sm text-muted-foreground">ID: {product.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {product.sku}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-semibold text-foreground">{product.price}</div>
                        <div className="text-sm text-muted-foreground">Cost: {product.cost}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`font-medium ${
                        product.stock === 0 
                          ? "text-destructive" 
                          : product.stock < 10 
                            ? "text-warning" 
                            : "text-success"
                      }`}>
                        {product.stock}
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge 
                        status={product.status}
                        variant={
                          product.status === "Published" ? "success" :
                          product.status === "Out of Stock" ? "destructive" :
                          "default"
                        }
                      />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {product.category}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No products found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}