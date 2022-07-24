export function getApiUrl() {
  // @ts-ignore
  switch (import.meta.env.MODE) {
    case 'production':
      return 'http://144.22.173.41:3333'
    case 'development':
      return 'http://localhost:3333'
    default:
      return 'http://144.22.173.41:3333'
  }
}
