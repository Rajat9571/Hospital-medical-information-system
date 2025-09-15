// import React, { useState } from 'react';
// import { Button } from '../ui/button';
// import { Input } from '../ui/input';
// import { Label } from '../ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
// import { Textarea } from '../ui/textarea';
// import { Badge } from '../ui/badge';
// import { X } from 'lucide-react';
// // import { projectId, publicAnonKey } from '../../utils/supabase/info';

// export function PatientForm({ patient, onSave, onCancel }) {
//   const [formData, setFormData] = useState({
//     firstName: patient?.firstName || '',
//     lastName: patient?.lastName || '',
//     email: patient?.email || '',
//     phone: patient?.phone || '',
//     dateOfBirth: patient?.dateOfBirth || '',
//     gender: patient?.gender || '',
//     bloodType: patient?.bloodType || '',
//     address: patient?.address || '',
//     emergencyContactName: patient?.emergencyContact?.name || '',
//     emergencyContactPhone: patient?.emergencyContact?.phone || '',
//     emergencyContactRelationship: patient?.emergencyContact?.relationship || '',
//     medicalHistory: patient?.medicalHistory || '',
//     currentMedications: patient?.currentMedications || '',
//   });

//   const [allergies, setAllergies] = useState(patient?.allergies || []);
//   const [newAllergy, setNewAllergy] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const addAllergy = () => {
//     if (newAllergy.trim() && !allergies.includes(newAllergy.trim())) {
//       setAllergies([...allergies, newAllergy.trim()]);
//       setNewAllergy('');
//     }
//   };

//   const removeAllergy = (allergy) => {
//     setAllergies(allergies.filter(a => a !== allergy));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const patientData = {
//         ...formData,
//         allergies,
//         emergencyContact: {
//           name: formData.emergencyContactName,
//           phone: formData.emergencyContactPhone,
//           relationship: formData.emergencyContactRelationship,
//         },
//       };

//       const url = patient?.id 
//         ? `https://${projectId}.supabase.co/functions/v1/make-server-396eb124/patients/${patient.id}`
//         : `https://${projectId}.supabase.co/functions/v1/make-server-396eb124/patients`;

//       const method = patient?.id ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${publicAnonKey}`,
//         },
//         body: JSON.stringify(patientData),
//       });

//       if (response.ok) {
//         onSave();
//       } else {
//         console.error('Failed to save patient');
//       }
//     } catch (error) {
//       console.error('Error saving patient:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {/* Name fields */}
//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="firstName">First Name</Label>
//           <Input
//             id="firstName"
//             value={formData.firstName}
//             onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//             required
//           />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="lastName">Last Name</Label>
//           <Input
//             id="lastName"
//             value={formData.lastName}
//             onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//             required
//           />
//         </div>
//       </div>

//       {/* Email + Phone */}
//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             type="email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             required
//           />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="phone">Phone</Label>
//           <Input
//             id="phone"
//             type="tel"
//             value={formData.phone}
//             onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//             required
//           />
//         </div>
//       </div>

//       {/* DOB + Gender + Blood Type */}
//       <div className="grid grid-cols-3 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="dateOfBirth">Date of Birth</Label>
//           <Input
//             id="dateOfBirth"
//             type="date"
//             value={formData.dateOfBirth}
//             onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
//             required
//           />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="gender">Gender</Label>
//           <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select gender" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="male">Male</SelectItem>
//               <SelectItem value="female">Female</SelectItem>
//               <SelectItem value="other">Other</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="bloodType">Blood Type</Label>
//           <Select value={formData.bloodType} onValueChange={(value) => setFormData({ ...formData, bloodType: value })}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select blood type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="A+">A+</SelectItem>
//               <SelectItem value="A-">A-</SelectItem>
//               <SelectItem value="B+">B+</SelectItem>
//               <SelectItem value="B-">B-</SelectItem>
//               <SelectItem value="AB+">AB+</SelectItem>
//               <SelectItem value="AB-">AB-</SelectItem>
//               <SelectItem value="O+">O+</SelectItem>
//               <SelectItem value="O-">O-</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* Address */}
//       <div className="space-y-2">
//         <Label htmlFor="address">Address</Label>
//         <Textarea
//           id="address"
//           value={formData.address}
//           onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//           placeholder="Enter complete address"
//         />
//       </div>

//       {/* Emergency Contact */}
//       <div className="space-y-4">
//         <h4 className="font-semibold">Emergency Contact</h4>
//         <div className="grid grid-cols-3 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="emergencyContactName">Name</Label>
//             <Input
//               id="emergencyContactName"
//               value={formData.emergencyContactName}
//               onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
//               required
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="emergencyContactPhone">Phone</Label>
//             <Input
//               id="emergencyContactPhone"
//               type="tel"
//               value={formData.emergencyContactPhone}
//               onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
//               required
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="emergencyContactRelationship">Relationship</Label>
//             <Input
//               id="emergencyContactRelationship"
//               value={formData.emergencyContactRelationship}
//               onChange={(e) => setFormData({ ...formData, emergencyContactRelationship: e.target.value })}
//               placeholder="e.g., Spouse, Parent"
//               required
//             />
//           </div>
//         </div>
//       </div>

