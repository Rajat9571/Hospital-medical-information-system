import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { AlertCircle, Activity, Clock, User } from 'lucide-react';

export function EmergencyDepartment() {
  const [emergencyCases, setEmergencyCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate emergency cases
    setTimeout(() => {
      setEmergencyCases([
        {
          id: 1,
          patientName: 'John Doe',
          condition: 'Chest Pain',
          priority: 'high',
          timeArrived: '2 hours ago',
          status: 'in-treatment'
        },
        {
          id: 2,
          patientName: 'Jane Smith',
          condition: 'Broken Arm',
          priority: 'medium',
          timeArrived: '45 minutes ago',
          status: 'waiting'
        },
        {
          id: 3,
          patientName: 'Bob Johnson',
          condition: 'Severe Headache',
          priority: 'low',
          timeArrived: '30 minutes ago',
          status: 'triaged'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-treatment': return 'bg-blue-100 text-blue-800';
      case 'waiting': return 'bg-orange-100 text-orange-800';
      case 'triaged': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Emergency Department</h1>
          <p className="text-gray-600">Monitor and manage emergency cases</p>
        </div>
        <Button variant="destructive">
          <AlertCircle className="h-4 w-4 mr-2" />
          Emergency Alert
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Cases</p>
                <p className="text-2xl font-bold text-gray-900">{emergencyCases.length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-gray-900">
                  {emergencyCases.filter(c => c.priority === 'high').length}
                </p>
              </div>
              <Activity className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Treatment</p>
                <p className="text-2xl font-bold text-gray-900">
                  {emergencyCases.filter(c => c.status === 'in-treatment').length}
                </p>
              </div>
              <User className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Waiting</p>
                <p className="text-2xl font-bold text-gray-900">
                  {emergencyCases.filter(c => c.status === 'waiting').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Cases */}
      <Card>
        <CardHeader>
          <CardTitle>Current Emergency Cases</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse flex items-center p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : emergencyCases.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No active emergency cases</p>
            </div>
          ) : (
            <div className="space-y-4">
              {emergencyCases.map((emergencyCase) => (
                <div key={emergencyCase.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{emergencyCase.patientName}</h3>
                        <p className="text-gray-600">{emergencyCase.condition}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getPriorityColor(emergencyCase.priority)}>
                            {emergencyCase.priority} priority
                          </Badge>
                          <Badge className={getStatusColor(emergencyCase.status)}>
                            {emergencyCase.status}
                          </Badge>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {emergencyCase.timeArrived}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm">
                        Update Status
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}