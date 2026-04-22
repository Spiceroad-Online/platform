export const createRedirectPage = (destination: string, label: string) =>
    new Response(
        `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0;url=${destination}" />
    <link rel="canonical" href="${destination}" />
    <title>Redirecting</title>
  </head>
  <body>
    <p><a href="${destination}">${label}</a></p>
  </body>
</html>
`,
        {
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
            },
        },
    );
