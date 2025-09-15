

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '@radix-ui/react-label';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Calendar,
  AlertCircle,
  UserPlus,
  Shield,
  Building,
  Eye
} from 'lucide-react';

export function UserRegistrationApproval() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [processingId, setProcessingId] = useState(null);

  // Backend API URL
  const API_URL = 'http://localhost:5001/api';

  useEffect(() => {
    fetchPendingRegistrations();
        const interval = setInterval(fetchPendingRegistrations, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchPendingRegistrations = async () => {
    try {
        setLoading(true);
        const res = await fetch(`${API_URL}/registrations/pending`);
        const data = await res.json();
        setPendingRequests(data); // <-- directly use the array returned by backend
    } catch (error) {
        console.error('Error fetching pending registrations:', error);
        toast.error('Failed to load pending registrations');
    } finally {
        setLoading(false);
    }
    };

    const handleApprove = async (requestId) => {
    setProcessingId(requestId);
    try {
        const res = await fetch(`${API_URL}/registrations/${requestId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message);

        toast.success('Registration approved successfully', {
        description: 'The user can now login to the system'
        });
        setPendingRequests(prev => prev.filter(req => req.id !== requestId));
        setShowDetailsDialog(false);
    } catch (error) {
        console.error('Error approving registration:', error);
        toast.error('Failed to approve registration', {
        description: error.message || 'Please try again'
        });
    } finally {
        setProcessingId(null);
    }
    };



    const handleReject = async () => {
    if (!selectedRequest || !rejectionReason.trim()) {
        toast.error('Please provide a rejection reason');
        return;
    }

    setProcessingId(selectedRequest.id);
    try {
        const res = await fetch(`${API_URL}/registrations/${selectedRequest.id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: rejectionReason })
        });

        const data = await res.json();
        if (!data.success) throw new Error(data.message);

        toast.success('Registration rejected', {
        description: 'The user has been notified of the rejection'
        });
        setPendingRequests(prev => prev.filter(req => req.id !== selectedRequest.id));
        setShowRejectDialog(false);
        setShowDetailsDialog(false);
        setRejectionReason('');
    } catch (error) {
        console.error('Error rejecting registration:', error);
        toast.error('Failed to reject registration', {
        description: error.message || 'Please try again'
        });
    } finally {
        setProcessingId(null);
    }
    };



  const getRoleBadgeColor = (role) => {
    switch (role.toLowerCase()) {
      case 'doctor': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'nurse': return 'bg-green-100 text-green-800 border-green-200';
      case 'staff': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'patient': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleIcon = (role) => {
    switch (role.toLowerCase()) {
      case 'doctor': return <Shield className="h-4 w-4" />;
      case 'nurse': return <User className="h-4 w-4" />;
      case 'staff': return <Users className="h-4 w-4" />;
      case 'admin': return <Shield className="h-4 w-4" />;
      case 'patient': return <User className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getPriorityLevel = (role) => {
    switch (role.toLowerCase()) {
      case 'doctor': return { level: 'High', color: 'text-red-600' };
      case 'nurse': return { level: 'High', color: 'text-orange-600' };
      case 'admin': return { level: 'Critical', color: 'text-red-800' };
      case 'staff': return { level: 'Medium', color: 'text-yellow-600' };
      case 'patient': return { level: 'Low', color: 'text-green-600' };
      default: return { level: 'Low', color: 'text-gray-600' };
    }
  };

  return (
    <div className="space-y-6">
        {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>User Registration Approval</h1>
          <p className="text-gray-600 mt-1">Review and approve new user registration requests</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={fetchPendingRegistrations}
            disabled={loading}
          >
            <Clock className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Badge variant="outline" className="px-3 py-1">
            <AlertCircle className="h-4 w-4 mr-1" />
            {pendingRequests.length} Pending
          </Badge>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                <p className="font-bold text-yellow-600">{pendingRequests.length}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Doctor Requests</p>
                <p className="font-bold text-blue-600">
                  {pendingRequests.filter(req => req.role === 'doctor').length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Nurse Requests</p>
                <p className="font-bold text-green-600">
                  {pendingRequests.filter(req => req.role === 'nurse').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <User className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Staff Requests</p>
                <p className="font-bold text-purple-600">
                  {pendingRequests.filter(req => req.role === 'staff').length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Pending Registration Requests
            <Badge variant="outline" className="ml-auto">
              {pendingRequests.length} requests
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse flex items-center p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : pendingRequests.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">All caught up!</h3>
              <p className="text-gray-600">No pending registration requests at the moment.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map((request) => {
                const priority = getPriorityLevel(request.role);
                return (
                  <div 
                    key={request.id} 
                    className="border-2 rounded-lg p-6 hover:shadow-lg transition-all bg-white border-yellow-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
                          {getRoleIcon(request.role)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{request.name}</h3>
                            <Badge className={`border ${getRoleBadgeColor(request.role)}`}>
                              {getRoleIcon(request.role)}
                              <span className="ml-1 capitalize">{request.role}</span>
                            </Badge>
                            <Badge variant="outline" className={priority.color}>
                              {priority.level} Priority
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              <span>{request.email}</span>
                            </div>
                            {request.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>{request.phone}</span>
                              </div>
                            )}
                            {request.department && (
                              <div className="flex items-center gap-2">
                                <Building className="h-4 w-4" />
                                <span className="capitalize">{request.department}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>Requested {new Date(request.requestedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          {(request.qualifications || request.experience) && (
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              {request.qualifications && (
                                <div className="flex items-start gap-2">
                                  <GraduationCap className="h-4 w-4 mt-0.5 text-gray-500" />
                                  <div>
                                    <span className="font-medium text-gray-700">Qualifications:</span>
                                    <p className="text-gray-600">{request.qualifications}</p>
                                  </div>
                                </div>
                              )}
                              {request.experience && (
                                <div className="flex items-start gap-2">
                                  <Briefcase className="h-4 w-4 mt-0.5 text-gray-500" />
                                  <div>
                                    <span className="font-medium text-gray-700">Experience:</span>
                                    <p className="text-gray-600">{request.experience}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowDetailsDialog(true);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                        <Button 
                          className="bg-green-600 hover:bg-green-700"
                          size="sm"
                          onClick={() => handleApprove(request.id)}
                          disabled={processingId === request.id}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          {processingId === request.id ? 'Approving...' : 'Approve'}
                        </Button>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowRejectDialog(true);
                          }}
                          disabled={processingId === request.id}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Request Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Registration Request Details</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="font-semibold">Personal Information</Label>
                  <div className="space-y-3 mt-2">
                    <div>
                      <Label className="text-sm text-gray-600">Full Name</Label>
                      <p className="font-medium">{selectedRequest.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Email Address</Label>
                      <p className="font-medium">{selectedRequest.email}</p>
                    </div>
                    {selectedRequest.phone && (
                      <div>
                        <Label className="text-sm text-gray-600">Phone Number</Label>
                        <p className="font-medium">{selectedRequest.phone}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label className="font-semibold">Professional Information</Label>
                  <div className="space-y-3 mt-2">
                    <div>
                      <Label className="text-sm text-gray-600">Requested Role</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getRoleBadgeColor(selectedRequest.role)}>
                          {getRoleIcon(selectedRequest.role)}
                          <span className="ml-1 capitalize">{selectedRequest.role}</span>
                        </Badge>
                      </div>
                    </div>
                    {selectedRequest.department && (
                      <div>
                        <Label className="text-sm text-gray-600">Department</Label>
                        <p className="font-medium capitalize">{selectedRequest.department}</p>
                      </div>
                    )}
                    <div>
                      <Label className="text-sm text-gray-600">Request Date</Label>
                      <p className="font-medium">{new Date(selectedRequest.requestedAt).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {(selectedRequest.qualifications || selectedRequest.experience) && (
                <div>
                  <Label className="font-semibold">Qualifications & Experience</Label>
                  <div className="space-y-3 mt-2">
                    {selectedRequest.qualifications && (
                      <div>
                        <Label className="text-sm text-gray-600">Qualifications</Label>
                        <p className="font-medium">{selectedRequest.qualifications}</p>
                      </div>
                    )}
                    {selectedRequest.experience && (
                      <div>
                        <Label className="text-sm text-gray-600">Experience</Label>
                        <p className="font-medium">{selectedRequest.experience}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex items-center gap-3">
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleApprove(selectedRequest.id)}
                    disabled={processingId === selectedRequest.id}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {processingId === selectedRequest.id ? 'Approving...' : 'Approve Registration'}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setShowDetailsDialog(false);
                      setShowRejectDialog(true);
                    }}
                    disabled={processingId === selectedRequest.id}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => setShowDetailsDialog(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Registration Request</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reason">Rejection Reason *</Label>
              <Textarea
                id="reason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Please provide a clear reason for rejection..."
                rows={4}
                className="mt-1"
              />
            </div>
            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <Button 
                variant="outline"
                onClick={() => {
                  setShowRejectDialog(false);
                  setRejectionReason('');
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={handleReject}
                disabled={!rejectionReason.trim() || processingId === selectedRequest?.id}
              >
                <XCircle className="h-4 w-4 mr-2" />
                {processingId === selectedRequest?.id ? 'Rejecting...' : 'Reject Request'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
