
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Users, Search, User, Trash2, Edit, Eye } from 'lucide-react';
import { toast } from 'sonner';

export function StaffManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:5001/api'; // Replace with your backend URL

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/users`);
      const data = await res.json();
      setStaff(data);
    } catch (error) {
      console.error('Error fetching staff:', error);
      toast.error('Failed to load staff data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this staff member?')) return;

    try {
      const res = await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setStaff(prev => prev.filter(member => member.id !== id));
      toast.success('Staff member deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete staff member');
    }
  };

  const handleUpdate = (id) => {
    const member = staff.find(m => m.id === id);
    // Replace with modal or form
    alert(`Update staff member: ${member.name}`);
  };

  const handleView = (id) => {
    const member = staff.find(m => m.id === id);
    // Replace with modal or form
    alert(`View staff member: ${member.name}`);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'doctor': return 'bg-blue-100 text-blue-800';
      case 'nurse': return 'bg-green-100 text-green-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.department && member.department.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
        <p className="text-gray-600">Manage hospital staff and personnel</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Staff Members</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-gray-500 text-center">Loading staff...</p>
          ) : (
            <div className="space-y-4">
              {filteredStaff.map(member => (
                <div key={member.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{member.name}</h3>
                        <p className="text-gray-600">{member.department}</p>
                        <Badge className={getRoleColor(member.role)}>
                          {member.role}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleView(member.id)}>
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleUpdate(member.id)}>
                        <Edit className="h-4 w-4 mr-1" /> Update
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(member.id)}>
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredStaff.length === 0 && <p className="text-gray-500 text-center">No staff found.</p>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
