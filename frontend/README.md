# Vibe Commerce Frontend

A React-based e-commerce cart application built with Redux Toolkit for state management.

## Features

- **Authentication**: Login/Signup with JWT tokens
- **Product Display**: Grid layout with images, descriptions, and prices
- **Shopping Cart**: Add/remove items with quantity management
- **Protected Routes**: Cart and checkout require authentication
- **Checkout Process**: Mock payment with receipt generation
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **State Management**: Redux Toolkit for global state
- **Routing**: React Router for navigation

## Tech Stack

- React 19
- Redux Toolkit for state management
- React Router for routing
- Tailwind CSS for styling
- Vite for build tooling

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Make sure your backend is running on `http://localhost:3000`

## API Integration

The frontend expects the following backend endpoints:
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/signup` - User registration
- `GET /api/v1/products` - Fetch products
- `GET /api/v1/cart` - Get cart items (protected)
- `POST /api/v1/cart` - Add item to cart (protected)
- `DELETE /api/v1/cart/:id` - Remove item from cart (protected)
- `POST /api/v1/checkout` - Process checkout (protected)

## Project Structure

```
src/
├── components/          # React components
│   ├── ProductGrid.jsx  # Products display with images
│   ├── Cart.jsx         # Shopping cart
│   ├── CheckoutForm.jsx # Checkout form
│   ├── ReceiptModal.jsx # Order receipt
│   ├── Header.jsx       # Navigation header
│   └── ProtectedRoute.jsx # Route protection
├── pages/              # Page components
│   ├── Shop.jsx        # Main shopping page
│   ├── Login.jsx       # Login page
│   └── Signup.jsx      # Registration page
├── store/              # Redux store
│   ├── store.js        # Store configuration
│   ├── authSlice.js    # Authentication state
│   ├── cartSlice.js    # Cart state management
│   └── productsSlice.js # Products state management
├── App.jsx             # Main app with routing
└── main.jsx            # App entry point
```

## Usage

1. **Authentication**: Users must sign up or log in to access the shop
2. **Shopping**: Browse products with images and descriptions
3. **Cart Management**: Add items to cart, view totals, remove items
4. **Checkout**: Complete purchase with customer details
5. **Receipt**: View order confirmation after successful checkout