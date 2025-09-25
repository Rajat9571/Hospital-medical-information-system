

// // // import React, { useState, useEffect } from 'react';
// // // import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
// // // import { Button } from './ui/button';
// // // import { Badge } from './ui/badge';
// // // import { useAuth } from '../context/AuthContext';
// // // import {
// // //   Users,
// // //   Calendar,
// // //   FileText,
// // //   Activity,
// // //   TrendingUp,
// // //   Clock,
// // //   AlertCircle,
// // //   Heart,
// // //   Stethoscope,
// // //   Bed
// // // } from 'lucide-react';

// // // export function DashboardOverview() {
// // //   const { user } = useAuth();
// // //   const [currentTime, setCurrentTime] = useState(new Date());

// // //   // Update time every minute
// // //   useEffect(() => {
// // //     const timer = setInterval(() => {
// // //       setCurrentTime(new Date());
// // //     }, 60000);

// // //     return () => clearInterval(timer);
// // //   }, []);

// // //   const getCurrentTime = () => {
// // //     return currentTime.toLocaleTimeString('en-US', {
// // //       hour: '2-digit',
// // //       minute: '2-digit',
// // //       hour12: true
// // //     });
// // //   };

// // //   const getCurrentDate = () => {
// // //     return currentTime.toLocaleDateString('en-US', {
// // //       weekday: 'long',
// // //       year: 'numeric',
// // //       month: 'long',
// // //       day: 'numeric'
// // //     });
// // //   };

// // //   // Mock data for dashboard statistics
// // //   const stats = {
// // //     totalPatients: 1247,
// // //     todayAppointments: 23,
// // //     totalRecords: 892,
// // //     emergencyCases: 3,
// // //     recentPatients: [
// // //       { name: 'Sarah Johnson', email: 'sarah.j@email.com', status: 'Active' },
// // //       { name: 'Michael Chen', email: 'michael.c@email.com', status: 'Discharged' },
// // //       { name: 'Emily Davis', email: 'emily.d@email.com', status: 'Active' },
// // //       { name: 'Robert Wilson', email: 'robert.w@email.com', status: 'Admitted' }
// // //     ],
// // //     upcomingAppointments: [
// // //       { patientName: 'Dr. Anderson', time: '10:30 AM', type: 'Consultation' },
// // //       { patientName: 'Maria Rodriguez', time: '11:15 AM', type: 'Follow-up' },
// // //       { patientName: 'John Smith', time: '2:00 PM', type: 'Surgery' },
// // //       { patientName: 'Lisa Brown', time: '3:30 PM', type: 'Check-up' }
// // //     ]
// // //   };

// // //   const quickActions = [
// // //     { label: 'Add Patient', action: 'patients', icon: Users, color: 'bg-blue-500' },
// // //     { label: 'Schedule Appointment', action: 'appointments', icon: Calendar, color: 'bg-green-500' },
// // //     { label: 'Medical Record', action: 'medical-records', icon: FileText, color: 'bg-purple-500' },
// // //     { label: 'Emergency Alert', action: 'emergency', icon: AlertCircle, color: 'bg-red-500' }
// // //   ];

// // //   return (
// // //     <div className="space-y-6">
// // //       {/* Welcome Header */}
// // //       <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
// // //         <div className="flex items-center justify-between">
// // //           <div>
// // //             <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
// // //             <p className="text-blue-100 mt-1">
// // //               {getCurrentDate()} • {getCurrentTime()}
// // //             </p>
// // //             <p className="text-blue-100 text-sm capitalize">
// // //               {user?.role} {user?.department && `• ${user.department} Department`}
// // //             </p>
// // //           </div>
// // //           <div className="hidden md:block">
// // //             <Heart className="h-16 w-16 text-blue-200" />
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Stats Cards */}
// // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // //         <Card>
// // //           <CardContent className="p-6">
// // //             <div className="flex items-center justify-between">
// // //               <div>
// // //                 <p className="text-sm font-medium text-gray-600">Total Patients</p>
// // //                 <p className="text-2xl font-bold text-gray-900">{stats.totalPatients}</p>
// // //               </div>
// // //               <div className="bg-blue-100 p-3 rounded-full">
// // //                 <Users className="h-6 w-6 text-blue-600" />
// // //               </div>
// // //             </div>
// // //             <div className="flex items-center mt-2">
// // //               <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
// // //               <span className="text-sm text-green-600">+12% from last month</span>
// // //             </div>
// // //           </CardContent>
// // //         </Card>

