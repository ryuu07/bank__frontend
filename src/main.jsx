import { StrictMode } from 'react'
import { createRoot, } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Profile from "./pages/Profile"
import LayoutWithTopbar from './layout/LayoutWithTopbar'
import LayoutWithoutTopbar from './layout/LayoutWithoutTopbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Page404 from './pages/Page404'
import ProtectedRoute from './services/ProtectedRoute'
import Transactions from './pages/Transactions'
import Investment from './pages/Investment'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWithoutTopbar />,
    errorElement: <Page404/>,
    children:[
      {path: 'login', element: <Login/>},
      {path: 'register', element: <Register/>}
    ],
  },
  {
    path: "/",
    element: <LayoutWithTopbar />,
    errorElement: <Page404/>,
    children:[
      {path: 'home', 
        element:( <ProtectedRoute><Home/></ProtectedRoute>)},
      {path: 'profile', 
        element: ( <ProtectedRoute><Profile/></ProtectedRoute>)},
      {path: 'transaction', 
        element:( <ProtectedRoute><Transactions/></ProtectedRoute>)},
      {path: 'investment', 
        element: ( <ProtectedRoute><Investment/></ProtectedRoute>)},
    ],
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
