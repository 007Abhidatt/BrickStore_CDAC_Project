import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/UI/Button';
import { Card, CardContent, CardHeader } from '../../components/UI/Card';
import { Building2, Mail, Lock } from 'lucide-react';

interface LoginForm {
  email: string;
  password: string;
}

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const from = location.state?.from?.pathname || '/dashboard';

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      navigate(from, { replace: true });
    } catch (error) {
      // Error is handled in the context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Building2 className="mx-auto h-12 w-12 text-orange-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to BrickStore
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Construction Manufacturing Portal
          </p>
        </div>

        <Card>
          <CardContent className="p-8">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="Enter your email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="Enter your password"
                    {...register('password', { required: 'Password is required' })}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                loading={loading}
                className="w-full"
                size="lg"
              >
                Sign in
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-xs text-gray-600">
                <p><strong>User:</strong> user@brickstore.com / password</p>
                <p><strong>Employee:</strong> employee@brickstore.com / password</p>
                <p><strong>Admin:</strong> admin@brickstore.com / password</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <span className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-orange-600 hover:text-orange-500">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}