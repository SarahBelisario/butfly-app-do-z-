import React, { createContext, useState } from 'react'

export const AuthContext = createContext<AuthContextType>(null!)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>({ name: '' })
  const [companies, setCompanies] = useState<any[]>([])

  const signIn = (user: { name: string }, companies: any[], callback: VoidFunction) => {
    const companyUid = localStorage.getItem('@Butfly:companyUid')
    if (!companyUid) localStorage.setItem('@Butfly:companyUid', companies[0]?.uid)
    setUser(user)
    setCompanies(companies)
    callback()
  }

  const signOut = (callback: VoidFunction) => {
    setUser(null)
    setCompanies([])
    localStorage.removeItem('token')
    callback()
  }

  const value = { user, companies, signIn, signOut }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
