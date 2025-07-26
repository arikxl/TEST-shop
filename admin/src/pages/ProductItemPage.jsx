import { Link, useParams } from 'react-router-dom'
import ProductForm from '../components/ProductForm';

const ProductItemPage = ({ products }) => {


  const id = +useParams().id;
  const product = products.find((product) => product.id === id);


  return (
    <main>

      <h1>Product {id}</h1>

      {
        product
          ? (
            <>
              {/* <h2>{product.title}</h2> */}
              <h3>Created at: {new Date(product?.createdAt).toLocaleDateString()}</h3>

              <ProductForm product={product } />

            </>

          )
          : ('Product Not Found')
      }


      <br />

      <Link to='/products'>
        <button>Products</button>
      </Link>
      &nbsp;
      <Link to='/admin'>
        <button>Home</button>
      </Link>
    </main>
  )
}

export default ProductItemPage