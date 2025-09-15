import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Bell, Check, X, AlertCircle, Info } from 'lucide-react';

export function NotificationCenter() {
  const [notifications] = useState([
    {
      id: 1,
      type: 'alert',
      title: 'Emergency Patient Arrival',
      message: 'Patient with severe chest pain admitted to ER',
      timestamp: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'Appointment Reminder',
      message: 'Dr. Smith has an appointment in 30 minutes',
      timestamp: '25 minutes ago',
      read: false
    },
    {
      id: 3,
      type: 'success',
      title: 'Lab Results Ready',
      message: 'Blood work results for John Doe are available',
      timestamp: '1 hour ago',
      read: true
    }
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'alert': return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'info': return <Info className="h-5 w-5 text-blue-600" />;
      case 'success': return <Check className="h-5 w-5 text-green-600" />;
      default: return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'alert': return 'border-l-red-500';
      case 'info': return 'border-l-blue-500';
      case 'success': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notification Center</h1>
          <p className="text-gray-600">Stay updated with important alerts and messages</p>
        </div>
        <Button variant="outline">
          <Check className="h-4 w-4 mr-2" />
          Mark All Read
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Notifications</p>
                <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-gray-900">
                  {notifications.filter(n => !n.read).length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Alerts</p>
                <p className="text-2xl font-bold text-gray-900">
                  {notifications.filter(n => n.type === 'alert').length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`border-l-4 ${getNotificationColor(notification.type)} bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                        {!notification.read && (
                          <Badge variant="destructive" className="text-xs">New</Badge>
                        )}
                      </div>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-sm text-gray-500 mt-2">{notification.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}