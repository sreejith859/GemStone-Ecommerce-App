import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'
import PagenotFound from './Pages/PagenotFound'
import ForgotPassword from './Pages/Auth/ForgotPassword'
import AboutPage from './Pages/AboutPage'
import Contactpage from './Pages/Contactpage'
import PriveteRoute from './Components/Routes/Privete'
import AdminRoute from './Components/Routes/AdminRoute'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import CreateCategory from './Pages/Admin/CreateCategory'
import CreateProduct from './Pages/Admin/CreateProduct'
import Users from './Pages/Admin/Users'
import Dashboard from './Pages/user/Dashboard'
import Products from './Pages/Admin/Products'
import Orders from './Pages/user/Orders'
import Profile from './Pages/user/Profile'
import UpdateProduct from './Pages/Admin/UpdateProduct'
import ProductPage from './Pages/ProductPage'
import Search from './Pages/Search'
import ProductDetails from './Pages/ProductDetails'
import CartPage from './Pages/CartPage'
import Category from './Pages/Category'
import AdminOrders from './Pages/Admin/AdminOrders'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product/:slug' element={<ProductDetails />} />
        <Route path='/all-products' element={<ProductPage />} />
        <Route path='/category/:slug' element={<Category />} />
        <Route path='/cart-page' element={<CartPage />} />
        <Route path='/search' element={<Search />} />
        <Route path='/dashboard' element={<PriveteRoute />} >
          <Route path='user' element={<Dashboard />} />
          <Route path='user/orders' element={<Orders />} />
          <Route path='user/profile' element={<Profile />} />
        </Route>
        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<CreateCategory />} />
          <Route path='admin/create-product' element={<CreateProduct />} />
          <Route path='admin/product/:slug' element={<UpdateProduct />} />
          <Route path='admin/users' element={<Users />} />
          <Route path='admin/orders' element={<AdminOrders />} />
          <Route path='admin/products' element={<Products />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<Contactpage />} />        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='*' element={<PagenotFound />} />
      </Routes>

    </>
  )
}

export default App
