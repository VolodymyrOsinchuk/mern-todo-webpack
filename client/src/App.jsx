import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { TodoProvider } from './context/TodoContext'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import TodoPage from './pages/TodoPage'
import NotFound from './pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'todos',
        element: <TodoPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

function App() {
  return (
    <TodoProvider>
      <RouterProvider router={router} />
    </TodoProvider>
  )
}

export default App
