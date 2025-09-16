# Software Requirements Specification (SRS)

## 1. Introduction

- **Purpose:** To provide a robust Hospital Management Information System for managing patients, staff, appointments, beds, billing, pharmacy, and more.
- **Scope:** Web-based application for hospital staff, doctors, nurses, admin, and patients.

## 2. Functional Requirements

- User authentication and role-based access
- User registration with admin approval
- CRUD operations for patients, appointments, staff, beds, inventory, billing
- Emergency case management
- Notification system
- Reporting and analytics

## 3. Non-Functional Requirements

- Security: Password hashing, JWT authentication, role-based access
- Performance: Fast response, scalable backend
- Usability: Responsive UI, clear navigation
- Reliability: Data validation, error handling
- Maintainability: Modular codebase, documented APIs

## 4. System Architecture

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express, MySQL
- **API:** RESTful endpoints

## 5. User Roles

- Admin: Full access, user approvals, system settings
- Doctor: Patient management, appointments
- Nurse: Patient and bed management
- Staff: Inventory, billing, support
- Patient: View own records, appointments

## 6. Data Flow

- Registration requests go to pending approval
- Admin reviews and approves/rejects requests
- Approved users can log in and access modules based on role

## 7. Constraints

- Requires MySQL database
- Runs on Node.js v18+ and npm v9+

## 8. Future Enhancements

- Add lab/test management
- Integrate SMS/email notifications
- Mobile app support