import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent } from "@/app/components/ui/card";
import { Search, SlidersHorizontal } from "lucide-react";
import { ServiceCard } from "@/app/components/ServiceCard";
import {
  mockServices,
  serviceCategories,
} from "@/app/data/mockData";

export function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredServices = mockServices.filter((service) => {
    const matchesSearch =
      searchTerm === "" ||
      service.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      service.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Browse Services
          </h1>
          <p className="text-gray-600">
            Find the perfect entertainment professional for your
            event
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 rounded-xl pl-10"
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="h-12 w-full rounded-xl sm:w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  All Categories
                </SelectItem>
                {serviceCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="h-12 rounded-xl"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="mr-2 h-5 w-5" />
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card className="rounded-xl">
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <h3 className="mb-3 font-semibold text-gray-900">
                      Price Range
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="price1" />
                        <Label
                          htmlFor="price1"
                          className="cursor-pointer"
                        >
                          Under £500
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="price2" />
                        <Label
                          htmlFor="price2"
                          className="cursor-pointer"
                        >
                          £500 - £1000
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="price3" />
                        <Label
                          htmlFor="price3"
                          className="cursor-pointer"
                        >
                          £1000 - £2000
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="price4" />
                        <Label
                          htmlFor="price4"
                          className="cursor-pointer"
                        >
                          Over £2000
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 font-semibold text-gray-900">
                      Rating
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="rating1" />
                        <Label
                          htmlFor="rating1"
                          className="cursor-pointer"
                        >
                          4.5+ Stars
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="rating2" />
                        <Label
                          htmlFor="rating2"
                          className="cursor-pointer"
                        >
                          4.0+ Stars
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="rating3" />
                        <Label
                          htmlFor="rating3"
                          className="cursor-pointer"
                        >
                          3.5+ Stars
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 font-semibold text-gray-900">
                      Verification
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="verified" />
                        <Label
                          htmlFor="verified"
                          className="cursor-pointer"
                        >
                          Verified Professionals
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="available" />
                        <Label
                          htmlFor="available"
                          className="cursor-pointer"
                        >
                          Available This Month
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            {filteredServices.length}{" "}
            {filteredServices.length === 1
              ? "service"
              : "services"}{" "}
            found
          </p>
          <Select defaultValue="rating">
            <SelectTrigger className="w-[180px] rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">
                Highest Rated
              </SelectItem>
              <SelectItem value="price-low">
                Price: Low to High
              </SelectItem>
              <SelectItem value="price-high">
                Price: High to Low
              </SelectItem>
              <SelectItem value="reviews">
                Most Reviews
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Service Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-600">
              No services found matching your criteria.
            </p>
            <Button
              variant="outline"
              className="mt-4 rounded-lg"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}