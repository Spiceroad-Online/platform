import { createRedirectPage } from '../lib/redirect-page';

export const prerender = true;

export const GET = () => createRedirectPage('/products/launcher/', 'Continue to the game launcher page');
