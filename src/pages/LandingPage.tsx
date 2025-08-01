import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/UI/Button';
import { 
  Building2, 
  Shield, 
  Clock, 
  Award,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react';

export function LandingPage() {
  const { user } = useAuth();

  const features = [
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Premium materials and expert craftsmanship guaranteed'
    },
    {
      icon: Clock,
      title: 'Timely Delivery',
      description: 'On-time project completion with regular updates'
    },
    {
      icon: Award,
      title: 'Expert Team',
      description: 'Experienced engineers and construction professionals'
    }
  ];

  const packages = [
    {
      name: 'Standard',
      price: '₹15-20L',
      features: ['Basic construction', 'Standard materials', '1-year warranty', 'Site supervision'],
      popular: false
    },
    {
      name: 'Premium',
      price: '₹25-35L',
      features: ['Premium materials', 'Modern design', '2-year warranty', 'Interior consultation', 'Quality testing'],
      popular: true
    },
    {
      name: 'Luxury',
      price: '₹40L+',
      features: ['Luxury finishes', 'Custom design', '3-year warranty', 'Full interior design', 'Smart home features', 'Premium support'],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      location: 'Bangalore',
      rating: 5,
      comment: 'Excellent service and quality construction. The team was professional and delivered on time.'
    },
    {
      name: 'Priya Sharma',
      location: 'Hyderabad',
      rating: 5,
      comment: 'BrickStore made our dream home a reality. The premium package was worth every penny.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Build Your Dream Home with <span className="text-orange-200">BrickStore</span>
            </h1>
            <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
              Professional construction services with quality materials, expert craftsmanship, and timely delivery. 
              From planning to completion, we handle everything.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              {user ? (
                <Link to="/user/dashboard">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-orange-600 hover:bg-gray-100">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="w-full sm:w-auto bg-white text-orange-600 hover:bg-gray-100">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white hover:text-orange-600">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose BrickStore?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine traditional craftsmanship with modern technology to deliver exceptional construction services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <feature.icon className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Packages Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Construction Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect package for your construction needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div key={index} className={`relative p-8 rounded-lg border-2 ${
                pkg.popular 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 bg-white'
              }`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold text-orange-600 mb-2">{pkg.price}</div>
                  <p className="text-gray-600">Starting price</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${pkg.popular ? '' : 'bg-gray-600 hover:bg-gray-700'}`}
                  variant={pkg.popular ? 'primary' : 'secondary'}
                >
                  Choose {pkg.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-orange-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build Your Dream Home?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Get started with BrickStore today and experience premium construction services
          </p>
          {!user && (
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto bg-white text-orange-600 hover:bg-gray-100">
                  Start Your Project
                  <Building2 className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}