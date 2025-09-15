import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Pill, Plus, Search, Package } from 'lucide-react';

export function PharmacyManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [medications] = useState([
    { id: 1, name: 'Aspirin', quantity: 150, unit: 'tablets', status: 'in-stock' },
    { id: 2, name: 'Amoxicillin', quantity: 25, unit: 'bottles', status: 'low-stock' },
    { id: 3, name: 'Insulin', quantity: 0, unit: 'vials', status: 'out-of-stock' },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-800';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pharmacy Management</h1>
          <p className="text-gray-600">Manage medications and prescriptions</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Medication
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search medications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Medication Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {medications.map((med) => (
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
        </CardContent>
      </Card>
    </div>
  );
}