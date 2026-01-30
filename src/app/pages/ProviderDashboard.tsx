import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Calendar, DollarSign, Star, TrendingUp, CheckCircle, XCircle } from 'lucide-react';

export function ProviderDashboard() {
  const pendingRequests = [
    {
      id: 1,
      client: 'John Smith',
      service: 'Wedding DJ',
      date: '2026-02-15',
      amount: 1200,
    },
    {
      id: 2,
      client: 'Sarah Johnson',
      service: 'Corporate Event',
      date: '2026-02-20',
      amount: 1600,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Provider Dashboard</h1>
          <p className="text-gray-600">Manage your gigs and grow your business</p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">£9,960</p>
                  <p className="text-xs text-green-600">+15% this month</p>
                </div>
                <div className="rounded-full bg-green-100 p-3">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Gigs</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
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
                  <p className="text-sm text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-gray-900">4.9</p>
                  <p className="text-xs text-gray-600">127 reviews</p>
                </div>
                <div className="rounded-full bg-yellow-100 p-3">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Profile Views</p>
                  <p className="text-2xl font-bold text-gray-900">342</p>
                  <p className="text-xs text-blue-600">+23% this week</p>
                </div>
                <div className="rounded-full bg-blue-100 p-3">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="requests">
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>Pending Requests</CardTitle>
                <CardDescription>Review and respond to booking requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <Card key={request.id} className="rounded-lg border-2">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="mb-1 font-semibold text-gray-900">{request.service}</h3>
                            <p className="mb-2 text-sm text-gray-600">Client: {request.client}</p>
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="mr-1 h-4 w-4" />
                              {request.date}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="mb-3 text-xl font-bold text-gray-900">
                              £{request.amount}
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="rounded-lg">
                                <XCircle className="mr-1 h-4 w-4" />
                                Decline
                              </Button>
                              <Button size="sm" className="rounded-lg bg-green-600 hover:bg-green-700">
                                <CheckCircle className="mr-1 h-4 w-4" />
                                Accept
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

          <TabsContent value="bookings">
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>Confirmed Bookings</CardTitle>
                <CardDescription>Your upcoming and past gigs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="py-8 text-center text-gray-600">
                  Your confirmed bookings will appear here
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>Availability Calendar</CardTitle>
                <CardDescription>Manage your availability and schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="py-8 text-center text-gray-600">
                  Calendar view to manage your availability
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Update your profile information and pricing</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="py-8 text-center text-gray-600">
                  Profile editing interface
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}