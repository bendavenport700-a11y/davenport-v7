"use client";
import { useEffect, useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const ALLOWED_EMAIL = "benjamindavenport700@gmail.com";

const S = {
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'Outfit', system-ui, sans-serif",
  cream: "#faf9f7",
  ink: "#0a0a0a",
  tan: "#9c8b78",
  stone: "#e8e3dc",
  gold: "#c4a882",
  muted: "#6b7280",
};

const EMPTY = { name: "", brand: "", category: "", price: "", description: "", image_url: "", stock: "1" };

export default function AdminPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoaded) return;
    if (!user || user.primaryEmailAddress?.emailAddress !== ALLOWED_EMAIL) {
      router.replace("/");
      return;
    }
    load();
  }, [isLoaded, user]);

  async function load() {
    const res = await fetch("/api/inventory");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.price) { setError("Name and price are required."); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: Math.round(parseFloat(form.price) * 100), stock: parseInt(form.stock) || 1 }),
      });
      if (!res.ok) { const d = await res.json(); setError(d.error ?? "Failed to add item."); return; }
      setForm(EMPTY);
      await load();
    } catch {
      setError("Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this item?")) return;
    setDeleting(id);
    try {
      await fetch("/api/inventory", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      await load();
    } finally {
      setDeleting(null);
    }
  }

  if (!isLoaded) {
    return (
      <div style={{ minHeight: "100vh", background: S.cream, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: S.sans, fontSize: 14, color: S.muted }}>Loading...</p>
      </div>
    );
  }

  if (!user || user.primaryEmailAddress?.emailAddress !== ALLOWED_EMAIL) {
    return null;
  }

  const field = (label, key, type = "text", placeholder = "") => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontFamily: S.sans, fontSize: 11, fontWeight: 600, color: S.tan, letterSpacing: "0.06em", textTransform: "uppercase" }}>
        {label}
      </label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        style={{ fontFamily: S.sans, fontSize: 14, color: S.ink, background: "#fff", border: `1px solid ${S.stone}`, borderRadius: 6, padding: "10px 14px", width: "100%" }}
      />
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: S.cream, fontFamily: S.sans }}>
      <header style={{ borderBottom: `1px solid ${S.stone}`, padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ fontFamily: S.serif, fontSize: 22, fontWeight: 600, color: S.ink, textDecoration: "none", letterSpacing: "0.02em" }}>
          Davenport
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <a href="/" style={{ fontFamily: S.sans, fontSize: 13, color: S.muted, textDecoration: "none" }}>Home</a>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontFamily: S.serif, fontSize: 40, fontWeight: 300, color: S.ink, letterSpacing: "0.01em", marginBottom: 8 }}>
            Inventory Admin
          </h1>
          <p style={{ fontFamily: S.sans, fontSize: 14, color: S.muted }}>
            Add and manage items in the shop.
          </p>
        </div>

        {/* Add Item Form */}
        <div style={{ background: "#fff", border: `1px solid ${S.stone}`, borderRadius: 12, padding: "32px 36px", marginBottom: 48 }}>
          <h2 style={{ fontFamily: S.serif, fontSize: 24, fontWeight: 400, color: S.ink, marginBottom: 24 }}>Add New Item</h2>
          <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <div style={{ gridColumn: "1 / -1" }}>{field("Name *", "name", "text", "Ivory Oxford Shirt")}</div>
            {field("Brand", "brand", "text", "J.Crew")}
            {field("Category", "category", "text", "Oxford Shirt")}
            {field("Price (USD) *", "price", "number", "85")}
            {field("Stock", "stock", "number", "1")}
            <div style={{ gridColumn: "1 / -1" }}>{field("Image URL", "image_url", "text", "https://...")}</div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ fontFamily: S.sans, fontSize: 11, fontWeight: 600, color: S.tan, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                placeholder="A crisp ivory oxford with a relaxed fit."
                style={{ fontFamily: S.sans, fontSize: 14, color: S.ink, background: "#fff", border: `1px solid ${S.stone}`, borderRadius: 6, padding: "10px 14px", width: "100%", resize: "vertical" }}
              />
            </div>
            {error && (
              <p style={{ gridColumn: "1 / -1", fontFamily: S.sans, fontSize: 13, color: "#dc2626" }}>{error}</p>
            )}
            <div style={{ gridColumn: "1 / -1" }}>
              <button
                type="submit"
                disabled={saving}
                style={{ fontFamily: S.sans, fontSize: 14, fontWeight: 500, background: S.ink, color: S.cream, border: "none", borderRadius: 8, padding: "12px 28px", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}
              >
                {saving ? "Adding..." : "Add Item"}
              </button>
            </div>
          </form>
        </div>

        {/* Inventory Table */}
        <div>
          <h2 style={{ fontFamily: S.serif, fontSize: 24, fontWeight: 400, color: S.ink, marginBottom: 20 }}>
            Current Inventory ({items.length})
          </h2>
          {items.length === 0 ? (
            <p style={{ fontFamily: S.sans, fontSize: 14, color: S.muted, fontStyle: "italic" }}>No items yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {items.map((item) => (
                <div key={item.id} style={{ background: "#fff", border: `1px solid ${S.stone}`, borderRadius: 10, padding: "16px 24px", display: "flex", alignItems: "center", gap: 20 }}>
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} />
                  ) : (
                    <div style={{ width: 56, height: 56, background: S.stone, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 24 }}>👕</span>
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: S.serif, fontSize: 18, color: S.ink, marginBottom: 2, fontWeight: 400 }}>{item.name}</p>
                    <p style={{ fontFamily: S.sans, fontSize: 12, color: S.muted }}>
                      {[item.brand, item.category].filter(Boolean).join(" · ")} · ${(item.price / 100).toFixed(0)} · {item.stock} in stock
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deleting === item.id}
                    style={{ fontFamily: S.sans, fontSize: 12, fontWeight: 500, background: "transparent", color: "#dc2626", border: "1px solid #fecaca", borderRadius: 6, padding: "7px 14px", cursor: "pointer", flexShrink: 0, opacity: deleting === item.id ? 0.5 : 1 }}
                  >
                    {deleting === item.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
