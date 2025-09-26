import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "./StatusBadge";

interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  phone2?: string;
  address: string;
  city: string;
  status: string;
  deliveryCompany?: string;
  privateNote?: string;
  clientNote?: string;
  product: string;
  quantity: number;
  price: number;
  total: number;
  deliveryFee: number;
  shippingFee: number;
}

interface OrderEditDialogProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (order: Order) => void;
}

const statusOptions = [
  { value: "En attente", label: "En attente", color: "warning" },
  { value: "Tentative 1", label: "Tentative 1", color: "info" },
  { value: "Confirmée", label: "Confirmée", color: "success" },
  { value: "Rejetée", label: "Rejetée", color: "destructive" },
  { value: "Echange", label: "Echange", color: "warning" },
  { value: "Annulée", label: "Annulée", color: "destructive" },
  { value: "Livrée", label: "Livrée", color: "success" },
  { value: "Retournée", label: "Retournée", color: "destructive" },
];

const deliveryCompanies = [
  "DHL Express",
  "FedEx",
  "UPS",
  "JETPACK",
  "PosteTunisie",
  "Aramex",
  "TNT"
];

export function OrderEditDialog({ order, open, onOpenChange, onSave }: OrderEditDialogProps) {
  const [formData, setFormData] = useState<Order>(order || {} as Order);

  const handleSave = () => {
    onSave(formData);
    onOpenChange(false);
  };

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Modifier la commande n°{order.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Détails de la commande</h3>
              
              <div className="space-y-2">
                <Label htmlFor="status" className="text-foreground">Statut</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {statusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value} className="hover:bg-secondary">
                        <div className="flex items-center gap-2">
                          <StatusBadge status={status.value} />
                          {status.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliveryCompany" className="text-foreground">Société de livraison</Label>
                <Select
                  value={formData.deliveryCompany || ""}
                  onValueChange={(value) => setFormData({ ...formData, deliveryCompany: value })}
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Sélectionner une société" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {deliveryCompanies.map((company) => (
                      <SelectItem key={company} value={company} className="hover:bg-secondary">
                        {company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="privateNote" className="text-foreground">Ajouter une note privée...</Label>
                <Textarea
                  id="privateNote"
                  value={formData.privateNote || ""}
                  onChange={(e) => setFormData({ ...formData, privateNote: e.target.value })}
                  placeholder="Ajouter une note privée..."
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Détails du client</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer" className="text-foreground">Nom</Label>
                  <Input
                    id="customer"
                    value={formData.customer}
                    onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background border-border text-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">Téléphone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone2" className="text-foreground">Téléphone 2</Label>
                  <Input
                    id="phone2"
                    value={formData.phone2 || ""}
                    onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
                    className="bg-background border-border text-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-foreground">Adresse</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-foreground">Ville</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="bg-background border-border text-foreground"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientNote" className="text-foreground">Ajouter une note client...</Label>
                <Textarea
                  id="clientNote"
                  value={formData.clientNote || ""}
                  onChange={(e) => setFormData({ ...formData, clientNote: e.target.value })}
                  placeholder="Ajouter une note client..."
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
          </div>

          {/* Product Summary */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Résumé des commandes</h3>
            <div className="bg-secondary/20 rounded-lg p-4">
              <div className="grid grid-cols-6 gap-4 text-sm font-medium text-muted-foreground mb-2">
                <div>Produit</div>
                <div>ID</div>
                <div>Quantité</div>
                <div>Attributs</div>
                <div>Prix unitaire</div>
                <div>Total</div>
              </div>
              <div className="grid grid-cols-6 gap-4 text-sm text-foreground">
                <div>{formData.product}</div>
                <div>{formData.id}</div>
                <div>{formData.quantity}</div>
                <div>-</div>
                <div>{formData.price} TND</div>
                <div>{formData.price * formData.quantity} TND</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Coût de livraison</span>
                <span className="text-foreground">{formData.deliveryFee || 0} TND</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frais de livraison</span>
                <span className="text-foreground">{formData.shippingFee || 7} TND</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-semibold bg-primary/10 p-3 rounded-lg">
              <span className="text-foreground">Total</span>
              <span className="text-foreground">{formData.total} TND</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-border text-foreground hover:bg-secondary"
            >
              Annuler
            </Button>
            <Button
              onClick={handleSave}
              className="bg-primary text-primary-foreground hover:bg-primary-hover"
            >
              Enregistrer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}