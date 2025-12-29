// src/pages/admin/Dashboard.tsx
import {
  useGetAllOrderQuery,
} from "@/redux/api/orderApi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Package,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  RefreshCw,
  DollarSign,
  TrendingUp,
  Users,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Your current shipping status
export const shippingStatus = {
  PENDING: "pending",
  READY: "ready to delivery",
  DELIVERED: "delivered",
  CANCELED: "canceled",
} as const;

// Status display helper
const getStatusInfo = (status: string) => {
  const map: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
    [shippingStatus.PENDING]: {
      label: "Pending",
      color: "text-amber-700",
      bg: "bg-amber-50 border-amber-200",
      icon: <Clock className="h-3 w-3" />,
    },
    [shippingStatus.READY]: {
      label: "Ready",
      color: "text-blue-700",
      bg: "bg-blue-50 border-blue-200",
      icon: <Truck className="h-3 w-3" />,
    },
    [shippingStatus.DELIVERED]: {
      label: "Delivered",
      color: "text-emerald-700",
      bg: "bg-emerald-50 border-emerald-200",
      icon: <CheckCircle2 className="h-3 w-3" />,
    },
    [shippingStatus.CANCELED]: {
      label: "Cancelled",
      color: "text-rose-700",
      bg: "bg-rose-50 border-rose-200",
      icon: <XCircle className="h-3 w-3" />,
    },
  };
  return map[status] || { 
    label: status, 
    color: "text-gray-700", 
    bg: "bg-gray-50 border-gray-200",
    icon: <Package className="h-3 w-3" />
  };
};

