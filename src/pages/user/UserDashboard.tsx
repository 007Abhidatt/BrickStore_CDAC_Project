import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { 
  Building2, 
  Calendar, 
  Package, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Plus
} from 'lucide-react';

export function UserDashboard() {
  const { user } = useAuth();

  // Mock data - replace with actual API calls
  const stats = {
    activeOrders: 2,
    pendingAppointments: 1,
    completedOrders: 5,
    siteVerified: user?.siteVerified || false
  };

  const recentOrders = [
    {
      id: '1',
      packageType: 'Premium',
      status: 'In Progress',
      plotSize: '30x40',
      floors: 2,
      bhk: '3BHK',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      packageType: 'Standard',
      status: 'Site Visit Pending',
      plotSize: '25x30',
      floors: 1,
      bhk: '2BHK',
      createdAt: '2024-01-10'
    }
  ];

  const appointments = [
    {
      id: '1',
      date: '2024-01-20',
      time: '10:00 AM',
      status: 'Confirmed',
      engineer: 'John Smith'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="mt-2 text-gray-600">Manage your construction projects and orders</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Active Orders</p>
                  <p className="text-3xl font-bold">{stats.activeOrders}</p>
                </div>
                <Package className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Appointments</p>
                  <p className="text-3xl font-bold">{stats.pendingAppointments}</p>
                </div>
                <Calendar className="h-12 w-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Completed</p>
                  <p className="text-3xl font-bold">{stats.completedOrders}</p>
                </div>
                <CheckCircle className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className={`${stats.siteVerified ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'} text-white`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white opacity-90 text-sm font-medium">Site Status</p>
                  <p className="text-lg font-bold">{stats.siteVerified ? 'Verified' : 'Pending'}</p>
                </div>
                {stats.siteVerified ? (
                  <CheckCircle className="h-12 w-12 text-green-200" />
                ) : (
                  <AlertCircle className="h-12 w-12 text-red-200" />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/user/form">
                <Button className="w-full h-20 flex-col">
                  <Plus className="h-6 w-6 mb-2" />
                  New Construction Order
                </Button>
              </Link>
              <Link to="/user/appointments">
                <Button variant="secondary" className="w-full h-20 flex-col">
                  <Calendar className="h-6 w-6 mb-2" />
                  Schedule Site Visit
                </Button>
              </Link>
              <Link to="/user/orders">
                <Button variant="secondary" className="w-full h-20 flex-col">
                  <Package className="h-6 w-6 mb-2" />
                  View All Orders
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Building2 className="h-8 w-8 text-orange-600" />
                      <div>
                        <p className="font-medium text-gray-900">{order.packageType} Package</p>
                        <p className="text-sm text-gray-600">
                          {order.plotSize} • {order.floors} Floor • {order.bhk}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === 'In Progress' 
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{order.createdAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Calendar className="h-8 w-8 text-orange-600" />
                      <div>
                        <p className="font-medium text-gray-900">Site Visit</p>
                        <p className="text-sm text-gray-600">Engineer: {appointment.engineer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{appointment.date}</p>
                      <p className="text-sm text-gray-600">{appointment.time}</p>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {appointment.status}
                      </span>
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