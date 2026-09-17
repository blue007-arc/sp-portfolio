import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';

const app = new Hono();

app.use('/assets/*', serveStatic({ root: './dist' }));
app.use('*', serveStatic({ root: './dist' }));
app.get('*', serveStatic( { path: './dist/index.html' }));

const port = Number(process.env.PORT) || 3000;
console.log(`Portfolio server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
