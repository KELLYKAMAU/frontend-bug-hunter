import './App.css'
import UserLogin from './components/auth/Userlogin'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'

// import About from './components/'
import Contact from './components/contact/Contact'
import Registration from './components/auth/registration'
import { Admindashboard } from './components/Admin dashboard/Aside/Aside/Dashboard'
import Landing from './components/Landing'


function App() {
  const router = createBrowserRouter([
    {
     path: '/',
     element: <Landing/>
    },
    // {
    //   path: '/about',
    //   element: <About />
    // },
    {
      path: '/contact',
      element: <Contact />
    },
    {
      path: '/userLogin',
      element: <UserLogin />
    },
    {
      path: '/register',
      element: <Registration />
    },
    {
      path: '/admin/dashboard',
      element: <Admindashboard />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
