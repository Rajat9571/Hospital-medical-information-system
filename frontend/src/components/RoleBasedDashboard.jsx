// // src/components/RoleBasedDashboard.jsx
// import React from "react";
// import { useAuth } from "../context/AuthContext";

// import { AdminDashboard } from "./dashboards/AdminDashboard";
// import { DoctorDashboard } from "./dashboards/DoctorDashboard";
// import { NurseDashboard } from "./dashboards/NurseDashboard";
// import { PatientDashboard } from "./dashboards/PatientDashboard";
// import { StaffDashboard } from "./dashboards/StaffDashboard";

// export function RoleBasedDashboard() {
//   const { user } = useAuth();

//   if (!user) return <p>Loading...</p>;

//   switch (user.role) {
//     case "admin":
//       return <AdminDashboard />;
//     case "doctor":
//       return <DoctorDashboard />;
//     case "nurse":
//       return <NurseDashboard />;
//     case "patient":
//       return <PatientDashboard />;
//     case "staff":
//       return <StaffDashboard />;
//     default:
//       return <p>No dashboard available for this role</p>;
//   }
// }
 