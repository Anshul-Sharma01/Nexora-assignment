import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { fetchCart, removeFromCart } from '../store/cartSlice'

const Cart = ({ onCheckout }) => {
  const dispatch = useDispatch()
  const { items, total, loading } = useSelector(state => state.cart)

  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])

  const handleRemove = async (itemId, itemName) => {
    try {
      await dispatch(removeFromCart(itemId)).unwrap()
      toast.success(`${itemName} removed from cart`)
    } catch (error) {
      toast.error('Failed to remove item from cart')
    }
  }

  if (loading) return <div className="text-center py-4">Loading cart...</div>

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-black">Cart</h2>
        <span className="text-sm text-gray-500">{items.length} items</span>
      </div>
      
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
          <span className="ml-3 text-gray-600">Loading...</span>
        </div>
      )}
      
      {!loading && items.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l1.5 1.5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </div>
          <p className="text-gray-900 font-medium mb-1">Your cart is empty</p>
          <p className="text-gray-500 text-sm">Add products to get started</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-black truncate">{item.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    ${item.price ? item.price.toFixed(2) : '0.00'} × {item.qty || 1}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-black">
                    ${item.price && item.qty ? (item.price * item.qty).toFixed(2) : '0.00'}
                  </span>
                  <button
                    onClick={() => handleRemove(item.id, item.name)}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-100 pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold text-black">Total</span>
              <span className="text-2xl font-bold text-black">
                ${total ? total.toFixed(2) : '0.00'}
              </span>
            </div>
            
            <button
              onClick={onCheckout}
              className="w-full bg-black text-white font-medium py-4 px-6 rounded-full hover:bg-gray-800 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={items.length === 0}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart