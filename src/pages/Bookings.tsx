import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  MapPin, 
  Hotel, 
  User, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2,
  DollarSign,
  Clock,
  Phone,
  Mail
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const bookings = [
  {
    id: "BK001",
    customer: {
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      avatar: "/avatars/john.png"
    },
    type: "tour",
    service: "Bali Adventure Paradise",
    bookingDate: "2024-01-10",
    serviceDate: "2024-01-15",
    amount: 1250,
    status: "confirmed",
    guests: 2,
    paymentStatus: "paid"
  },
  {
    id: "BK002",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@email.com", 
      phone: "+1 (555) 234-5678",
      avatar: "/avatars/sarah.png"
    },
    type: "hotel",
    service: "Ocean View Resort",
    bookingDate: "2024-01-12",
    serviceDate: "2024-01-16",
    amount: 890,
    status: "pending",
    guests: 1,
    paymentStatus: "pending"
  },
  {
    id: "BK003",
    customer: {
      name: "Mike Chen",
      email: "mike.chen@email.com",
      phone: "+1 (555) 345-6789", 
      avatar: "/avatars/mike.png"
    },
    type: "tour",
    service: "Tokyo Cultural Experience",
    bookingDate: "2024-01-08",
    serviceDate: "2024-01-17",
    amount: 2100,
    status: "confirmed",
    guests: 3,
    paymentStatus: "paid"
  },
  {
    id: "BK004",
    customer: {
      name: "Emma Wilson",
      email: "emma.w@email.com",
      phone: "+1 (555) 456-7890",
      avatar: "/avatars/emma.png"
    },
    type: "hotel",
    service: "Mountain Lodge Retreat",
    bookingDate: "2024-01-11",
    serviceDate: "2024-01-18",
    amount: 650,
    status: "cancelled",
    guests: 2,
    paymentStatus: "refunded"
  },
  {
    id: "BK005",
    customer: {
      name: "David Brown",
      email: "david.brown@email.com",
      phone: "+1 (555) 567-8901",
      avatar: "/avatars/david.png"
    },
    type: "tour",
    service: "Swiss Alps Hiking",
    bookingDate: "2024-01-13",
    serviceDate: "2024-01-20",
    amount: 1850,
    status: "confirmed",
    guests: 4,
    paymentStatus: "partial"
  }
];

export default function Bookings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || booking.status === selectedStatus;
    const matchesType = selectedType === "all" || booking.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-success text-success-foreground">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      case "completed":
        return <Badge className="bg-primary text-primary-foreground">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-success text-success-foreground">Paid</Badge>;
      case "pending":
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      case "partial":
        return <Badge className="bg-secondary text-secondary-foreground">Partial</Badge>;
      case "refunded":
        return <Badge variant="outline">Refunded</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "tour" ? (
      <MapPin className="w-4 h-4 text-primary" />
    ) : (
      <Hotel className="w-4 h-4 text-secondary-foreground" />
    );
  };

  return (
    <div className="p-6 space-y-6 bg-muted/20 min-h-full">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Booking Management</h1>
          <p className="text-muted-foreground">View and manage all customer bookings</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings by customer, service, or booking ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-border rounded-md text-sm"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-border rounded-md text-sm"
          >
            <option value="all">All Types</option>
            <option value="tour">Tours</option>
            <option value="hotel">Hotels</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>All Bookings</span>
          </CardTitle>
          <CardDescription>
            {filteredBookings.length} bookings found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Booking Date</TableHead>
                <TableHead>Service Date</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={booking.customer.avatar} alt={booking.customer.name} />
                        <AvatarFallback className="bg-gradient-secondary">
                          {booking.customer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">{booking.customer.name}</p>
                        <p className="text-xs text-muted-foreground">{booking.customer.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(booking.type)}
                      <span className="text-sm font-medium">{booking.service}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {booking.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
                      {booking.bookingDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                      {booking.serviceDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <User className="w-4 h-4 mr-1 text-muted-foreground" />
                      {booking.guests}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm font-medium">
                      <DollarSign className="w-4 h-4 mr-1 text-primary" />
                      {booking.amount}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(booking.status)}
                  </TableCell>
                  <TableCell>
                    {getPaymentBadge(booking.paymentStatus)}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground">No bookings found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}