// // //         <Card>
// // //           <CardContent className="p-6">
// // //             <div className="flex items-center justify-between">
// // //               <div>
// // //                 <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
// // //                 <p className="text-2xl font-bold text-gray-900">{stats.todayAppointments}</p>
// // //               </div>
// // //               <div className="bg-green-100 p-3 rounded-full">
// // //                 <Calendar className="h-6 w-6 text-green-600" />
// // //               </div>
// // //             </div>
// // //             <div className="flex items-center mt-2">
// // //               <Clock className="h-4 w-4 text-gray-500 mr-1" />
// // //               <span className="text-sm text-gray-600">Next appointment in 30 min</span>
// // //             </div>
// // //           </CardContent>
// // //         </Card>

// // //         <Card>
// // //           <CardContent className="p-6">
// // //             <div className="flex items-center justify-between">
// // //               <div>
// // //                 <p className="text-sm font-medium text-gray-600">Medical Records</p>
// // //                 <p className="text-2xl font-bold text-gray-900">{stats.totalRecords}</p>
// // //               </div>
// // //               <div className="bg-purple-100 p-3 rounded-full">
// // //                 <FileText className="h-6 w-6 text-purple-600" />
// // //               </div>
// // //             </div>
// // //             <div className="flex items-center mt-2">
// // //               <Activity className="h-4 w-4 text-blue-500 mr-1" />
// // //               <span className="text-sm text-blue-600">5 updated today</span>
// // //             </div>
// // //           </CardContent>
// // //         </Card>

// // //         <Card>
// // //           <CardContent className="p-6">
// // //             <div className="flex items-center justify-between">
// // //               <div>
// // //                 <p className="text-sm font-medium text-gray-600">Emergency Cases</p>
// // //                 <p className="text-2xl font-bold text-gray-900">{stats.emergencyCases}</p>
// // //               </div>
// // //               <div className="bg-red-100 p-3 rounded-full">
// // //                 <AlertCircle className="h-6 w-6 text-red-600" />
// // //               </div>
// // //             </div>
// // //             <div className="flex items-center mt-2">
// // //               <Badge variant="destructive" className="text-xs">Active</Badge>
// // //             </div>
// // //           </CardContent>
// // //         </Card>
// // //       </div>

// // //       {/* Quick Actions */}
// // //       <Card>
// // //         <CardHeader>
// // //           <CardTitle>Quick Actions</CardTitle>
// // //         </CardHeader>
// // //         <CardContent>
// // //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// // //             {quickActions.map((action, index) => {
// // //               const IconComponent = action.icon;
// // //               return (
// // //                 <Button
// // //                   key={index}
// // //                   variant="outline"
// // //                   className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-gray-50"
// // //                 >
// // //                   <div className={`${action.color} p-2 rounded-full`}>
// // //                     <IconComponent className="h-4 w-4 text-white" />
// // //                   </div>
// // //                   <span className="text-sm">{action.label}</span>
// // //                 </Button>
// // //               );
// // //             })}
// // //           </div>
// // //         </CardContent>
// // //       </Card>

// // //       {/* Recent Activity */}
// // //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //         <Card>
// // //           <CardHeader>
// // //             <CardTitle>Recent Patients</CardTitle>
// // //           </CardHeader>
// // //           <CardContent>
// // //             <div className="space-y-4">
// // //               {stats.recentPatients.map((patient, index) => (
// // //                 <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
// // //                   <div className="flex items-center gap-3">
// // //                     <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
// // //                       <Users className="h-5 w-5 text-blue-600" />
// // //                     </div>
// // //                     <div>
// // //                       <p className="font-medium">{patient.name}</p>
// // //                       <p className="text-sm text-gray-600">{patient.email}</p>
// // //                     </div>
// // //                   </div>
// // //                   <Badge variant="outline">{patient.status}</Badge>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </CardContent>
// // //         </Card>

// // //         <Card>
// // //           <CardHeader>
// // //             <CardTitle>Upcoming Appointments</CardTitle>
// // //           </CardHeader>
// // //           <CardContent>
// // //             <div className="space-y-4">
// // //               {stats.upcomingAppointments.map((appointment, index) => (
// // //                 <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
// // //                   <div className="flex items-center gap-3">
// // //                     <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
// // //                       <Calendar className="h-5 w-5 text-green-600" />
// // //                     </div>
// // //                     <div>
// // //                       <p className="font-medium">{appointment.patientName}</p>
// // //                       <p className="text-sm text-gray-600">{appointment.time}</p>
// // //                     </div>
// // //                   </div>
// // //                   <Badge variant="outline">{appointment.type}</Badge>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </CardContent>
// // //         </Card>
// // //       </div>

