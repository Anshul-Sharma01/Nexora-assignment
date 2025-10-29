import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store/authSlice'

const Header = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => state.auth)
  const cartItems = useSelector(state => state.cart.items)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-black hidden sm:block">
              Vibe Commerce
            </span>
          </Link>
          
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-full border">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l1.5 1.5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    {cartItems.length}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-black text-white font-medium py-2 px-4 rounded-full hover:bg-gray-800 transition-colors duration-200 text-sm cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="bg-white text-black border border-gray-200 font-medium py-2 px-4 rounded-full hover:bg-gray-50 transition-colors duration-200 text-sm cursor-pointer"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-black text-white font-medium py-2 px-4 rounded-full hover:bg-gray-800 transition-colors duration-200 text-sm cursor-pointer"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header