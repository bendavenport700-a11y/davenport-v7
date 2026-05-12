"use client";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export const dynamic = "force-dynamic";

const S = {
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'Outfit', system-ui, sans-serif",
  cream: "#faf9f7",
  ink: "#0a0a0a",
  tan: "#9c8b78",
  stone: "#e8e3dc",
  muted: "#6b7280",
  gold: "#c4a882",
};

const EARN_WAYS = [
  { action: "Share a community post",    pts: 5,  icon: "📸" },
  { action: "Refer a friend",            pts: 1,  icon: "🤝" },
  { action: "Leave a piece review",      pts: 10, icon: "⭐" },
  { action: "Spend $50+ on an order",    pts: 20, icon: "🛍️" },
];

const REDEEM_WAYS = [
  { reward: "$10 off rentals $50+", pts: 100, icon: "🎁" },
];

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function AccountPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [points, setPoints] = useState(null);
  const [history, setHistory] = useState([]);
  const [referralCode, setReferralCode] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isSignedIn || !user?.id) return;
    fetch(`/api/points?clerk_id=${user.id}`)
      .then(r => r.json())
      .then(d => { setPoints(d.points ?? 0); setHistory(d.history ?? []); })
      .catch(() => {});
    fetch(`/api/referral?clerk_id=${user.id}`)
      .then(r => r.json())
      .then(d => setReferralCode(d.referral_code ?? null))
      .catch(() => {});
  }, [isSignedIn, user?.id]);

  const referralLink = referralCode
    ? `https://davenport.rentals/?ref=${referralCode}`
    : null;

  function copyLink() {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (!isLoaded) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:S.cream }}>
        <p style={{ fontFamily:S.sans, fontSize:13, color:S.muted }}>Loading…</p>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:S.cream, fontFamily:S.sans }}>
        <p style={{ fontSize:13, letterSpacing:"0.16em", textTransform:"uppercase", color:S.tan, marginBottom:16 }}>Davenport</p>
        <h1 style={{ fontFamily:S.serif, fontSize:40, fontWeight:600, color:S.ink, marginBottom:12 }}>Members Only</h1>
        <p style={{ fontSize:14, color:S.muted, marginBottom:32 }}>Sign in to view your points and referral link.</p>
        <a href="/" style={{ background:S.ink, color:S.cream, padding:"12px 32px", fontSize:12, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", textDecoration:"none" }}>Go Home</a>
      </div>
    );
  }

  const progressPct = Math.min(100, ((points ?? 0) % 100));

  return (
    <div style={{ minHeight:"100vh", background:S.cream, fontFamily:S.sans }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');`}</style>

      {/* Header */}
      <div style={{ background:"#fff", borderBottom:`1px solid ${S.stone}`, padding:"0 40px", height:60, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <a href="/" style={{ fontFamily:S.serif, fontSize:22, fontWeight:600, color:S.ink, textDecoration:"none", letterSpacing:"-0.5px" }}>Davenport</a>
        <a href="/" style={{ fontFamily:S.sans, fontSize:12, color:S.muted, textDecoration:"none", letterSpacing:"0.04em" }}>← Back</a>
      </div>

      <div style={{ maxWidth:860, margin:"0 auto", padding:"52px 40px 80px" }}>
        <p style={{ fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase", color:S.tan, marginBottom:10, fontWeight:500 }}>Your Account</p>
        <h1 style={{ fontFamily:S.serif, fontSize:42, fontWeight:600, letterSpacing:"-1px", color:S.ink, marginBottom:8 }}>
          {user?.firstName ? `Hey, ${user.firstName}.` : "Your Points"}
        </h1>
        <p style={{ fontSize:14, color:S.muted, marginBottom:48 }}>{user?.primaryEmailAddress?.emailAddress}</p>

        {/* Points card */}
        <div style={{ background:S.ink, padding:"40px 44px", marginBottom:32, display:"grid", gridTemplateColumns:"1fr 1fr", gap:32 }}>
          <div>
            <p style={{ fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase", color:"#6b5e4e", marginBottom:12, fontWeight:500 }}>Point Balance</p>
            <p style={{ fontFamily:S.serif, fontSize:72, fontWeight:600, color:S.cream, lineHeight:1, letterSpacing:"-2px", marginBottom:6 }}>
              {points ?? "—"}
            </p>
            <p style={{ fontSize:12, color:S.tan }}>points</p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", justifyContent:"center" }}>
            <p style={{ fontSize:12, color:"#9ca3af", marginBottom:10 }}>Progress to next $10 off</p>
            <div style={{ background:"#1f2937", height:6, borderRadius:3, overflow:"hidden", marginBottom:8 }}>
              <div style={{ background:S.gold, height:"100%", width:`${progressPct}%`, transition:"width 0.6s ease", borderRadius:3 }}/>
            </div>
            <p style={{ fontSize:11, color:S.tan }}>
              {points !== null ? `${(points ?? 0) % 100} / 100 pts` : "…"} — <strong style={{ color:S.gold }}>100 pts = $10 off rentals $50+</strong>
            </p>
          </div>
        </div>

        {/* Referral */}
        <div style={{ background:"#fff", border:`1px solid ${S.stone}`, padding:"32px 36px", marginBottom:32 }}>
          <p style={{ fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase", color:S.tan, marginBottom:10, fontWeight:500 }}>Referral Program</p>
          <h2 style={{ fontFamily:S.serif, fontSize:26, fontWeight:600, color:S.ink, marginBottom:8 }}>Earn 1 pt per referral</h2>
          <p style={{ fontSize:13, color:S.muted, marginBottom:20, lineHeight:1.7 }}>Share your link. When someone signs up with your code, you get 1 point. No limit.</p>
          {referralLink ? (
            <div style={{ display:"flex", gap:0, flexWrap:"wrap" }}>
              <div style={{ flex:1, background:S.cream, border:`1px solid ${S.stone}`, padding:"11px 16px", fontFamily:"monospace", fontSize:12, color:S.muted, minWidth:200, overflowX:"auto", whiteSpace:"nowrap" }}>
                {referralLink}
              </div>
              <button onClick={copyLink} style={{ background:S.ink, color:S.cream, border:"none", cursor:"pointer", padding:"11px 24px", fontSize:12, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", flexShrink:0 }}>
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          ) : (
            <p style={{ fontSize:12, color:S.muted }}>Generating your link…</p>
          )}
          {referralCode && (
            <p style={{ fontSize:11, color:S.tan, marginTop:10 }}>Your code: <strong style={{ letterSpacing:"0.08em" }}>{referralCode}</strong></p>
          )}
        </div>

        {/* Earn + Redeem tables */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:32 }}>
          <div style={{ background:"#fff", border:`1px solid ${S.stone}`, padding:"28px 28px" }}>
            <h3 style={{ fontFamily:S.serif, fontSize:20, fontWeight:600, color:S.ink, marginBottom:20 }}>How to Earn</h3>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {EARN_WAYS.map(({ action, pts, icon }) => (
                <div key={action} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingBottom:12, borderBottom:`1px solid ${S.stone}` }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:18 }}>{icon}</span>
                    <span style={{ fontSize:13, color:S.ink }}>{action}</span>
                  </div>
                  <span style={{ fontSize:13, fontWeight:600, color:S.tan, whiteSpace:"nowrap" }}>+{pts} pts</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background:"#fff", border:`1px solid ${S.stone}`, padding:"28px 28px" }}>
            <h3 style={{ fontFamily:S.serif, fontSize:20, fontWeight:600, color:S.ink, marginBottom:20 }}>How to Redeem</h3>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {REDEEM_WAYS.map(({ reward, pts, icon }) => (
                <div key={reward} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingBottom:12, borderBottom:`1px solid ${S.stone}` }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:18 }}>{icon}</span>
                    <span style={{ fontSize:13, color:S.ink }}>{reward}</span>
                  </div>
                  <span style={{ fontSize:13, fontWeight:600, color:S.tan, whiteSpace:"nowrap" }}>{pts.toLocaleString()} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Points history */}
        <div style={{ background:"#fff", border:`1px solid ${S.stone}`, padding:"28px 28px" }}>
          <h3 style={{ fontFamily:S.serif, fontSize:20, fontWeight:600, color:S.ink, marginBottom:20 }}>Points History</h3>
          {history.length === 0 ? (
            <p style={{ fontSize:13, color:S.muted }}>No points earned yet — start by sharing a community post or referring a friend.</p>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {history.map((row, i) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom: i < history.length - 1 ? `1px solid ${S.stone}` : "none" }}>
                  <div>
                    <p style={{ fontSize:13, color:S.ink, marginBottom:2 }}>{row.reason ?? "Points added"}</p>
                    <p style={{ fontSize:11, color:S.muted }}>{formatDate(row.created_at)}</p>
                  </div>
                  <span style={{ fontSize:13, fontWeight:600, color: row.amount > 0 ? "#16a34a" : "#dc2626" }}>
                    {row.amount > 0 ? "+" : ""}{row.amount} pts
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
