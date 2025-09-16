

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../ui/dialog';
import { toast } from 'sonner';
import { Users, Plus, Search, Eye, Edit, Mail, Phone, User } from 'lucide-react';

export function PatientManagement() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    emergencyContact: '',
    bloodType: '',
    allergies: '',
    status: 'active',
    patientType: 'consultancy'
  });

  useEffect(() => { fetchPatients(); }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5001/api/patients');
      if (!response.ok) throw new Error('Failed to fetch patients');
      const data = await response.json();
      setPatients(data);
    } catch (err) {
      toast.error(err.message || 'Error fetching patients');
    } finally { setLoading(false); }
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to add patient');
      toast.success('Patient added successfully');
      setShowAddDialog(false);
      setFormData({
        name: '', email: '', phone: '', dateOfBirth: '', gender: '',
        address: '', emergencyContact: '', bloodType: '', allergies: '', status: 'active',patientType: 'consultancy'
      });
      fetchPatients();
    } catch (err) {
      toast.error(err.message || 'Error adding patient');
    }
  };

  const filteredPatients = patients.filter(patient =>
    (patient.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (patient.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (patient.phone || '').includes(searchTerm)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateAge = (dob) => {
    if (!dob) return '-';
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const formatDateForInput = (date) => {
    return date ? new Date(date).toISOString().split('T')[0] : '';
  };

  return (
    <div className="space-y-6">
      {/* Header & Add Patient */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patient Management</h1>
          <p className="text-gray-600">Manage patient records and information</p>
        </div>

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>Fill in patient details and submit to add a new patient.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddPatient} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formatDateForInput(formData.dateOfBirth)}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender || ''} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                    <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <Select value={formData.bloodType || ''} onValueChange={(value) => setFormData({ ...formData, bloodType: value })}>
                    <SelectTrigger><SelectValue placeholder="Select blood type" /></SelectTrigger>
                    <SelectContent>
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bt => <SelectItem key={bt} value={bt}>{bt}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" value={formData.address || ''} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input id="emergencyContact" value={formData.emergencyContact || ''} onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="allergies">Allergies</Label>
                <Input id="allergies" value={formData.allergies || ''} onChange={(e) => setFormData({ ...formData, allergies: e.target.value })} placeholder="List any known allergies" />
              </div>
              <div>
                <Label htmlFor="patientType">Patient Type</Label>
                <Select value={formData.patientType} onValueChange={(value) => setFormData({ ...formData, patientType: value })}>
                  <SelectTrigger><SelectValue placeholder="Select patient type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultancy">Consultancy</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
                <Button type="submit">{loading ? 'Adding...' : 'Add Patient'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search & Count */}
      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search patients..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
          <Button variant="outline">
            <Users className="h-4 w-4 mr-2" /> {filteredPatients.length} Patients
          </Button>
        </CardContent>
      </Card>

      {/* Patients List */}
      <Card>
        <CardHeader><CardTitle>Patients</CardTitle></CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading patients...</p>
          ) : filteredPatients.length === 0 ? (
            <p className="text-center py-8 text-gray-600">No patients found</p>
          ) : (
            <div className="space-y-4">
              {filteredPatients.map(patient => (
                <div key={patient.id} className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{patient.name || ''}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {patient.email || ''}</span>
                        <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {patient.phone || ''}</span>
                        {patient.dateOfBirth && <span>Age: {calculateAge(patient.dateOfBirth)}</span>}
                      </div>
                      <Badge className={getStatusColor(patient.status || '')}>{patient.status || ''}</Badge>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedPatient({ ...patient, view: true })}>
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setSelectedPatient({ ...patient, view: false })}>
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit & View Dialog */}
      {selectedPatient && (
        <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
          <DialogContent className={`max-w-2xl ${selectedPatient.view ? 'max-w-md' : 'max-w-2xl'}`}>
            <DialogHeader>
              <DialogTitle>{selectedPatient.view ? 'Patient Details' : 'Edit Patient'}</DialogTitle>
              <DialogDescription>
                {selectedPatient.view ? 'View patient details below.' : 'Update patient information and save changes.'}
              </DialogDescription>
            </DialogHeader>

            {/* View Mode */}
            {selectedPatient.view && (
              <div className="space-y-2">
                <p><strong>Name:</strong> {selectedPatient.name || ''}</p>
                <p><strong>Email:</strong> {selectedPatient.email || ''}</p>
                <p><strong>Phone:</strong> {selectedPatient.phone || ''}</p>
                <p><strong>DOB:</strong> {selectedPatient.dateOfBirth || ''}</p>
                <p><strong>Gender:</strong> {selectedPatient.gender || ''}</p>
                <p><strong>Address:</strong> {selectedPatient.address || ''}</p>
                <p><strong>Emergency Contact:</strong> {selectedPatient.emergencyContact || ''}</p>
                <p><strong>Blood Type:</strong> {selectedPatient.bloodType || ''}</p>
                <p><strong>Allergies:</strong> {selectedPatient.allergies || ''}</p>
                <p><strong>Status:</strong> {selectedPatient.status || ''}</p>
                <p><strong>Patient Type:</strong> {selectedPatient.patientType || ''}</p>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" onClick={() => setSelectedPatient(null)}>Close</Button>
                </div>
              </div>
            )}

            {/* Edit Mode */}
            {!selectedPatient.view && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const dob = selectedPatient.dateOfBirth ? new Date(selectedPatient.dateOfBirth).toISOString().split('T')[0] : null;
                    const response = await fetch(`http://localhost:5001/api/patients/${selectedPatient.id}`, {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ ...selectedPatient, dateOfBirth: dob })
                    });
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.error || 'Failed to update patient');
                    toast.success('Patient updated successfully');
                    setSelectedPatient(null);
                    fetchPatients();
                  } catch (err) {
                    toast.error(err.message || 'Error updating patient');
                    console.error('Error updating patient:', err);
                  }
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input value={selectedPatient.name || ''} onChange={(e) => setSelectedPatient({ ...selectedPatient, name: e.target.value })} />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" value={selectedPatient.email || ''} onChange={(e) => setSelectedPatient({ ...selectedPatient, email: e.target.value })} />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input value={selectedPatient.phone || ''} onChange={(e) => setSelectedPatient({ ...selectedPatient, phone: e.target.value })} />
                  </div>
                  <div>
                    <Label>Date of Birth</Label>
                    <Input
                      type="date"
                      value={formatDateForInput(selectedPatient.dateOfBirth)}
                      onChange={(e) => setSelectedPatient({ ...selectedPatient, dateOfBirth: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Gender</Label>
                    <Select value={selectedPatient.gender || ''} onValueChange={(value) => setSelectedPatient({ ...selectedPatient, gender: value })}>
                      <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Blood Type</Label>
                    <Select value={selectedPatient.bloodType || ''} onValueChange={(value) => setSelectedPatient({ ...selectedPatient, bloodType: value })}>
                      <SelectTrigger><SelectValue placeholder="Select blood type" /></SelectTrigger>
                      <SelectContent>
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bt => <SelectItem key={bt} value={bt}>{bt}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Address</Label>
                  <Input value={selectedPatient.address || ''} onChange={(e) => setSelectedPatient({ ...selectedPatient, address: e.target.value })} />
                </div>
                <div>
                  <Label>Emergency Contact</Label>
                  <Input value={selectedPatient.emergencyContact || ''} onChange={(e) => setSelectedPatient({ ...selectedPatient, emergencyContact: e.target.value })} />
                </div>
                <div>
                  <Label>Allergies</Label>
                  <Input value={selectedPatient.allergies || ''} onChange={(e) => setSelectedPatient({ ...selectedPatient, allergies: e.target.value })} />
                </div>
                <div>
                  <Label>Patient Type</Label>
                  <Select
                    value={selectedPatient.patientType || ''}
                    onValueChange={(value) => setSelectedPatient({ ...selectedPatient, patientType: value })}
                  >
                    <SelectTrigger><SelectValue placeholder="Select patient type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultancy">Consultancy</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setSelectedPatient(null)}>Cancel</Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
