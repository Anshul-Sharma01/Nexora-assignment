import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1'

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  }
}

// Async thunks for API calls
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await fetch(`${API_BASE}/cart`, {
    headers: getAuthHeaders()
  })
  return response.json()
})

export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, qty = 1 }) => {
  const response = await fetch(`${API_BASE}/cart`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ productId, qty })
  })
  return response.json()
})

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (itemId) => {
  await fetch(`${API_BASE}/cart/${itemId}`, { 
    method: 'DELETE',
    headers: getAuthHeaders()
  })
  return itemId
})

export const checkout = createAsyncThunk('cart/checkout', async (checkoutData) => {
  const response = await fetch(`${API_BASE}/checkout`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(checkoutData)
  })
  return response.json()
})

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
    loading: false,
    error: null,
    receipt: null,
  },
  reducers: {
    clearReceipt: (state) => {
      state.receipt = null
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.items || []
        state.total = action.payload.total || 0
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Add to cart
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items || []
        state.total = action.payload.total || 0
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.error.message
      })
      // Remove from cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload)
        state.total = state.items.reduce((sum, item) => sum + (item.price * item.qty), 0)
      })
      // Checkout
      .addCase(checkout.pending, (state) => {
        state.loading = true
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.loading = false
        state.receipt = action.payload
        state.items = []
        state.total = 0
      })
      .addCase(checkout.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { clearReceipt, clearError } = cartSlice.actions
export default cartSlice.reducer