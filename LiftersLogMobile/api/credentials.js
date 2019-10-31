export const BASE = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
 users: 'http://127.0.0.1:3000/users',
  login: 'http://127.0.0.1:3000/users/sign_in',
  validateToken: 'http://127.0.0.1:3000/users/sign_in',
  coreLifts: 'http://127.0.0.1:3000/users/:user_id/core_lifts',
  olyLifts: 'http://127.0.0.1:3000/users/:user_id/olympic_lifts',
}