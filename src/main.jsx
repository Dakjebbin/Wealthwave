import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layouts/layout.jsx'
import Login from './authentication/Login.jsx'
import Register from './authentication/Register.jsx'
// import Dashboard from './components/Dashboard.jsx'
//import { ToastContainer } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import TermsConditions from './components/Terms.jsx'
import AuthContextProvider from './context/auth-context.jsx'
import Sidebar from './components/Sidebar.jsx'
// import DashboardLayout from './layouts/DashboardLayout.jsx'
import DashCourses from './components/DashCourses.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        index:true,
        element: <App/>
      },
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "register",
        element: <Register/>,
      },
      {
        path: "terms",
        element: <TermsConditions/>,
      },
    ],
  },
      {
        path: "/dashboard",
        element: <Sidebar/>,
       
      },{
        path:"/courses",
        element: <DashCourses/>
      }
     
  
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
   <RouterProvider router={router} />
   {/* <ToastContainer /> */}
    </AuthContextProvider>
  </StrictMode>,
)
