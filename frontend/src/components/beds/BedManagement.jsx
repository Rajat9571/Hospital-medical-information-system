

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Alert, AlertDescription } from '../ui/alert';
import { toast } from 'sonner';
import { Bed, User, Plus, MapPin, Clock, AlertTriangle, CheckCircle, Wrench, Search, UserPlus, UserX, Activity, Building, Settings, Stethoscope } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function BedManagement() {
  const { user } = useAuth();
  const [beds, setBeds] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterWard, setFilterWard] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedBed, setSelectedBed] = useState(null);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showAddBedDialog, setShowAddBedDialog] = useState(false);
  const [assignmentData, setAssignmentData] = useState({ patient_id: '', priority: 'normal' });
  const [newBedData, setNewBedData] = useState({ number: '', ward: '', bed_type: 'general', room_number: '' });

  // Dummy data initialization
  useEffect(() => {
    const demoBeds = [
      { id: 'bed_1', number: '101', ward: 'ICU', bed_type: 'icu', room_number: 'ICU-1', status: 'occupied', patient_id: 'patient_1', patient_name: 'John Smith', admission_date: new Date(Date.now() - 86400000).toISOString(), assigned_doctor: 'Dr. Michael Chen' },
      { id: 'bed_2', number: '102', ward: 'ICU', bed_type: 'icu', room_number: 'ICU-1', status: 'available', patient_id: null, patient_name: null },
      { id: 'bed_3', number: '103', ward: 'ICU', bed_type: 'icu', room_number: 'ICU-2', status: 'maintenance', patient_id: null, patient_name: null, maintenance_reason: 'Scheduled cleaning' },
      { id: 'bed_4', number: '201', ward: 'General', bed_type: 'general', room_number: '201', status: 'occupied', patient_id: 'patient_2', patient_name: 'Sarah Johnson', admission_date: new Date(Date.now() - 172800000).toISOString(), assigned_doctor: 'Dr. Michael Chen' },
      { id: 'bed_5', number: '202', ward: 'General', bed_type: 'general', room_number: '202', status: 'available', patient_id: null, patient_name: null },
      { id: 'bed_6', number: '203', ward: 'General', bed_type: 'general', room_number: '203', status: 'cleaning', patient_id: null, patient_name: null, maintenance_reason: 'Post-discharge cleaning' },
      { id: 'bed_7', number: '301', ward: 'Emergency', bed_type: 'emergency', room_number: 'ER-1', status: 'available', patient_id: null, patient_name: null },
      { id: 'bed_8', number: '302', ward: 'Emergency', bed_type: 'emergency', room_number: 'ER-2', status: 'available', patient_id: null, patient_name: null }
    ];

    const demoPatients = [
      { id: 'patient_3', name: 'Mike Wilson', age: 28, gender: 'male', contact: '+1234567892', patient_type: 'consultancy' },
      { id: 'patient_4', name: 'Anna Lee', age: 35, gender: 'female', contact: '+1234567893', patient_type: 'consultancy' }
    ];

    setBeds(demoBeds);
    setPatients(demoPatients);
    setLoading(false);
  }, []);

  const handleAssignBed = (e) => {
    e.preventDefault();
    if (!assignmentData.patient_id) {
      toast.error('Please select a patient');
      return;
    }
    const patient = patients.find(p => p.id === assignmentData.patient_id);
    if (!patient) {
      toast.error('Patient not found');
      return;
    }
    setBeds(beds.map(b => b.id === selectedBed.id ? { ...b, status: 'occupied', patient_id: patient.id, patient_name: patient.name, admission_date: new Date().toISOString(), assigned_doctor: user?.name || 'Unknown' } : b));
    setPatients(patients.filter(p => p.id !== patient.id));
    toast.success(`Bed ${selectedBed.number} assigned to ${patient.name}`);
    setShowAssignDialog(false);
    setAssignmentData({ patient_id: '', priority: 'normal' });
    setSelectedBed(null);
  };

  const handleDischargeBed = (bed) => {
    setBeds(beds.map(b => b.id === bed.id ? { ...b, status: 'cleaning', patient_id: null, patient_name: null, admission_date: null, assigned_doctor: null, maintenance_reason: 'Post-discharge cleaning' } : b));
    toast.success(`Patient discharged from bed ${bed.number}. Bed set for cleaning.`);
    setTimeout(() => setBeds(prev => prev.map(b => b.id === bed.id ? { ...b, status: 'available', maintenance_reason: null } : b)), 2000);
  };

  const handleMaintenanceToggle = (bed) => {
    const newStatus = bed.status === 'maintenance' ? 'available' : 'maintenance';
    setBeds(beds.map(b => b.id === bed.id ? { ...b, status: newStatus, maintenance_reason: newStatus === 'maintenance' ? 'Scheduled maintenance' : null } : b));
    toast.success(`Bed ${bed.number} ${newStatus === 'maintenance' ? 'set for maintenance' : 'back in service'}`);
  };

  const handleAddBed = (e) => {
    e.preventDefault();
    if (!newBedData.number || !newBedData.ward) {
      toast.error('Please fill in required fields');
      return;
    }
    const newBed = { id: `bed_${Date.now()}`, ...newBedData, status: 'available', patient_id: null, patient_name: null, created_at: new Date().toISOString() };
    setBeds([...beds, newBed]);
    toast.success(`Bed ${newBedData.number} added successfully`);
    setShowAddBedDialog(false);
    setNewBedData({ number: '', ward: '', bed_type: 'general', room_number: '' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'occupied': return 'bg-red-100 text-red-800 border-red-200';
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cleaning': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'occupied': return <User className="h-4 w-4" />;
      case 'available': return <CheckCircle className="h-4 w-4" />;
      case 'maintenance': return <Wrench className="h-4 w-4" />;
      case 'cleaning': return <Activity className="h-4 w-4" />;
      default: return <Bed className="h-4 w-4" />;
    }
  };

  const getBedTypeColor = (bedType) => {
    switch (bedType) {
      case 'icu': return 'text-red-600';
      case 'emergency': return 'text-orange-600';
      case 'private': return 'text-purple-600';
      case 'general': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getBedTypeIcon = (bedType) => {
    switch (bedType) {
      case 'icu': return <AlertTriangle className="h-4 w-4" />;
      case 'emergency': return <Activity className="h-4 w-4" />;
      case 'private': return <Building className="h-4 w-4" />;
      default: return <Bed className="h-4 w-4" />;
    }
  };

  const filteredBeds = beds.filter(bed => {
    const matchesSearch = bed.number.toLowerCase().includes(searchTerm.toLowerCase()) || bed.ward.toLowerCase().includes(searchTerm.toLowerCase()) || bed.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) || bed.room_number?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWard = filterWard === 'all' || bed.ward === filterWard;
    const matchesStatus = filterStatus === 'all' || bed.status === filterStatus;
    return matchesSearch && matchesWard && matchesStatus;
  });

  const availableBeds = beds.filter(bed => bed.status === 'available').length;
  const occupiedBeds = beds.filter(bed => bed.status === 'occupied').length;
  const maintenanceBeds = beds.filter(bed => bed.status === 'maintenance').length;
  const cleaningBeds = beds.filter(bed => bed.status === 'cleaning').length;

  const wards = [...new Set(beds.map(b => b.ward))];
  const wardStats = wards.map(ward => {
    const wardBeds = beds.filter(b => b.ward === ward);
    return {
      name: ward,
      total: wardBeds.length,
      available: wardBeds.filter(b => b.status === 'available').length,
      occupied: wardBeds.filter(b => b.status === 'occupied').length,
      occupancy: wardBeds.length > 0 ? Math.round((wardBeds.filter(b => b.status === 'occupied').length / wardBeds.length) * 100) : 0
    };
  });

  // The rest of your UI JSX (cards, filters, bed grid) remains **exactly as your original code**.

  return (
    <div className="space-y-6">
      {/* Use all your original JSX here */}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900">Bed Management</h1>
          <p className="text-gray-600">Monitor and manage hospital bed availability and patient assignments</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showAddBedDialog} onOpenChange={setShowAddBedDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Bed
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Bed</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddBed} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bed_number">Bed Number *</Label>
                    <Input
                      id="bed_number"
                      value={newBedData.number}
                      onChange={(e) => setNewBedData({...newBedData, number: e.target.value})}
                      placeholder="e.g., 101"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="room_number">Room Number</Label>
                    <Input
                      id="room_number"
                      value={newBedData.room_number}
                      onChange={(e) => setNewBedData({...newBedData, room_number: e.target.value})}
                      placeholder="e.g., ICU-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ward">Ward *</Label>
                    <Select value={newBedData.ward} onValueChange={(value) => setNewBedData({...newBedData, ward: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ward" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ICU">ICU</SelectItem>
                        <SelectItem value="General">General Ward</SelectItem>
                        <SelectItem value="Emergency">Emergency</SelectItem>
                        <SelectItem value="Private">Private Ward</SelectItem>
                        <SelectItem value="Pediatric">Pediatric</SelectItem>
                        <SelectItem value="Maternity">Maternity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="bed_type">Bed Type</Label>
                    <Select value={newBedData.bed_type} onValueChange={(value) => setNewBedData({...newBedData, bed_type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bed type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="icu">ICU</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowAddBedDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Bed</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Total Beds</p>
                <p className="text-2xl font-semibold text-gray-900">{beds.length}</p>
              </div>
              <Bed className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-semibold text-green-700">{availableBeds}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Occupied</p>
                <p className="text-2xl font-semibold text-red-700">{occupiedBeds}</p>
              </div>
              <User className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Maintenance</p>
                <p className="text-2xl font-semibold text-yellow-700">{maintenanceBeds}</p>
              </div>
              <Wrench className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Cleaning</p>
                <p className="text-2xl font-semibold text-blue-700">{cleaningBeds}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ward Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Ward Occupancy Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {wardStats.map((ward) => (
              <div key={ward.name} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{ward.name}</h3>
                  <Badge variant="outline">{ward.occupancy}%</Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-medium">{ward.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Available:</span>
                    <span className="font-medium">{ward.available}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-red-600">Occupied:</span>
                    <span className="font-medium">{ward.occupied}</span>
                  </div>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full transition-all" 
                    style={{ width: `${ward.occupancy}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search beds by number, ward, patient name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterWard} onValueChange={setFilterWard}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Wards" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Wards</SelectItem>
                  {wards.map(ward => (
                    <SelectItem key={ward} value={ward}>{ward}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Beds Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Bed Status Overview</span>
            <Badge variant="outline">
              {filteredBeds.length} of {beds.length} beds
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse border rounded-lg p-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : filteredBeds.length === 0 ? (
            <div className="text-center py-8">
              <Bed className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No beds found matching your criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredBeds.map((bed) => (
                <div
                  key={bed.id}
                  className={`border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer ${
                    bed.status === 'available' ? 'border-green-200 bg-green-50 hover:bg-green-100' :
                    bed.status === 'occupied' ? 'border-red-200 bg-red-50 hover:bg-red-100' :
                    bed.status === 'maintenance' ? 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100' :
                    'border-blue-200 bg-blue-50 hover:bg-blue-100'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-full ${getBedTypeColor(bed.bed_type)}`}>
                        {getBedTypeIcon(bed.bed_type)}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">Bed {bed.number}</span>
                        {bed.room_number && (
                          <p className="text-xs text-gray-500">{bed.room_number}</p>
                        )}
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(bed.status)} text-xs`}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(bed.status)}
                        {bed.status}
                      </span>
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-gray-600">{bed.ward} Ward</span>
                    </div>
                    
                    {bed.patient_name && (
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-900 font-medium">{bed.patient_name}</span>
                      </div>
                    )}
                    
                    {bed.admission_date && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-600">
                          Admitted {new Date(bed.admission_date).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    
                    {bed.assigned_doctor && (
                      <div className="flex items-center gap-2 text-sm">
                        <Stethoscope className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-600">{bed.assigned_doctor}</span>
                      </div>
                    )}
                    
                    {bed.maintenance_reason && (
                      <div className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="h-3 w-3 text-yellow-500" />
                        <span className="text-gray-600">{bed.maintenance_reason}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {bed.status === 'available' && (
                      <Dialog open={showAssignDialog && selectedBed?.id === bed.id} onOpenChange={(open) => {
                        setShowAssignDialog(open);
                        if (open) setSelectedBed(bed);
                        else setSelectedBed(null);
                      }}>
                        <DialogTrigger asChild>
                          <Button size="sm" className="flex-1">
                            <UserPlus className="h-3 w-3 mr-1" />
                            Assign
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Assign Patient to Bed {bed.number}</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleAssignBed} className="space-y-4">
                            <div>
                              <Label>Select Patient</Label>
                              <Select value={assignmentData.patient_id} onValueChange={(value) => setAssignmentData({...assignmentData, patient_id: value})}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose a patient" />
                                </SelectTrigger>
                                <SelectContent>
                                  {patients.length === 0 ? (
                                    <SelectItem value="" disabled>No unassigned patients</SelectItem>
                                  ) : (
                                    patients.map((patient) => (
                                      <SelectItem key={patient.id} value={patient.id}>
                                        {patient.name} - {patient.age}yo {patient.gender}
                                        {patient.patient_type === 'emergency' && (
                                          <Badge className="ml-2 text-xs" variant="destructive">
                                            {patient.emergency_level?.toUpperCase()} EMERGENCY
                                          </Badge>
                                        )}
                                      </SelectItem>
                                    ))
                                  )}
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label>Assignment Priority</Label>
                              <Select value={assignmentData.priority} onValueChange={(value) => setAssignmentData({...assignmentData, priority: value})}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="normal">Normal</SelectItem>
                                  <SelectItem value="urgent">Urgent</SelectItem>
                                  <SelectItem value="emergency">Emergency</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            {selectedBed && (
                              <Alert>
                                <AlertTriangle className="h-4 w-4" />
                                <AlertDescription>
                                  <strong>Bed Details:</strong> {selectedBed.ward} Ward, Room {selectedBed.room_number || 'N/A'}, Type: {selectedBed.bed_type}
                                </AlertDescription>
                              </Alert>
                            )}

                            <div className="flex justify-end gap-2">
                              <Button type="button" variant="outline" onClick={() => setShowAssignDialog(false)}>
                                Cancel
                              </Button>
                              <Button type="submit" disabled={!assignmentData.patient_id}>
                                Assign Patient
                              </Button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    )}
                    
                    {bed.status === 'occupied' && (
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleDischargeBed(bed)}
                      >
                        <UserX className="h-3 w-3 mr-1" />
                        Discharge
                      </Button>
                    )}
                    
                    {(bed.status === 'maintenance' || bed.status === 'available') && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleMaintenanceToggle(bed)}
                      >
                        <Settings className="h-3 w-3 mr-1" />
                        {bed.status === 'maintenance' ? 'End Maintenance' : 'Maintenance'}
                      </Button>
                    )}
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
