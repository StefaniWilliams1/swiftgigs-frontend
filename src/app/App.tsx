import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '@/app/components/Header';
import { LandingPage } from '@/app/pages/LandingPage';
import { LoginPage } from '@/app/pages/LoginPage';
import { SignupPage } from '@/app/pages/SignupPage';
import { ServicesPage } from '@/app/pages/ServicesPage';
import { ServiceDetailPage } from '@/app/pages/ServiceDetailPage';
import { BookingPage } from '@/app/pages/BookingPage';
import { ClientDashboard } from '@/app/pages/ClientDashboard';
import { ProviderDashboard } from '@/app/pages/ProviderDashboard';
import { MessagesPage } from '@/app/pages/MessagesPage';
import { AdminDashboard } from '@/app/pages/AdminDashboard';
import { MatchingPage } from '@/app/pages/MatchingPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/matching" element={<MatchingPage />} />
          <Route path="/service/:id" element={<ServiceDetailPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/provider-dashboard" element={<ProviderDashboard />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;