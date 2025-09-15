// components/modules/SystemSettings.jsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Settings } from 'lucide-react';

export function SystemSettings() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-gray-500" />
          <CardTitle>System Settings</CardTitle>
        </div>
        <CardDescription>Hospital system configuration and settings</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="mt-4 space-y-2 text-sm text-gray-600">
          <li>• User roles and permissions</li>
          <li>• Security and access controls</li>
          <li>• Backup and maintenance</li>
          <li>• Integration settings</li>
          <li>• Audit logs & monitoring</li>
        </ul>
      </CardContent>
    </Card>
  );
}
