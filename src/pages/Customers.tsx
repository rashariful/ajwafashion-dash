import { Users } from "lucide-react";

export default function Customers() {
  return (
    <div className="p-6 space-y-6 bg-muted/20 min-h-full">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Customer Management</h1>
        <p className="text-muted-foreground">Manage customer information and profiles</p>
      </div>
      
      <div className="text-center py-12">
        <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-medium text-foreground">Coming Soon</h3>
        <p className="text-muted-foreground">Customer management features will be available here</p>
      </div>
    </div>
  );
}