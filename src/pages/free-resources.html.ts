import { createRedirectPage } from '../lib/redirect-page';

export const prerender = true;

export const GET = () => createRedirectPage('/free-resources/', 'Continue to free resources');
