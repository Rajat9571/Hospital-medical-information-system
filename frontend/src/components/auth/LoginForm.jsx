
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import { Heart, Shield, Stethoscope, Users, UserPlus } from 'lucide-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regRole, setRegRole] = useState('');
  const [regDepartment, setRegDepartment] = useState('');

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        toast.success('Login successful!');
      } else {
        throw new Error(result.error || 'Login failed');
      }
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔄 send to registrations API (backend must handle storing in registrations table now)
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: regEmail,
          password: regPassword,
          name: regName,
          role: regRole,
          department: regDepartment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      toast.success('Registration submitted! Waiting for admin approval.');
      setActiveTab('login');

      // reset fields
      setRegEmail('');
      setRegPassword('');
      setRegName('');
      setRegRole('');
      setRegDepartment('');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const demoCredentials = [
    { role: 'Admin', email: 'admin@gmail.com', password: 'admin123', icon: Shield },
    { role: 'Doctor', email: 'doctor@gmail.com', password: '12345678', icon: Stethoscope },
    { role: 'Nurse', email: 'nurse@gmail.com', password: 'nurse123', icon: Heart },
    { role: 'Staff', email: 'staff@gmail.com', password: 'staff123', icon: Users },
  ];

  const fillDemoCredentials = (email, password) => {
    setEmail(email);
    setPassword(password);
  };

  const initializeDemoUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5001/api/auth/init-demo-users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize demo users');
      }

      toast.success('Demo users initialized successfully! You can now use the demo credentials.');
    } catch (error) {
      toast.error(error.message || 'Failed to initialize demo users');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">MediCare HMS</h1>
          <p className="text-gray-600 mt-2">Hospital Information Management System</p>
        </div>

        <Card>
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              {/* LOGIN TAB */}
              <TabsContent value="login" className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">Sign In</h2>
                  <p className="text-gray-600">Enter your credentials to access the system</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>

                <div className="mt-6">
                  <p className="text-sm text-gray-600 mb-3">Demo Accounts:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {demoCredentials.map((cred) => {
                      const IconComponent = cred.icon;
                      return (
                        <Button
                          key={cred.role}
                          variant="outline"
                          size="sm"
                          onClick={() => fillDemoCredentials(cred.email, cred.password)}
                          className="flex items-center gap-2 text-xs"
                        >
                          <IconComponent className="h-3 w-3" />
                          {cred.role}
                        </Button>
                      );
                    })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={initializeDemoUsers}
                    className="mt-4 w-full"
                    disabled={loading}
                  >
                    Initialize Demo Users
                  </Button>
                </div>
              </TabsContent>

              {/* REGISTER TAB */}
              <TabsContent value="register" className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">Register</h2>
                  <p className="text-gray-600">Create a new account (admin approval required)</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="reg-name">Full Name</Label>
                    <Input
                      id="reg-name"
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="reg-email">Email</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="reg-password">Password</Label>
                    <Input
                      id="reg-password"
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="reg-role">Role</Label>
                    <Select value={regRole} onValueChange={setRegRole} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="nurse">Nurse</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="patient">Patient</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="reg-department">Department (Optional)</Label>
                    <Select value={regDepartment} onValueChange={setRegDepartment}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                        <SelectItem value="orthopedics">Orthopedics</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="radiology">Radiology</SelectItem>
                        <SelectItem value="surgery">Surgery</SelectItem>
                        <SelectItem value="pharmacy">Pharmacy</SelectItem>
                        <SelectItem value="administration">Administration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    {loading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