// // //       {/* Hospital Status */}
// // //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //         <Card>
// // //           <CardContent className="p-6">
// // //             <div className="flex items-center justify-between">
// // //               <div>
// // //                 <p className="text-sm font-medium text-gray-600">Available Beds</p>
// // //                 <p className="text-2xl font-bold text-gray-900">24</p>
// // //               </div>
// // //               <Bed className="h-8 w-8 text-blue-600" />
// // //             </div>
// // //             <div className="mt-2">
// // //               <div className="bg-gray-200 rounded-full h-2">
// // //                 <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
// // //               </div>
// // //               <p className="text-xs text-gray-600 mt-1">60% occupancy</p>
// // //             </div>
// // //           </CardContent>
// // //         </Card>

// // //         <Card>
// // //           <CardContent className="p-6">
// // //             <div className="flex items-center justify-between">
// // //               <div>
// // //                 <p className="text-sm font-medium text-gray-600">Staff on Duty</p>
// // //                 <p className="text-2xl font-bold text-gray-900">45</p>
// // //               </div>
// // //               <Stethoscope className="h-8 w-8 text-green-600" />
// // //             </div>
// // //             <div className="flex items-center mt-2">
// // //               <div className="flex gap-1">
// // //                 <Badge variant="outline" className="text-xs">15 Doctors</Badge>
// // //                 <Badge variant="outline" className="text-xs">30 Nurses</Badge>
// // //               </div>
// // //             </div>
// // //           </CardContent>
// // //         </Card>

// // //         <Card>
// // //           <CardContent className="p-6">
// // //             <div className="flex items-center justify-between">
// // //               <div>
// // //                 <p className="text-sm font-medium text-gray-600">System Status</p>
// // //                 <p className="text-lg font-bold text-green-600">All Systems Operational</p>
// // //               </div>
// // //               <Activity className="h-8 w-8 text-green-600" />
// // //             </div>
// // //             <div className="flex items-center mt-2">
// // //               <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
// // //               <span className="text-xs text-gray-600">Last updated: just now</span>
// // //             </div>
// // //           </CardContent>
// // //         </Card>
// // //       </div>
// // //     </div>
// // //   );
// // // }


































// // import React, { useState, useEffect } from 'react';
// // import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
// // import { Button } from './ui/button';
// // import { Badge } from './ui/badge';
// // import { useAuth } from '../context/AuthContext';
// // import {
// //   Users,
// //   Calendar,
// //   FileText,
// //   Activity,
// //   TrendingUp,
// //   Clock,
// //   AlertCircle,
// //   Heart,
// //   Stethoscope,
// //   Bed
// // } from 'lucide-react';
// // import axios from 'axios';

// // export function DashboardOverview() {
// //   const { user } = useAuth();
// //   const [currentTime, setCurrentTime] = useState(new Date());
// //   const [patients, setPatients] = useState([]);
// //   const [loadingPatients, setLoadingPatients] = useState(true);

// //   // Update time every minute
// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setCurrentTime(new Date());
// //     }, 60000);
// //     return () => clearInterval(timer);
// //   }, []);

// //   // Fetch patients from database
// //   useEffect(() => {
// //     const fetchPatients = async () => {
// //       try {
// //         setLoadingPatients(true);
// //         const res = await axios.get('http://localhost:5001/api/patients'); 
// //         setPatients(res.data);
// //       } catch (err) {
// //         console.error('Failed to fetch patients', err);
// //       } finally {
// //         setLoadingPatients(false);
// //       }
// //     };
// //     fetchPatients();
// //   }, []);

// //   const getCurrentTime = () =>
// //     currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
// //   const getCurrentDate = () =>
// //     currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

// //   // Keep original dummy data for everything else
// //   const stats = {
// //     todayAppointments: 23,
// //     totalRecords: 892,
// //     emergencyCases: 3,
// //     recentPatients: [], // Will be replaced dynamically
// //     upcomingAppointments: [
// //       { patientName: 'Dr. Anderson', time: '10:30 AM', type: 'Consultation' },
// //       { patientName: 'Maria Rodriguez', time: '11:15 AM', type: 'Follow-up' },
// //       { patientName: 'John Smith', time: '2:00 PM', type: 'Surgery' },
// //       { patientName: 'Lisa Brown', time: '3:30 PM', type: 'Check-up' }
// //     ]
// //   };

// //   const quickActions = [
// //     { label: 'Add Patient', action: 'patients', icon: Users, color: 'bg-blue-500' },
// //     { label: 'Schedule Appointment', action: 'appointments', icon: Calendar, color: 'bg-green-500' },
// //     { label: 'Medical Record', action: 'medical-records', icon: FileText, color: 'bg-purple-500' },
// //     { label: 'Emergency Alert', action: 'emergency', icon: AlertCircle, color: 'bg-red-500' }
// //   ];

