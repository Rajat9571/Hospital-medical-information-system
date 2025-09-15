// components/modules/BillingManagement.jsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { DollarSign } from 'lucide-react';

export function BillingManagement() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-green-500" />
          <CardTitle>Billing Management</CardTitle>
        </div>
        <CardDescription>Hospital billing and financial management</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="mt-4 space-y-2 text-sm text-gray-600">
          <li>• Patient billing and invoicing</li>
          <li>• Insurance claim processing</li>
          <li>• Payment tracking and collections</li>
          <li>• Revenue cycle management</li>
          <li>• Financial reporting</li>
          <li>• Pricing and charge management</li>
        </ul>
      </CardContent>
    </Card>
  );
}
