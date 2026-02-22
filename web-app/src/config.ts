export const routePaths = {
  login: '/auth/login',
  register: '/auth/register',
  home: '/',
  builder: '/builder',
  admin: '/admin',
} as const;

export const config = {
  /** The query-string key that stores the post-login redirect URL */
  callbackUrlName: 'callbackUrl',
} as const;
