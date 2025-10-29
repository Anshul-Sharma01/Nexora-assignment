import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearError } from '../store/cartSlice'
import ProductGrid from '../components/ProductGrid'
import Cart from '../components/Cart'
import CheckoutForm from '../components/CheckoutForm'
import ReceiptModal from '../components/ReceiptModal'

const Shop = () => {
  const dispatch = useDispatch()
  const [showCheckout, setShowCheckout] = useState(false)
  const { receipt, error } = useSelector(state => state.cart)
  const cartItems = useSelector(state => state.cart.items)

  // Close checkout form when receipt is available
  const handleCheckoutClose = () => {
    setShowCheckout(false)
  }

  // When receipt appears, close checkout form
  useEffect(() => {
    if (receipt) {
      setShowCheckout(false)
    }
  }, [receipt])

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 py-8">
          {/* Products Section */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-black mb-2">Products</h1>
              <p className="text-gray-600">Discover our curated collection</p>
            </div>
            <ProductGrid />
          </div>
          
          {/* Cart Sidebar */}
          <div className="lg:w-80 xl:w-96">
            <div className="sticky top-24">
              <Cart onCheckout={() => setShowCheckout(true)} />
            </div>
          </div>
        </div>
      </div>

      {showCheckout && !receipt && (
        <CheckoutForm onClose={handleCheckoutClose} />
      )}

      {receipt && <ReceiptModal receipt={receipt} />}

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg shadow-lg max-w-sm">
          <div className="flex justify-between items-center">
            <span className="text-sm">{error}</span>
            <button
              onClick={() => dispatch(clearError())}
              className="text-red-500 hover:text-red-700 ml-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Shop