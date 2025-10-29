import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cartSlice'
import productsSlice from './productsSlice'
import authSlice from './authSlice'

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productsSlice,
    auth: authSlice,
  },
})