//       {/* Allergies */}
//       <div className="space-y-2">
//         <Label>Allergies</Label>
//         <div className="flex space-x-2">
//           <Input
//             value={newAllergy}
//             onChange={(e) => setNewAllergy(e.target.value)}
//             placeholder="Add allergy"
//             onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAllergy())}
//           />
//           <Button type="button" onClick={addAllergy} variant="outline">
//             Add
//           </Button>
//         </div>
//         <div className="flex flex-wrap gap-2 mt-2">
//           {allergies.map((allergy, index) => (
//             <Badge key={index} variant="secondary" className="flex items-center gap-1">
//               {allergy}
//               <X 
//                 className="h-3 w-3 cursor-pointer" 
//                 onClick={() => removeAllergy(allergy)}
//               />
//             </Badge>
//           ))}
//         </div>
//       </div>

//       {/* Medical History */}
//       <div className="space-y-2">
//         <Label htmlFor="medicalHistory">Medical History</Label>
//         <Textarea
//           id="medicalHistory"
//           value={formData.medicalHistory}
//           onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
//           placeholder="Previous conditions, surgeries, etc."
//           rows={3}
//         />
//       </div>

//       {/* Current Medications */}
//       <div className="space-y-2">
//         <Label htmlFor="currentMedications">Current Medications</Label>
//         <Textarea
//           id="currentMedications"
//           value={formData.currentMedications}
//           onChange={(e) => setFormData({ ...formData, currentMedications: e.target.value })}
//           placeholder="List current medications and dosages"
//           rows={3}
//         />
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-end space-x-2 pt-4">
//         <Button type="button" variant="outline" onClick={onCancel}>
//           Cancel
//         </Button>
//         <Button type="submit" disabled={isLoading}>
//           {isLoading ? 'Saving...' : (patient ? 'Update Patient' : 'Add Patient')}
//         </Button>
//       </div>
//     </form>
//   );
// }


import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';

export function PatientForm({ patient, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    firstName: patient?.firstName || '',
    lastName: patient?.lastName || '',
    email: patient?.email || '',
    phone: patient?.phone || '',
    dateOfBirth: patient?.dateOfBirth || '',
    gender: patient?.gender || '',
    bloodType: patient?.bloodType || '',
    address: patient?.address || '',
    emergencyContactName: patient?.emergencyContactName || '',
    emergencyContactPhone: patient?.emergencyContactPhone || '',
    emergencyContactRelationship: patient?.emergencyContactRelationship || '',
    medicalHistory: patient?.medicalHistory || '',
    currentMedications: patient?.currentMedications || '',
  });

  const [allergies, setAllergies] = useState(patient?.allergies || []);
  const [newAllergy, setNewAllergy] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addAllergy = () => {
    if (newAllergy.trim() && !allergies.includes(newAllergy.trim())) {
      setAllergies([...allergies, newAllergy.trim()]);
      setNewAllergy('');
    }
  };

  const removeAllergy = (allergy) => {
    setAllergies(allergies.filter(a => a !== allergy));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const patientData = {
        ...formData,
        allergies, // backend should store this as JSON or in a separate table
      };

      const url = patient?.id 
        ? `/api/patients/${patient.id}` 
        : `/api/patients`;

      const method = patient?.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      });

      if (response.ok) {
        onSave();
      } else {
        console.error('Failed to save patient');
      }
    } catch (error) {
      console.error('Error saving patient:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
        </div>
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>
      </div>

      {/* DOB + Gender + Blood Type */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bloodType">Blood Type</Label>
          <Select value={formData.bloodType} onValueChange={(value) => setFormData({ ...formData, bloodType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select blood type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A+">A+</SelectItem>
              <SelectItem value="A-">A-</SelectItem>
              <SelectItem value="B+">B+</SelectItem>
              <SelectItem value="B-">B-</SelectItem>
              <SelectItem value="AB+">AB+</SelectItem>
              <SelectItem value="AB-">AB-</SelectItem>
              <SelectItem value="O+">O+</SelectItem>
              <SelectItem value="O-">O-</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Enter complete address"
        />
      </div>

      {/* Emergency Contact */}
      <div className="space-y-4">
        <h4 className="font-semibold">Emergency Contact</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="emergencyContactName">Name</Label>
            <Input
              id="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergencyContactPhone">Phone</Label>
            <Input
              id="emergencyContactPhone"
              type="tel"
              value={formData.emergencyContactPhone}
              onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergencyContactRelationship">Relationship</Label>
            <Input
              id="emergencyContactRelationship"
              value={formData.emergencyContactRelationship}
              onChange={(e) => setFormData({ ...formData, emergencyContactRelationship: e.target.value })}
              placeholder="e.g., Spouse, Parent"
              required
            />
          </div>
        </div>
      </div>

      {/* Allergies */}
      <div className="space-y-2">
        <Label>Allergies</Label>
        <div className="flex space-x-2">
          <Input
            value={newAllergy}
            onChange={(e) => setNewAllergy(e.target.value)}
            placeholder="Add allergy"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAllergy())}
          />
          <Button type="button" onClick={addAllergy} variant="outline">
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {allergies.map((allergy, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {allergy}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeAllergy(allergy)}
              />
            </Badge>
          ))}
        </div>
      </div>

      {/* Medical History */}
      <div className="space-y-2">
        <Label htmlFor="medicalHistory">Medical History</Label>
        <Textarea
          id="medicalHistory"
          value={formData.medicalHistory}
          onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
          placeholder="Previous conditions, surgeries, etc."
          rows={3}
        />
      </div>

      {/* Current Medications */}
      <div className="space-y-2">
        <Label htmlFor="currentMedications">Current Medications</Label>
        <Textarea
          id="currentMedications"
          value={formData.currentMedications}
          onChange={(e) => setFormData({ ...formData, currentMedications: e.target.value })}
          placeholder="List current medications and dosages"
          rows={3}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : (patient ? 'Update Patient' : 'Add Patient')}
        </Button>
      </div>
    </form>
  );
}
