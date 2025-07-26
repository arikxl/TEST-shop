import { signOut } from 'firebase/auth';
import React from 'react'
import Cookies from 'universal-cookie';
import { auth } from '../firbase-config';
import { useNavigate } from 'react-router-dom';


const cookies = new Cookies();

const LogoutBtn = ({ setUser }) => {

  const navigate = useNavigate();

    const logOut = async () => {
        await signOut(auth);  //שרת
        cookies.remove('kidkod-user-new'); // קוקי בדפדפן
        setUser(null); // המשתנה של היוזר
        navigate('/')
      }

  return (
    <button onClick={logOut}>Logout</button>
  )
}

export default LogoutBtn