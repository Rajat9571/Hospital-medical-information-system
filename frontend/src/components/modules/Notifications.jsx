// components/modules/Notifications.jsx
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { ScrollArea } from '../ui/scroll-area';
import { Bell, AlertCircle, Calendar, User, Heart, CheckCircle } from 'lucide-react';

export function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock notifications (replace with API later)
    const mockData = [
      { id: '1', type: 'appointment', title: 'New Appointment', message: 'Dr. Smith scheduled at 10 AM', timestamp: new Date().toISOString(), read: false, priority: 'medium' },
      { id: '2', type: 'emergency', title: 'Emergency Case', message: 'Patient admitted to ER', timestamp: new Date().toISOString(), read: false, priority: 'urgent' },
    ];
    setNotifications(mockData);
    setUnreadCount(mockData.filter(n => !n.read).length);
    setLoading(false);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'appointment': return <Calendar className="h-4 w-4 text-blue-500" />;
      case 'emergency': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'lab_result': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'prescription': return <Heart className="h-4 w-4 text-purple-500" />;
      default: return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low':
      default: return 'secondary';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b flex items-center justify-between">
          <h4 className="font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all read
            </Button>
          )}
        </div>
        
        <ScrollArea className="h-96">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p>No notifications</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${!n.read ? 'bg-blue-50' : ''}`}
                  onClick={() => !n.read && markAsRead(n.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">{getNotificationIcon(n.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm ${!n.read ? 'font-semibold' : 'font-medium'}`}>
                          {n.title}
                        </p>
                        <Badge variant={getPriorityColor(n.priority)} className="text-xs">
                          {n.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{n.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{formatTimestamp(n.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
