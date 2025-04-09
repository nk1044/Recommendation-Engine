import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from './Component/Layout';
import Home from './Pages/Home';
import Recommend from './Pages/Recommend';
import Shuffle from './Pages/Shuffle';

const router = createBrowserRouter([{
  path: "/",
  element: <Layout />,
  children: [
    {path: "", element: <Home />},
    {path: "recommend", element: <Recommend />},
  ],
}]);


function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
