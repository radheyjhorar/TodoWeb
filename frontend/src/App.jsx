import { useState, useEffect } from 'react'
import './App.css'
import { Home, Login, PageNotFound, Register } from './pages/index'
import { createBrowserRouter, Navigate, Route, RouterProvider, Routes } from 'react-router-dom';
import { Layout } from './components';
import {useAuth} from './context/AuthContext';

function App() {
  const {  login, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if(storedUser) setUser(JSON.parse(storedUser));
    setLoading(false); // Set loading to false after check
  }, []);
  
  const handleAuth = (user) => { 
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  const handleLogout = () =>{
    localStorage.removeItem('user');
    setUser(null);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Navigate to={user ? '/home' : "/login"} />,
        },
        {
          path: "/register",
          element: user?<Navigate to="/home" />:<Register onRegister={handleAuth} />,
        },
        {
          path: "/login",
          element: user?<Navigate to="/home" />:<Login onLogin={handleAuth} />,
        },
        {
          path: "/home",
          element: user?<Home user={user} />:<Navigate to="/login" />,
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ]
    }
  ])

  if(loading) return <div>Loading...</div>; // Prevent premature routing

  return <RouterProvider router={router} />

  // if(!user) {
  //   return (
  //     <div>
  //       <Register onRegister={handleAuth} />
  //       <Login onLogin={handleAuth} />
  //     </div>
  //   )
  // }
  
  // return (
  //   <div className='app-container'>
  //     {/* <h1>Create your today Todos</h1> */}
  //     {user && <button onClick={handleLogout}>Logout</button>}
  //     {/* <Home user={user && user} /> */}

  //     <Routes>
  //       {/* Public route redirects */}

  //       <Route path='/' element={<Navigate to={user ? '/home' : "/login"} /> } />
  //       <Route path='/register' element={user?<Navigate to="/home" />:<Register onRegister={handleAuth} />}/>
  //       <Route path='/login' element={user?<Navigate to="/home" />:<Login onLogin={handleAuth} />} />
  //       {/* Private Route */}
  //       <Route path='/home' element={user?<Home user={user} />:<Navigate to="/login" />} />
  //       {/* Catch-all redirect */}
  //       <Route path='*' element={<PageNotFound />} />
  //     </Routes>

  //   </div>
  // );
}

export default App;
