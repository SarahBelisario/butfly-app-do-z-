import { Route, Routes as BrowserRouter } from 'react-router-dom'
import { Navbar } from '../layout/Navbar'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Home } from '../pages/Home'
import { Checkout } from '../pages/Checkout'
import { NotFound } from '../pages/NotFound'
import { Products } from '../pages/Products'
import { ThemeSelection } from '../pages/ThemeSelection'
import { Product } from '../pages/Product'
import { Customer } from '../pages/Customer'
import { NewCustomer } from '../pages/NewCustomer'
import { InitialSetup } from '../pages/InitialSetup'
import { AuthProvider } from '../contexts/AuthProvider'
import { RequireAuth } from '../components/RequireAuth'

export function Routes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Register />} />
        <Route
          path="/primeiros-passos"
          element={
            <RequireAuth>
              <InitialSetup />
            </RequireAuth>
          }
        />
        <Route element={<Navbar />}>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/ponto-de-venda"
            element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            }
          />
          <Route
            path="/clientes"
            element={
              <RequireAuth>
                <Customer />
              </RequireAuth>
            }
          />
          <Route
            path="/clientes/novo-cliente"
            element={
              <RequireAuth>
                <NewCustomer />
              </RequireAuth>
            }
          />
          <Route
            path="/produtos"
            element={
              <RequireAuth>
                <Products />
              </RequireAuth>
            }
          />
          <Route
            path="/produtos/:id"
            element={
              <RequireAuth>
                <Product />
              </RequireAuth>
            }
          />
          <Route
            path="/personalizar"
            element={
              <RequireAuth>
                <ThemeSelection />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </BrowserRouter>
    </AuthProvider>
  )
}
