import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Customers() {
  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Customers</h1>
        <p className="text-muted-foreground">
          Manage your customer base
        </p>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Customer Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Customer management features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}