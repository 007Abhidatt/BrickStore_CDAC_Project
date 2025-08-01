import React from 'react';
import { Card, CardContent, CardHeader } from '../../components/UI/Card';
import { 
  Users, 
  Package, 
  Truck, 
  TrendingUp,
  Building2,
  Calendar,
  CheckCircle,
  Clock
} from 'lucide-react';

export function AdminDashboard() {
  // Mock data - replace with actual API calls
  const stats = {
    totalOrders: 156,
    activeUsers: 89,
    pendingDeliveries: 23,
    monthlyRevenue: 2850000
  };

  const recentOrders = [
    {
      id: 'ORD-001',
      customerName: 'John Doe',
      packageType: 'Premium',
      plotSize: '30x40',
      status: 'In Progress',
      vendor: 'BuildTech Solutions',
      amount: 2800000
    },
    {
      id: 'ORD-002',
      customerName: 'Jane Smith',
      packageType: 'Standard',
      plotSize: '25x30',
      status: 'Site Visit Pending',
      vendor: 'Not Assigned',
      amount: 1500000
    }
  ];

  const vendorPerformance = [
    {
      name: 'BuildTech Solutions',
      activeOrders: 12,
      completedOrders: 35,
      rating: 4.8
    },
    {
      name: 'Premier Constructions',
      activeOrders: 8,
      completedOrders: 28,
      rating: 4.6
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Overview of BrickStore operations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Orders</p>
                  <p className="text-3xl font-bold">{stats.totalOrders}</p>
                </div>
                <Package className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Active Users</p>
                  <p className="text-3xl font-bold">{stats.activeUsers}</p>
                </div>
                <Users className="h-12 w-12 text-green-200" />
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
                  <p className="text-purple-100 text-sm font-medium">Monthly Revenue</p>
                  <p className="text-2xl font-bold">₹{(stats.monthlyRevenue / 100000).toFixed(1)}L</p>
                </div>
                <TrendingUp className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{order.customerName}</h3>
                        <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'In Progress' 
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <p><span className="font-medium">Package:</span> {order.packageType}</p>
                        <p><span className="font-medium">Plot:</span> {order.plotSize}</p>
                      </div>
                      <div>
                        <p><span className="font-medium">Vendor:</span> {order.vendor}</p>
                        <p><span className="font-medium">Value:</span> ₹{(order.amount / 100000).toFixed(1)}L</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Vendor Performance */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Vendor Performance</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vendorPerformance.map((vendor, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">{vendor.name}</h3>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-medium">{vendor.rating}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <p><span className="font-medium">Active:</span> {vendor.activeOrders}</p>
                      </div>
                      <div>
                        <p><span className="font-medium">Completed:</span> {vendor.completedOrders}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                <Building2 className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">View All Orders</p>
                  <p className="text-sm text-gray-600">Manage orders</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors">
                <Users className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">User Management</p>
                  <p className="text-sm text-gray-600">Manage users</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors">
                <Package className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="font-medium text-gray-900">Vendor Assignment</p>
                  <p className="text-sm text-gray-600">Assign vendors</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">Analytics</p>
                  <p className="text-sm text-gray-600">View reports</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}