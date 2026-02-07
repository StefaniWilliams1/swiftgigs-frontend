import { Link } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent } from '@/app/components/ui/card';
import { Search, CheckCircle, Star, Users, Shield, Sparkles } from 'lucide-react';
import { serviceCategories, mockServices } from '@/app/data/mockData';
import { ServiceCard } from '@/app/components/ServiceCard';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Find Perfect Entertainment for Your Events
            </h1>
            <p className="mb-8 text-lg text-purple-100 sm:text-xl">
              Connect with verified DJs, photographers, videographers, musicians, and event hosts.
              Make your special moments unforgettable.
            </p>

            {/* Search Bar */}
            <div className="mx-auto max-w-2xl">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search for services..."
                    className="h-12 w-full rounded-full bg-white pl-10 pr-4 shadow-lg"
                  />
                </div>
                <Link to="/services">
                  <Button className="h-12 rounded-full bg-white px-8 text-purple-600 shadow-lg hover:bg-gray-50">
                    Search
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-sm text-purple-200">Professionals</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-sm text-purple-200">Events Booked</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">4.9</div>
                <div className="text-sm text-purple-200">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600">Find the perfect professional for your event</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {serviceCategories.map((category) => (
              <Link key={category.id} to={`/services?category=${category.id}`}>
                <Card className="group cursor-pointer rounded-xl border-2 border-gray-200 transition-all hover:border-purple-600 hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="mb-3 text-4xl">{category.icon}</div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-purple-600">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                Featured Professionals
              </h2>
              <p className="text-lg text-gray-600">Top-rated entertainment services</p>
            </div>
            <Link to="/services">
              <Button variant="outline" className="hidden rounded-full sm:inline-flex">
                View All
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockServices.slice(0, 6).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link to="/services">
              <Button variant="outline" className="rounded-full">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Smart Matching Feature */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Card className="overflow-hidden rounded-2xl border-2 border-purple-200 shadow-xl">
              <CardContent className="p-8 sm:p-12">
                <div className="grid gap-8 md:grid-cols-2 md:items-center">
                  <div>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2">
                      <Sparkles className="h-5 w-5 text-purple-600" />
                      <span className="font-semibold text-purple-600">NEW FEATURE</span>
                    </div>
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                      Smart Provider Matching
                    </h2>
                    <p className="mb-6 text-lg text-gray-600">
                      Let our intelligent matching system find the perfect entertainment professionals
                      based on your specific skills, location, and availability needs.
                    </p>
                    <ul className="mb-8 space-y-3">
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">Match by skills and expertise</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">Filter by location and availability</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">See top 3 matches with scores</span>
                      </li>
                    </ul>
                    <Link to="/matching">
                      <Button className="h-12 rounded-full bg-purple-600 px-8 hover:bg-purple-700">
                        <Sparkles className="mr-2 h-5 w-5" />
                        Try Smart Matching
                      </Button>
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="rounded-xl bg-white p-6 shadow-lg">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700">Match Score</span>
                        <span className="text-2xl font-bold text-purple-600">95%</span>
                      </div>
                      <div className="mb-4 h-3 overflow-hidden rounded-full bg-gray-200">
                        <div className="h-full w-[95%] rounded-full bg-gradient-to-r from-purple-600 to-blue-600"></div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Skills Match</span>
                          <span className="font-semibold">40%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Location Match</span>
                          <span className="font-semibold">30%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Availability</span>
                          <span className="font-semibold">25%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">How It Works</h2>
            <p className="text-lg text-gray-600">Book entertainment in three simple steps</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="rounded-xl border-2 border-gray-200 shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <Search className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">1. Search & Compare</h3>
                <p className="text-gray-600">
                  Browse verified professionals and compare reviews, pricing, and availability.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-xl border-2 border-gray-200 shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <CheckCircle className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">2. Book & Connect</h3>
                <p className="text-gray-600">
                  Send booking requests and communicate directly with service providers.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-xl border-2 border-gray-200 shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">3. Enjoy & Review</h3>
                <p className="text-gray-600">
                  Experience amazing service and leave a review to help others.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Why Choose Us</h2>
            <p className="text-lg text-gray-600">Your peace of mind is our priority</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Verified Professionals</h3>
              <p className="text-gray-600">
                All service providers are background-checked and verified for your safety.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Trusted by Thousands</h3>
              <p className="text-gray-600">
                Join thousands of satisfied customers who found perfect entertainment.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Quality Guaranteed</h3>
              <p className="text-gray-600">
                Read real reviews and ratings to make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="become-pro"
        className="bg-gradient-to-br from-purple-600 to-blue-600 py-16 sm:py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Are You an Entertainment Professional?
            </h2>
            <p className="mb-8 text-lg text-purple-100">
              Join our platform and connect with clients looking for your services.
            </p>
            <Link to="/signup">
              <Button className="h-12 rounded-full bg-white px-8 text-purple-600 shadow-lg hover:bg-gray-50">
                Sign Up as a Provider
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mb-4 font-semibold text-white">SwiftGigsEntertainment</h3>
              <p className="text-sm text-gray-400">
                Your trusted platform for booking entertainment professionals.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">For Clients</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link to="/services" className="hover:text-white">
                    Browse Services
                  </Link>
                </li>
                <li>
                  <Link to="/#how-it-works" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">For Providers</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link to="/signup" className="hover:text-white">
                    Join as a Pro
                  </Link>
                </li>
                <li>
                  <Link to="/provider-dashboard" className="hover:text-white">
                    Provider Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            © 2026 SwiftGigsEntertainment. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}