import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Search, Plus, Pill, Calendar, User, AlertTriangle, CheckCircle } from 'lucide-react';

// Dummy Data
const dummyPrescriptions = [
  {
    id: '1',
    patientId: 'P001',
    patientName: 'John Doe',
    medicationName: 'Amoxicillin',
    dosage: '500mg',
    frequency: 'twice daily',
    duration: '7 days',
    instructions: 'Take with food',
    prescribedDate: '2025-09-01',
    startDate: '2025-09-02',
    endDate: '2025-09-09',
    status: 'active',
    refillsRemaining: 2,
    totalRefills: 2,
    pharmacyNotes: 'Store in a cool place',
    sideEffects: ['Nausea', 'Dizziness'],
    warnings: ['Avoid alcohol']
  },
  {
    id: '2',
    patientId: 'P002',
    patientName: 'Jane Smith',
    medicationName: 'Ibuprofen',
    dosage: '200mg',
    frequency: 'every 8 hours',
    duration: '5 days',
    instructions: 'Take with water',
    prescribedDate: '2025-09-05',
    startDate: '2025-09-06',
    endDate: '2025-09-11',
    status: 'completed',
    refillsRemaining: 0,
    totalRefills: 0,
    pharmacyNotes: '',
    sideEffects: ['Stomach upset'],
    warnings: ['Not for children under 12']
  }
];

export function PrescriptionManager() {
  const [prescriptions, setPrescriptions] = useState(dummyPrescriptions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showNewPrescription, setShowNewPrescription] = useState(false);

  const [newPrescription, setNewPrescription] = useState({
    patientName: '',
    patientId: '',
    medicationName: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: '',
    startDate: '',
    refills: '0',
    pharmacyNotes: '',
    sideEffects: '',
    warnings: '',
  });

  const calculateEndDate = (startDate, duration) => {
    const start = new Date(startDate);
    const durationMatch = duration.match(/(\d+)\s*(day|week|month)s?/i);

    if (durationMatch) {
      const value = parseInt(durationMatch[1]);
      const unit = durationMatch[2].toLowerCase();
      if (unit === 'day') start.setDate(start.getDate() + value);
      if (unit === 'week') start.setDate(start.getDate() + (value * 7));
      if (unit === 'month') start.setMonth(start.getMonth() + value);
    }
    return start.toISOString().split('T')[0];
  };

  const handleCreatePrescription = (e) => {
    e.preventDefault();
    const endDate = calculateEndDate(newPrescription.startDate, newPrescription.duration);

    const prescriptionData = {
      id: String(prescriptions.length + 1),
      ...newPrescription,
      prescribedDate: new Date().toISOString(),
      endDate,
      status: 'active',
      refillsRemaining: parseInt(newPrescription.refills),
      totalRefills: parseInt(newPrescription.refills),
      sideEffects: newPrescription.sideEffects.split(',').map(s => s.trim()).filter(s => s),
      warnings: newPrescription.warnings.split(',').map(s => s.trim()).filter(s => s),
    };

    setPrescriptions([...prescriptions, prescriptionData]);
    setShowNewPrescription(false);
    setNewPrescription({
      patientName: '',
      patientId: '',
      medicationName: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: '',
      startDate: '',
      refills: '0',
      pharmacyNotes: '',
      sideEffects: '',
      warnings: '',
    });
  };

  const updatePrescriptionStatus = (prescriptionId, status) => {
    setPrescriptions(prescriptions.map(p => 
      p.id === prescriptionId ? { ...p, status } : p
    ));
    setSelectedPrescription(null);
  };

  const filteredPrescriptions = prescriptions.filter(p =>
    p.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.medicationName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'default';
      case 'completed': return 'secondary';
      case 'discontinued': return 'destructive';
      case 'expired': return 'outline';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-gray-500" />;
      case 'discontinued': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'expired': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default: return <Pill className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Prescription Manager</CardTitle>
              <CardDescription>Manage patient prescriptions and medications</CardDescription>
            </div>
            <Dialog open={showNewPrescription} onOpenChange={setShowNewPrescription}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Prescription
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Prescription</DialogTitle>
                  <DialogDescription>Prescribe medication for a patient.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreatePrescription} className="space-y-4">
                  {/* Form Fields (same as before, unchanged) */}
                  {/* ... keep the same input fields for patientName, medicationName, dosage, frequency, etc. */}
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search prescriptions by patient or medication..."
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
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage & Frequency</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Refills</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrescriptions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex flex-col items-center space-y-2">
                          <Pill className="h-8 w-8 text-gray-400" />
                          <p className="text-gray-500">No prescriptions found</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPrescriptions.map((prescription) => (
                      <TableRow key={prescription.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">{prescription.patientName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Pill className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">{prescription.medicationName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{prescription.dosage}</div>
                            <div className="text-gray-500">{prescription.frequency}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{prescription.duration}</div>
                            <div className="text-gray-500 flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(prescription.startDate).toLocaleDateString()} - {new Date(prescription.endDate).toLocaleDateString()}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{prescription.refillsRemaining}/{prescription.totalRefills}</div>
                            <div className="text-gray-500">remaining</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(prescription.status)}
                            <Badge variant={getStatusColor(prescription.status)}>
                              {prescription.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedPrescription(prescription)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prescription Details Dialog */}
      <Dialog open={!!selectedPrescription} onOpenChange={() => setSelectedPrescription(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Prescription Details</DialogTitle>
            <DialogDescription>
              {selectedPrescription?.patientName} - {selectedPrescription?.medicationName}
            </DialogDescription>
          </DialogHeader>
          {selectedPrescription && (
            <div className="space-y-4">
              {/* Same details UI as your original code */}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
