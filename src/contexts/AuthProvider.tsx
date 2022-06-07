import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext<AuthContextType>(null!)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>({ name: '' })
  const [companies, setCompanies] = useState<any[]>([])
  const navigate = useNavigate()

  const signIn = (user: { name: string }, companies: any[], callback: VoidFunction) => {
    const companyUid = localStorage.getItem('@Butfly:companyUid')
    if (!companyUid && companies[0]?.uid) localStorage.setItem('@Butfly:companyUid', companies[0]?.uid)
    setUser(user)
    setCompanies(companies)
    callback()
    if (!companies[0]) navigate('/primeiros-passos')
  }

  const signOut = (callback: VoidFunction) => {
    setUser(null)
    setCompanies([])
    callback()
    localStorage.removeItem('@Butfly:companyUid')
    localStorage.removeItem('@Butfly:token')
  }

  const value = { user, companies, signIn, signOut }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
