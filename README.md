# E-commerce  - E-commerce Platform



## 📸 Screenshots

### 🏠 Landing Page
[![Landing Page](frontend/public/assets/image-1.png)](frontend/public/assets/image-1.png)

### 🛍️ Shop Page
[![Shop Page](frontend/public/assets/image-2.png)](frontend/public/assets/image-2.png)

### 🛒 Cart Page
[![Cart Page](frontend/public/assets/image-3.png)](frontend/public/assets/image-3.png)

### ❤️ Wishlist Page
[![Wishlist Page](frontend/public/assets/image-4.png)](frontend/public/assets/image-4.png)

### 💳 Payment Page
[![Payment Page](frontend/public/assets/image-5.png)](frontend/public/assets/image-5.png)

### 🛠️ Admin Dashboard
[![Admin Page](frontend/public/assets/image-6.png)](frontend/public/assets/image-6.png)

### 📦 Product Management
[![Admin Product Page](frontend/public/assets/image-7.png)](frontend/public/assets/image-7.png)

platform for fashion/clothing built with Next.js, React, Node.js, Express, and MongoDB. Features user authentication, payment processing, order tracking, and admin dashboard.

## 🚀 Features

- **User Authentication**: Secure login/signup with Firebase Auth
- **Product Management**: Browse, search, and filter fashion products
- **Shopping Cart & Wishlist**: Add/remove items, manage quantities
- **Payment Integration**: Secure payments with Razorpay
- **Order Tracking**: Real-time order status with Shiprocket integration
- **Admin Dashboard**: Manage products, orders, customers, and analytics
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Live order tracking and notifications

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.0.1 (React 19.2.0)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS, Material-UI
- **Authentication**: Firebase Auth
- **Animations**: Framer Motion
- **Charts**: Recharts

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB with Mongoose
- **Authentication**: Firebase Admin SDK
- **Payments**: Razorpay
- **Shipping**: Shiprocket API

### DevOps & Tools
- **Version Control**: Git
- **Package Manager**: npm
- **Linting**: ESLint
- **Environment**: dotenv

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local installation or MongoDB Atlas) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)

**Supported Operating Systems:**
- Windows 10/11
- macOS 10.15+
- Linux (Ubuntu 18.04+, CentOS 7+)

### Accounts & API Keys Required
- **Firebase Project** - For authentication
- **Razorpay Account** - For payment processing
- **Shiprocket Account** - For shipping and tracking

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ayansh0209/E-commerce-website.git
   cd E-commerce-website
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Setup MongoDB**
   - Install MongoDB locally or create a MongoDB Atlas cluster
   - Get your connection string

5. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication with Email/Password provider
   - Generate a service account key (JSON file) for admin SDK

6. **Setup Razorpay**
   - Create account at [Razorpay Dashboard](https://dashboard.razorpay.com/)
   - Get API Key and Secret

7. **Setup Shiprocket**
   - Create account at [Shiprocket](https://www.shiprocket.in/)
   - Get email and password for API access

8. **Seed the database (Optional)**
   ```bash
   cd backend
   node src/scripts/seed.js
   ```
   This will populate your database with sample products, categories, and users for testing.

## ⚙️ Environment Setup

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
MONGODB_URI=mongodb://localhost:27017/faltu-fashion
# or for MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/faltu-fashion

RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

SHIPROCKET_EMAIL=your_shiprocket_email@example.com
SHIPROCKET_PASSWORD=your_shiprocket_password

PICKUP_PINCODE=110001
```

### Frontend Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### Firebase Service Account

Place your Firebase service account JSON file as `backend/src/config/faltu-fashion-secret.json`

## 🚀 Running the Project

1. **Start MongoDB** (if running locally)
   ```bash
   # On Windows
   net start MongoDB

   # On macOS/Linux
   sudo systemctl start mongod
   # or
   brew services start mongodb-community
   ```

2. **Start the backend server**
   ```bash
   cd backend
   node src/server.js
   ```
   Backend will run on http://localhost:5454

3. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on http://localhost:3000

4. **Access the application**
   - Open http://localhost:3000 in your browser
   - Admin panel: http://localhost:3000/Admin

## 📊 Project Structure

```
faltu-fashion/
├── backend/
│   ├── src/
│   │   ├── config/          # Database, Firebase, Razorpay configs
│   │   ├── controllers/     # Business logic for each feature
│   │   ├── middleware/      # Authentication middleware
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API endpoints
│   │   ├── scripts/         # Database seeding scripts
│   │   ├── services/        # External API integrations
│   │   ├── index.js         # Express app setup
│   │   └── server.js        # Server startup
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── assets/          # Demo images
│   ├── src/
│   │   ├── app/             # Next.js app router pages
│   │   ├── components/      # Reusable UI components
│   │   ├── config/          # API configurations
│   │   ├── context/         # React contexts
│   │   ├── firebase/        # Firebase client config
│   │   └── redux/           # State management
│   └── package.json
└── README.md
```

## 🔗 API Endpoints

### Authentication
- `POST /api/users` - User registration/login

### Products
- `GET /api/products` - Get all products
- `POST /api/admin/products` - Create product (Admin)

### Cart
- `POST /api/cart` - Add to cart
- `GET /api/cart` - Get user cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `POST /api/admin/orders` - Update order status (Admin)

### Payments
- `POST /api/payments` - Process payment

### Reviews & Ratings
- `POST /api/reviews` - Add product review
- `POST /api/ratings` - Rate product

## Demo Assets

Demo images are located in `frontend/public/assets/`:
- `Frame 161.png`, `Frame 2.png`, `Frame 3.png` - Product showcase images
- `Frame161-Vertical.png`, `Frame2-Vertical.png`, `Frame3-Vertical.png` - Vertical layout images
- `image 1.png` - Additional demo image

These images are used throughout the application for product displays and UI elements.



## 🐳 Docker Setup (Future Enhancement)

Docker support is planned for future releases to enable easy containerization and deployment. Currently, the application runs natively on supported operating systems.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

