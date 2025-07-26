import { Link } from 'react-router-dom'
import LogoutBtn from '../components/LogoutBtn'




const AdminPage = ({ user, productsFromDB }) => {

  return (


    <main>

      <h1>Shalom {user?.displayName} 👋</h1>


      <Link to='/products'>
        <p>Products: {productsFromDB.length}</p>
      </Link>







      <p>Users:0</p>
      <p>Orders:0</p>
      <p>Deliveries:0</p>

      <LogoutBtn />
    </main>
  )
}

export default AdminPage

