import { createRedirectPage } from '../lib/redirect-page';

export const prerender = true;

export const GET = () =>
    createRedirectPage('/products/server-command-center/', 'Continue to the Server Command Center page');
