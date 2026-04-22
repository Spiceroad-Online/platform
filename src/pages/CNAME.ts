export const prerender = true;

export const GET = () =>
    new Response('platform.spiceroad.online\n', {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
