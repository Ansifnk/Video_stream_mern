import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from '../home/Home';


const AppRoute = () => {


    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Home/>}/>
               
            
        )
    );



    return (
        <RouterProvider router={router} />
    )
}
export default AppRoute