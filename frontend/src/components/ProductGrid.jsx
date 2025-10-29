import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { fetchProducts } from '../store/productsSlice'
import { addToCart } from '../store/cartSlice'

const ProductGrid = () => {
  const dispatch = useDispatch()
  const { items: products, loading, error } = useSelector(state => state.products)
  const [addingToCart, setAddingToCart] = useState(null)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleAddToCart = async (productId, productName) => {
    setAddingToCart(productId)
    
    const loadingToast = toast.loading(`Adding ${productName} to cart...`)

    try {
      await dispatch(addToCart({ productId, qty: 1 })).unwrap()
      toast.success(`${productName} added to cart!`, { id: loadingToast })
    } catch (error) {
      toast.error(`Failed to add ${productName} to cart`, { id: loadingToast })
    } finally {
      setAddingToCart(null)
    }
  }

  if (loading) return <div className="text-center py-8">Loading products...</div>
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <div 
          key={product._id} 
          className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          <div className="aspect-square overflow-hidden bg-gray-50">
            {product.image && (
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            )}
          </div>
          
          <div className="p-6">
            <div className="mb-3">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {product.category}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-black mb-2 line-clamp-2">
              {product.name}
            </h3>
            
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold text-black">
                ${product.price ? product.price.toFixed(2) : '0.00'}
              </span>
              <div className="flex items-center text-gray-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
                <span className="text-sm ml-1">4.5</span>
              </div>
            </div>
            
            <button
              onClick={() => handleAddToCart(product._id, product.name)}
              disabled={addingToCart === product._id}
              className="w-full bg-black text-white font-medium py-3 px-6 rounded-full hover:bg-gray-800 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {addingToCart === product._id ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding...
                </span>
              ) : (
                'Add to Cart'
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductGrid