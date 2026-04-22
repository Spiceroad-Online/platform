import { createRedirectPage } from '../lib/redirect-page';

export const prerender = true;

export const GET = () => createRedirectPage('/products/installer/', 'Continue to the game installer page');
