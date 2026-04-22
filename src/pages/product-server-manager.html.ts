import { createRedirectPage } from '../lib/redirect-page';

export const prerender = true;

export const GET = () => createRedirectPage('/products/server-manager/', 'Continue to the server manager page');
