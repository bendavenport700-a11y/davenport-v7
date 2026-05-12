import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const sql = getDb();
  const wardrobes = await sql`SELECT * FROM wardrobes ORDER BY name ASC`;
  return Response.json(wardrobes);
}

export async function POST(req) {
  const { name, description } = await req.json();
  if (!name?.trim()) return Response.json({ error: "Name is required" }, { status: 400 });

  const sql = getDb();
  try {
    const [wardrobe] = await sql`
      INSERT INTO wardrobes (name, description)
      VALUES (${name.trim()}, ${description?.trim() || null})
      RETURNING *
    `;
    return Response.json(wardrobe, { status: 201 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
