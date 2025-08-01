import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { Building2, Home, Package, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

interface ConstructionFormData {
  plotSize: string;
  floors: number;
  bhk: string;
  packageType: 'Standard' | 'Premium' | 'Luxury';
  address: string;
  city: string;
  pincode: string;
  specialRequirements?: string;
}

export function ConstructionForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ConstructionFormData>();
  const selectedPackage = watch('packageType');

  const packageDetails = {
    Standard: {
      price: '₹15-20 Lakhs',
      features: ['Basic construction', 'Standard materials', '1-year warranty'],
      color: 'bg-blue-100 border-blue-300 text-blue-800'
    },
    Premium: {
      price: '₹25-35 Lakhs',
      features: ['Premium materials', 'Modern design', '2-year warranty', 'Interior consultation'],
      color: 'bg-orange-100 border-orange-300 text-orange-800'
    },
    Luxury: {
      price: '₹40+ Lakhs',
      features: ['Luxury finishes', 'Custom design', '3-year warranty', 'Full interior design', 'Smart home features'],
      color: 'bg-purple-100 border-purple-300 text-purple-800'
    }
  };

  const onSubmit = async (data: ConstructionFormData) => {
    setLoading(true);
    try {
      // Mock API call - replace with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Construction order submitted successfully!');
      navigate('/user/appointments');
    } catch (error) {
      toast.error('Failed to submit order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">New Construction Order</h1>
          <p className="mt-2 text-gray-600">Fill in the details for your construction project</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Plot Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-orange-600" />
                <h2 className="text-xl font-semibold text-gray-900">Plot Details</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plot Size
                  </label>
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    {...register('plotSize', { required: 'Plot size is required' })}
                  >
                    <option value="">Select plot size</option>
                    <option value="20x30">20x30 (600 sq ft)</option>
                    <option value="25x30">25x30 (750 sq ft)</option>
                    <option value="30x40">30x40 (1200 sq ft)</option>
                    <option value="40x60">40x60 (2400 sq ft)</option>
                    <option value="custom">Custom Size</option>
                  </select>
                  {errors.plotSize && (
                    <p className="mt-1 text-sm text-red-600">{errors.plotSize.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Floors
                  </label>
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    {...register('floors', { 
                      required: 'Number of floors is required',
                      valueAsNumber: true 
                    })}
                  >
                    <option value="">Select floors</option>
                    <option value={1}>Ground Floor (G)</option>
                    <option value={2}>Ground + 1 Floor (G+1)</option>
                    <option value={3}>Ground + 2 Floors (G+2)</option>
                    <option value={4}>Ground + 3 Floors (G+3)</option>
                  </select>
                  {errors.floors && (
                    <p className="mt-1 text-sm text-red-600">{errors.floors.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    BHK Configuration
                  </label>
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    {...register('bhk', { required: 'BHK configuration is required' })}
                  >
                    <option value="">Select BHK</option>
                    <option value="1BHK">1 BHK</option>
                    <option value="2BHK">2 BHK</option>
                    <option value="3BHK">3 BHK</option>
                    <option value="4BHK">4 BHK</option>
                    <option value="5BHK+">5+ BHK</option>
                  </select>
                  {errors.bhk && (
                    <p className="mt-1 text-sm text-red-600">{errors.bhk.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Package Selection */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-orange-600" />
                <h2 className="text-xl font-semibold text-gray-900">Package Selection</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(packageDetails).map(([packageType, details]) => (
                  <div key={packageType} className="relative">
                    <input
                      type="radio"
                      value={packageType}
                      {...register('packageType', { required: 'Package type is required' })}
                      className="sr-only"
                      id={packageType}
                    />
                    <label
                      htmlFor={packageType}
                      className={`block p-6 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedPackage === packageType
                          ? details.color
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">{packageType}</h3>
                        <p className="text-xl font-bold text-orange-600 mb-4">{details.price}</p>
                        <ul className="text-sm space-y-1">
                          {details.features.map((feature, index) => (
                            <li key={index} className="flex items-center justify-center">
                              <span>• {feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
              {errors.packageType && (
                <p className="mt-2 text-sm text-red-600">{errors.packageType.message}</p>
              )}
            </CardContent>
          </Card>

          {/* Address Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Home className="h-5 w-5 text-orange-600" />
                <h2 className="text-xl font-semibold text-gray-900">Site Address</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Complete Address
                  </label>
                  <textarea
                    rows={3}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter complete site address"
                    {...register('address', { required: 'Address is required' })}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter city"
                      {...register('city', { required: 'City is required' })}
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter PIN code"
                      {...register('pincode', { 
                        required: 'PIN code is required',
                        pattern: {
                          value: /^[0-9]{6}$/,
                          message: 'PIN code must be 6 digits'
                        }
                      })}
                    />
                    {errors.pincode && (
                      <p className="mt-1 text-sm text-red-600">{errors.pincode.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Requirements */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Special Requirements (Optional)</h2>
            </CardHeader>
            <CardContent>
              <textarea
                rows={4}
                className="w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="Any special requirements or additional information..."
                {...register('specialRequirements')}
              />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/user/dashboard')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={loading}
              className="px-8"
            >
              Submit Order
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}