import { useDispatch } from 'react-redux'
import { clearReceipt } from '../store/cartSlice'

const ReceiptModal = ({ receipt }) => {
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(clearReceipt())
  }

  if (!receipt) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">Order Complete!</h2>
          <p className="text-gray-600">Thank you for your purchase</p>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-100">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Order ID</span>
              <span className="font-medium text-black">{receipt.orderId || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total</span>
              <span className="font-bold text-xl text-black">
                ${receipt.total ? receipt.total.toFixed(2) : '0.00'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Date</span>
              <span className="font-medium text-black">
                {receipt.timestamp ? new Date(receipt.timestamp).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>
        
        {receipt.items && receipt.items.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-4 text-black">Items Ordered</h3>
            <div className="space-y-3 max-h-32 overflow-y-auto">
              {receipt.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-white border border-gray-100 rounded-xl">
                  <div>
                    <span className="text-black font-medium">{item.name}</span>
                    <span className="text-gray-500 text-sm ml-2">× {item.qty || 1}</span>
                  </div>
                  <span className="font-semibold text-black">
                    ${item.price && item.qty ? (item.price * item.qty).toFixed(2) : '0.00'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <button
          onClick={handleClose}
          className="w-full bg-black text-white py-4 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )
}

export default ReceiptModal