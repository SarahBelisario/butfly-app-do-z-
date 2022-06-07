interface AuthContextType {
  user: any
  companies: any[]
  signIn: (user: { name: string }, companies: any[], callback: VoidFunction) => void
  signOut: (callback: VoidFunction) => void
}
