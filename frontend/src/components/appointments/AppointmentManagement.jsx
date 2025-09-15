


import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../ui/dialog';
import { Calendar } from '../ui/calender';
import { toast } from 'sonner';
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  User,
  Search,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

export function AppointmentManagement() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [viewingAppointment, setViewingAppointment] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    id: null,
    patientId: null,
    patientName: '',
    patientEmail: '',
    doctorId: null,
    doctorName: '',
    department: '',
    date: '',
    time: '',
    type: 'consultation',
    notes: ''
  });

  // Autocomplete states
  const [patientQuery, setPatientQuery] = useState('');
  const [patientSuggestionsVisible, setPatientSuggestionsVisible] = useState(false);
  const patientBoxRef = useRef(null);

  const [doctorQuery, setDoctorQuery] = useState('');
  const [doctorSuggestionsVisible, setDoctorSuggestionsVisible] = useState(false);
  const doctorBoxRef = useRef(null);

  const timeSlots = [
    '09:00','09:30','10:00','10:30','11:00','11:30',
    '12:00','12:30','14:00','14:30','15:00','15:30',
    '16:00','16:30','17:00','17:30'
  ];

  const departments = [
    'Cardiology','Emergency','Orthopedics','Pediatrics',
    'Radiology','Surgery','Pharmacy','General Practice'
  ];

  const appointmentTypes = [
    'consultation','follow-up','emergency','surgery',
    'therapy','check-up','vaccination','diagnostic'
  ];

  // --- fetch data ---
  useEffect(() => {
    fetchAllData();

    const onClick = (e) => {
      if (patientBoxRef.current && !patientBoxRef.current.contains(e.target)) {
        setPatientSuggestionsVisible(false);
      }
      if (doctorBoxRef.current && !doctorBoxRef.current.contains(e.target)) {
        setDoctorSuggestionsVisible(false);
      }
    };

    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  async function fetchAllData() {
    setLoading(true);
    try {
      const [apptRes, patRes, docRes] = await Promise.all([
        axios.get('http://localhost:5001/api/appointments'),
        axios.get('http://localhost:5001/api/patients'),
        axios.get('http://localhost:5001/api/doctors')
      ]);
      setAppointments(apptRes.data || []);
      setPatients(patRes.data || []);
      setDoctors(docRes.data || []); // take all doctors returned by backend


    } catch (err) {
      console.error(err);
      toast.error('Error loading data');
    } finally {
      setLoading(false);
    }
  }

  // --- patient autocomplete (keeping original) ---
  const activePatients = patients.filter(p => p.status === 'active');
  const patientSuggestions = activePatients
    .filter(p => {
      const q = (patientQuery || '').trim().toLowerCase();
      if (!q) return false;
      return (p.name || '').toLowerCase().includes(q) ||
             (p.email || '').toLowerCase().includes(q) ||
             (p.phone || '').includes(q);
    }).slice(0,10);

  function onPatientInputChange(value) {
    setPatientQuery(value);
    setFormData(prev => ({
      ...prev,
      patientId: null,
      patientName: value,
      patientEmail: ''
    }));
    setPatientSuggestionsVisible(true);
  }

  function selectPatientSuggestion(patient) {
    setFormData(prev => ({
      ...prev,
      patientId: patient.id,
      patientName: patient.name,
      patientEmail: patient.email || ''
    }));
    setPatientQuery(patient.name);
    setPatientSuggestionsVisible(false);
  }

  function onPatientBlur() {
    setTimeout(() => {
      if (!formData.patientId) setPatientSuggestionsVisible(false);
    }, 150);
  }

  // --- doctor autocomplete (fixed) ---
  const doctorSuggestions = doctors
    .filter(d => {
      const q = (doctorQuery || '').trim().toLowerCase();
      if (!q) return false; // only show when typing
      return (d.name || '').toLowerCase().includes(q) ||
             (d.email || '').toLowerCase().includes(q) ||
             (d.department || '').toLowerCase().includes(q);
    })
    .slice(0, 10);

  function onDoctorInputChange(value) {
    setDoctorQuery(value);
    setFormData(prev => ({
      ...prev,
      doctorId: null,
      doctorName: value,
      department: prev.department
    }));
    setDoctorSuggestionsVisible(true);
  }

  function selectDoctorSuggestion(doc) {
    setFormData(prev => ({
      ...prev,
      doctorId: doc.id,
      doctorName: doc.name,
      department: doc.department || prev.department
    }));
    setDoctorQuery(doc.name);
    setDoctorSuggestionsVisible(false);
  }

  function onDoctorBlur() {
    setTimeout(() => {
      if (!formData.doctorId) setDoctorSuggestionsVisible(false);
    }, 150);
  }

  // --- add/update appointment ---
  async function handleAddAppointment(e) {
    e.preventDefault();
    if (!formData.patientId) return toast.error('Select an active patient');
    if (!formData.doctorName) return toast.error('Enter or select a doctor');
    if (!formData.department) return toast.error('Select department');
    if (!formData.date) return toast.error('Select date');
    if (!formData.time) return toast.error('Select time');

    setLoading(true);
    try {
      const payload = {
        patientId: formData.patientId,
        patientName: formData.patientName,
        patientEmail: formData.patientEmail,
        doctorId: formData.doctorId || undefined,
        doctorName: formData.doctorName,
        department: formData.department,
        date: formData.date,
        time: formData.time,
        type: formData.type,
        notes: formData.notes,
        status: 'scheduled'
      };

      if (formData.id) {
        await axios.put(`http://localhost:5001/api/appointments/${formData.id}`, payload);
        setAppointments(prev => prev.map(a => a.id === formData.id ? {...a, ...payload} : a));
        toast.success('Appointment updated');
      } else {
        const res = await axios.post('http://localhost:5001/api/appointments', payload);
        setAppointments(prev => [res.data, ...prev]);
        toast.success('Appointment added');
      }

      setShowAddDialog(false);
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save appointment');
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setFormData({
      id: null,
      patientId: null,
      patientName: '',
      patientEmail: '',
      doctorId: null,
      doctorName: '',
      department: '',
      date: '',
      time: '',
      type: 'consultation',
      notes: ''
    });
    setPatientQuery('');
    setDoctorQuery('');
    setPatientSuggestionsVisible(false);
    setDoctorSuggestionsVisible(false);
  }

  // --- edit appointment ---
  function handleEditAppointment(appt) {
    setFormData({
      id: appt.id,
      patientId: appt.patientId,
      patientName: appt.patientName,
      patientEmail: appt.patientEmail,
      doctorId: appt.doctorId || null,
      doctorName: appt.doctorName,
      department: appt.department,
      date: appt.date,
      time: appt.time,
      type: appt.type,
      notes: appt.notes || ''
    });
    setPatientQuery(appt.patientName);
    setDoctorQuery(appt.doctorName);
    setShowAddDialog(true);
  }

  // --- view appointment ---
  async function handleViewAppointment(appt) {
    setViewingAppointment(appt);
    setShowViewDialog(true);
  }

  // --- helpers ---
  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'scheduled': return <Clock className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const filteredAppointments = appointments.filter(appt => {
    const matchesSearch = appt.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          appt.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          appt.department?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = selectedDate ? appt.date === selectedDate.toISOString().split('T')[0] : true;
    return matchesSearch && matchesDate;
  });

  return (
    <div className="space-y-6">
      {/* Header + Add Appointment */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointment Management</h1>
          <p className="text-gray-600">Schedule and manage patient appointments</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={(open) => {
          setShowAddDialog(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Schedule Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule Appointment</DialogTitle>
              <DialogDescription>Pick a patient, doctor, department, date & time</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddAppointment} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">

                {/* Patient autocomplete */}
                <div ref={patientBoxRef} className="relative">
                  <Label htmlFor="patient">Patient *</Label>
                  <Input
                    id="patient"
                    placeholder="Start typing patient name..."
                    value={patientQuery}
                    onChange={(e) => onPatientInputChange(e.target.value)}
                    onFocus={() => setPatientSuggestionsVisible(true)}
                    onBlur={onPatientBlur}
                    className={formData.patientId ? 'bg-green-50 border-green-200' : ''}
                    required
                  />
                  {patientSuggestionsVisible && patientSuggestions.length > 0 && (
                    <div className="absolute z-50 left-0 right-0 mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                      {patientSuggestions.map(p => (
                        <div
                          key={p.id}
                          onMouseDown={() => selectPatientSuggestion(p)}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                        >
                          <div className="font-medium">{p.name}</div>
                          <div className="text-xs text-gray-500">{p.email} • {p.phone || 'No phone'}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {formData.patientId && (
                    <div className="absolute right-2 top-8 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="patientEmail">Patient Email</Label>
                  <Input
                    id="patientEmail"
                    type="email"
                    value={formData.patientEmail}
                    readOnly={!!formData.patientId}
                    placeholder={formData.patientId ? 'Auto-filled' : 'Optional'}
                    onChange={(e) => setFormData({...formData, patientEmail: e.target.value})}
                    className={formData.patientId ? 'bg-gray-50' : ''}
                  />
                </div>

                {/* Doctor autocomplete */}
                <div ref={doctorBoxRef} className="relative">
                  <Label htmlFor="doctor">Doctor *</Label>
                  <Input
                    id="doctor"
                    placeholder="Start typing doctor name..."
                    value={doctorQuery}
                    onChange={(e) => onDoctorInputChange(e.target.value)}
                    onFocus={() => setDoctorSuggestionsVisible(true)}
                    onBlur={onDoctorBlur}
                    className={formData.doctorId ? 'bg-green-50 border-green-200' : ''}
                    required
                  />
                  {doctorSuggestionsVisible && doctorSuggestions.length > 0 && (
                    <div className="absolute z-50 left-0 right-0 mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                      {doctorSuggestions.map(doc => (
                        <div
                          key={doc.id}
                          onMouseDown={() => selectDoctorSuggestion(doc)}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                        >
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-xs text-gray-500">{doc.email || 'No email'} • {doc.department || 'No department'}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {doctorSuggestionsVisible && doctorQuery.trim() && doctorSuggestions.length === 0 && (
                    <div className="absolute z-50 left-0 right-0 mt-1 bg-white border rounded-md shadow-lg p-3 text-gray-500 text-sm">
                      No doctors found matching "{doctorQuery}"
                    </div>
                  )}
                  {formData.doctorId && (
                    <div className="absolute right-2 top-8 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="department">Department *</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => setFormData({...formData, department: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="time">Time *</Label>
                  <Select
                    value={formData.time}
                    onValueChange={(value) => setFormData({...formData, time: value})}
                  >
                    <SelectTrigger><SelectValue placeholder="Select time" /></SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

              </div>

              <div>
                <Label htmlFor="type">Appointment Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({...formData, type: value})}
                >
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    {appointmentTypes.map(type => (
                      <SelectItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Optional appointment notes"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : (formData.id ? 'Update Appointment' : 'Schedule Appointment')}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>      

      {/* Search + Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                     placeholder="Search by patient, doctor, or department..."
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="pl-10"
                   />
                 </div>
                 <Button variant="outline">
                   <CalendarIcon className="h-4 w-4 mr-2" />
                   {filteredAppointments.length} Appointments
                 </Button>
               </div>
             </CardContent>
           </Card>
         </div>

         <Card>
           <CardHeader><CardTitle>Calendar</CardTitle></CardHeader>
           <CardContent>
             <Calendar
               mode="single"
               selected={selectedDate}
               onSelect={setSelectedDate}
               className="rounded-md border"
             />
           </CardContent>
         </Card>
       </div>

       {/* Appointment List */}
       <Card>
         <CardHeader>
           <CardTitle>Appointments {selectedDate && `for ${selectedDate.toLocaleDateString()}`}</CardTitle>
         </CardHeader>
         <CardContent>
           {loading ? <p>Loading...</p> : filteredAppointments.length === 0 ? (
             <p className="text-gray-600 text-center py-8">No appointments found</p>
           ) : (
             <div className="space-y-4">
               {filteredAppointments.map(appt => (
                 <div key={appt.id} className="border rounded-lg p-4 hover:bg-gray-50">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                         <User className="h-6 w-6 text-blue-600" />
                       </div>
                       <div>
                         <h3 className="font-semibold text-gray-900">{appt.patientName}</h3>
                         <div className="flex items-center gap-4 text-sm text-gray-600">
                           <span className="flex items-center gap-1"><CalendarIcon className="h-3 w-3" />{appt.date}</span>
                           <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{appt.time}</span>
                           <span>Dr. {appt.doctorName}</span>
                           <span className="capitalize">{appt.department}</span>
                         </div>
                         <div className="flex items-center gap-2 mt-1">
                           <Badge className={getStatusColor(appt.status)}>
                             <span className="flex items-center gap-1">{getStatusIcon(appt.status)}{appt.status}</span>
                           </Badge>
                           <Badge variant="outline">{appt.type}</Badge>
                         </div>
                       </div>
                     </div>
                     <div className="flex items-center gap-2">
                       <Button variant="outline" size="sm" onClick={() => handleViewAppointment(appt)}>
                         <Eye className="h-4 w-4 mr-1" />View
                       </Button>
                       <Button variant="outline" size="sm" onClick={() => handleEditAppointment(appt)}>
                         <Edit className="h-4 w-4 mr-1" />Edit
                       </Button>
                       {appt.status === 'scheduled' && (
                         <Button size="sm" onClick={async () => {
                           try {
                             await axios.put(`http://localhost:5001/api/appointments/${appt.id}`, {status: 'confirmed'});
                             setAppointments(prev => prev.map(a => a.id===appt.id?{...a,status:'confirmed'}:a));
                             toast.success('Appointment confirmed');
                           } catch (err) {
                             toast.error('Failed to confirm');
                           }
                         }}>
                           <CheckCircle className="h-4 w-4 mr-1" />Confirm
                         </Button>
                       )}
                     </div>
                   </div>
                   {appt.notes && <div className="mt-3 p-3 bg-gray-50 rounded-md">{appt.notes}</div>}
                 </div>
               ))}
             </div>
           )}
         </CardContent>
       </Card>

       {/* View Appointment Dialog */}
       <Dialog open={showViewDialog} onOpenChange={(open)=>{if(!open)setViewingAppointment(null);setShowViewDialog(open);}}>
         <DialogContent className="max-w-md" aria-describedby={undefined}>
           <DialogHeader>
             <DialogTitle>Appointment Details</DialogTitle>
             <DialogDescription>Patient & appointment info</DialogDescription>
           </DialogHeader>
           {viewingAppointment ? (
             <div className="space-y-2">
               <p><strong>Patient:</strong> {viewingAppointment.patientName}</p>
               <p><strong>Email:</strong> {viewingAppointment.patientEmail || '-'}</p>
               <p><strong>Doctor:</strong> {viewingAppointment.doctorName}</p>
               <p><strong>Department:</strong> {viewingAppointment.department}</p>
               <p><strong>Date:</strong> {viewingAppointment.date}</p>
               <p><strong>Time:</strong> {viewingAppointment.time}</p>
               <p><strong>Type:</strong> {viewingAppointment.type}</p>
               <p><strong>Status:</strong> {viewingAppointment.status}</p>
               {viewingAppointment.notes && <div className="mt-2 p-2 bg-gray-50 rounded">{viewingAppointment.notes}</div>}
               <div className="flex justify-end mt-4">
                 <Button variant="outline" onClick={()=>{setShowViewDialog(false); setViewingAppointment(null);}}>Close</Button>
               </div>
             </div>
           ) : <p>Loading...</p>}
         </DialogContent>
       </Dialog>
     </div>
   );
}
