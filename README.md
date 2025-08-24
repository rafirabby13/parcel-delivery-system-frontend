
# 📦 Parcel Delivery Management System



A comprehensive, modern parcel delivery and tracking system built with React, TypeScript, and cutting-edge web technologies.

## Features

### 🔐 Authentication & Authorization

- Role-based access control (Sender, Receiver, Delivery Partner, Super Admin)
- Secure JWT authentication
- Password visibility toggle
- Form validation with Zod

### 📋 Parcel Management

- Create Parcel: Comprehensive form with sender/receiver details
- Track Parcel: Public tracking with real-time - status updates
- Status Updates: Delivery partner interface for status management
- Payment Integration: Multiple payment methods (Prepaid, Postpaid, COD)
### 🔒 Security Features

- JWT Authentication with secure token storage
- Role-based Access Control (RBAC)
- Input Validation on client and server

### 📱 Responsive Design

The application is fully responsive and optimized for:

- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)
### 🚚 Delivery Operations

- Delivery partner assignment
- Real-time status tracking
- Complete delivery timeline
- Mobile-responsive design for field operations

### 🎨 Modern UI/UX

- Beautiful gradient designs with glassmorphism effects
- Responsive design for all devices
- Dark mode support
- Smooth animations and transitions
- Professional color-coded interfaces

### 🌙 Dark Mode Support

Full dark mode implementation with:

- System preference detection
- Manual toggle option
- Persistent user preference
- Smooth transitions
### 🌍 Bangladesh-Specific Features

- Bangladesh phone number validation (01[3-9]XXXXXXXX)
- Division, city, and area management
- Currency display in BDT (৳)
- Local date/time formatting
## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/parcel-delivery-system.git
cd parcel-delivery-system
```
### 2. Install dependencies


```bash
npm install
   # or
yarn install
```
### 3. Environment Setup


```bash
cp .env.example .env.local
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Parcel Delivery System
```
### 4. Start development server


```bash
npm run dev
# or
yarn dev
```
### 5. Open your browser


```bash
http://localhost:5173
```
    
## 📁 Project Structure


```
├─ src/
│  ├─ assets/
│  │  ├─ icons/
│  │  ├─ images/
│  │  └─ react.svg
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ CommonLayout.tsx
│  │  │  ├─ DashboardLayout.tsx
│  │  │  ├─ Footer.tsx
│  │  │  └─ Navbar.tsx
│  │  ├─ modules/
│  │  │  ├─ admin/
│  │  ├─ ui/
│  ├─ config/
│  │  └─ index.env.ts
│  ├─ constants/
│  │  └─ role.ts
│  ├─ context/
│  ├─ formValidationSchema/
│  │  └─ parcel.schema.ts
│  ├─ hooks/
│  ├─ lib/
│  ├─ pages/
│  │  ├─ admin/
│  │  ├─ receiver/
│  │  ├─ sender/
│  │  └─ VerifyUser.tsx
│  ├─ redux/
│  │  ├─ feature/
│  │  │  ├─ auth/
│  │  │  │  └─ auth.api.ts
│  │  ├─ axiosBaseQuery.ts
│  │  ├─ baseApi.ts
│  │  ├─ hook.ts
│  │  └─ store.ts
│  ├─ routes/
│  ├─ types/
│  ├─ utils/
│  ├─ App.tsx
│  ├─ index.css
│  ├─ main.tsx
```

## Tech Stack

### Frontend

*  React 18 : Modern React with hooks
*  TypeScript - Type safety and better DX
*  Vite - Fast build tool and dev server
*  Tailwind CSS - Utility-first CSS framework
*  shadcn/ui - High-quality component library

### State Management

*  Redux Toolkit - Modern Redux with less boilerplate
*  RTK Query - Data fetching and caching

### Form Management

*  React Hook Form - Performant forms with easy validation
*  Zod - TypeScript-first schema validation

### UI/UX

*  Lucide React - Beautiful icon library
*  Sonner - Modern toast notifications
*  Framer Motion - Smooth animations (optional)

### Development

*  ESLint - Code linting
*  Prettier - Code formatting
*  Husky - Git hooks
*  Lint-staged - Run linters on staged files


## 🔧 Available Scripts

To run tests, run the following command

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript compiler

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate test coverage
```


##  🎨 Component Examples

### Create Parcel Form

```typescript
import { CreateTour } from '@/components/forms/CreateTour'

// Usage
<CreateTour 
  onSuccess={(parcel) => console.log('Parcel created:', parcel)}
  className="max-w-4xl mx-auto"
/>
```
### Track Parcel


```typescript
import { TrackParcel } from '@/components/tracking/TrackParcel'

// Usage - Public route, no auth required
<TrackParcel />
```
### Status Update Interface

```typescript
import { UpdateStatus } from '@/components/delivery/UpdateStatus'

// Usage - For delivery partners
<UpdateStatus 
  parcels={assignedParcels}
  onStatusUpdate={handleStatusUpdate}
/>
```