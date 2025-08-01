import React from 'react';
import { Card, CardContent, CardHeader } from '../../components/UI/Card';
import { 
  Calendar, 
  MapPin, 
  Package, 
  CheckCircle, 
  Clock, 
  Truck
} from 'lucide-react';

export function EmployeeDashboard() {
  // Mock data - replace with actual API calls
  const stats = {
    assignedVisits: 8,
    completedToday: 3,
    pendingDeliveries: 5,
    thisWeekVisits: 12
  };

  const todayAppointments = [
    {
      id: '1',
      customerName: 'John Doe',
      address: '123 Main St, Bangalore',
      time: '10:00 AM',
      plotSize: '30x40',
      packageType: 'Premium',
      status: 'Pending'
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      address: '456 Oak Ave, Bangalore',
      time: '2:00 PM',
      plotSize: '25x30',
      packageType: 'Standard',
      status: 'Completed'
    }
  ];

  const deliveries = [
    {
      id: '1',
      orderNumber: 'ORD-001',
      customerName: 'Mike Johnson',
      address: '789 Pine St, Bangalore',
      packageType: 'Luxury',
      status: 'Ready for Delivery'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage site visits and deliveries</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Assigned Visits</p>
                  <p className="text-3xl font-bold">{stats.assignedVisits}</p>
                </div>
                <Calendar className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Completed Today</p>
                  <p className="text-3xl font-bold">{stats.completedToday}</p>
                </div>
                <CheckCircle className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Pending Deliveries</p>
                  <p className="text-3xl font-bold">{stats.pendingDeliveries}</p>
                </div>
                <Truck className="h-12 w-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">This Week</p>
                  <p className="text-3xl font-bold">{stats.thisWeekVisits}</p>
                </div>
                <Clock className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Appointments */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Today's Site Visits</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium text-gray-900">{appointment.customerName}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            appointment.status === 'Completed' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {appointment.status}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{appointment.address}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Package className="h-4 w-4" />
                              <span>{appointment.packageType} - {appointment.plotSize}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Deliveries */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Pending Deliveries</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deliveries.map((delivery) => (
                  <div key={delivery.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium text-gray-900">{delivery.customerName}</h3>
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            {delivery.status}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Package className="h-4 w-4" />
                            <span>Order: {delivery.orderNumber}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{delivery.address}</span>
                          </div>
                          <div>
                            <span className="font-medium">{delivery.packageType} Package</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}