import { Star } from "lucide-react";

export default function Reviews() {
  return (
    <div className="p-6 space-y-6 bg-muted/20 min-h-full">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Categories Management</h1>
        <p className="text-muted-foreground">Manage your news categories here.</p>
      </div>
      
      <div className="text-center py-12">
        <Star className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-medium text-foreground">Coming Soon</h3>
        <p className="text-muted-foreground">Categories Management features will be available here</p>
      </div>
    </div>
  );
}