import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { CreditCard, Plus, Search } from 'lucide-react';

export function BillingManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [bills] = useState([
    { id: 1, patientName: 'John Doe', amount: 1250.00, status: 'paid', date: '2024-01-15' },
    { id: 2, patientName: 'Jane Smith', amount: 850.50, status: 'pending', date: '2024-01-14' },
    { id: 3, patientName: 'Bob Johnson', amount: 2100.75, status: 'overdue', date: '2024-01-10' },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing Management</h1>
          <p className="text-gray-600">Manage patient billing and payments</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search bills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Bills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bills.map((bill) => (
              <div key={bill.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{bill.patientName}</h3>
                      <p className="text-gray-600">${bill.amount.toFixed(2)} • {bill.date}</p>
                      <Badge className={getStatusColor(bill.status)}>
                        {bill.status}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Invoice
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