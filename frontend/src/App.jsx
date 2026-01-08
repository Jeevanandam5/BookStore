import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import BookCollection from './components/BookCollection'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/customer/Cart'
import Profile from './pages/customer/Profile'
import AllBooks from './pages/AllBooks'
import BookDetails from './components/BookDetails'
import Loading from './components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
import Setting from './pages/customer/Setting'
import UserOrder from './pages/customer/UserOrder'
import UpdateProfile from './pages/customer/UpdateProfile'
import AddBook from './pages/admin/AddBook'
import AllUser from './pages/admin/AllUser'
import  Allorders  from './pages/admin/Allorders'
import AdminProfile from './pages/admin/AdminProfile'
import Footer from './components/Footer'
import AdminBooks from './pages/admin/AdminBooks'
import UpdateBook from './pages/admin/UpdateBook'

const App = () => {

  const dispatch = useDispatch()
  const role = useSelector((stat) => stat.auth.role)
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")) {
      dispatch(authActions.login())
      dispatch(authActions.changeRole(localStorage.getItem("role")))
    }
  }, [])
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/book-collection' element={<AllBooks />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/cart' element={<Cart />} />
        {role === "admin" ? (
          <Route path="/admin/profile" element={<AdminProfile />}>
            <Route path="addbook" element={<AddBook />} />
            <Route path="allbooks" element={<AdminBooks />} />
            <Route path="updatebook/:id" element={<UpdateBook />} />
            <Route path="alluser" element={<AllUser />} />
            <Route path="allorder" element={<Allorders />} />
          </Route>
          
        ) : (
          <Route path="/profile" element={<Profile />}>
            <Route path="order" element={<UserOrder />} />
            <Route path="setting" element={<Setting />} />
            <Route path="setting/update" element={<UpdateProfile />} />
          </Route>
        )}
        <Route path='/loading' element={<Loading />} />
        <Route path='/book-detail/:id' element={<BookDetails />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App