// //   return (
// //     <div className="space-y-6">
// //       {/* Welcome Header */}
// //       <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
// //         <div className="flex items-center justify-between">
// //           <div>
// //             <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
// //             <p className="text-blue-100 mt-1">{getCurrentDate()} • {getCurrentTime()}</p>
// //             <p className="text-blue-100 text-sm capitalize">
// //               {user?.role} {user?.department && `• ${user.department} Department`}
// //             </p>
// //           </div>
// //           <div className="hidden md:block">
// //             <Heart className="h-16 w-16 text-blue-200" />
// //           </div>
// //         </div>
// //       </div>

// //       {/* Stats Cards */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //         {/* Total Patients */}
// //         <Card>
// //           <CardContent className="p-6">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-sm font-medium text-gray-600">Total Patients</p>
// //                 <p className="text-2xl font-bold text-gray-900">
// //                   {loadingPatients ? '...' : patients.length}
// //                 </p>
// //               </div>
// //               <div className="bg-blue-100 p-3 rounded-full">
// //                 <Users className="h-6 w-6 text-blue-600" />
// //               </div>
// //             </div>
// //             <div className="flex items-center mt-2">
// //               <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
// //               <span className="text-sm text-green-600">+12% from last month</span>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         {/* Today's Appointments */}
// //         <Card>
// //           <CardContent className="p-6">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
// //                 <p className="text-2xl font-bold text-gray-900">{stats.todayAppointments}</p>
// //               </div>
// //               <div className="bg-green-100 p-3 rounded-full">
// //                 <Calendar className="h-6 w-6 text-green-600" />
// //               </div>
// //             </div>
// //             <div className="flex items-center mt-2">
// //               <Clock className="h-4 w-4 text-gray-500 mr-1" />
// //               <span className="text-sm text-gray-600">Next appointment in 30 min</span>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         {/* Medical Records */}
// //         <Card>
// //           <CardContent className="p-6">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-sm font-medium text-gray-600">Medical Records</p>
// //                 <p className="text-2xl font-bold text-gray-900">{stats.totalRecords}</p>
// //               </div>
// //               <div className="bg-purple-100 p-3 rounded-full">
// //                 <FileText className="h-6 w-6 text-purple-600" />
// //               </div>
// //             </div>
// //             <div className="flex items-center mt-2">
// //               <Activity className="h-4 w-4 text-blue-500 mr-1" />
// //               <span className="text-sm text-blue-600">5 updated today</span>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         {/* Emergency Cases */}
// //         <Card>
// //           <CardContent className="p-6">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-sm font-medium text-gray-600">Emergency Cases</p>
// //                 <p className="text-2xl font-bold text-gray-900">{stats.emergencyCases}</p>
// //               </div>
// //               <div className="bg-red-100 p-3 rounded-full">
// //                 <AlertCircle className="h-6 w-6 text-red-600" />
// //               </div>
// //             </div>
// //             <div className="flex items-center mt-2">
// //               <Badge variant="destructive" className="text-xs">Active</Badge>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       </div>

// //       {/* Quick Actions */}
// //       <Card>
// //         <CardHeader>
// //           <CardTitle>Quick Actions</CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //             {quickActions.map((action, index) => {
// //               const IconComponent = action.icon;
// //               return (
// //                 <Button
// //                   key={index}
// //                   variant="outline"
// //                   className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-gray-50"
// //                 >
// //                   <div className={`${action.color} p-2 rounded-full`}>
// //                     <IconComponent className="h-4 w-4 text-white" />
// //                   </div>
// //                   <span className="text-sm">{action.label}</span>
// //                 </Button>
// //               );
// //             })}
// //           </div>
// //         </CardContent>
// //       </Card>

// //       {/* Recent Patients */}
// //       <Card>
// //         <CardHeader>
// //           <CardTitle>Recent Patients</CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           <div className="space-y-4">
// //             {loadingPatients
// //               ? <p>Loading...</p>
// //               : patients.slice(0, 5).map((patient, index) => (
// //                   <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
// //                     <div className="flex items-center gap-3">
// //                       <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
// //                         <Users className="h-5 w-5 text-blue-600" />
// //                       </div>
// //                       <div>
// //                         <p className="font-medium">{patient.name}</p>
// //                         <p className="text-sm text-gray-600">{patient.email}</p>
// //                       </div>
// //                     </div>
// //                     <Badge variant="outline">{patient.status}</Badge>
// //                   </div>
// //               ))
// //             }
// //           </div>
// //         </CardContent>
// //       </Card>
// //             <Card>
// //           <CardHeader>
// //             <CardTitle>Upcoming Appointments</CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="space-y-4">
// //               {stats.upcomingAppointments.map((appointment, index) => (
// //                 <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
// //                   <div className="flex items-center gap-3">
// //                     <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
// //                       <Calendar className="h-5 w-5 text-green-600" />
// //                     </div>
// //                     <div>
// //                       <p className="font-medium">{appointment.patientName}</p>
// //                       <p className="text-sm text-gray-600">{appointment.time}</p>
// //                     </div>
// //                   </div>
// //                   <Badge variant="outline">{appointment.type}</Badge>
// //                 </div>
// //               ))}
// //             </div>
// //           </CardContent>
// //         </Card>
// //       {/* </div> */}

