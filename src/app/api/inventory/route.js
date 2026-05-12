import { auth } from "@clerk/nextjs/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const sql = getDb();
  try {
    const items = await sql`SELECT * FROM inventory ORDER BY created_at DESC`;
    return Response.json(items);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  const { userId } = auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const sql = getDb();
  try {
    const { name, brand, category, price, description, image_url, stock, wardrobe_id } = await req.json();
    const rent_price = Math.round(price * 0.0834);
    const [item] = await sql`
      INSERT INTO inventory (name, brand, category, price, rent_price, description, image_url, stock, wardrobe_id)
      VALUES (${name}, ${brand}, ${category}, ${price}, ${rent_price}, ${description}, ${image_url}, ${stock ?? 1}, ${wardrobe_id ?? null})
      RETURNING *
    `;
    return Response.json(item, { status: 201 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  const { userId } = auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const sql = getDb();
  try {
    const { id, wardrobe_id } = await req.json();
    await sql`UPDATE inventory SET wardrobe_id = ${wardrobe_id ?? null} WHERE id = ${id}`;
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { userId } = auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const sql = getDb();
  try {
    const { id } = await req.json();
    await sql`DELETE FROM inventory WHERE id = ${id}`;
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