export default function AdminDashboard() {
  const { data, isLoading, refetch } = useGetAllOrderQuery();

  const orders = data?.data || [];
  const totalOrders = data?.meta?.total || orders.length;

  // Calculate statistics
  const stats = {
    total: totalOrders,
    pending: orders.filter((o: any) => o.status === shippingStatus.PENDING).length,
    ready: orders.filter((o: any) => o.status === shippingStatus.READY).length,
    delivered: orders.filter((o: any) => o.status === shippingStatus.DELIVERED).length,
    canceled: orders.filter((o: any) => o.status === shippingStatus.CANCELED).length,
    revenue: orders.reduce((sum: number, o: any) => sum + (o.pricing?.grandTotal || 0), 0),
  };

  // Calculate conversion rate (example)
  const conversionRate = orders.length > 0 ? (stats.delivered / orders.length) * 100 : 0;
  
  // Get recent 5 orders
  const recentOrders = [...orders].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        <p className="text-muted-foreground">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100/50 p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header with search and actions */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back! Here's what's happening with your orders today.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search orders..." 
              className="pl-9 w-full lg:w-[280px]"
            />
          </div>
          <Button 
            onClick={() => refetch()} 
            variant="outline" 
            size="lg"
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button size="lg" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`৳${stats.revenue.toLocaleString()}`}
          icon={<DollarSign className="h-5 w-5" />}
          trend="+12.5%"
          trendUp={true}
          description="From last month"
          color="bg-gradient-to-br from-emerald-500 to-emerald-600"
        />
        <StatCard
          title="Total Orders"
          value={stats.total.toLocaleString()}
          icon={<ShoppingCart className="h-5 w-5" />}
          trend="+8.2%"
          trendUp={true}
          description="Active orders"
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          title="Conversion Rate"
          value={`${conversionRate.toFixed(1)}%`}
          icon={<TrendingUp className="h-5 w-5" />}
          trend="+3.1%"
          trendUp={true}
          description="Order completion"
          color="bg-gradient-to-br from-violet-500 to-violet-600"
        />
        <StatCard
          title="Avg. Order Value"
          value={`৳${(stats.revenue / (stats.total || 1)).toFixed(0)}`}
          icon={<Users className="h-5 w-5" />}
          trend="-2.4%"
          trendUp={false}
          description="Per customer"
          color="bg-gradient-to-br from-amber-500 to-amber-600"
        />
      </div>

      {/* Status Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatusCard
          title="Pending"
          value={stats.pending}
          icon={<Clock className="h-5 w-5" />}
          color="border-l-4 border-l-amber-500"
          bgColor="bg-amber-50"
          textColor="text-amber-700"
        />
        <StatusCard
          title="Ready"
          value={stats.ready}
          icon={<Truck className="h-5 w-5" />}
          color="border-l-4 border-l-blue-500"
          bgColor="bg-blue-50"
          textColor="text-blue-700"
        />
        <StatusCard
          title="Delivered"
          value={stats.delivered}
          icon={<CheckCircle2 className="h-5 w-5" />}
          color="border-l-4 border-l-emerald-500"
          bgColor="bg-emerald-50"
          textColor="text-emerald-700"
        />
        <StatusCard
          title="Cancelled"
          value={stats.canceled}
          icon={<XCircle className="h-5 w-5" />}
          color="border-l-4 border-l-rose-500"
          bgColor="bg-rose-50"
          textColor="text-rose-700"
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Card */}
        <Card className="lg:col-span-2 border-none shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Recent Orders</CardTitle>
                <CardDescription>Latest customer orders</CardDescription>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="canceled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                    <TableHead className="w-[100px]">Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order: any) => {
                    const statusInfo = getStatusInfo(order.status);
                    return (
                      <TableRow key={order._id} className="group hover:bg-gray-50/50">
                        <TableCell className="font-mono text-sm font-medium">
                          #{order._id.slice(-6).toUpperCase()}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.customerInfo.name}</p>
                            <p className="text-sm text-muted-foreground">{order.customerInfo.phone}</p>
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-sm">
                          {format(new Date(order.createdAt), "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell className="font-semibold">
                          ৳{order.pricing?.grandTotal?.toLocaleString() || "0"}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "gap-1.5 px-3 py-1 text-xs font-medium",
                              statusInfo.bg,
                              statusInfo.color
                            )}
                          >
                            {statusInfo.icon}
                            {statusInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="gap-2">
                                <Eye className="h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2">
                                <Edit className="h-4 w-4" />
                                Edit Order
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            {recentOrders.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-40" />
                <p className="text-lg">No orders found</p>
              </div>
            )}
            <div className="flex justify-between items-center mt-6">
              <p className="text-sm text-muted-foreground">
                Showing {recentOrders.length} of {orders.length} orders
              </p>
              <Button variant="outline" size="sm">
                View All Orders
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats & Actions */}
        <div className="space-y-6">
          {/* Order Status Distribution */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Order Status</CardTitle>
              <CardDescription>Current distribution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Delivered", value: stats.delivered, total: stats.total, color: "bg-emerald-500" },
                { label: "Pending", value: stats.pending, total: stats.total, color: "bg-amber-500" },
                { label: "Ready", value: stats.ready, total: stats.total, color: "bg-blue-500" },
                { label: "Cancelled", value: stats.canceled, total: stats.total, color: "bg-rose-500" },
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-muted-foreground">
                      {item.value} ({((item.value / (stats.total || 1)) * 100).toFixed(0)}%)
                    </span>
                  </div>
                  <Progress 
                    value={(item.value / (stats.total || 1)) * 100} 
                    className="h-2"
                    indicatorClassName={item.color}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Truck className="h-4 w-4" />
                Update Shipping
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Filter className="h-4 w-4" />
                Filter Orders
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Download className="h-4 w-4" />
                Export Reports
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Clock className="h-4 w-4" />
                View Pending Orders
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Enhanced Stat Card
function StatCard({
  title,
  value,
  icon,
  trend,
  trendUp,
  description,
  color,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
  description: string;
  color: string;
}) {
  return (
    <Card className="border-none shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            <div className="flex items-center gap-2">
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium",
                trendUp ? "text-emerald-600" : "text-rose-600"
              )}>
                {trendUp ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                {trend}
              </div>
              <span className="text-sm text-muted-foreground">{description}</span>
            </div>
          </div>
          <div className={cn(
            "p-3 rounded-xl text-white",
            color
          )}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Status Card Component
function StatusCard({
  title,
  value,
  icon,
  color,
  bgColor,
  textColor,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  textColor: string;
}) {
  return (
    <Card className={cn(
      "border-none shadow-sm overflow-hidden transition-all hover:shadow-md",
      color,
      bgColor
    )}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium mb-1">{title}</p>
            <p className={cn("text-2xl font-bold", textColor)}>{value}</p>
          </div>
          <div className={cn("p-3 rounded-full", bgColor, textColor)}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}