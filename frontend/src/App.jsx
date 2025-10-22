/**
 * Website Author: Henri-Dunant CHIK
 * Email: hdchikuru7@gmail.com
 * GitHub: https://github.com/Henridunantchik
 * Phone: +256773840148
 * 
 * Development: Kuna Creatives Africa
 * Website: https://www.kunacreatives.africa/
 */

import React from 'react'
import Signup from './pages/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Profile from './pages/Profile'
import Blog from './pages/Blog'
import CreateBlog from './pages/CreateBlog'
import Dashboard from './pages/Dashboard'
import YourBlog from './pages/YourBlog'
import BlogView from './pages/BlogView'
import Footer from './components/Footer'
import About from './pages/About'
import Comments from './pages/Comments'
import UpdateBlog from './pages/UpdateBlog'
import ProtectedRoute from './components/ProtectedRoute'
import SearchList from './pages/SearchList'
import NotFound from './pages/NotFound'
import ResponsiveAccessibilityTest from './pages/ResponsiveAccessibilityTest'

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar /><Home /><Footer /></>
  },
  {
    path: "/blogs",
    element: <><Navbar /><Blog /><Footer /></>
  },
  {
    path: "/about",
    element: <><Navbar /><About /><Footer /></>
  },
  {
    path: "/search",
    element: <><Navbar /><SearchList /><Footer /></>
  },
  {
    path: "/blogs/:blogId",
    element: <><Navbar /><ProtectedRoute><BlogView /></ProtectedRoute><Footer /></>
  },
  {
    path: "/write-blog",
    element: <><Navbar /><CreateBlog /><Footer /></>
  },

  {
    path: "/profile",
    element: <><Navbar /><Profile /><Footer /></>
  },
  // {
  //   path: "write-blog/:blogId",
  //       element: <><Navbar/><CreateBlog /></>
  // },
  // {
  //   path: "/dashboard",
  //   element: <><Navbar/><Dashboard /></>
  // },
  {
    path: "/dashboard",
    element: <><Navbar /><ProtectedRoute><Dashboard /></ProtectedRoute></>,
    children: [
      {
        path: "write-blog",
        element: <><CreateBlog /></>
      },
      {
        path: "write-blog/:blogId",
        element: <><UpdateBlog /></>
      },
      {
        path: "your-blog",
        element: <YourBlog />
      },
      {
        path: "comments",
        element: <Comments />
      },
      {
        path: "profile",
        element: <Profile />
      },


    ]
  },
  {
    path: "/signup",
    element: <><Navbar /><Signup /><Footer /></>
  },
  {
    path: "/login",
    element: <><Navbar /><Login /><Footer /></>
  },
  {
    path: "/test-responsive-accessibility",
    element: <><Navbar /><ResponsiveAccessibilityTest /><Footer /></>
  },
  {
    path: "*",
    element: <><Navbar /><NotFound /><Footer /></>
  }
])

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
