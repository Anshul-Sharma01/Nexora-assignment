# E-Commerce Cart Application

A full-stack e-commerce shopping cart application built with React, Node.js, Express, and MongoDB. Features user authentication, product browsing, cart management, and checkout functionality.

## 🚀 Features

- **User Authentication**: JWT-based login/signup system
- **Product Catalog**: Browse products from Fake Store API
- **Shopping Cart**: Add, remove, and manage cart items
- **Checkout Process**: Complete orders with customer details
- **Responsive Design**: Mobile-first, modern UI
- **Toast Notifications**: Real-time user feedback
- **Protected Routes**: Secure cart and checkout pages

## 🛠 Tech Stack

### Frontend
- **React 19** - UI framework
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **React Hot Toast** - Notifications
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin requests

## 📁 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/         # Database schemas
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utilities & middleware
│   │   ├── db/            # Database connection
│   │   ├── app.js         # Express app setup
│   │   └── server.js      # Server entry point
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store & slices
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # App entry point
│   ├── package.json
│   └── .env
└── README.md
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone Repository
```bash
git clone <repository-url>
cd e-commerce-cart
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/e-commerce
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-super-secret-jwt-key-here
```

Start backend server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file:
```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_APP_NAME=Shop
VITE_APP_VERSION=1.0.0
NODE_ENV=development
```

Start frontend development server:
```bash
npm run dev
```

### 4. Access Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### POST /auth/signup
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here"
}
```

#### POST /auth/login
Login existing user
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here"
}
```

### Product Endpoints

#### GET /products
Get all products
```json
[
  {
    "_id": "product_id",
    "name": "Product Name",
    "price": 29.99,
    "description": "Product description",
    "category": "electronics",
    "image": "image_url"
  }
]
```

### Cart Endpoints (Protected)

#### GET /cart
Get user's cart
**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "items": [
    {
      "id": "cart_item_id",
      "name": "Product Name",
      "price": 29.99,
      "qty": 2,
      "productId": "product_id"
    }
  ],
  "total": 59.98
}
```

#### POST /cart
Add item to cart
**Headers:** `Authorization: Bearer <token>`
```json
{
  "productId": "product_id",
  "qty": 1
}
```

#### DELETE /cart/:id
Remove item from cart
**Headers:** `Authorization: Bearer <token>`

### Checkout Endpoints (Protected)

#### POST /checkout
Process checkout
**Headers:** `Authorization: Bearer <token>`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "cartItems": [...],
  "total": 59.98
}
```

**Response:**
```json
{
  "orderId": "ORDER-1234567890",
  "items": [...],
  "total": 59.98,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "message": "Checkout successful (mock)"
}
```

## 🔐 Authentication Flow

1. **Registration/Login**: User creates account or logs in
2. **JWT Token**: Server returns JWT token
3. **Token Storage**: Frontend stores token in localStorage
4. **Protected Requests**: Token sent in Authorization header
5. **Route Protection**: Cart/checkout require valid token



## UI Snapshots 
<img src="https://res.cloudinary.com/dqnzstk72/image/upload/v1761750282/Nexorra/Screenshot_2025-10-29_192531_kjopkb.png" alt="UI Screenshot 3" />
<img src="https://res.cloudinary.com/dqnzstk72/image/upload/v1761750282/Nexorra/Screenshot_2025-10-29_192515_kfzjzm.png" alt="UI Screenshot 4" />
<img src="https://res.cloudinary.com/dqnzstk72/image/upload/v1761750298/Nexorra/Screenshot_2025-10-29_192649_oukmfa.png" alt="UI Screenshot 2" />
<img src="https://res.cloudinary.com/dqnzstk72/image/upload/v1761750298/Nexorra/Screenshot_2025-10-29_192659_y4auca.png" alt="UI Screenshot 1" />
<img src="https://res.cloudinary.com/dqnzstk72/image/upload/v1761750292/Nexorra/Screenshot_2025-10-29_192707_tu9dyw.png" alt="UI Screenshot" />


## 🎨 UI Components

### Pages
- **Login** - User authentication
- **Signup** - User registration  
- **Shop** - Main shopping interface

### Components
- **Header** - Navigation with auth state
- **ProductGrid** - Product catalog display
- **Cart** - Shopping cart sidebar
- **CheckoutForm** - Order completion form
- **ReceiptModal** - Order confirmation
- **ProtectedRoute** - Route authentication wrapper

## 🔄 State Management

### Redux Slices
- **authSlice** - User authentication state
- **cartSlice** - Shopping cart state
- **productsSlice** - Product catalog state

### Key Actions
- `login/signup` - User authentication
- `fetchProducts` - Load product catalog
- `addToCart/removeFromCart` - Cart management
- `checkout` - Order processing

## 🚦 Development Workflow

### Running Tests
```bash
# Backend
cd backend
npm test

# Frontend  
cd frontend
npm test
```

### Building for Production
```bash
# Frontend
cd frontend
npm run build

# Backend (if using build process)
cd backend
npm run build
```

### Environment Variables

#### Backend (.env)
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/vibe-commerce
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-super-secret-jwt-key-here
```

#### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_APP_NAME=Shop
NODE_ENV=development
```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `FRONTEND_URL` in backend .env matches frontend URL
   - Check CORS configuration in `app.js`

2. **Database Connection**
   - Verify MongoDB is running
   - Check `MONGODB_URI` in backend .env

3. **Authentication Issues**
   - Ensure `JWT_SECRET` is set in backend .env
   - Check token storage in browser localStorage

4. **API Calls Failing**
   - Verify `VITE_API_BASE_URL` in frontend .env
   - Check network tab for request details

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

