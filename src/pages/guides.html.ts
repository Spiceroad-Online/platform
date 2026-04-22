import { createRedirectPage } from '../lib/redirect-page';

export const prerender = true;

export const GET = () => createRedirectPage('/guides/', 'Continue to guides');
