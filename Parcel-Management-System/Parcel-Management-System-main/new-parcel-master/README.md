# 🚚 Courier Management System

A modern, full-stack courier management system built with **Angular 17** (Frontend) and **Spring Boot 3** (Backend). This application provides a comprehensive solution for managing courier services with separate interfaces for customers and officers.

## 🌟 Features

### 👥 Customer Features
- **User Registration & Authentication** - Secure login with JWT tokens
- **Parcel Booking** - Create new courier bookings with detailed cost breakdown
- **Payment Processing** - Integrated payment system with invoice generation
- **Package Tracking** - Real-time tracking of parcel status
- **Booking History** - View all previous bookings
- **Feedback System** - Rate and provide feedback for services
- **Profile Management** - Update personal information and change password
- **Contact Support** - Direct communication with support team

### 👮‍♂️ Officer Features
- **Officer Dashboard** - Overview of all operations
- **Customer Booking Creation** - Create bookings on behalf of customers
- **Package Tracking** - Track and update parcel status
- **Delivery Status Management** - Update delivery status and location
- **Pickup Scheduling** - Schedule and manage pickup operations
- **All Bookings View** - Comprehensive view of all system bookings
- **Payment Processing** - Handle payments and generate invoices
- **Feedback Management** - View and respond to customer feedback
- **Profile Management** - Officer profile and settings

## 🛠️ Technology Stack

### Frontend
- **Angular 17** - Modern frontend framework
- **Angular Material** - UI component library
- **TypeScript** - Type-safe JavaScript
- **RxJS** - Reactive programming
- **Angular Reactive Forms** - Form handling and validation

### Backend
- **Spring Boot 3** - Java-based backend framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database operations
- **H2 Database** - In-memory database for development
- **Maven** - Build tool and dependency management
- **JWT** - JSON Web Tokens for authentication

## 🎨 Design & UI

### Theme System
- **Customer Theme**: Modern dark theme with **cyan accents**
- **Officer Theme**: Modern dark theme with **orange accents**
- **Glassmorphism Effects** - Modern glass-like UI elements
- **Responsive Design** - Mobile-first approach
- **Custom Form Styling** - Enhanced form fields with floating labels

### Key Design Features
- **Dark Mode** - Eye-friendly dark interface
- **Gradient Backgrounds** - Beautiful gradient effects
- **Custom Animations** - Smooth transitions and hover effects
- **Material Design** - Google's Material Design principles
- **Accessibility** - WCAG compliant design

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **Java** (JDK 17 or higher)
- **Maven** (v3.6 or higher)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   mvn clean install
   ```

### Running the Application

#### Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```
The backend will start on `http://localhost:8080`

#### Frontend (Angular)
```bash
cd frontend
ng serve
```
The frontend will start on `http://localhost:4200`

## 📁 Project Structure

```
Parcel2/
├── frontend/                 # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── auth/     # Authentication components
│   │   │   │   ├── customer/ # Customer-specific components
│   │   │   │   ├── officer/  # Officer-specific components
│   │   │   │   └── shared/   # Shared components
│   │   │   ├── services/     # API services
│   │   │   ├── guards/       # Route guards
│   │   │   └── models/       # TypeScript interfaces
│   │   └── assets/
│   └── package.json
├── backend/                  # Spring Boot application
│   ├── src/main/java/
│   │   └── com/courier/
│   │       ├── controller/   # REST controllers
│   │       ├── service/      # Business logic
│   │       ├── model/        # Entity models
│   │       ├── dto/          # Data Transfer Objects
│   │       ├── repository/   # Data access layer
│   │       └── config/       # Configuration classes
│   └── pom.xml
└── README.md
```

## 🔐 Authentication & Security

### JWT Token System
- **Access Tokens** - Short-lived tokens for API access
- **Role-based Access** - Separate customer and officer roles
- **Secure Routes** - Protected routes with guards
- **Session Management** - Automatic token refresh

### Security Features
- **Password Encryption** - BCrypt password hashing
- **Input Validation** - Comprehensive form validation
- **SQL Injection Prevention** - Parameterized queries
- **CORS Configuration** - Cross-origin resource sharing

## 💰 Pricing System

### Cost Breakdown
- **Base Rate**: ₹50 (fixed)
- **Weight Charge**: ₹0.02 per gram
- **Delivery Charge**: Based on delivery type
  - Standard: ₹30
  - Express: ₹80
  - Same Day: ₹150
- **Packing Charge**: Based on packing type
  - Basic: ₹50
  - Premium: ₹150
- **Admin Fee**: ₹50 (fixed)
- **GST**: 18% on subtotal

## 📊 Database Schema

### Key Entities
- **User** - Customer and officer information
- **Booking** - Parcel booking details
- **Payment** - Payment and invoice information
- **Feedback** - Customer feedback and ratings
- **Tracking** - Parcel tracking information

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm run test
```

### Backend Testing
```bash
cd backend
mvn test
```

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
ng build --configuration production
```

### Backend Deployment
```bash
cd backend
mvn clean package
java -jar target/courier-management-0.0.1-SNAPSHOT.jar
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🙏 Acknowledgments

- **Angular Team** - For the amazing frontend framework
- **Spring Team** - For the robust backend framework
- **Material Design** - For the beautiful UI components
- **Open Source Community** - For the various libraries and tools used

---

⭐ **Star this repository if you find it helpful!** 
