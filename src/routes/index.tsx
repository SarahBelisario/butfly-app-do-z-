import { Route, Routes as BrowserRouter } from 'react-router-dom'
import { Navbar } from '../layout/Navbar'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Home } from '../pages/Home'
import { Checkout } from '../pages/Checkout'
import { NotFound } from '../pages/NotFound'
import { Products } from '../pages/Products'

export function Routes() {
  return (
    <BrowserRouter>
      <Route path="login" element={<Login />} />
      <Route path="registro" element={<Register />} />
      <Route element={<Navbar />}>
        <Route path="/" element={<Home />} />
        <Route path="/frente-de-caixa" element={<Checkout />} />
        <Route path="produtos" element={<Products />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </BrowserRouter>
  )
}
