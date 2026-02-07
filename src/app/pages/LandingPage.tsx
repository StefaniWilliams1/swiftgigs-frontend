import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card, CardContent } from "@/app/components/ui/card";
import { Search, CheckCircle, Star, Users, Shield } from "lucide-react";
import { serviceCategories, mockServices } from "@/app/data/mockData";
import { ServiceCard } from "@/app/components/ServiceCard";
import API from "../services/api";

export function LandingPage() {

  // ✅ BACKEND TEST
  useEffect(() => {
    fetch(`${API}/`)
      .then(res => res.text())
      .then(data => console.log("✅ Backend Connected:", data))
      .catch(err => console.error("❌ Backend Error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <section className="bg-gradient-to-br from-purple-600 to-blue-600 py-24 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">
          Find Perfect Entertainment for Your Events
        </h1>
        <p className="text-lg mb-8">
          DJs, photographers, videographers & more — all in one place.
        </p>

        <div className="flex justify-center gap-3 max-w-xl mx-auto">
          <Input
            placeholder="Search services..."
            className="rounded-full bg-white text-black"
          />
          <Link to="/services">
            <Button className="rounded-full bg-white text-purple-600">
              Search
            </Button>
          </Link>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Browse by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl mx-auto px-4">
          {serviceCategories.map(cat => (
            <Link key={cat.id} to={`/services?category=${cat.id}`}>
              <Card className="hover:shadow-lg transition">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">{cat.icon}</div>
                  <h3 className="font-semibold">{cat.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Professionals</h2>
            <Link to="/services">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {mockServices.slice(0, 6).map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          <Card>
            <CardContent className="p-6 text-center">
              <Search className="mx-auto mb-4 text-purple-600" />
              <h3 className="font-semibold mb-2">Search & Compare</h3>
              <p>Browse verified professionals.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="mx-auto mb-4 text-purple-600" />
              <h3 className="font-semibold mb-2">Book & Connect</h3>
              <p>Contact directly & book.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Star className="mx-auto mb-4 text-purple-600" />
              <h3 className="font-semibold mb-2">Enjoy & Review</h3>
              <p>Leave ratings & reviews.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-white py-16">
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 text-center">
          <div>
            <Shield className="mx-auto mb-3 text-green-600" />
            <h3 className="font-semibold">Verified Pros</h3>
          </div>
          <div>
            <Users className="mx-auto mb-3 text-blue-600" />
            <h3 className="font-semibold">Trusted Platform</h3>
          </div>
          <div>
            <Star className="mx-auto mb-3 text-yellow-500" />
            <h3 className="font-semibold">Top Quality</h3>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-10 text-center">
        © 2026 SwiftGigsEntertainment — All Rights Reserved
      </footer>

    </div>
  );
}
