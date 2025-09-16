# Hospital Management Information System (HMIS)

A full-stack hospital management platform built with **React (Vite)** for the frontend and **Node.js (Express)** with **MySQL** for the backend. This system supports patient management, appointments, staff and user registration, bed and inventory management, billing, pharmacy, emergency cases, notifications, analytics, and more.

---

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Code Organization](#code-organization)
- [Demo Users](#demo-users)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Authentication & Role-Based Access**: Admin, Doctor, Nurse, Staff, Patient
- **User Registration & Approval**: Admin approval workflow for new users
- **Patient Management**: Add, update, view, and search patients
- **Appointment Scheduling**: Book, update, view, and cancel appointments
- **Staff Management**: Manage hospital staff, roles, and departments
- **Bed Management**: Track bed availability, assignments, maintenance
- **Pharmacy & Medication**: Manage medication inventory and prescriptions
- **Billing & Financials**: Patient billing, insurance, payments
- **Emergency Department**: Monitor and manage emergency cases
- **Notifications & Alerts**: Real-time notifications for users
- **Reports & Analytics**: Hospital statistics, performance metrics
- **Settings & System Configuration**: Manage system-wide settings

---

## Screenshots

Screenshots of major modules are available in the [`Screenshots/`](Screenshots) folder:

- Admin Home page
- Appointment Registration
- Bed Management
- Billing Management
- Doctor Dashboard
- Emergency Management
- Inventory Management
- Login Page
- Notification Center
- Nurse Dashboard
- Patient Page
- Pharmacy Management
- Registration Request Page
- Staff Dashboard
- User Approval Management

---

## Project Structure

```
hmis-project(IIT-G)/
├── backend/
│   ├── index.js
│   ├── package.json
│   ├── .env
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── middleware/
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
├── Screenshots/
│   └── *.png
└── README.md
```

---

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Shadcn UI, Lucide Icons
- **Backend**: Node.js, Express, Sequelize ORM, MySQL
- **Authentication**: JWT
- **Notifications**: Custom logic
- **Other**: Sonner (toast notifications), Radix UI (dialogs, popovers)

---

## Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **npm** (v9+)
- **MySQL** server (running locally or remotely)

---

### Backend Setup

1. **Install dependencies:**

   ```sh
   cd backend
   npm install
   ```

2. **Configure environment variables:**

   Create a `.env` file in `backend/`:

   ```
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=hospital_db
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=http://localhost:5173
   ```

3. **Start MySQL server** and ensure the credentials match your `.env`.

4. **Run the backend server:**

   ```sh
   npm start
   # or
   node index.js
   ```

   The backend runs on [http://localhost:5001](http://localhost:5001).

---

### Frontend Setup

1. **Install dependencies:**

   ```sh
   cd frontend
   npm install
   ```

2. **Start the frontend dev server:**

   ```sh
   npm run dev
   ```

   The frontend runs on [http://localhost:5173](http://localhost:5173).

---

## Environment Variables

**Backend (`backend/.env`):**

- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`: MySQL connection
- `JWT_SECRET`: Secret for JWT authentication
- `FRONTEND_URL`: Allowed CORS origin

**Frontend:**  
No sensitive env vars required for local dev.

---

## API Endpoints

### Auth

- `POST /api/auth/register` — Register new user (goes to pending approval)
- `POST /api/auth/signin` — Login
- `GET /api/auth/me` — Get current user
- `POST /api/auth/init-demo-users` — Create demo users

### Patients

- `GET /api/patients` — List all patients
- `POST /api/patients` — Add patient
- `PUT /api/patients/:id` — Update patient

### Appointments

- `GET /api/appointments` — List appointments
- `POST /api/appointments` — Create appointment
- `PUT /api/appointments/:id` — Update appointment
- `DELETE /api/appointments/:id` — Delete appointment

### Doctors

- `GET /api/doctors` — List doctors

### Registration Approval

- `GET /api/registrations/pending` — List pending registrations
- `POST /api/registrations/:id/approve` — Approve registration
- `POST /api/registrations/:id/reject` — Reject registration

---

## Code Organization

- **Backend Models:**  
  - [`models/User.js`](backend/models/User.js) — User schema
  - [`models/Patient.js`](backend/models/Patient.js) — Patient schema
  - [`models/Appointment.js`](backend/models/Appointment.js) — Appointment schema
  - [`models/Registration.js`](backend/models/Registration.js) — Registration approval

- **Backend Routes:**  
  - [`routes/auth.js`](backend/routes/auth.js) — Auth & registration logic
  - [`routes/patients.js`](backend/routes/patients.js) — Patient CRUD
  - [`routes/appointments.js`](backend/routes/appointments.js) — Appointment CRUD
  - [`routes/doctors.js`](backend/routes/doctors.js) — Doctor listing
  - [`routes/registration.js`](backend/routes/registration.js) — Registration approval

- **Frontend Components:**  
  - [`src/components/`](frontend/src/components/) — All UI modules (Dashboard, Patients, Appointments, Beds, Pharmacy, Billing, Emergency, Staff, Notifications, etc.)
  - [`src/context/AuthContext.jsx`](frontend/src/context/AuthContext.jsx) — Auth logic and role-based routing
  - [`src/App.jsx`](frontend/src/App.jsx) — Main app wrapper
  - [`src/main.jsx`](frontend/src/main.jsx) — Entry point

---

## Demo Users

You can initialize demo users for quick testing:

- **Admin:**  
  - Email: `admin@gmail.com`  
  - Password: `admin123`
- **Doctor:**  
  - Email: `doctor@gmail.com`  
  - Password: `12345678`
- **Nurse:**  
  - Email: `nurse@gmail.com`  
  - Password: `nurse123`
- **Staff:**  
  - Email: `staff@gmail.com`  
  - Password: `staff123`

Run the following endpoint to create demo users:

```sh
curl -X POST http://localhost:5001/api/auth/init-demo-users
```

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Create a Pull Request

---

## License

This project is for educational purposes at IIT-G.  
For commercial use, please contact the authors.

---

## Contact

For questions or support, please open an issue or contact the maintainers.

---

## Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [Radix UI](https://www.radix-ui.com/)
- [Sonner](https://sonner.emilkowal.com/)
- [Sequelize](https://sequelize.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)

---

## Screenshots

See [`Screenshots/`](Screenshots) for UI previews.