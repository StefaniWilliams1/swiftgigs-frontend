import { useParams, Link } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Star, MapPin, BadgeCheck, Calendar, MessageSquare, Phone, Mail } from 'lucide-react';
import { mockServices, mockReviews } from '@/app/data/mockData';

export function ServiceDetailPage() {
  const { id } = useParams();
  const service = mockServices.find((s) => s.id === id);
  const reviews = mockReviews.filter((r) => r.serviceId === id);

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Service Not Found</h2>
          <Link to="/services">
            <Button className="rounded-lg">Back to Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <Card className="mb-6 overflow-hidden rounded-xl">
              <img
                src={service.image}
                alt={service.name}
                className="h-96 w-full object-cover"
              />
            </Card>

            {/* Service Info */}
            <Card className="mb-6 rounded-xl">
              <CardContent className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <h1 className="text-3xl font-bold text-gray-900">{service.name}</h1>
                      {service.verified && (
                        <Badge className="bg-green-100 text-green-700">
                          <BadgeCheck className="mr-1 h-3 w-3" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Star className="mr-1 h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{service.rating}</span>
                        <span className="ml-1 text-gray-600">({service.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="mr-1 h-4 w-4" />
                        {service.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">{service.priceRange}</div>
                    <div className="text-sm text-gray-500">per event</div>
                  </div>
                </div>

                <Badge variant="secondary">{service.category.toUpperCase()}</Badge>

                <div className="mt-6">
                  <h2 className="mb-3 text-xl font-semibold text-gray-900">About</h2>
                  <p className="leading-relaxed text-gray-700">{service.description}</p>
                </div>

                <div className="mt-6">
                  <h2 className="mb-3 text-xl font-semibold text-gray-900">Availability</h2>
                  <div className="flex flex-wrap gap-2">
                    {service.availability.map((date) => (
                      <Badge key={date} variant="outline" className="px-3 py-1">
                        <Calendar className="mr-1 h-3 w-3" />
                        {new Date(date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="rounded-xl">
              <CardContent className="p-6">
                <h2 className="mb-6 text-xl font-semibold text-gray-900">
                  Reviews ({reviews.length})
                </h2>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src="" />
                            <AvatarFallback>
                              {review.userName
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-gray-900">{review.userName}</div>
                            <div className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="rounded-xl shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Get Started</h3>
                    <Link to="/booking">
                      <Button className="mb-3 w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        <Calendar className="mr-2 h-5 w-5" />
                        Book Now
                      </Button>
                    </Link>
                    <Link to="/messages">
                      <Button variant="outline" className="w-full rounded-lg">
                        <MessageSquare className="mr-2 h-5 w-5" />
                        Send Message
                      </Button>
                    </Link>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Contact</h3>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700">
                        <Phone className="mr-3 h-5 w-5 text-purple-600" />
                        <span>(555) 123-4567</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Mail className="mr-3 h-5 w-5 text-purple-600" />
                        <span>contact@example.com</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <MapPin className="mr-3 h-5 w-5 text-purple-600" />
                        <span>{service.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t pt-6">
                    <h3 className="mb-3 text-sm font-semibold text-gray-900">Response Time</h3>
                    <p className="text-sm text-gray-600">Usually responds within 2 hours</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
