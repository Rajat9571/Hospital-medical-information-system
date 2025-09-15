import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  FileText,
  Plus,
  Search,
  Download,
  Upload,
  Eye,
  Heart,
  Brain,
  Stethoscope,
  Activity,
  Calendar,
  User
} from 'lucide-react';

export function MedicalRecords() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  const mockRecords = [
    {
      id: '1',
      patientName: 'John Smith',
      patientId: 'P001',
      recordType: 'Lab Results',
      date: '2024-01-15',
      doctor: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      status: 'Complete',
      priority: 'Normal'
    },
    {
      id: '2',
      patientName: 'Mary Johnson',
      patientId: 'P002',
      recordType: 'X-Ray',
      date: '2024-01-14',
      doctor: 'Dr. Michael Brown',
      department: 'Radiology',
      status: 'Pending Review',
      priority: 'High'
    },
    {
      id: '3',
      patientName: 'Robert Davis',
      patientId: 'P003',
      recordType: 'Consultation Notes',
      date: '2024-01-13',
      doctor: 'Dr. Emily Chen',
      department: 'Neurology',
      status: 'Complete',
      priority: 'Normal'
    }
  ];

  const mockPatientDetails = {
    name: 'John Smith',
    id: 'P001',
    age: 45,
    gender: 'Male',
    bloodType: 'O+',
    allergies: ['Penicillin', 'Shellfish'],
    emergencyContact: '+1 (555) 123-4567'
  };

  const mockVitalSigns = {
    bloodPressure: '120/80',
    heartRate: '72 bpm',
    temperature: '98.6°F',
    respiratoryRate: '16/min',
    oxygenSaturation: '98%',
    lastUpdated: '2024-01-15 10:30 AM'
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'complete': return 'bg-green-100 text-green-800';
      case 'pending review': return 'bg-yellow-100 text-yellow-800';
      case 'in progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'normal': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRecords = mockRecords.filter(record =>
    record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.recordType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
          <p className="text-gray-600">View and manage patient medical records</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload Record
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Record
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by patient name, record type, or doctor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              {filteredRecords.length} Records
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Records List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Medical Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredRecords.map((record) => (
                  <div key={record.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{record.recordType}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {record.patientName} ({record.patientId})
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {record.date}
                            </span>
                            <span>{record.doctor}</span>
                            <span>{record.department}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getStatusColor(record.status)}>
                              {record.status}
                            </Badge>
                            <Badge className={getPriorityColor(record.priority)}>
                              {record.priority}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patient Information Panel */}
        <div className="space-y-6">
          {/* Patient Details */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{mockPatientDetails.name}</h3>
                    <p className="text-sm text-gray-600">ID: {mockPatientDetails.id}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Age</p>
                    <p className="font-medium">{mockPatientDetails.age}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Gender</p>
                    <p className="font-medium">{mockPatientDetails.gender}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Blood Type</p>
                    <p className="font-medium">{mockPatientDetails.bloodType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Emergency</p>
                    <p className="font-medium text-xs">{mockPatientDetails.emergencyContact}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Allergies</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {mockPatientDetails.allergies.map((allergy, index) => (
                      <Badge key={index} variant="destructive" className="text-xs">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vital Signs */}
          <Card>
            <CardHeader>
              <CardTitle>Latest Vital Signs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-600" />
                    <span className="text-sm">Blood Pressure</span>
                  </div>
                  <span className="font-medium">{mockVitalSigns.bloodPressure}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Heart Rate</span>
                  </div>
                  <span className="font-medium">{mockVitalSigns.heartRate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Temperature</span>
                  </div>
                  <span className="font-medium">{mockVitalSigns.temperature}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">O2 Saturation</span>
                  </div>
                  <span className="font-medium">{mockVitalSigns.oxygenSaturation}</span>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-500">
                    Last updated: {mockVitalSigns.lastUpdated}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Lab Result
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Record Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Record Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Records</TabsTrigger>
              <TabsTrigger value="lab">Lab Results</TabsTrigger>
              <TabsTrigger value="imaging">Imaging</TabsTrigger>
              <TabsTrigger value="notes">Clinical Notes</TabsTrigger>
              <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Total Records</p>
                        <p className="text-2xl font-bold">247</p>
                      </div>
                      <FileText className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Pending Review</p>
                        <p className="text-2xl font-bold">12</p>
                      </div>
                      <Eye className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Recent Updates</p>
                        <p className="text-2xl font-bold">8</p>
                      </div>
                      <Calendar className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="lab">
              <p className="text-gray-600">Lab results and test reports will appear here.</p>
            </TabsContent>
            <TabsContent value="imaging">
              <p className="text-gray-600">X-rays, MRIs, CT scans and other imaging will appear here.</p>
            </TabsContent>
            <TabsContent value="notes">
              <p className="text-gray-600">Clinical notes and consultation summaries will appear here.</p>
            </TabsContent>
            <TabsContent value="prescriptions">
              <p className="text-gray-600">Prescription history and medication records will appear here.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}