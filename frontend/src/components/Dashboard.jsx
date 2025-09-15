import React from 'react';
import { DashboardOverview } from './DashboardOverview.jsx';
import { PatientManagement } from './patients/PatientManagement.jsx';
import { AppointmentManagement } from './appointments/AppointmentManagement.jsx';
import { MedicalRecords } from './medical-records/MedicalRecords.jsx';
import { EmergencyDepartment } from './emergency/EmergencyDepartment.jsx';
import { BedManagement } from './beds/BedManagement.jsx';
import { PharmacyManagement } from './pharmacy/PharmacyManagement.jsx';
import { InventoryManagement } from './inventory/InventoryManagement.jsx';
import { StaffManagement } from './modules/StaffManagement.jsx';
import { BillingManagement } from './billing/BillingManagement.jsx';
import { ReportsAnalytics } from './reports/ReportsAnalytics.jsx';
import { NotificationCenter } from './notifications/NotificationCenter.jsx';
import { SettingsPanel } from './settings/SettingsPanel.jsx';
//user Registration
import { UserRegistrationApproval } from './approval/UserRegistrationApproval.jsx';


export function Dashboard({ currentView }) {
  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'patients':
        return <PatientManagement />;
      case 'appointments':
        return <AppointmentManagement />;
      case 'medical-records':
        return <MedicalRecords />;
      case 'emergency':
        return <EmergencyDepartment />;
      case 'bed-management':
        return <BedManagement />;
      case 'pharmacy':
        return <PharmacyManagement />;
      case 'inventory':
        return <InventoryManagement />;
      case 'staff':
        return <StaffManagement />;
      case 'billing':
        return <BillingManagement />;
      case 'reports':
        return <ReportsAnalytics />;
      case 'notifications':
        return <NotificationCenter />;
      case 'settings':
        return <SettingsPanel />;
        //user- approvals
      case 'user-approvals':
        return <UserRegistrationApproval />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="space-y-6">
      {renderCurrentView()}
    </div>
  );
}
