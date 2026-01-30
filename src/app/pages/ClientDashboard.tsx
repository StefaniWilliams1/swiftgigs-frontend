import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Calendar, MessageSquare, Heart, Clock } from 'lucide-react';
import { mockBookings } from '@/app/data/mockData';
import { Link } from 'react-router-dom';

export function ClientDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600">Manage your bookings and favorites</p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
                <div className="rounded-full bg-purple-100 p-3">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Messages</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
                <div className="rounded-full bg-blue-100 p-3">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Favorites</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
                <div className="rounded-full bg-pink-100 p-3">
                  <Heart className="h-6 w-6 text-pink-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <div className="rounded-full bg-green-100 p-3">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>My Bookings</CardTitle>
                <CardDescription>View and manage your current and past bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBookings.map((booking) => (
                    <Card key={booking.id} className="rounded-lg border-2">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                              <h3 className="font-semibold text-gray-900">{booking.serviceName}</h3>
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="mb-1 text-sm text-gray-600">
                              Provider: {booking.providerName}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="mr-1 h-4 w-4" />
                                {booking.date}
                              </div>
                              <div className="flex items-center">
                                <Clock className="mr-1 h-4 w-4" />
                                {booking.time}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="mb-2 text-xl font-bold text-gray-900">
                              £{booking.price}
                            </div>
                            <div className="flex gap-2">
                              <Link to="/messages">
                                <Button variant="outline" size="sm" className="rounded-lg">
                                  Message
                                </Button>
                              </Link>
                              <Button size="sm" className="rounded-lg">
                                Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites">
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>Favorite Services</CardTitle>
                <CardDescription>Quick access to your favorite professionals</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600 py-8">
                  You haven't added any favorites yet. Browse services and click the heart icon to save them here.
                </p>
                <div className="text-center">
                  <Link to="/services">
                    <Button className="rounded-lg">Browse Services</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>My Reviews</CardTitle>
                <CardDescription>Reviews you've left for service providers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600 py-8">
                  You haven't left any reviews yet. After completing a booking, you can leave a review to help others.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}