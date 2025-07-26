import React from 'react'
import { Link } from 'react-router-dom'
import LogoutBtn from '../components/LogoutBtn'





const ProductsListPage = ({ setUser, productsFromDB }) => {




  return (
    <main>

      <h1>Products: {productsFromDB.length}</h1>

      <Link to='/create-product'>
        <button className='green'>Add Product</button>
      </Link>

      <section className='productList'>
        {
          productsFromDB.map((product) => (

            <Link key={product.id} className='productPreview' to={`/product/${product.id}`}>
              <figure  >
                <h3>{product.title}</h3>
                <img alt={product.title} src={product.img1} />
                <p>${product.price}</p>
              </figure>
            </Link>


          ))
        }
      </section>




      <Link to="/admin">
        <button>Home</button>
      </Link>

      {/* <LogoutBtn setUser={setUser} /> */}

    </main>
  )
}

export default ProductsListPage