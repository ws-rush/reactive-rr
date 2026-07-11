import { http, passthrough } from 'msw'

// Example handlers — enable by setting VITE_IS_MOCKING=true in your .env.
// Add your own handlers here, see https://mswjs.io/docs/
export const handlers = [
  // Pass through local assets so the app loads normally.
  http.get('/app/locales/*', () => passthrough()),

  // Example mocked endpoint:
  // http.get('https://api.example.com/message', () =>
  //   HttpResponse.json({ hello: 'from msw' }),
  // ),
]
