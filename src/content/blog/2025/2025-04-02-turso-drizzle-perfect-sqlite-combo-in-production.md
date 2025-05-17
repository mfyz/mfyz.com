---
title: "turso + drizzle, perfect sqlite combo in production"
slug: turso-drizzle-perfect-sqlite-combo-in-production
date: 2025-04-02
url: https://mfyz.com/?p=961
tags: ["Back-End","drizzle","orm","sqlite","turso","typescript"]
category: Back-End
migration: {"wpId":961,"wpPostDate":"2025-04-02T19:49:14.000Z"}
---

![](/images/archive/en/2025/04/image.png)

Even though there are some skepticism around using sqlite in production, but I find it really mature and perfectly acceptable in a lot of projects.

Drizzle is a great typescript ORM.

Managing schema and migrations with drizzle is great.

Turso is a hosted SQLite service. Their free tier is extremely generous.

Running local sqlite in local development and tests makes it super easy and portable.

# Turso + Drizzle: Perfect SQLite in Production

Even though there's some skepticism around using SQLite in production, I find it really mature and perfectly acceptable in a lot of projects. SQLite has proven its worth, becoming a solid choice for applications requiring a lightweight database without the overhead of more complex setups.

## The Benefits of Using SQLite in Production

Using SQLite can be a game-changer for various reasons:

*   **Simplicity**: Its ease of setup and minimal configuration is perfect for rapid development.
*   **Lightweight**: Taking up a fraction of the resources compared to other databases.
*   **Portability**: SQLite databases can be easily moved around, making it a breeze to manage local development and testing environments.

## Introducing Drizzle

Now, let’s talk about Drizzle. Drizzle is a fantastic TypeScript ORM (Object-Relational Mapping) tool. Here’s why I think Drizzle is great:

*   **Type Safety**: Built with TypeScript, it provides type safety, reducing runtime errors.
*   **Simple Relationships**: Managing schema and migrations with Drizzle is a walk in the park. You can ease your work by using a clear and concise API, simplifying data manipulation and access.

## A Great Match: Turso and Drizzle

Turso is a hosted SQLite service that has come to embrace modern development workflows. Their **free tier is extremely generous**, making it an excellent option for both startups and solo developers looking to keep costs down while still enjoying the benefits of a sophisticated database.

The synergy between Turso and Drizzle makes for an efficient development experience. You can run local SQLite for development and testing, and when you're ready to go live, transition to Turso seamlessly. Here’s why this combo works so well:

*   **Connection Simplicity**: Switching from a local SQLite file to a Turso-hosted database is smooth, making the transition to production seamless.
*   **Consistent Development Environment**: You can maintain consistency between your local and production environments, reducing deployment headaches.

## Setting Up Turso and Local DB with Drizzle

To get started with this powerful duo, you’ll first need to set up Drizzle to work with SQLite. Here’s how you can do that:

### Step 1: Install Drizzle ORM

You can easily add Drizzle to your project using npm or yarn:

```
npm install drizzle-orm
```

or

```
yarn add drizzle-orm
```

### Step 2: Configure Drizzle with SQLite

You’ll want to create a configuration file to set up your connection:

```
import { drizzle } from 'drizzle-orm/sqlite';
import { SqliteDialect } from 'drizzle-orm/sqlite';
import sqlite3 from 'sqlite3';

const db = drizzle(new sqlite3.Database('path-to-your-database.db'), {
  dialect: new SqliteDialect(),
});
```

### Step 3: Use Turso for Production

When you’re ready to use Turso, you need to adjust your connection. Turso provides a unique connection string that you can find in your dashboard. Just replace the database connection in the code above:

```
const db = drizzle(new sqlite3.Database('your-turso-db-url'), {
  dialect: new SqliteDialect(),
});
```

## Combined Snippet

Two code snippets above are independent from each other, either local sqlite db, or remote turso db. Here is what I use in combined database wrapper that handles both local sqlite when I run my app in my development machine, and uses turso in production when I deploy my app on my servers.

```
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import sqlite3 from 'sqlite3';

let db: ReturnType<typeof drizzle>;

if (process.env.NODE\_ENV === 'production') {
  // Use Turso/libSQL
  const client = createClient({
    url: process.env.TURSO\_DB\_URL!,
    authToken: process.env.TURSO\_DB\_AUTH\_TOKEN, // optional if public
  });

  db = drizzle(client);
} else {
  // Use local SQLite
  const sqlite = new sqlite3.Database('local.db');
  // @ts-ignore: drizzle types are overloaded here
  db = drizzle(sqlite); // This works because drizzle handles both clients
}

export { db };
```

## Set up your schema and use awesome drizzle methods

Example books, authors in a schema:

```
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const authors = sqliteTable('authors', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  bio: text('bio'),
});

export const books = sqliteTable('books', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  authorId: integer('author\_id').notNull().references(() => authors.id),
  publishedYear: integer('published\_year'),
});

export const authorsRelations = relations(authors, ({ many }) => ({
  books: many(books),
}));

export const booksRelations = relations(books, ({ one }) => ({
  author: one(authors, {
    fields: \[books.authorId\],
    references: \[authors.id\],
  }),
}));
```

Here is what some Drizzle usage examples looks like

Insert an author and a book:

```
await db.insert(authors).values({ name: 'Jane Austen', bio: 'English novelist' });

await db.insert(books).values({
  title: 'Pride and Prejudice',
  authorId: 1,
  publishedYear: 1813,
});
```

Query books with their authors:

```
const allBooks = await db.query.books.findMany({
  with: {
    author: true,
  },
});
```

## The combination of Turso and Drizzle proves to be a perfect match for SQLite in production.

You get the maturity and reliability of SQLite, combined with the power of TypeScript through Drizzle, all while benefiting from the convenience that Turso offers as a managed service.

If you're still skeptical about using SQLite in production, I encourage you to dive in and give it a shot. With the right tools at hand, you'll find it can be a robust and efficient solution for your applications. Give it a try, and happy coding!

For more information about Turso and Drizzle, check out their official websites: [Turso](https://turso.tech) and [Drizzle ORM](https://orm.drizzle.team).