// //       {/* Hospital Status */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //         <Card>
// //           <CardContent className="p-6">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-sm font-medium text-gray-600">Available Beds</p>
// //                 <p className="text-2xl font-bold text-gray-900">24</p>
// //               </div>
// //               <Bed className="h-8 w-8 text-blue-600" />
// //             </div>
// //             <div className="mt-2">
// //               <div className="bg-gray-200 rounded-full h-2">
// //                 <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
// //               </div>
// //               <p className="text-xs text-gray-600 mt-1">60% occupancy</p>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         <Card>
// //           <CardContent className="p-6">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-sm font-medium text-gray-600">Staff on Duty</p>
// //                 <p className="text-2xl font-bold text-gray-900">45</p>
// //               </div>
// //               <Stethoscope className="h-8 w-8 text-green-600" />
// //             </div>
// //             <div className="flex items-center mt-2">
// //               <div className="flex gap-1">
// //                 <Badge variant="outline" className="text-xs">15 Doctors</Badge>
// //                 <Badge variant="outline" className="text-xs">30 Nurses</Badge>
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         <Card>
// //           <CardContent className="p-6">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-sm font-medium text-gray-600">System Status</p>
// //                 <p className="text-lg font-bold text-green-600">All Systems Operational</p>
// //               </div>
// //               <Activity className="h-8 w-8 text-green-600" />
// //             </div>
// //             <div className="flex items-center mt-2">
// //               <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
// //               <span className="text-xs text-gray-600">Last updated: just now</span>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }




// import React, { useState, useEffect } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
// import { Button } from './ui/button';
// import { Badge } from './ui/badge';
// import { useAuth } from '../context/AuthContext';
// import {
//   Users,
//   Calendar,
//   FileText,
//   Activity,
//   TrendingUp,
//   Clock,
//   AlertCircle,
//   Heart,
//   Stethoscope,
//   Bed
// } from 'lucide-react';
// import axios from 'axios';

// export function DashboardOverview() {
//   const { user } = useAuth();
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [patients, setPatients] = useState([]);
//   // const [availableBeds, setAvailableBeds] = useState(null);
//   // const [loadingPatients, setLoadingPatients] = useState(true);
//   // const [loadingBeds, setLoadingBeds] = useState(true);
//   const [availableBeds, setAvailableBeds] = useState(0);
// const [totalBeds, setTotalBeds] = useState(0);
// const [loadingBeds, setLoadingBeds] = useState(true);




//   // Update time every minute
//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 60000);
//     return () => clearInterval(timer);
//   }, []);

//   // Fetch patients
//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         setLoadingPatients(true);
//         const res = await axios.get('http://localhost:5001/api/patients');
//         setPatients(res.data);
//       } catch (err) {
//         console.error('Failed to fetch patients', err);
//       } finally {
//         setLoadingPatients(false);
//       }
//     };
//     fetchPatients();
//   }, []);

//   // // Fetch available beds
//   // useEffect(() => {
//   //   const fetchBeds = async () => {
//   //     try {
//   //       setLoadingBeds(true);
//   //       const res = await axios.get('http://localhost:5001/api/beds'); // API returns { availableBeds: number }
//   //       setAvailableBeds(res.data.availableBeds);
//   //     } catch (err) {
//   //       console.error('Failed to fetch available beds', err);
//   //     } finally {
//   //       setLoadingBeds(false);
//   //     }
//   //   };
//   //   fetchBeds();
//   // }, []);
  
// // useEffect(() => {
// //   const fetchBeds = async () => {
// //     try {
// //       setLoadingBeds(true);
// //       const res = await axios.get('http://localhost:5001/api/beds');

// //       // Assuming API returns something like: { totalBeds: 40, availableBeds: 24 }
// //       const { totalBeds, availableBeds } = res.data;

// //       setTotalBeds(totalBeds ?? 0);
// //       setAvailableBeds(availableBeds ?? 0);
// //     } catch (err) {
// //       console.error('Failed to fetch bed data', err);
// //       setTotalBeds(0);
// //       setAvailableBeds(0);
// //     } finally {
// //       setLoadingBeds(false);
// //     }
// //   };

// //   fetchBeds();
// // }, []);





// useEffect(() => {
//   const fetchBeds = async () => {
//     try {
//       const res = await axios.get('http://localhost:5001/api/beds');
//       setTotalBeds(res.data.totalBeds);
//       setAvailableBeds(res.data.availableBeds);
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   fetchBeds();
// }, []);


