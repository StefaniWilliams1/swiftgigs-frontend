import { Link } from 'react-router-dom';
import { Star, MapPin, BadgeCheck } from 'lucide-react';
import { ServiceProvider } from '@/app/types';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

interface ServiceCardProps {
  service: ServiceProvider;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link to={`/service/${service.id}`}>
      <Card className="group overflow-hidden rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          {service.verified && (
            <Badge className="absolute right-3 top-3 bg-white text-purple-600 shadow-md">
              <BadgeCheck className="mr-1 h-3 w-3" />
              Verified
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <div className="mb-2 flex items-start justify-between">
            <h3 className="font-semibold text-gray-900 line-clamp-1">{service.name}</h3>
          </div>
          
          <div className="mb-2 flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-gray-900">{service.rating}</span>
            <span className="text-sm text-gray-500">({service.reviews} reviews)</span>
          </div>

          <div className="mb-3 flex items-center text-sm text-gray-600">
            <MapPin className="mr-1 h-4 w-4" />
            {service.location}
          </div>

          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
            </Badge>
            <span className="font-semibold text-purple-600">{service.priceRange}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
