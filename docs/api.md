# API Documentation

## Authentication

### Register User

`POST /api/auth/register`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name",
  "role": "doctor",
  "department": "cardiology"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Registration request submitted successfully! Please wait for admin approval."
}
```

### Login

`POST /api/auth/signin`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "success": true,
  "token": "JWT_TOKEN",
  "user": { ... }
}
```

## Patients

### Get All Patients

`GET /api/patients`

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    ...
  }
]
```

### Add Patient

`POST /api/patients`

**Request:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "1234567890",
  "dateOfBirth": "1990-01-01",
  "gender": "female"
}
```
**Response:**  
`201 Created`

## Appointments

### Get All Appointments

`GET /api/appointments`

### Create Appointment

`POST /api/appointments`

**Request:**
```json
{
  "patientId": 1,
  "doctorId": 2,
  "department": "cardiology",
  "date": "2025-09-16",
  "time": "10:00",
  "type": "consultation"
}
```

## Registration Approval (Admin Only)

### Get Pending Registrations

`GET /api/auth/admin/pending-registrations`

### Approve Registration

`POST /api/auth/admin/approve/:id`

### Reject Registration

`POST /api/auth/admin/reject/:id`

**Request:**
```json
{
  "reason": "Insufficient qualifications"
}
```

---

**For more endpoints, see the backend route files.**