//   const getCurrentTime = () =>
//     currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

//   const getCurrentDate = () =>
//     currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

//   const stats = {
//     todayAppointments: 23,
//     totalRecords: 892,
//     emergencyCases: 3,
//     upcomingAppointments: [
//       { patientName: 'Dr. Anderson', time: '10:30 AM', type: 'Consultation' },
//       { patientName: 'Maria Rodriguez', time: '11:15 AM', type: 'Follow-up' },
//       { patientName: 'John Smith', time: '2:00 PM', type: 'Surgery' },
//       { patientName: 'Lisa Brown', time: '3:30 PM', type: 'Check-up' }
//     ]
//   };

//   const quickActions = [
//     { label: 'Add Patient', action: 'patients', icon: Users, color: 'bg-blue-500' },
//     { label: 'Schedule Appointment', action: 'appointments', icon: Calendar, color: 'bg-green-500' },
//     { label: 'Medical Record', action: 'medical-records', icon: FileText, color: 'bg-purple-500' },
//     { label: 'Emergency Alert', action: 'emergency', icon: AlertCircle, color: 'bg-red-500' }
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Welcome Header */}
//       <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
//             <p className="text-blue-100 mt-1">{getCurrentDate()} • {getCurrentTime()}</p>
//             <p className="text-blue-100 text-sm capitalize">
//               {user?.role} {user?.department && `• ${user.department} Department`}
//             </p>
//           </div>
//           <div className="hidden md:block">
//             <Heart className="h-16 w-16 text-blue-200" />
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {/* Total Patients */}
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Patients</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {loadingPatients ? '...' : patients.length}
//                 </p>
//               </div>
//               <div className="bg-blue-100 p-3 rounded-full">
//                 <Users className="h-6 w-6 text-blue-600" />
//               </div>
//             </div>
//             <div className="flex items-center mt-2">
//               <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
//               <span className="text-sm text-green-600">+12% from last month</span>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Today's Appointments */}
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
//                 <p className="text-2xl font-bold text-gray-900">{stats.todayAppointments}</p>
//               </div>
//               <div className="bg-green-100 p-3 rounded-full">
//                 <Calendar className="h-6 w-6 text-green-600" />
//               </div>
//             </div>
//             <div className="flex items-center mt-2">
//               <Clock className="h-4 w-4 text-gray-500 mr-1" />
//               <span className="text-sm text-gray-600">Next appointment in 30 min</span>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Medical Records */}
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Medical Records</p>
//                 <p className="text-2xl font-bold text-gray-900">{stats.totalRecords}</p>
//               </div>
//               <div className="bg-purple-100 p-3 rounded-full">
//                 <FileText className="h-6 w-6 text-purple-600" />
//               </div>
//             </div>
//             <div className="flex items-center mt-2">
//               <Activity className="h-4 w-4 text-blue-500 mr-1" />
//               <span className="text-sm text-blue-600">5 updated today</span>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Emergency Cases */}
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Emergency Cases</p>
//                 <p className="text-2xl font-bold text-gray-900">{stats.emergencyCases}</p>
//               </div>
//               <div className="bg-red-100 p-3 rounded-full">
//                 <AlertCircle className="h-6 w-6 text-red-600" />
//               </div>
//             </div>
//             <div className="flex items-center mt-2">
//               <Badge variant="destructive" className="text-xs">Active</Badge>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Quick Actions */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Quick Actions</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {quickActions.map((action, index) => {
//               const IconComponent = action.icon;
//               return (
//                 <Button
//                   key={index}
//                   variant="outline"
//                   className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-gray-50"
//                 >
//                   <div className={`${action.color} p-2 rounded-full`}>
//                     <IconComponent className="h-4 w-4 text-white" />
//                   </div>
//                   <span className="text-sm">{action.label}</span>
//                 </Button>
//               );
//             })}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Recent Patients */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Patients</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {loadingPatients
//               ? <p>Loading...</p>
//               : patients.slice(0, 5).map((patient, index) => (
//                   <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                         <Users className="h-5 w-5 text-blue-600" />
//                       </div>
//                       <div>
//                         <p className="font-medium">{patient.name}</p>
//                         <p className="text-sm text-gray-600">{patient.email}</p>
//                       </div>
//                     </div>
//                     <Badge variant="outline">{patient.status}</Badge>
//                   </div>
//                 ))
//             }
//           </div>
//         </CardContent>
//       </Card>

