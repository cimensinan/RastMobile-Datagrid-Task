import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from '../pages/home-page';
import NotFoundPage from '../pages/common/not-found-page';

const CustomRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/'>
                <Route index element={<HomePage/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default CustomRoutes