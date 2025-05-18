---
title: "Fastify + Vercel = Best Vibes - Single file, 2 mins"
slug: fastify-vercel-best-vibes-single-file-2-mins
date: 2025-04-29
url: https://mfyz.com/?p=967
tags: ["api","Back-End","fastify","Other","rest","typescript","vercel"]
category: Back-End
migration: {"wpId":967,"wpPostDate":"2025-04-29T12:30:00.000Z"}
---

![](/images/archive/en/2025/04/vibin.gif)

Sometimes you don’t need a full-blown app. You just need one endpoint. Maybe it’s for a tool you’re building. Maybe it’s a prototype. Or maybe, it’s just for the vibes. Fastify + Vercel is a great combo for that.

Let’s walk through how you can build and deploy a `/books` API endpoint using Fastify and Drizzle ORM — and how surprisingly easy it is.

## Why Vercel for an API?

You probably know Vercel as the go-to place for frontend apps, especially Next.js. But it also works beautifully for backend use cases, like single endpoint APIs.

Here’s why:

*   **Zero-config deploys**

*   **Built-in scalability**

*   **Serverless by default**

*   **Free tier good enough for small APIs**

*   **Instant previews for each commit**

That means your idea can go from local to live in minutes.

## Let’s Build `/books` CRUD

In this example, we’ll build a RESTful CRUD endpoint for managing books. We’ll use Fastify as the HTTP framework, and Drizzle as the ORM to talk to a database. You can swap Drizzle with anything else (Prisma, Kysely, raw SQL), but for this demo, we’ll show Drizzle in the code.

### File: `api/books.ts`

```
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { FastifyRequest, FastifyReply } from 'fastify';
import Fastify from 'fastify';

const db = drizzle(sql);

const fastify = Fastify();

fastify.get('/books', async (req: FastifyRequest, reply: FastifyReply) => {
  const books = await db.query.books.findMany();
  return reply.send(books);
});

fastify.post('/books', async (req: FastifyRequest, reply: FastifyReply) => {
  const body = req.body as { title: string; author: string };
  const inserted = await db.insertInto('books').values(body).returning();
  return reply.code(201).send(inserted);
});

fastify.put('/books/:id', async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string };
  const body = req.body as { title?: string; author?: string };
  const updated = await db.update('books').set(body).where({ id }).returning();
  return reply.send(updated);
});

fastify.delete('/books/:id', async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string };
  await db.deleteFrom('books').where({ id });
  return reply.code(204).send();
});

export default fastify;

```

This file is all you need. Put it under the `api/` folder in a Vercel project. Vercel will automatically treat it as a serverless function.

### Deploy it

```
npm install -g vercel
vercel login
vercel

```

That’s it. You’ll get a working API endpoint at something like:

```
https://your-app-name.vercel.app/api/books

```

* * *

## Test It with `curl`

Here’s how to add a book:

```
curl -X POST <https://your-app-name.vercel.app/api/books> \
  -H "Content-Type: application/json" \
  -d '{"title": "The Pragmatic Programmer", "author": "Andy Hunt"}'

```

You’ll get a `201 Created` with the new book entry.

## Popular Fastify Plugins

Fastify has a rich plugin ecosystem. Some handy ones to know:

*   [`@fastify/swagger`](https://github.com/fastify/fastify-swagger) – Auto-generate OpenAPI docs

*   [`@fastify/rate-limit`](https://github.com/fastify/fastify-rate-limit) – Protect endpoints from abuse

*   [`@fastify/jwt`](https://github.com/fastify/fastify-jwt) – Simple JWT authentication

*   [`@fastify/cors`](https://github.com/fastify/fastify-cors) – Easy CORS handling

Adding them is just a few lines of code. That’s part of the joy of Fastify.

## Best Vibes

Fastify on Vercel is perfect for AI-generated APIs. When tools or agents generate code for your backend, you want:

*   Fast iteration

*   Clear docs

*   Built-in tests

*   Easy deploys

This combo checks all those boxes. It’s low friction, flexible, and fun to build with. You can write code manually or have AI generate it—and either way, it just works.

When you want to build fast and iterate even faster, this is a stack worth reaching for.

* * *

That’s it. One file, fully working CRUD API, deployable in under 2 minutes. Enjoy the vibes 🧃