//       {/* Upcoming Appointments */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Upcoming Appointments</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {stats.upcomingAppointments.map((appointment, index) => (
//               <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                     <Calendar className="h-5 w-5 text-green-600" />
//                   </div>
//                   <div>
//                     <p className="font-medium">{appointment.patientName}</p>
//                     <p className="text-sm text-gray-600">{appointment.time}</p>
//                   </div>
//                 </div>
//                 <Badge variant="outline">{appointment.type}</Badge>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Hospital Status */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Available Beds */}
//         {/* <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Available Beds</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {loadingBeds ? '...' : availableBeds}
//                 </p>
//               </div>
//               <Bed className="h-8 w-8 text-blue-600" />
//             </div>
//             <div className="mt-2">
//               <div className="bg-gray-200 rounded-full h-2">
//                 <div
//                   className="bg-blue-600 h-2 rounded-full"
//                   style={{ width: loadingBeds ? '0%' : `${(availableBeds / 40) * 100}%` }}
//                 ></div>
//               </div>
//               <p className="text-xs text-gray-600 mt-1">
//                 {loadingBeds ? '...' : `${Math.round((availableBeds / 40) * 100)}% occupancy`}
//               </p>
//             </div>
//           </CardContent>
//         </Card> */}

//         <Card>
//   <CardContent className="p-6">
//     <div className="flex items-center justify-between">
//       <div>
//         <p className="text-sm font-medium text-gray-600">Available Beds</p>
//         <p className="text-2xl font-bold text-gray-900">
//           {loadingBeds ? '...' : availableBeds}
//         </p>
//       </div>
//       <Bed className="h-8 w-8 text-blue-600" />
//     </div>
//     <div className="mt-2">
//       <div className="bg-gray-200 rounded-full h-2">
//         <div
//           className="bg-blue-600 h-2 rounded-full"
//           style={{
//             width: loadingBeds || totalBeds === 0 ? '0%' : `${((totalBeds - availableBeds) / totalBeds) * 100}%`
//           }}
//         ></div>
//       </div>
//       <p className="text-xs text-gray-600 mt-1">
//         {loadingBeds || totalBeds === 0
//           ? '...'
//           : `${Math.round(((totalBeds - availableBeds) / totalBeds) * 100)}% occupancy`}
//       </p>
//     </div>
//   </CardContent>
// </Card>


//         {/* Staff on Duty (dummy) */}
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Staff on Duty</p>
//                 <p className="text-2xl font-bold text-gray-900">45</p>
//               </div>
//               <Stethoscope className="h-8 w-8 text-green-600" />
//             </div>
//             <div className="flex items-center mt-2">
//               <div className="flex gap-1">
//                 <Badge variant="outline" className="text-xs">15 Doctors</Badge>
//                 <Badge variant="outline" className="text-xs">30 Nurses</Badge>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* System Status (dummy) */}
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">System Status</p>
//                 <p className="text-lg font-bold text-green-600">All Systems Operational</p>
//               </div>
//               <Activity className="h-8 w-8 text-green-600" />
//             </div>
//             <div className="flex items-center mt-2">
//               <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
//               <span className="text-xs text-gray-600">Last updated: just now</span>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }













import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useAuth } from '../context/AuthContext';
import {
  Users,
  Calendar,
  FileText,
  Activity,
  TrendingUp,
  Clock,
  AlertCircle,
  Heart,
  Stethoscope,
  Bed
} from 'lucide-react';
import axios from 'axios';

export function DashboardOverview() {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(true);

  const [availableBeds, setAvailableBeds] = useState(0);
  const [totalBeds, setTotalBeds] = useState(0);
  const [loadingBeds, setLoadingBeds] = useState(true);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoadingPatients(true);
        const res = await axios.get('http://localhost:5001/api/patients');
        setPatients(res.data);
      } catch (err) {
        console.error('Failed to fetch patients', err);
      } finally {
        setLoadingPatients(false);
      }
    };
    fetchPatients();
  }, []);

  // Fetch bed info
  // useEffect(() => {
  //   const fetchBeds = async () => {
  //     try {
  //       setLoadingBeds(true);
  //       const res = await axios.get('http://localhost:5001/api/beds'); // API returns { totalBeds: number, availableBeds: number }
  //       setTotalBeds(res.data.totalBeds ?? 0);
  //       setAvailableBeds(res.data.availableBeds ?? 0);
  //     } catch (err) {
  //       console.error('Failed to fetch beds', err);
  //       setTotalBeds(0);
  //       setAvailableBeds(0);
  //     } finally {
  //       setLoadingBeds(false);
  //     }
  //   };
  //   fetchBeds();
  // }, []);

//   useEffect(() => {
//   const fetchBeds = async () => {
//     try {
//       setLoadingBeds(true);
//       const res = await axios.get('http://localhost:5001/api/beds');
//       console.log('Beds API response:', res.data); // <-- check what the API returns
//       setTotalBeds(res.data.totalBeds ?? 0);
//       setAvailableBeds(res.data.availableBeds ?? 0);
//     } catch (err) {
//       console.error('Failed to fetch beds', err);
//       setTotalBeds(0);
//       setAvailableBeds(0);
//     } finally {
//       setLoadingBeds(false);
//     }
//   };
//   fetchBeds();
// }, []);


