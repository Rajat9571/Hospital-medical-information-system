// components/modules/VitalSigns.jsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Activity } from 'lucide-react';

export function VitalSigns() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-red-500" />
          <CardTitle>Vital Signs Management</CardTitle>
        </div>
        <CardDescription>Record and monitor patient vital signs</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="mt-4 space-y-2 text-sm text-gray-600">
          <li>• Blood pressure monitoring</li>
          <li>• Heart rate tracking</li>
          <li>• Temperature recording</li>
          <li>• Respiratory rate measurement</li>
          <li>• Oxygen saturation levels</li>
          <li>• Real-time alerts for abnormal readings</li>
        </ul>
      </CardContent>
    </Card>
  );
}
