
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.css'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import ProductItemPage from './pages/ProductItemPage'
import ProductsListPage from './pages/ProductsListPage'
import CreateProductPage from './pages/CreateProductPage'


const cookies = new Cookies();


// const products = [
//   {
//     id: 1111,
//     title: 'SHIRT',
//     price: 99
//   },
//   {
//     id: 2222,
//     title: 'JEANS',
//     price: 22
//   },
//   {
//     id: 3333,
//     title: 'SHOES',
//     price: 50
//   }
// ]


function App() {

  const [user, setUser] = useState(cookies.get('kidkod-user-new') || null);
  // console.log(user)

  const [productsFromDB, setProductsFromDB] = useState([]);


  useEffect(() => {

    axios.get('http://localhost:5000/products')
      .then(res => setProductsFromDB(res.data))
      .catch(err => console.error(err))

  }, [productsFromDB])


  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage setUser={setUser} user={user} />} />

        <Route path="/admin" element={<AdminPage user={user} productsFromDB={productsFromDB} />} />

        <Route path="/products" element={<ProductsListPage setUser={setUser} productsFromDB={productsFromDB} />} />
       
        <Route path="/product/:id" element={<ProductItemPage products={productsFromDB} />} />

        <Route path="/create-product" element={<CreateProductPage />} />

        <Route path="*" element={<p>Please log in to access the app.</p>} />

      </Routes>
    </>
  )
}

export default App
