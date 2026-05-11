import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const sql = getDb();
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        clerk_id TEXT UNIQUE NOT NULL,
        email TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS inventory (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        brand TEXT,
        category TEXT,
        price INTEGER NOT NULL,
        description TEXT,
        image_url TEXT,
        stock INTEGER DEFAULT 1,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        clerk_id TEXT NOT NULL,
        stripe_session_id TEXT UNIQUE,
        inventory_id INTEGER REFERENCES inventory(id),
        amount INTEGER,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    return Response.json({ ok: true, message: "Tables created." });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