useEffect(() => {
  const fetchBeds = async () => {
    try {
      setLoadingBeds(true);
      const res = await axios.get('http://localhost:5001/api/beds');
      const bedsArray = res.data;

      const total = bedsArray.length;
      const available = bedsArray.filter(bed => !bed.occupied).length;

      setTotalBeds(total);
      setAvailableBeds(available);
    } catch (err) {
      console.error('Failed to fetch bed data', err);
      setTotalBeds(0);
      setAvailableBeds(0);
    } finally {
      setLoadingBeds(false);
    }
  };

  fetchBeds();
}, []);



  const getCurrentTime = () =>
    currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  const getCurrentDate = () =>
    currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const stats = {
    todayAppointments: 23,
    totalRecords: 892,
    emergencyCases: 3,
    upcomingAppointments: [
      { patientName: 'Dr. Anderson', time: '10:30 AM', type: 'Consultation' },
      { patientName: 'Maria Rodriguez', time: '11:15 AM', type: 'Follow-up' },
      { patientName: 'John Smith', time: '2:00 PM', type: 'Surgery' },
      { patientName: 'Lisa Brown', time: '3:30 PM', type: 'Check-up' }
    ]
  };

  const quickActions = [
    { label: 'Add Patient', action: 'patients', icon: Users, color: 'bg-blue-500' },
    { label: 'Schedule Appointment', action: 'appointments', icon: Calendar, color: 'bg-green-500' },
    { label: 'Medical Record', action: 'medical-records', icon: FileText, color: 'bg-purple-500' },
    { label: 'Emergency Alert', action: 'emergency', icon: AlertCircle, color: 'bg-red-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="text-blue-100 mt-1">{getCurrentDate()} • {getCurrentTime()}</p>
            <p className="text-blue-100 text-sm capitalize">
              {user?.role} {user?.department && `• ${user.department} Department`}
            </p>
          </div>
          <div className="hidden md:block">
            <Heart className="h-16 w-16 text-blue-200" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Patients */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loadingPatients ? '...' : patients.length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Appointments */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.todayAppointments}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Records */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Medical Records</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalRecords}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Cases */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Emergency Cases</p>
                <p className="text-2xl font-bold text-gray-900">{stats.emergencyCases}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Button key={index} variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-gray-50">
                  <div className={`${action.color} p-2 rounded-full`}>
                    <IconComponent className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm">{action.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Patients */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loadingPatients
              ? <p>Loading...</p>
              : patients.slice(0, 5).map((patient, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-gray-600">{patient.email}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{patient.status}</Badge>
                  </div>
                ))
            }
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.upcomingAppointments.map((appointment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">{appointment.patientName}</p>
                    <p className="text-sm text-gray-600">{appointment.time}</p>
                  </div>
                </div>
                <Badge variant="outline">{appointment.type}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hospital Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Available Beds */}
        {/* <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Beds</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loadingBeds ? '...' : availableBeds}
                </p>
              </div>
              <Bed className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: loadingBeds || totalBeds === 0
                      ? '0%'
                      : `${Math.round(((totalBeds - availableBeds) / totalBeds) * 100)}%`
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {loadingBeds || totalBeds === 0
                  ? '...'
                  : `${Math.round(((totalBeds - availableBeds) / totalBeds) * 100)}% occupancy`}
              </p>
            </div>
          </CardContent>
        </Card> */}

        {/* Available Beds */}
<Card>
  <CardContent className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">Available Beds</p>
        <p className="text-2xl font-bold text-gray-900">
          {loadingBeds ? '...' : availableBeds}
        </p>
      </div>
      <Bed className="h-8 w-8 text-blue-600" />
    </div>
    <div className="mt-2">
      <div className="bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{
            width: loadingBeds || totalBeds === 0 ? '0%' : `${((totalBeds - availableBeds) / totalBeds) * 100}%`
          }}
        ></div>
      </div>
      <p className="text-xs text-gray-600 mt-1">
        {loadingBeds || totalBeds === 0
          ? '...'
          : `${Math.round(((totalBeds - availableBeds) / totalBeds) * 100)}% occupancy`}
      </p>
    </div>
  </CardContent>
</Card>


        {/* Staff on Duty */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Staff on Duty</p>
                <p className="text-2xl font-bold text-gray-900">45</p>
              </div>
              <Stethoscope className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Status</p>
                <p className="text-lg font-bold text-green-600">All Systems Operational</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
