import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Plus,
  Clock,
  User,
  Calendar as CalendarIcon,
  Edit,
} from "lucide-react";

export function AppointmentScheduler() {
  const [appointments, setAppointments] = useState([]);
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    patientId: "",
    date: "",
    time: "",
    duration: "30",
    type: "",
    notes: "",
  });

  // Simulate fetching appointments with dummy data
  useEffect(() => {
    setTimeout(() => {
      setAppointments([
        {
          id: 1,
          patientName: "John Doe",
          type: "Consultation",
          start: new Date().toISOString(),
          end: new Date(new Date().getTime() + 30 * 60000).toISOString(),
          status: "scheduled",
          notes: "First-time consultation",
        },
        {
          id: 2,
          patientName: "Jane Smith",
          type: "Follow-up",
          start: new Date().toISOString(),
          end: new Date(new Date().getTime() + 45 * 60000).toISOString(),
          status: "completed",
          notes: "Blood pressure checkup",
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const handleCreateAppointment = (e) => {
    e.preventDefault();

    const startDateTime = new Date(
      `${newAppointment.date}T${newAppointment.time}`
    );
    const endDateTime = new Date(
      startDateTime.getTime() + parseInt(newAppointment.duration) * 60000
    );

    const appointmentData = {
      id: appointments.length + 1,
      ...newAppointment,
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
      title: `${newAppointment.patientName} - ${newAppointment.type}`,
      status: "scheduled",
    };

    setAppointments([...appointments, appointmentData]);

    setShowNewAppointment(false);
    setNewAppointment({
      patientName: "",
      patientId: "",
      date: "",
      time: "",
      duration: "30",
      type: "",
      notes: "",
    });
  };

  const updateAppointmentStatus = (appointmentId, status) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, status } : apt
      )
    );
    setSelectedAppointment(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "default";
      case "completed":
        return "secondary";
      case "cancelled":
        return "destructive";
      case "no-show":
        return "outline";
      default:
        return "default";
    }
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString();
  };

  const getFilteredAppointments = () => {
    return appointments.filter((apt) => {
      const aptDate = new Date(apt.start).toISOString().split("T")[0];
      return aptDate === selectedDate;
    });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Appointment Scheduler</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading appointments...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Appointment Scheduler</CardTitle>
              <CardDescription>
                Manage patient appointments and schedule
              </CardDescription>
            </div>
            <Dialog open={showNewAppointment} onOpenChange={setShowNewAppointment}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule New Appointment</DialogTitle>
                  <DialogDescription>
                    Create a new appointment for a patient.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateAppointment} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patientName">Patient Name</Label>
                    <Input
                      id="patientName"
                      value={newAppointment.patientName}
                      onChange={(e) =>
                        setNewAppointment({
                          ...newAppointment,
                          patientName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newAppointment.date}
                        onChange={(e) =>
                          setNewAppointment({
                            ...newAppointment,
                            date: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newAppointment.time}
                        onChange={(e) =>
                          setNewAppointment({
                            ...newAppointment,
                            time: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <Select
                        value={newAppointment.duration}
                        onValueChange={(value) =>
                          setNewAppointment({
                            ...newAppointment,
                            duration: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="90">1.5 hours</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Appointment Type</Label>
                      <Select
                        value={newAppointment.type}
                        onValueChange={(value) =>
                          setNewAppointment({
                            ...newAppointment,
                            type: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consultation">
                            Consultation
                          </SelectItem>
                          <SelectItem value="follow-up">Follow-up</SelectItem>
                          <SelectItem value="checkup">
                            Regular Checkup
                          </SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                          <SelectItem value="surgery">Surgery</SelectItem>
                          <SelectItem value="lab-results">
                            Lab Results
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={newAppointment.notes}
                      onChange={(e) =>
                        setNewAppointment({
                          ...newAppointment,
                          notes: e.target.value,
                        })
                      }
                      placeholder="Additional notes or instructions"
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowNewAppointment(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Schedule Appointment</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Label htmlFor="dateFilter">Filter by Date:</Label>
              <Input
                id="dateFilter"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-auto"
              />
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredAppointments().length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="flex flex-col items-center space-y-2">
                          <CalendarIcon className="h-8 w-8 text-gray-400" />
                          <p className="text-gray-500">
                            No appointments for this date
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    getFilteredAppointments().map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">
                              {appointment.patientName}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {appointment.type}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <Clock className="h-3 w-3 mr-1 text-gray-400" />
                            {formatDateTime(appointment.start)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {Math.round(
                            (new Date(appointment.end).getTime() -
                              new Date(appointment.start).getTime()) /
                              60000
                          )}{" "}
                          min
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedAppointment(appointment)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointment Details Dialog */}
      <Dialog
        open={!!selectedAppointment}
        onOpenChange={() => setSelectedAppointment(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Patient</Label>
                  <p className="font-medium">{selectedAppointment.patientName}</p>
                </div>
                <div>
                  <Label>Type</Label>
                  <p className="font-medium">{selectedAppointment.type}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date & Time</Label>
                  <p className="font-medium">
                    {formatDateTime(selectedAppointment.start)}
                  </p>
                </div>
                <div>
                  <Label>Duration</Label>
                  <p className="font-medium">
                    {Math.round(
                      (new Date(selectedAppointment.end).getTime() -
                        new Date(selectedAppointment.start).getTime()) /
                        60000
                    )}{" "}
                    minutes
                  </p>
                </div>
              </div>

              <div>
                <Label>Status</Label>
                <div className="mt-1">
                  <Badge variant={getStatusColor(selectedAppointment.status)}>
                    {selectedAppointment.status}
                  </Badge>
                </div>
              </div>

              {selectedAppointment.notes && (
                <div>
                  <Label>Notes</Label>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedAppointment.notes}
                  </p>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-4">
                {selectedAppointment.status === "scheduled" && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() =>
                        updateAppointmentStatus(selectedAppointment.id, "completed")
                      }
                    >
                      Mark Complete
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        updateAppointmentStatus(selectedAppointment.id, "no-show")
                      }
                    >
                      No Show
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() =>
                        updateAppointmentStatus(selectedAppointment.id, "cancelled")
                      }
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
