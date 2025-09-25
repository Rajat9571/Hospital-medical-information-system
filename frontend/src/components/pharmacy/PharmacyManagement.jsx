// import React, { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
// import { Button } from '../ui/button';
// import { Input } from '../ui/input';
// import { Badge } from '../ui/badge';
// import { Pill, Plus, Search, Package } from 'lucide-react';

// export function PharmacyManagement() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [medications] = useState([
//     { id: 1, name: 'Aspirin', quantity: 150, unit: 'tablets', status: 'in-stock' },
//     { id: 2, name: 'Amoxicillin', quantity: 25, unit: 'bottles', status: 'low-stock' },
//     { id: 3, name: 'Insulin', quantity: 0, unit: 'vials', status: 'out-of-stock' },
//   ]);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'in-stock': return 'bg-green-100 text-green-800';
//       case 'low-stock': return 'bg-yellow-100 text-yellow-800';
//       case 'out-of-stock': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Pharmacy Management</h1>
//           <p className="text-gray-600">Manage medications and prescriptions</p>
//         </div>
//         <Button>
//           <Plus className="h-4 w-4 mr-2" />
//           Add Medication
//         </Button>
//       </div>

//       <Card>
//         <CardContent className="p-6">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <Input
//               placeholder="Search medications..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Medication Inventory</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {medications.map((med) => (
//               <div key={med.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                       <Pill className="h-6 w-6 text-blue-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900">{med.name}</h3>
//                       <p className="text-gray-600">{med.quantity} {med.unit}</p>
//                       <Badge className={getStatusColor(med.status)}>
//                         {med.status.replace('-', ' ')}
//                       </Badge>
//                     </div>
//                   </div>
//                   <Button variant="outline" size="sm">
//                     Manage Stock
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Pill, Plus, Search } from 'lucide-react';

export function PharmacyManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMed, setNewMed] = useState({ name: '', quantity: 0, unit: '', status: 'in-stock', notes: '' });

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-800';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5001/api/pharmacy');
      setMedications(res.data);
    } catch (err) {
      console.error('Failed to fetch medications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMedication = async () => {
    try {
      const res = await axios.post('http://localhost:5001/api/pharmacy', newMed);
      setMedications((prev) => [...prev, res.data]);
      setShowAddForm(false);
      setNewMed({ name: '', quantity: 0, unit: '', status: 'in-stock', notes: '' });
    } catch (err) {
      console.error('Failed to add medication:', err);
    }
  };

  const filteredMeds = medications.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pharmacy Management</h1>
          <p className="text-gray-600">Manage medications and prescriptions</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Medication
        </Button>
      </div>

      {/* Add Medication Form */}
      {showAddForm && (
        <Card>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Medication Name"
                value={newMed.name}
                onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Quantity"
                value={newMed.quantity}
                onChange={(e) => setNewMed({ ...newMed, quantity: parseInt(e.target.value) })}
              />
              <Input
                placeholder="Unit (tablets, bottles, vials)"
                value={newMed.unit}
                onChange={(e) => setNewMed({ ...newMed, unit: e.target.value })}
              />
              <Input
                placeholder="Notes"
                value={newMed.notes}
                onChange={(e) => setNewMed({ ...newMed, notes: e.target.value })}
              />
              <select
                className="border rounded p-2"
                value={newMed.status}
                onChange={(e) => setNewMed({ ...newMed, status: e.target.value })}
              >
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
              <Button onClick={handleAddMedication}>Save</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <Card>
        <CardContent className="p-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search medications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </CardContent>
      </Card>

      {/* Medication List */}
      <Card>
        <CardHeader>
          <CardTitle>Medication Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : filteredMeds.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No medications found</p>
          ) : (
            <div className="space-y-4">
              {filteredMeds.map((med) => (
                <div key={med.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Pill className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{med.name}</h3>
                        <p className="text-gray-600">{med.quantity} {med.unit}</p>
                        <Badge className={getStatusColor(med.status)}>
                          {med.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage Stock
                    </Button>
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
