// components/modules/HospitalReports.jsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { BarChart3 } from 'lucide-react';

export function HospitalReports() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-green-500" />
          <CardTitle>Hospital Reports & Analytics</CardTitle>
        </div>
        <CardDescription>Comprehensive reporting and analytics dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="mt-4 space-y-2 text-sm text-gray-600">
          <li>• Patient admission/discharge statistics</li>
          <li>• Department performance metrics</li>
          <li>• Financial & revenue analysis</li>
          <li>• Staff utilization reports</li>
          <li>• Bed occupancy trends</li>
          <li>• Patient satisfaction surveys</li>
          <li>• Compliance reports</li>
        </ul>
      </CardContent>
    </Card>
  );
}
