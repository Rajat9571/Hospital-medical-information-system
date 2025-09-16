# Database Schema

## Users Table

| Field      | Type         | Description                |
|------------|--------------|----------------------------|
| id         | INT, PK      | User ID                    |
| email      | VARCHAR(255) | Unique email               |
| password   | VARCHAR(255) | Hashed password            |
| name       | VARCHAR(255) | Full name                  |
| role       | ENUM         | admin, doctor, nurse, staff|
| department | VARCHAR(100) | Department                 |
| phone      | VARCHAR(20)  | Phone number               |
| created_at | TIMESTAMP    | Creation timestamp         |

## Patients Table

| Field           | Type         | Description                |
|-----------------|--------------|----------------------------|
| id              | INT, PK      | Patient ID                 |
| name            | VARCHAR(255) | Full name                  |
| email           | VARCHAR(255) | Unique email               |
| phone           | VARCHAR(50)  | Phone number               |
| dateOfBirth     | DATE         | Date of birth              |
| gender          | ENUM         | male, female, other        |
| address         | TEXT         | Address                    |
| emergencyContact| VARCHAR(255) | Emergency contact          |
| bloodType       | VARCHAR(10)  | Blood type                 |
| allergies       | TEXT         | Allergies                  |
| status          | ENUM         | active, inactive, critical |
| patientType     | ENUM         | consultancy, emergency     |
| created_at      | TIMESTAMP    | Creation timestamp         |

## Appointments Table

| Field      | Type         | Description                |
|------------|--------------|----------------------------|
| id         | INT, PK      | Appointment ID             |
| patientId  | INT, FK      | Patient reference          |
| doctorId   | INT, FK      | Doctor reference           |
| department | VARCHAR(100) | Department                 |
| date       | DATE         | Appointment date           |
| time       | TIME         | Appointment time           |
| type       | ENUM         | consultation, emergency... |
| status     | ENUM         | scheduled, completed...    |
| notes      | TEXT         | Notes                      |
| createdAt  | TIMESTAMP    | Creation timestamp         |

## Pending Registrations Table

| Field            | Type         | Description                |
|------------------|--------------|----------------------------|
| id               | INT, PK      | Registration ID            |
| email            | VARCHAR(255) | Unique email               |
| password         | VARCHAR(255) | Hashed password            |
| name             | VARCHAR(255) | Full name                  |
| role             | ENUM         | admin, doctor, nurse, ...  |
| department       | VARCHAR(100) | Department                 |
| phone            | VARCHAR(20)  | Phone number               |
| status           | ENUM         | pending, approved, rejected|
| requested_at     | TIMESTAMP    | Request timestamp          |
| approved_at      | TIMESTAMP    | Approval timestamp         |
| rejected_at      | TIMESTAMP    | Rejection timestamp        |
| rejection_reason | TEXT         | Reason for rejection       |