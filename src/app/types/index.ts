export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'provider' | 'admin';
  avatar?: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  priceRange: string;
  location: string;
  verified: boolean;
  image: string;
  description: string;
  availability: string[];
<<<<<<< HEAD
  skills?: string[]; // Skills/specialties
  hourlyRate?: number; // Base hourly rate for filtering
  experience?: number; // Years of experience
=======
>>>>>>> 7f5efd89eb1cca90a120b5a19d92fc0dc1a584ba
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  providerId: string;
  providerName: string;
  clientId: string;
  clientName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Review {
  id: string;
  serviceId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}
<<<<<<< HEAD

export interface MatchingCriteria {
  skills: string[];
  location: string;
  date: string;
}

export interface ProviderMatch extends ServiceProvider {
  matchScore: number;
  matchDetails: {
    skillMatch: number;
    locationMatch: number;
    availabilityMatch: number;
  };
}
=======
>>>>>>> 7f5efd89eb1cca90a120b5a19d92fc0dc1a584ba
