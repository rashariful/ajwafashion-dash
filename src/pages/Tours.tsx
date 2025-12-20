import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  Filter,
  DollarSign,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";

const tours = [
  {
    id: "T001",
    title: "Bali Adventure Paradise",
    location: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&h=300&fit=crop",
    price: 1250,
    duration: "7 days",
    maxGuests: 15,
    currentBookings: 12,
    rating: 4.8,
    reviews: 156,
    status: "active",
    description: "Experience the magical beauty of Bali with this comprehensive adventure tour."
  },
  {
    id: "T002", 
    title: "Tokyo Cultural Experience",
    location: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
    price: 2100,
    duration: "5 days",
    maxGuests: 10,
    currentBookings: 8,
    rating: 4.9,
    reviews: 203,
    status: "active",
    description: "Immerse yourself in Japanese culture with authentic experiences in Tokyo."
  },
  {
    id: "T003",
    title: "Swiss Alps Hiking",
    location: "Interlaken, Switzerland", 
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    price: 1850,
    duration: "6 days",
    maxGuests: 12,
    currentBookings: 12,
    rating: 4.7,
    reviews: 89,
    status: "full",
    description: "Breathtaking mountain hiking adventure through the Swiss Alps."
  },
  {
    id: "T004",
    title: "Moroccan Desert Safari",
    location: "Marrakech, Morocco",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73a8e?w=400&h=300&fit=crop",
    price: 980,
    duration: "4 days", 
    maxGuests: 20,
    currentBookings: 5,
    rating: 4.6,
    reviews: 127,
    status: "active",
    description: "Explore the Sahara Desert with camel rides and traditional Berber camps."
  }
];

export default function Tours() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || tour.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success text-success-foreground">Active</Badge>;
      case "full":
        return <Badge className="bg-warning text-warning-foreground">Full</Badge>;
      case "inactive":
        return <Badge variant="destructive">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getAvailabilityColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 100) return "text-destructive";
    if (percentage >= 80) return "text-warning";
    return "text-success";
  };

  return (
    <div className="p-6 space-y-6 bg-muted/20 min-h-full">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Tour Management</h1>
          <p className="text-muted-foreground">Manage your tour packages and bookings</p>
        </div>
        <Link to="/hotels" className="flex items-center text-white px-3 py-2 rounded-lg bg-gradient-primary hover:bg-primary-hover shadow-elevated">
          <Plus className="w-4 h-4 mr-2" />
          Add News
        </Link>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search tours by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTours.map((tour) => (
          <Card key={tour.id} className="shadow-card hover:shadow-elevated transition-all duration-300 group">
            <div className="relative overflow-hidden">
              <img 
                src={tour.image} 
                alt={tour.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3">
                {getStatusBadge(tour.status)}
              </div>
              <div className="absolute top-3 left-3">
                <Badge className="bg-black/70 text-white border-0">
                  {tour.duration}
                </Badge>
              </div>
            </div>

            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg font-bold text-foreground line-clamp-1">
                    {tour.title}
                  </CardTitle>
                  <CardDescription className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {tour.location}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">${tour.price}</p>
                  <p className="text-xs text-muted-foreground">per person</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {tour.description}
              </p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-warning fill-current mr-1" />
                    <span className="font-medium">{tour.rating}</span>
                    <span className="text-muted-foreground ml-1">({tour.reviews})</span>
                  </div>
                </div>
                <div className={`flex items-center ${getAvailabilityColor(tour.currentBookings, tour.maxGuests)}`}>
                  <Users className="w-4 h-4 mr-1" />
                  <span className="font-medium">{tour.currentBookings}/{tour.maxGuests}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-border">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <Button size="sm" className="bg-gradient-primary hover:bg-primary-hover">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTours.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground">No tours found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}