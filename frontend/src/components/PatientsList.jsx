
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Search, Plus, User, Phone, Mail, Calendar, FileText, Edit } from 'lucide-react';
import { PatientForm } from './modules/PatientForm';

export function PatientsList() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddPatient, setShowAddPatient] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await fetch('http://localhost:5000/patients'); // your backend endpoint
      const data = await res.json();
      setPatients(data.patients || []);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(patient =>
    `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'critical': return 'destructive';
      default: return 'default';
    }
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  if (loading) return <Card><CardHeader><CardTitle>Patients</CardTitle></CardHeader><CardContent>Loading...</CardContent></Card>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>Patient Management</CardTitle>
            <CardDescription>Manage and view all patient records</CardDescription>
          </div>
          <Dialog open={showAddPatient} onOpenChange={setShowAddPatient}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" /> Add New Patient</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Patient</DialogTitle>
                <DialogDescription>Enter patient information</DialogDescription>
              </DialogHeader>
              <PatientForm 
                onSave={() => { setShowAddPatient(false); fetchPatients(); }}
                onCancel={() => setShowAddPatient(false)}
              />
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search patients by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Blood Type</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center space-y-2">
                        <User className="h-8 w-8 text-gray-400" />
                        <p className="text-gray-500">No patients found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{patient.firstName} {patient.lastName}</p>
                            <p className="text-sm text-gray-500">{patient.gender}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center"><Mail className="h-3 w-3 mr-1 text-gray-400" />{patient.email}</div>
                          <div className="flex items-center"><Phone className="h-3 w-3 mr-1 text-gray-400" />{patient.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>{calculateAge(patient.dateOfBirth)} years</TableCell>
                      <TableCell><Badge variant="outline">{patient.bloodType}</Badge></TableCell>
                      <TableCell className="flex items-center text-sm"><Calendar className="h-3 w-3 mr-1 text-gray-400" />{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                      <TableCell><Badge variant={getStatusColor(patient.status)}>{patient.status}</Badge></TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedPatient(patient)}><FileText className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Patient Details */}
      <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedPatient?.firstName} {selectedPatient?.lastName}</DialogTitle>
            <DialogDescription>Complete patient information</DialogDescription>
          </DialogHeader>
          {selectedPatient && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Email:</span> {selectedPatient.email}</p>
                <p><span className="font-medium">Phone:</span> {selectedPatient.phone}</p>
                <p><span className="font-medium">DOB:</span> {new Date(selectedPatient.dateOfBirth).toLocaleDateString()}</p>
                <p><span className="font-medium">Gender:</span> {selectedPatient.gender}</p>
                <p><span className="font-medium">Blood Type:</span> {selectedPatient.bloodType}</p>
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Emergency Name:</span> {selectedPatient.emergencyContact.name}</p>
                <p><span className="font-medium">Phone:</span> {selectedPatient.emergencyContact.phone}</p>
                <p><span className="font-medium">Relationship:</span> {selectedPatient.emergencyContact.relationship}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedPatient.allergies.map((a, i) => <Badge key={i} variant="secondary">{a}</Badge>)}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
