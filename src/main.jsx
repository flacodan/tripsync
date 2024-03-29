import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider, Route, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import Home from './Home.jsx'
import ToDo from './ToDo.jsx'
import Trips from './Trips.jsx'
import PastTrips from './PastTrips.jsx'
import SignIn from './SignIn.jsx'
import SignUp from './SignUp.jsx'
import Landing from './Landing.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<App />} >
      <Route index element={<Landing/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/sign-in" element={<SignIn/>} />
      <Route path="/sign-up" element={<SignUp/>} />
      <Route path="/to-do" element={<ToDo/>} />
      <Route path="/trips/:trip_id" element={<Trips/>} />
      <Route path="/past-trips" element={<PastTrips/>} />
    </Route>
  ),
);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>,
)
