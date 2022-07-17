function signUpLocale(message: string) {
  const messages: { [message: string]: string } = {
    'Email already registered.': 'Email já cadastrado'
  }
  return messages[message]
}

export { signUpLocale }
