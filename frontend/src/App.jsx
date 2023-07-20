
import { Route, Routes } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { SignUp } from './components/Signup'
import PrivateComponent from './components/PrivateComponent'
import Login from './components/Login'
import AddProduct from './components/AddProduct'
import Products from './components/Products'
import UpdateProduct from './components/UpdateProduct'

function App() {
  return (
    <>
    <Nav />
    <Routes>
      <Route element={<PrivateComponent />}>
        <Route path='/' element={<Products />}/>
        <Route path='/add' element={<AddProduct />}/>
        <Route path='/update/:id' element={<UpdateProduct />}/>
        <Route path='/logout' element={<h1>Logout</h1>}/>
        <Route path='/profile' element={<h1>Profile</h1>}/>
      </Route>
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<SignUp />}/>
    </Routes>
    <Footer />
    </>
  )
}

export default App
