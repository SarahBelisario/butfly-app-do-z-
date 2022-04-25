function signUpLocale(message: string) {
  const messages = {
    'Email already registered.': 'Email já cadastrado'
  }
  return messages[message]
}

export { signUpLocale }
