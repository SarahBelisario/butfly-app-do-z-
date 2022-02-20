import React from 'react'
import { Route, Routes as BrowserRouter, useLocation } from 'react-router-dom'
import { Navbar } from '../layout/Navbar'
import { Register } from '../pages/Register'
import { Login } from '../pages/Login'
import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'

export function Routes() {
  return (
    <BrowserRouter>
      <Route path="login" element={<Login />} />
      <Route path="registro" element={<Register />} />
      <Route element={<Navbar />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </BrowserRouter>
  )
}
