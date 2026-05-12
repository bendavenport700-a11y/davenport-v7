"use client";
import { useEffect, useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

const ADMIN_EMAILS = ["bendavenport700@gmail.com", "mileslasky@gmail.com"];

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

const EMPTY_ITEM = { name: "", brand: "", category: "", price: "", description: "", image_url: "", stock: "1", wardrobe_id: "" };
const EMPTY_WARDROBE = { name: "", description: "" };

export default function AdminPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [wardrobes, setWardrobes] = useState([]);
  const [form, setForm] = useState(EMPTY_ITEM);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");

  const [wardrobeModal, setWardrobeModal] = useState(false);
  const [wardrobeForm, setWardrobeForm] = useState(EMPTY_WARDROBE);
  const [wardrobeSaving, setWardrobeSaving] = useState(false);
  const [wardrobeError, setWardrobeError] = useState("");

  useEffect(() => {
    if (!isLoaded) return;
    if (!user || !ADMIN_EMAILS.includes(user.primaryEmailAddress?.emailAddress)) {
      router.replace("/");
      return;
    }
    loadAll();
  }, [isLoaded, user]);

  async function loadAll() {
    const [inv, ward] = await Promise.all([
      fetch("/api/inventory").then(r => r.json()),
      fetch("/api/wardrobes").then(r => r.json()),
    ]);
    setItems(Array.isArray(inv) ? inv : []);
    setWardrobes(Array.isArray(ward) ? ward : []);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.price) { setError("Name and price are required."); return; }
    if (!form.wardrobe_id) { setError("Please select a wardrobe."); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Math.round(parseFloat(form.price) * 100),
          stock: parseInt(form.stock) || 1,
          wardrobe_id: parseInt(form.wardrobe_id),
        }),
      });
      if (!res.ok) { const d = await res.json(); setError(d.error ?? "Failed to add item."); return; }
      setForm(EMPTY_ITEM);
      await loadAll();
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
      await loadAll();
    } finally {
      setDeleting(null);
    }
  }

  async function handleWardrobeSubmit(e) {
    e.preventDefault();
    setWardrobeError("");
    if (!wardrobeForm.name.trim()) { setWardrobeError("Name is required."); return; }
    setWardrobeSaving(true);
    try {
      const res = await fetch("/api/wardrobes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wardrobeForm),
      });
      if (!res.ok) { const d = await res.json(); setWardrobeError(d.error ?? "Failed to create wardrobe."); return; }
      const created = await res.json();
      setWardrobes(w => [...w, created].sort((a, b) => a.name.localeCompare(b.name)));
      setForm(f => ({ ...f, wardrobe_id: String(created.id) }));
      setWardrobeModal(false);
      setWardrobeForm(EMPTY_WARDROBE);
    } catch {
      setWardrobeError("Something went wrong.");
    } finally {
      setWardrobeSaving(false);
    }
  }

  if (!isLoaded) {
    return (
      <div style={{ minHeight: "100vh", background: S.cream, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: S.sans, fontSize: 14, color: S.muted }}>Loading...</p>
      </div>
    );
  }

  if (!user || !ADMIN_EMAILS.includes(user.primaryEmailAddress?.emailAddress)) {
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

  const wardrobeMap = Object.fromEntries(wardrobes.map(w => [w.id, w.name]));

  return (
    <div style={{ minHeight: "100vh", background: S.cream, fontFamily: S.sans }}>
      <header style={{ borderBottom: `1px solid ${S.stone}`, padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ fontFamily: S.serif, fontSize: 22, fontWeight: 600, color: S.ink, textDecoration: "none" }}>
          Davenport
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <a href="/" style={{ fontFamily: S.sans, fontSize: 13, color: S.muted, textDecoration: "none" }}>Home</a>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontFamily: S.serif, fontSize: 40, fontWeight: 300, color: S.ink, marginBottom: 8 }}>
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
            {field("Buy Price (USD) *", "price", "number", "85")}
            {form.price && !isNaN(parseFloat(form.price)) ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontFamily: S.sans, fontSize: 11, fontWeight: 600, color: S.tan, letterSpacing: "0.06em", textTransform: "uppercase" }}>Rent Preview</label>
                <p style={{ fontFamily: S.sans, fontSize: 14, color: S.muted, padding: "10px 14px", background: "#f9fafb", border: `1px solid ${S.stone}`, borderRadius: 6 }}>
                  ${Math.round(parseFloat(form.price) * 0.0834)}/mo
                </p>
              </div>
            ) : <div/>}
            {field("Stock", "stock", "number", "1")}

            {/* Wardrobe selector */}
            <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontFamily: S.sans, fontSize: 11, fontWeight: 600, color: S.tan, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Wardrobe *
              </label>
              <div style={{ display: "flex", gap: 10 }}>
                <select
                  required
                  value={form.wardrobe_id}
                  onChange={e => setForm(f => ({ ...f, wardrobe_id: e.target.value }))}
                  style={{ flex: 1, fontFamily: S.sans, fontSize: 14, color: form.wardrobe_id ? S.ink : S.muted, background: "#fff", border: `1px solid ${S.stone}`, borderRadius: 6, padding: "10px 14px", cursor: "pointer" }}
                >
                  <option value="">Select a wardrobe…</option>
                  {wardrobes.map(w => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => { setWardrobeModal(true); setWardrobeForm(EMPTY_WARDROBE); setWardrobeError(""); }}
                  style={{ fontFamily: S.sans, fontSize: 12, fontWeight: 600, background: "transparent", color: S.tan, border: `1px solid ${S.stone}`, borderRadius: 6, padding: "10px 16px", cursor: "pointer", whiteSpace: "nowrap", letterSpacing: "0.04em" }}
                >
                  + New Wardrobe
                </button>
              </div>
            </div>

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
                      {item.wardrobe_id && wardrobeMap[item.wardrobe_id] && (
                        <span style={{ marginLeft: 6, background: "#f0ebe3", border: `1px solid #ddd5c8`, borderRadius: 10, padding: "1px 8px", fontSize: 11, color: S.tan }}>
                          {wardrobeMap[item.wardrobe_id]}
                        </span>
                      )}
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

      {/* Create Wardrobe Modal */}
      {wardrobeModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 600, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "#fff", width: "100%", maxWidth: 440, borderRadius: 12, padding: "36px 36px", position: "relative" }}>
            <button
              onClick={() => setWardrobeModal(false)}
              style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", fontSize: 20, color: S.muted, lineHeight: 1 }}
            >✕</button>
            <h3 style={{ fontFamily: S.serif, fontSize: 26, fontWeight: 600, color: S.ink, marginBottom: 6 }}>New Wardrobe</h3>
            <p style={{ fontFamily: S.sans, fontSize: 13, color: S.muted, marginBottom: 24 }}>Create a wardrobe to group inventory items.</p>
            <form onSubmit={handleWardrobeSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontFamily: S.sans, fontSize: 11, fontWeight: 600, color: S.tan, letterSpacing: "0.06em", textTransform: "uppercase" }}>Name *</label>
                <input
                  autoFocus
                  value={wardrobeForm.name}
                  onChange={e => setWardrobeForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Spring Essentials"
                  style={{ fontFamily: S.sans, fontSize: 14, color: S.ink, background: S.cream, border: `1px solid ${S.stone}`, borderRadius: 6, padding: "10px 14px" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontFamily: S.sans, fontSize: 11, fontWeight: 600, color: S.tan, letterSpacing: "0.06em", textTransform: "uppercase" }}>Description</label>
                <textarea
                  value={wardrobeForm.description}
                  onChange={e => setWardrobeForm(f => ({ ...f, description: e.target.value }))}
                  rows={3}
                  placeholder="What's the vibe of this wardrobe?"
                  style={{ fontFamily: S.sans, fontSize: 14, color: S.ink, background: S.cream, border: `1px solid ${S.stone}`, borderRadius: 6, padding: "10px 14px", resize: "vertical" }}
                />
              </div>
              {wardrobeError && <p style={{ fontFamily: S.sans, fontSize: 13, color: "#dc2626" }}>{wardrobeError}</p>}
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
                <button
                  type="button"
                  onClick={() => setWardrobeModal(false)}
                  style={{ fontFamily: S.sans, fontSize: 13, background: "transparent", color: S.muted, border: `1px solid ${S.stone}`, borderRadius: 6, padding: "10px 20px", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={wardrobeSaving}
                  style={{ fontFamily: S.sans, fontSize: 13, fontWeight: 600, background: S.ink, color: S.cream, border: "none", borderRadius: 6, padding: "10px 24px", cursor: wardrobeSaving ? "not-allowed" : "pointer", opacity: wardrobeSaving ? 0.7 : 1 }}
                >
                  {wardrobeSaving ? "Creating…" : "Create Wardrobe"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
