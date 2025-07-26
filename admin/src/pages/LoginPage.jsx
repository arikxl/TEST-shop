import { signInWithPopup } from 'firebase/auth'
import { useEffect } from 'react'
import { auth, googleProvider } from '../firbase-config'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom';


const cookies = new Cookies({});

const LoginPage = ({ setUser, user }) => {

  const navigate = useNavigate();


  const handleLogin = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      console.log("welcome", result.user);
      cookies.set('kidkod-user-new', result.user);
      setUser(auth.currentUser)
      if (auth.currentUser.email === 'arikxl@gmail.com') navigate('/admin');
    })
  }


  useEffect(() => {
    if (user?.email === 'arikxl@gmail.com') {
      navigate('/admin');
    }
  },[])


  return (
    <main>

      {
        user
          ? (<h1>YOU ARE CONNECTED</h1>)
          : (<button onClick={handleLogin}>LOGIN</button>)
      }



    </main>
  )
}

export default LoginPage