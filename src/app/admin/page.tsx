
'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminDashboard from '@/components/AdminDashboard';

const ADMIN_KEY = 'admin123';

export default function AdminPage() {
  const [secretKey, setSecretKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (secretKey === ADMIN_KEY) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid secret key. Please try again.');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  }

  if (isAuthenticated) {
    return <AdminDashboard />;
  }

  return (
    <Card className="w-full max-w-sm glass text-white">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Admin Access</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-sm text-gray-300">
          Please enter the secret key to access the admin dashboard.
        </p>
        <Input
          type="password"
          placeholder="Secret Key"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          onKeyDown={handleKeyPress}
          className="bg-transparent border-gray-600 focus:ring-primary"
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <Button onClick={handleLogin} className="w-full bg-primary hover:bg-primary/90">
          Enter
        </Button>
      </CardContent>
    </Card>
  );
}
