

import React from 'react';
import { Button } from '../ui/button.jsx';
import { useAuth } from '../../context/AuthContext';

import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Stethoscope,
  Package,
  UserCheck,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Activity,
  Bed,
  CreditCard,
  BarChart3,
  Bell,
  Heart,
  UserPlus,
  Shield
} from 'lucide-react';

export function Sidebar({ collapsed, onToggle, currentView, onViewChange }) {
  const { user, logout } = useAuth();
  const [pendingRequestsCount, setPendingRequestsCount] = React.useState(0);

  React.useEffect(() => {
    // Fetch pending requests count for admin users
    if (user?.role === 'admin') {
      fetchPendingRequestsCount();
      // Check every 30 seconds
      const interval = setInterval(fetchPendingRequestsCount, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchPendingRequestsCount = async () => {
    try {
      const response = await apiClient.admin.getPendingRegistrations();
      if (response && response.pendingRequests && Array.isArray(response.pendingRequests)) {
        setPendingRequestsCount(response.pendingRequests.length);
      }
    } catch (error) {
      // Silently handle errors to avoid console spam
      setPendingRequestsCount(0);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'doctor', 'nurse', 'staff'] },
    { id: 'patients', label: 'Patients', icon: Users, roles: ['admin', 'doctor', 'nurse'] },
    { id: 'appointments', label: 'Appointments', icon: Calendar, roles: ['admin', 'doctor', 'nurse', 'staff'] },
    { id: 'medical-records', label: 'Medical Records', icon: FileText, roles: ['admin', 'doctor', 'nurse'] },
    { id: 'emergency', label: 'Emergency', icon: Activity, roles: ['admin', 'doctor', 'nurse'] },
    { id: 'bed-management', label: 'Bed Management', icon: Bed, roles: ['admin', 'nurse', 'staff'] },
    { id: 'pharmacy', label: 'Pharmacy', icon: Stethoscope, roles: ['admin', 'doctor', 'nurse', 'staff'] },
    { id: 'inventory', label: 'Inventory', icon: Package, roles: ['admin', 'staff'] },
    { id: 'staff', label: 'Staff Management', icon: UserCheck, roles: ['admin'] },
    { id: 'user-approvals', label: 'User Approvals', icon: UserPlus, roles: ['admin'], isAdminOnly: true },
    { id: 'billing', label: 'Billing', icon: CreditCard, roles: ['admin', 'staff'] },
    { id: 'reports', label: 'Reports', icon: BarChart3, roles: ['admin', 'doctor'] },
    { id: 'notifications', label: 'Notifications', icon: Bell, roles: ['admin', 'doctor', 'nurse', 'staff'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['admin', 'doctor', 'nurse', 'staff'] }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role || 'patient')
  );

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} flex flex-col h-screen`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-lg">MediCare</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="p-1"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* User Info */}
      {!collapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate capitalize">{user?.role}</p>
              {user?.department && (
                <p className="text-xs text-gray-400 truncate capitalize">{user.department}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {filteredMenuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentView === item.id;

            return (
              <li key={item.id}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  className={`w-full justify-start h-10 ${collapsed ? 'px-2' : 'px-3'}`}
                  onClick={() => onViewChange(item.id)}
                >
                  <IconComponent className={`h-4 w-4 ${collapsed ? '' : 'mr-3'}`} />
                  {!collapsed && (
                    <span className="text-sm flex items-center justify-between w-full">
                      {item.label}
                      {item.id === 'user-approvals' && pendingRequestsCount > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-2">
                          {pendingRequestsCount > 9 ? '9+' : pendingRequestsCount}
                        </span>
                      )}
                    </span>
                  )}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-gray-200">
        <Button
          variant="ghost"
          className={`w-full justify-start h-10 text-red-600 hover:text-red-700 hover:bg-red-50 ${collapsed ? 'px-2' : 'px-3'}`}
          onClick={logout}
        >
          <LogOut className={`h-4 w-4 ${collapsed ? '' : 'mr-3'}`} />
          {!collapsed && <span className="text-sm">Logout</span>}
        </Button>
      </div>
    </div>
  );
}