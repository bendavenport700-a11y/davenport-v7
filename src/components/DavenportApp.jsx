"use client";

import { useState, useEffect } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');`;

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

const BRANDS = ["COS","ARKET","ASKET","Buck Mason","Taylor Stitch","Club Monaco","Faherty","Marine Layer","J.Crew","Banana Republic","Bonobos","Lululemon","Vuori","Rhone","Peter Millar","Rhoback","Patagonia","Levi's","Ralph Lauren","Uniqlo"];

const CONDITIONS = {
  "Like New": { label:"Like New", multiplier:1.0,  tagline:"Brand new, never worn." },
  "Good":     { label:"Good",     multiplier:0.75, tagline:"Minimal signs of life."  },
  "Fair":     { label:"Fair",     multiplier:0.55, tagline:"Worn in, priced down."   },
};

// buyPrice = base retail value. monthlyPrice = 10% of buyPrice * condition multiplier.
function getBuyPrice(item) {
  return Math.round(item.buyPrice * CONDITIONS[item.condition].multiplier);
}
function getMonthlyPrice(item) {
  return Math.max(4, Math.round(item.buyPrice * CONDITIONS[item.condition].multiplier * 0.10));
}
function getWearRange(count) {
  if (count <= 5)  return `${count} wear${count !== 1 ? "s" : ""}`;
  if (count <= 15) return "6-15 wears";
  if (count <= 29) return "16-29 wears";
  return "30+ wears";
}

function useWindowSize() {
  const [size, setSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    function onResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return size;
}

const ITEMS = [
  { id:1,  name:"Ivory Oxford Shirt",        brand:"J.Crew",         category:"Oxford Shirt", occasion:"Campus",    style:"Preppy",    season:"Fall/Winter",  buyPrice:85,  condition:"Like New", rentalCount:3,  color:"#f5f0e8", emoji:"👕", description:"A crisp ivory oxford with a relaxed fit. Works everywhere, all semester." },
  { id:2,  name:"Charcoal Merino Crewneck",  brand:"Uniqlo",         category:"Crewneck",     occasion:"Campus",    style:"Minimal",   season:"Fall/Winter",  buyPrice:70,  condition:"Good",     rentalCount:9,  color:"#4b5563", emoji:"🧥", description:"Ultrasoft merino that drapes well and layers even better." },
  { id:3,  name:"Slim Dark Wash Denim",      brand:"J.Crew",         category:"Denim",        occasion:"Going Out", style:"Minimal",   season:"Fall/Winter",  buyPrice:110, condition:"Like New", rentalCount:2,  color:"#1e293b", emoji:"👖", description:"A versatile dark rinse slim jean. Goes from class to dinner without trying." },
  { id:4,  name:"Taupe Chinos",              brand:"Banana Republic",category:"Chinos",       occasion:"Internship",style:"Business",  season:"Spring/Summer",buyPrice:90,  condition:"Good",     rentalCount:11, color:"#c4a882", emoji:"👖", description:"Tailored but comfortable. The backbone of a smart-casual wardrobe." },
  { id:7,  name:"Navy Quarter-Zip",          brand:"Rhone",          category:"Quarter-Zip",  occasion:"Campus",    style:"Minimal",   season:"Fall/Winter",  buyPrice:120, condition:"Like New", rentalCount:1,  color:"#1e3a5f", emoji:"🧥", description:"Performance fabric with a clean aesthetic. Looks put together, feels athletic." },
  { id:8,  name:"Camel Overcoat",            brand:"Club Monaco",    category:"Overcoat",     occasion:"Internship",style:"Business",  season:"Fall/Winter",  buyPrice:280, condition:"Like New", rentalCount:3,  color:"#c19a6b", emoji:"🧥", description:"The statement layer. Timeless camel wool that signals you mean business." },
  { id:9,  name:"Black Slim Trousers",       brand:"Banana Republic",category:"Trousers",     occasion:"Internship",style:"Business",  season:"Fall/Winter",  buyPrice:120, condition:"Good",     rentalCount:14, color:"#111827", emoji:"👖", description:"Sharply tailored with a modern slim leg. Pairs with anything." },
  { id:10, name:"Heather Grey Hoodie",       brand:"Uniqlo",         category:"Hoodie",       occasion:"Campus",    style:"Streetwear",season:"Fall/Winter",  buyPrice:65,  condition:"Fair",     rentalCount:22, color:"#9ca3af", emoji:"👕", description:"The classic hoodie, done right. Heavy fabric, clean fit." },
  { id:11, name:"Linen Shirt Sage",          brand:"Marine Layer",   category:"Oxford Shirt", occasion:"Weekend",   style:"Minimal",   season:"Spring/Summer",buyPrice:95,  condition:"Like New", rentalCount:5,  color:"#86a98a", emoji:"👕", description:"Breathable linen in a muted sage. Perfect for warm days and easy evenings." },
  { id:12, name:"Olive Cargo Pants",         brand:"Uniqlo",         category:"Trousers",     occasion:"Weekend",   style:"Streetwear",season:"Spring/Summer",buyPrice:75,  condition:"Good",     rentalCount:7,  color:"#4a5c3b", emoji:"👖", description:"Relaxed cargo with clean lines. Utility without looking sloppy." },
  { id:14, name:"White Linen Shorts",        brand:"Rhone",          category:"Shorts",       occasion:"Weekend",   style:"Minimal",   season:"Spring/Summer",buyPrice:80,  condition:"Like New", rentalCount:2,  color:"#f0ede8", emoji:"🩳", description:"Tailored linen shorts with a 7-inch inseam. Resort-ready, campus-appropriate." },
  { id:15, name:"Striped Rugby Shirt",       brand:"J.Crew",         category:"Crewneck",     occasion:"Campus",    style:"Preppy",    season:"Spring/Summer",buyPrice:90,  condition:"Good",     rentalCount:10, color:"#1d3461", emoji:"👕", description:"Navy and cream stripe with a relaxed collar. Effortlessly collegiate." },
  { id:16, name:"Black Bomber",              brand:"ASKET",          category:"Bomber",       occasion:"Going Out", style:"Streetwear",season:"Fall/Winter",  buyPrice:195, condition:"Like New", rentalCount:4,  color:"#0f172a", emoji:"🧥", description:"Clean black bomber with minimal hardware. The outerwear that does the work." },
  { id:17, name:"Burgundy Corduroy Shirt",   brand:"Faherty",        category:"Oxford Shirt", occasion:"Weekend",   style:"Preppy",    season:"Fall/Winter",  buyPrice:110, condition:"Good",     rentalCount:8,  color:"#7c2d3c", emoji:"👕", description:"Soft corduroy in a rich burgundy. Textured, warm, genuinely stylish." },
  { id:19, name:"Cream Knit Cardigan",       brand:"COS",            category:"Cardigan",     occasion:"Campus",    style:"Preppy",    season:"Fall/Winter",  buyPrice:130, condition:"Like New", rentalCount:3,  color:"#f5f0e0", emoji:"🧥", description:"Soft ribbed knit in an off-white. Smart-casual perfection." },
  { id:21, name:"Cobalt Blue Dress Shirt",   brand:"Club Monaco",    category:"Oxford Shirt", occasion:"Internship",style:"Business",  season:"Spring/Summer",buyPrice:110, condition:"Like New", rentalCount:4,  color:"#1e40af", emoji:"👕", description:"A confident blue dress shirt that signals attention to detail." },
  { id:22, name:"Vintage Wash Tee",          brand:"Buck Mason",     category:"T-Shirt",      occasion:"Weekend",   style:"Streetwear",season:"Spring/Summer",buyPrice:55,  condition:"Fair",     rentalCount:24, color:"#78716c", emoji:"👕", description:"Perfectly broken-in feel from day one. Wears better than anything you own." },
  { id:23, name:"Slim Wool Blazer",          brand:"Taylor Stitch",  category:"Jacket",       occasion:"Going Out", style:"Business",  season:"Fall/Winter",  buyPrice:260, condition:"Like New", rentalCount:2,  color:"#1f2937", emoji:"🧥", description:"A structured navy blazer that turns any outfit into a statement." },
  { id:24, name:"Merino Turtleneck",         brand:"ASKET",          category:"Crewneck",     occasion:"Going Out", style:"Minimal",   season:"Fall/Winter",  buyPrice:115, condition:"Good",     rentalCount:9,  color:"#292524", emoji:"🧥", description:"The black turtleneck. Minimal, intellectual, magnetic." },
  { id:25, name:"Stone Chore Coat",          brand:"Faherty",        category:"Chore Coat",   occasion:"Weekend",   style:"Streetwear",season:"Fall/Winter",  buyPrice:185, condition:"Like New", rentalCount:5,  color:"#d6cfc7", emoji:"🧥", description:"A washed canvas chore coat with a relaxed fit. Effortlessly cool." },
  { id:30, name:"Ribbed Polo Ecru",          brand:"Peter Millar",   category:"Polo",         occasion:"Going Out", style:"Preppy",    season:"Spring/Summer",buyPrice:125, condition:"Like New", rentalCount:2,  color:"#f5f0e8", emoji:"👕", description:"A ribbed polo with a modern slim cut. Dressed up or down effortlessly." },
  { id:31, name:"Washed Grey Henley",        brand:"Buck Mason",     category:"Henley",       occasion:"Weekend",   style:"Minimal",   season:"Spring/Summer",buyPrice:70,  condition:"Good",     rentalCount:6,  color:"#9ca3af", emoji:"👕", description:"Lived-in grey henley with a relaxed fit. The easiest thing you'll reach for." },
  { id:32, name:"Navy Polo",                 brand:"Rhoback",        category:"Polo",         occasion:"Campus",    style:"Preppy",    season:"Spring/Summer",buyPrice:95,  condition:"Like New", rentalCount:3,  color:"#1e3a5f", emoji:"👕", description:"Performance polo that moves with you. Sharp enough for the dining hall, fast enough for the rec." },
  { id:33, name:"Olive Shirt Jacket",        brand:"Taylor Stitch",  category:"Shirt Jacket", occasion:"Weekend",   style:"Streetwear",season:"Fall/Winter",  buyPrice:165, condition:"Like New", rentalCount:4,  color:"#4a5c3b", emoji:"🧥", description:"A shirt that thinks it's a jacket. The layering piece that makes every outfit work." },
  { id:34, name:"Caramel Sweater",           brand:"COS",            category:"Sweater",      occasion:"Campus",    style:"Minimal",   season:"Fall/Winter",  buyPrice:140, condition:"Good",     rentalCount:7,  color:"#c19a6b", emoji:"🧥", description:"Substantial knit in a warm caramel. The sweater that stops people mid-sentence." },
  { id:35, name:"Heather Navy Quarter-Zip",  brand:"Peter Millar",   category:"Quarter-Zip",  occasion:"Campus",    style:"Preppy",    season:"Fall/Winter",  buyPrice:145, condition:"Like New", rentalCount:2,  color:"#334155", emoji:"🧥", description:"Midlayer perfection. Polished enough for the office, comfortable enough for everything else." },
  { id:36, name:"Khaki Chinos",              brand:"Bonobos",        category:"Chinos",       occasion:"Campus",    style:"Preppy",    season:"Spring/Summer",buyPrice:98,  condition:"Good",     rentalCount:12, color:"#d4b896", emoji:"👖", description:"The chino that fits right out of the box. Sits at the waist, tapers cleanly." },
  { id:37, name:"Charcoal Joggers",          brand:"Vuori",          category:"Joggers",      occasion:"Campus",    style:"Minimal",   season:"Fall/Winter",  buyPrice:88,  condition:"Like New", rentalCount:1,  color:"#374151", emoji:"👖", description:"Performance joggers with a tailored silhouette. Wear them everywhere without apology." },
  { id:38, name:"Cream Fleece",              brand:"Patagonia",      category:"Fleece",       occasion:"Weekend",   style:"Minimal",   season:"Fall/Winter",  buyPrice:135, condition:"Good",     rentalCount:8,  color:"#f5f0e8", emoji:"🧥", description:"Warm, packable, and clean-looking. The fleece that goes from trail to town." },
  { id:39, name:"Navy Shorts",               brand:"Lululemon",      category:"Shorts",       occasion:"Campus",    style:"Minimal",   season:"Spring/Summer",buyPrice:68,  condition:"Like New", rentalCount:3,  color:"#1e3a5f", emoji:"🩳", description:"7-inch inseam, clean fit, zero effort. The only shorts you need." },
];

const SWIPE_ITEMS = [
  { id:"s1", label:"Clean & Minimal",  emoji:"⬜", desc:"White tees, slim cuts, nothing loud", image:"/style-minimal-tee.png" },
  { id:"s2", label:"Streetwear Edge",  emoji:"🖤", desc:"Oversized fits, cargo, bold silhouettes" },
  { id:"s3", label:"Collegiate Prep",  emoji:"🏛️", desc:"Oxford shirts, chinos, rugby stripes", image:"/style-navy-crew.png" },
  { id:"s4", label:"Sharp Business",   emoji:"💼", desc:"Blazers, dress shirts, leather shoes" },
  { id:"s5", label:"Weekend Casual",   emoji:"🌿", desc:"Linen, cargo, relaxed everything" },
  { id:"s6", label:"Going Out Fits",   emoji:"🌙", desc:"Dark tones, structure, heads turning" },
  { id:"s7", label:"Earth Tones",      emoji:"🍂", desc:"Camel, olive, stone warm palette", image:"/style-stone-chinos.png" },
  { id:"s8", label:"Monochrome",       emoji:"◾", desc:"Black, white, grey. Nothing in between" },
];

const OUTFITS = [
  { id:"o1", name:"The Campus Classic", itemIds:[1,2,7,37],  style:"Preppy",   occasion:"Campus" },
  { id:"o2", name:"Internship Ready",   itemIds:[21,9,23,8], style:"Business", occasion:"Internship" },
  { id:"o3", name:"Weekend Off-Duty",   itemIds:[11,14,31,38],style:"Minimal",  occasion:"Weekend" },
  { id:"o4", name:"Night Out",          itemIds:[24,3,16,23], style:"Minimal",  occasion:"Going Out" },
];

// pricing helpers defined above with data

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav({ page, setPage, suitcase, isMobile, pagePad }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [["browse","Shop"],["quiz","Find My Style"],["community","Community"],["sustainability","Our Mission"]];

  useEffect(() => {
    setMenuOpen(false);
  }, [page, isMobile]);

  return (
    <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:200,background:"rgba(250,249,247,0.96)",backdropFilter:"blur(16px)",borderBottom:"1px solid #ede8e1",display:"flex",alignItems:"center",justifyContent:"space-between",padding:`0 ${pagePad}px`,height:isMobile?56:60 }}>
      <button onClick={()=>setPage("home")} style={{ fontFamily:S.serif,fontSize:isMobile?20:22,fontWeight:600,letterSpacing:"-0.3px",background:"none",border:"none",cursor:"pointer",color:S.ink,display:"flex",alignItems:"center",gap:10 }}>
        Davenport
      </button>
      {!isMobile && (
        <div style={{ display:"flex",gap:28,alignItems:"center" }}>
          {links.map(([p,label])=>(
            <button key={p} onClick={()=>setPage(p)} style={{ background:"none",border:"none",cursor:"pointer",fontFamily:S.sans,fontSize:12,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",color:page===p?S.ink:S.muted,borderBottom:page===p?`1px solid ${S.ink}`:"1px solid transparent",paddingBottom:2 }}>
              {label}
            </button>
          ))}
          <button onClick={()=>setPage("suitcase")} style={{ background:S.ink,color:S.cream,border:"none",cursor:"pointer",padding:"9px 20px",fontFamily:S.sans,fontSize:12,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",display:"flex",alignItems:"center",gap:8 }}>
            🧳 Suitcase {suitcase.length>0&&<span style={{ background:S.gold,color:S.ink,borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700 }}>{suitcase.length}</span>}
          </button>
        </div>
      )}
      {isMobile && (
        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
          <button onClick={()=>setPage("suitcase")} style={{ background:S.ink,color:S.cream,border:"none",cursor:"pointer",padding:"7px 12px",fontFamily:S.sans,fontSize:10,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",display:"flex",alignItems:"center",gap:6 }}>
            🧳 {suitcase.length}
          </button>
          <button onClick={()=>setMenuOpen(v=>!v)} aria-label="Toggle navigation menu" style={{ width:36,height:36,background:"transparent",border:`1px solid ${S.stone}`,cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",color:S.ink }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      )}
      {isMobile && menuOpen && (
        <div style={{ position:"absolute",top:"100%",left:0,right:0,background:S.cream,borderBottom:`1px solid ${S.stone}`,display:"flex",flexDirection:"column",padding:`10px ${pagePad}px 14px`,gap:6 }}>
          {links.map(([p,label])=>(
            <button key={p} onClick={()=>setPage(p)} style={{ background:"none",border:"none",cursor:"pointer",textAlign:"left",padding:"8px 0",fontFamily:S.sans,fontSize:12,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",color:page===p?S.ink:S.muted }}>
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── MINI CARD ────────────────────────────────────────────────────────────────
function MiniItemCard({ item, setPage }) {
  const [hov,setHov]=useState(false);
  return (
    <div onClick={()=>setPage(`item-${item.id}`)} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ cursor:"pointer",border:`1px solid ${S.stone}`,background:"#fff",transition:"transform 0.2s,box-shadow 0.2s",transform:hov?"translateY(-3px)":"none",boxShadow:hov?"0 12px 32px rgba(0,0,0,0.08)":"none" }}>
      <div style={{ height:120,background:item.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36 }}>
        {item.emoji}
      </div>
      <div style={{ padding:"16px 16px 20px" }}>
        <p style={{ fontFamily:S.sans,fontSize:9,letterSpacing:"0.14em",textTransform:"uppercase",color:S.tan,marginBottom:4 }}>{item.brand}</p>
        <h3 style={{ fontFamily:S.serif,fontSize:17,fontWeight:600,color:S.ink,marginBottom:8,lineHeight:1.2 }}>{item.name}</h3>
        <span style={{ fontFamily:S.serif,fontSize:20,fontWeight:700,color:S.ink }}>${getMonthlyPrice(item)}<span style={{ fontFamily:S.sans,fontSize:10,color:S.muted }}>/mo</span></span>
        <p style={{ fontFamily:S.sans,fontSize:9,color:S.muted,marginTop:4 }}>{getWearRange(item.rentalCount)}</p>
      </div>
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomePage({ setPage, isMobile, isTablet, pagePad }) {
  const featured = ITEMS.filter(i=>i.condition==="Like New").slice(0,3);

  return (
    <div>
      {/* Hero */}
      <section style={{ minHeight:isMobile?"auto":"100vh",display:"flex",flexDirection:"column",justifyContent:"center",padding:`${isMobile?72:80}px ${pagePad}px ${isMobile?40:60}px`,background:`linear-gradient(150deg, ${S.cream} 0%, #ede8e1 60%, #e0d9cf 100%)`,position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",right:0,top:0,bottom:0,width:isMobile?"100%":"40%",background:"linear-gradient(160deg, #e8e1d8, #d4ccc2)",display:isMobile?"none":"flex",alignItems:"center",justifyContent:"center" }}>
          <img src="/logo.png" alt="" aria-hidden="true" style={{ opacity:0.1,width:220,height:220,objectFit:"contain",userSelect:"none" }}/>
        </div>
        <div style={{ maxWidth:isMobile?520:640,position:"relative",zIndex:1 }}>
          <p style={{ fontFamily:S.sans,fontSize:11,letterSpacing:"0.22em",textTransform:"uppercase",color:S.tan,marginBottom:28,fontWeight:500 }}>Better clothes. Less effort.</p>
          <h1 style={{ fontFamily:S.serif,fontSize:isMobile?"clamp(42px, 12vw, 56px)":"clamp(52px, 7vw, 88px)",fontWeight:600,lineHeight:0.93,letterSpacing:isMobile?"-1.6px":"-2.5px",color:S.ink,marginBottom:isMobile?24:32 }}>
            A smarter way<br/><em style={{ fontStyle:"italic",color:"#6b5e4e" }}>for men</em><br/>to dress.
          </h1>
          <p style={{ fontFamily:S.sans,fontSize:isMobile?15:17,color:S.muted,lineHeight:1.8,maxWidth:460,marginBottom:16 }}>
            A curated wardrobe subscription for college men. Wear pieces from the brands you actually want. Pay only for what's in your Suitcase, or buy the ones you can't let go.
          </p>
          <p style={{ fontFamily:S.sans,fontSize:13,color:S.tan,marginBottom:44,fontStyle:"italic" }}>Discover. Wear. Own.</p>
          <div style={{ display:"flex",gap:14,flexWrap:"wrap" }}>
            <button onClick={()=>setPage("browse")} style={{ background:S.ink,color:S.cream,border:"none",cursor:"pointer",padding:"15px 36px",fontFamily:S.sans,fontSize:13,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase" }}>Shop the Catalog</button>
            <button onClick={()=>setPage("quiz")} style={{ background:"transparent",color:S.ink,border:`1px solid #c9bfb0`,cursor:"pointer",padding:"15px 36px",fontFamily:S.sans,fontSize:13,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase" }}>Find My Style</button>
          </div>
        </div>
        <div style={{ position:isMobile?"static":"absolute",bottom:44,left:pagePad,display:"flex",gap:isMobile?24:52,marginTop:isMobile?36:0,flexWrap:"wrap" }}>
          {[["50+","Premium brands"],["Wear or buy","Your choice"],["Pay per piece","Monthly"]].map(([v,l])=>(
            <div key={v}><div style={{ fontFamily:S.serif,fontSize:17,fontWeight:600,color:S.ink }}>{v}</div><div style={{ fontFamily:S.sans,fontSize:11,color:S.tan,letterSpacing:"0.06em",marginTop:2 }}>{l}</div></div>
          ))}
        </div>
      </section>

      {/* Brands marquee */}
      <section style={{ padding:"44px 0",background:S.ink,overflow:"hidden" }}>
        <p style={{ fontFamily:S.sans,fontSize:10,letterSpacing:"0.22em",textTransform:"uppercase",color:"#9c8b78",textAlign:"center",marginBottom:24,fontWeight:600 }}>Brands in our catalog</p>
        <div style={{ overflow:"hidden" }}>
          <div style={{ display:"inline-flex",gap:0,animation:"marquee 38s linear infinite",whiteSpace:"nowrap" }}>
            {[...BRANDS,...BRANDS,...BRANDS].map((brand,i)=>(
              <span key={i} style={{ fontFamily:S.serif,fontSize:21,color:i%4===0?S.gold:"#e8e3dc",padding:"0 32px",letterSpacing:"-0.3px",flexShrink:0 }}>{brand}</span>
            ))}
          </div>
        </div>
        <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-33.33%)}}`}</style>
      </section>

      {/* Featured */}
      <section style={{ padding:`${isMobile?64:88}px ${pagePad}px`,background:"#fff" }}>
        <div style={{ maxWidth:1080,margin:"0 auto" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:isMobile?"flex-start":"flex-end",marginBottom:52,flexDirection:isMobile?"column":"row",gap:isMobile?16:0 }}>
            <div>
              <p style={{ fontFamily:S.sans,fontSize:11,letterSpacing:"0.2em",textTransform:"uppercase",color:S.tan,marginBottom:12 }}>Fresh In</p>
              <h2 style={{ fontFamily:S.serif,fontSize:isMobile?34:44,fontWeight:600,letterSpacing:"-1px",color:S.ink }}>Brand new. Never worn.</h2>
            </div>
            <button onClick={()=>setPage("browse")} style={{ background:"none",border:`1px solid #c9bfb0`,cursor:"pointer",padding:"10px 24px",fontFamily:S.sans,fontSize:11,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"#6b5e4e" }}>View All</button>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":isTablet?"1fr 1fr":"repeat(3,1fr)",gap:28 }}>
            {featured.map(item=><MiniItemCard key={item.id} item={item} setPage={setPage}/>)}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding:`${isMobile?64:88}px ${pagePad}px`,background:S.cream }}>
        <div style={{ maxWidth:1080,margin:"0 auto" }}>
          <p style={{ fontFamily:S.sans,fontSize:11,letterSpacing:"0.2em",textTransform:"uppercase",color:S.tan,marginBottom:16 }}>How It Works</p>
          <h2 style={{ fontFamily:S.serif,fontSize:isMobile?34:44,fontWeight:600,letterSpacing:"-1px",color:S.ink,marginBottom:64 }}>Simple by design.</h2>
          <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":isTablet?"1fr 1fr":"1fr 1fr 1fr",gap:48 }}>
            {[["01","Discover your style","Take the style quiz or browse the full catalog. Filter by brand, occasion, or season and find pieces you actually want to wear."],["02","Build your Suitcase","Add individual pieces at the price point that works for you. Pay per piece, per month."],["03","Wear, swap, or own","Love something? Buy it outright. Done with a piece? Swap it for something new. Your wardrobe, your call."]].map(([n,t,d])=>(
              <div key={n} style={{ borderTop:`1px solid ${S.stone}`,paddingTop:28 }}>
                <div style={{ fontFamily:S.serif,fontSize:52,color:S.stone,fontWeight:700,lineHeight:1,marginBottom:18 }}>{n}</div>
                <h3 style={{ fontFamily:S.serif,fontSize:22,fontWeight:600,color:S.ink,marginBottom:10 }}>{t}</h3>
                <p style={{ fontFamily:S.sans,fontSize:14,color:S.muted,lineHeight:1.75 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz CTA */}
      <section style={{ padding:`${isMobile?64:88}px ${pagePad}px`,background:S.ink }}>
        <div style={{ maxWidth:680,margin:"0 auto",textAlign:"center" }}>
          <p style={{ fontFamily:S.sans,fontSize:11,letterSpacing:"0.2em",textTransform:"uppercase",color:"#6b5e4e",marginBottom:20 }}>Style Discovery</p>
          <h2 style={{ fontFamily:S.serif,fontSize:"clamp(34px, 5vw, 58px)",fontWeight:600,color:S.cream,letterSpacing:"-1.5px",marginBottom:20 }}>Don't know where to start?</h2>
          <p style={{ fontFamily:S.sans,fontSize:16,color:"#9ca3af",marginBottom:40,lineHeight:1.75 }}>Swipe through styles. We'll build your taste profile and surface the pieces that match how you want to be seen.</p>
          <button onClick={()=>setPage("quiz")} style={{ background:S.cream,color:S.ink,border:"none",cursor:"pointer",padding:"16px 44px",fontFamily:S.sans,fontSize:13,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase" }}>Take the Style Quiz</button>
        </div>
      </section>

      {/* Community teaser */}
      <section style={{ padding:`${isMobile?64:88}px ${pagePad}px`, background:S.ink }}>
        <div style={{ maxWidth:1080, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:44, flexWrap:"wrap", gap:20 }}>
            <div>
              <p style={{ fontFamily:S.sans, fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase", color:"#6b5e4e", marginBottom:12 }}>The Community</p>
              <h2 style={{ fontFamily:S.serif, fontSize:44, fontWeight:600, color:S.cream, letterSpacing:"-1px" }}>Worn by real people.</h2>
            </div>
            <button onClick={()=>setPage("community")} style={{ background:"transparent", color:S.cream, border:"1px solid #374151", cursor:"pointer", padding:"10px 24px", fontFamily:S.sans, fontSize:11, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase" }}>
              See All Posts
            </button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":isTablet?"1fr 1fr":"repeat(3,1fr)", gap:16 }}>
            {POSTS.slice(0,3).map(post => (
              <div key={post.id} onClick={()=>setPage("community")} style={{ cursor:"pointer", background:post.bg, height:240, display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"18px", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6) 100%)" }}/>
                {post.id % 3 === 0 && (
                  <div style={{ position:"absolute", top:12, left:12, display:"flex", alignItems:"center", gap:5, background:"rgba(0,0,0,0.5)", padding:"3px 8px", borderRadius:2, zIndex:1 }}>
                    <div style={{ width:0, height:0, borderTop:"4px solid transparent", borderBottom:"4px solid transparent", borderLeft:"6px solid #fff" }}/>
                    <span style={{ fontFamily:S.sans, fontSize:8, color:"#fff", letterSpacing:"0.06em" }}>VIDEO</span>
                  </div>
                )}
                <div style={{ position:"relative", zIndex:1 }}>
                  <p style={{ fontFamily:S.sans, fontSize:11, fontWeight:600, color:"#fff", marginBottom:3 }}>@{post.user}</p>
                  <p style={{ fontFamily:S.sans, fontSize:10, color:"rgba(255,255,255,0.6)" }}>{post.school}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability teaser */}
      <section style={{ padding:`${isMobile?64:88}px ${pagePad}px`,background:"#fff",display:"flex",alignItems:"center",gap:isMobile?32:72,flexWrap:"wrap" }}>
        <div style={{ flex:1,minWidth:280 }}>
          <p style={{ fontFamily:S.sans,fontSize:11,letterSpacing:"0.2em",textTransform:"uppercase",color:S.tan,marginBottom:16 }}>Our Mission</p>
          <h2 style={{ fontFamily:S.serif,fontSize:44,fontWeight:600,color:S.ink,letterSpacing:"-1px",marginBottom:16 }}>Fashion has a problem.</h2>
          <p style={{ fontFamily:S.sans,fontSize:16,color:S.muted,lineHeight:1.75,marginBottom:32,maxWidth:420 }}>92 million tons of textile waste enter landfills every year. Davenport exists as the answer wear more, own less, waste nothing.</p>
          <button onClick={()=>setPage("sustainability")} style={{ background:"none",border:`1px solid ${S.ink}`,cursor:"pointer",padding:"12px 28px",fontFamily:S.sans,fontSize:12,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:S.ink }}>Read Our Story</button>
        </div>
        <div style={{ flex:1,minWidth:280,display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:16 }}>
          {[["92M","Tons of textile waste yearly"],["60%","Clothes worn fewer than 5 times"],["$500B","Lost to underused clothing annually"],["3,000L","Water per pair of jeans"]].map(([stat,label])=>(
            <div key={stat} style={{ background:S.cream,padding:"28px 22px",border:`1px solid ${S.stone}` }}>
              <div style={{ fontFamily:S.serif,fontSize:34,fontWeight:700,color:S.ink,marginBottom:6 }}>{stat}</div>
              <div style={{ fontFamily:S.sans,fontSize:12,color:S.muted,lineHeight:1.5 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── BROWSE ───────────────────────────────────────────────────────────────────
function BrowsePage({ setPage, addToSuitcase, suitcase, isMobile, isTablet, pagePad }) {
  const [filters,setFilters]=useState({ occasion:"All",style:"All",season:"All",category:"All" });
  const [newOnly,setNewOnly]=useState(false);
  const [sort,setSort]=useState("price-asc");

  const condOrder = ["Like New","Good","Fair"];
  const occasions  = ["All",...new Set(ITEMS.map(i=>i.occasion))];
  const styles     = ["All",...new Set(ITEMS.map(i=>i.style))];
  const seasons    = ["All",...new Set(ITEMS.map(i=>i.season))];
  const categories = ["All",...new Set(ITEMS.map(i=>i.category))];

  const filtered = ITEMS
    .filter(i=>!newOnly||i.condition==="Like New")
    .filter(i=>filters.occasion==="All"||i.occasion===filters.occasion)
    .filter(i=>filters.style==="All"||i.style===filters.style)
    .filter(i=>filters.season==="All"||i.season===filters.season)
    .filter(i=>filters.category==="All"||i.category===filters.category)
    .sort((a,b)=>sort==="price-asc"?getMonthlyPrice(a)-getMonthlyPrice(b):sort==="price-desc"?getMonthlyPrice(b)-getMonthlyPrice(a):condOrder.indexOf(a.condition)-condOrder.indexOf(b.condition));

  const pill=(value,active,onClick)=>(
    <button key={value} onClick={onClick} style={{ background:active?S.ink:"#fff",color:active?S.cream:S.muted,border:`1px solid ${active?S.ink:S.stone}`,padding:"6px 14px",fontFamily:S.sans,fontSize:11,fontWeight:500,letterSpacing:"0.06em",cursor:"pointer",textTransform:"uppercase",transition:"all 0.15s" }}>
      {value}
    </button>
  );


  return (
    <div style={{ paddingTop:60,minHeight:"100vh",background:S.cream }}>
      <div style={{ padding:`52px ${pagePad}px 36px`,background:"#fff",borderBottom:`1px solid ${S.stone}` }}>
        <p style={{ fontFamily:S.sans,fontSize:11,letterSpacing:"0.2em",textTransform:"uppercase",color:S.tan,marginBottom:10 }}>The Catalog</p>
        <h1 style={{ fontFamily:S.serif,fontSize:isMobile?36:48,fontWeight:600,letterSpacing:"-1.5px",color:S.ink,marginBottom:32 }}>Every piece. Your price.</h1>

        {/* Shop Brand New styled as a filter pill, not a CTA */}
        <div style={{ marginBottom:22,display:"flex",alignItems:"center",gap:10 }}>
          <button
            onClick={()=>setNewOnly(n=>!n)}
            style={{ background:newOnly?S.ink:"#fff",color:newOnly?S.cream:S.ink,border:`1px solid ${newOnly?S.ink:S.stone}`,padding:"6px 16px",fontFamily:S.sans,fontSize:11,fontWeight:600,letterSpacing:"0.08em",cursor:"pointer",textTransform:"uppercase",display:"flex",alignItems:"center",gap:8,transition:"all 0.15s" }}
          >
            {newOnly&&<span style={{ fontSize:10 }}>✓</span>}
            Shop Brand New
          </button>
          {newOnly&&<span style={{ fontFamily:S.sans,fontSize:11,color:S.muted,fontStyle:"italic" }}>Showing only never-worn pieces</span>}
        </div>

        {/* Filters */}
        <div style={{ display:"flex",flexDirection:"column",gap:11 }}>
          {[["Occasion",occasions,"occasion"],["Style",styles,"style"],["Season",seasons,"season"],["Category",categories,"category"]].map(([label,opts,key])=>(
            <div key={key} style={{ display:"flex",alignItems:"center",gap:10,flexWrap:"wrap" }}>
              <span style={{ fontFamily:S.sans,fontSize:10,letterSpacing:"0.14em",textTransform:"uppercase",color:S.tan,width:68,flexShrink:0 }}>{label}</span>
              <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                {opts.map(o=>pill(o,filters[key]===o,()=>setFilters(f=>({...f,[key]:o}))))}
              </div>
            </div>
          ))}
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <span style={{ fontFamily:S.sans,fontSize:10,letterSpacing:"0.14em",textTransform:"uppercase",color:S.tan,width:68,flexShrink:0 }}>Sort</span>
            <select value={sort} onChange={e=>setSort(e.target.value)} style={{ fontFamily:S.sans,fontSize:12,border:`1px solid ${S.stone}`,padding:"6px 12px",background:"#fff",cursor:"pointer",color:S.ink }}>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="condition">Condition: Best First</option>
            </select>
          </div>
        </div>
        <p style={{ fontFamily:S.sans,fontSize:12,color:S.muted,marginTop:16 }}>{filtered.length} piece{filtered.length!==1?"s":""} found</p>
      </div>

      <div style={{ padding:`36px ${pagePad}px`,display:"grid",gridTemplateColumns:isMobile?"1fr":isTablet?"repeat(2, minmax(0, 1fr))":"repeat(auto-fill, minmax(228px, 1fr))",gap:22 }}>
        {filtered.map(item=>(
          <ItemCard key={item.id} item={item} setPage={setPage} addToSuitcase={addToSuitcase} inSuitcase={suitcase.some(s=>s.id===item.id)}/>
        ))}
      </div>
    </div>
  );
}

function ItemCard({ item, setPage, addToSuitcase, inSuitcase }) {
  const [hov,setHov]=useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:"#fff",border:`1px solid ${S.stone}`,transition:"transform 0.2s,box-shadow 0.2s",transform:hov?"translateY(-4px)":"none",boxShadow:hov?"0 16px 40px rgba(0,0,0,0.09)":"none" }}>
      <div onClick={()=>setPage(`item-${item.id}`)} style={{ cursor:"pointer" }}>
        <div style={{ height:150,background:item.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:40 }}>
          {item.emoji}
        </div>
        <div style={{ padding:"15px 16px 10px" }}>
          <p style={{ fontFamily:S.sans,fontSize:9,letterSpacing:"0.14em",textTransform:"uppercase",color:S.tan,marginBottom:3 }}>{item.brand} · {item.category}</p>
          <h3 style={{ fontFamily:S.serif,fontSize:16,fontWeight:600,color:S.ink,marginBottom:6,lineHeight:1.2 }}>{item.name}</h3>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline" }}>
            <span style={{ fontFamily:S.serif,fontSize:21,fontWeight:700,color:S.ink }}>${getMonthlyPrice(item)}<span style={{ fontFamily:S.sans,fontSize:10,color:S.muted }}>/mo</span></span>
            <span style={{ fontFamily:S.sans,fontSize:9,color:S.muted }}>{getWearRange(item.rentalCount)}</span>
          </div>
        </div>
      </div>
      <div style={{ padding:"0 16px 16px" }}>
        <button onClick={()=>addToSuitcase(item)} style={{ width:"100%",background:inSuitcase?"#f0ede8":S.ink,color:inSuitcase?"#6b5e4e":S.cream,border:"none",cursor:inSuitcase?"default":"pointer",padding:"10px",fontFamily:S.sans,fontSize:11,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6 }}>
          {inSuitcase?"✓ In Suitcase":"+ Add to Suitcase"}
        </button>
        <button onClick={()=>setPage(`item-${item.id}`)} style={{ width:"100%",background:"transparent",color:S.muted,border:`1px solid ${S.stone}`,cursor:"pointer",padding:"7px",fontFamily:S.sans,fontSize:10,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase" }}>
          Buy ${getBuyPrice(item)}
        </button>
      </div>
    </div>
  );
}

// ─── ITEM DETAIL ──────────────────────────────────────────────────────────────
function ItemDetailPage({ itemId, setPage, addToSuitcase, suitcase, isMobile, isTablet, pagePad }) {
  const item=ITEMS.find(i=>i.id===itemId);
  const [inSuitcase,setInSuitcase]=useState(suitcase.some(s=>s.id===itemId));
  if(!item) return <div style={{ padding:`120px ${pagePad}px` }}><h2>Item not found</h2></div>;

  const prices=Object.entries(CONDITIONS).map(([key,val])=>({
    label:key, monthly:Math.max(4,Math.round(item.buyPrice*val.multiplier*0.10)),
    buyP:Math.round(item.buyPrice*val.multiplier), tagline:val.tagline, current:key===item.condition
  }));
  const related=ITEMS.filter(i=>i.id!==item.id&&(i.style===item.style||i.occasion===item.occasion)).slice(0,3);

  return (
    <div style={{ paddingTop:60,background:S.cream,minHeight:"100vh" }}>
      <div style={{ maxWidth:1020,margin:"0 auto",padding:`52px ${pagePad}px` }}>
        <button onClick={()=>setPage("browse")} style={{ background:"none",border:"none",cursor:"pointer",fontFamily:S.sans,fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",color:S.tan,marginBottom:36 }}>← Back to Catalog</button>
        <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:isMobile?28:60 }}>
          <div style={{ background:item.color,height:isMobile?300:420,display:"flex",alignItems:"center",justifyContent:"center",fontSize:isMobile?88:110 }}>{item.emoji}</div>
          <div>
            <p style={{ fontFamily:S.sans,fontSize:10,letterSpacing:"0.16em",textTransform:"uppercase",color:S.tan,marginBottom:10 }}>{item.brand} · {item.category} · {item.occasion}</p>
            <h1 style={{ fontFamily:S.serif,fontSize:isMobile?34:42,fontWeight:600,letterSpacing:"-1px",color:S.ink,marginBottom:14 }}>{item.name}</h1>
            <p style={{ fontFamily:S.sans,fontSize:15,color:S.muted,lineHeight:1.8,marginBottom:36 }}>{item.description}</p>
            <div style={{ marginBottom:32 }}>
              <p style={{ fontFamily:S.sans,fontSize:10,letterSpacing:"0.16em",textTransform:"uppercase",color:S.tan,marginBottom:14 }}>Monthly pricing</p>
              <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
                {prices.map(p=>(
                  <div key={p.label} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 18px",background:p.current?S.ink:"#fff",border:`1px solid ${p.current?S.ink:S.stone}` }}>
                    <div>
                      <span style={{ fontFamily:S.sans,fontSize:12,fontWeight:600,color:p.current?S.cream:S.ink }}>{p.tagline}</span>
                      {p.current&&<span style={{ fontFamily:S.sans,fontSize:10,color:"#9ca3af",marginLeft:10,fontStyle:"italic" }}>this piece</span>}
                    </div>
                    <div style={{ display:"flex",alignItems:"baseline",gap:4 }}>
                      <span style={{ fontFamily:S.serif,fontSize:26,fontWeight:700,color:p.current?S.cream:S.ink }}>${p.monthly}</span>
                      <span style={{ fontFamily:S.sans,fontSize:10,color:p.current?"#9ca3af":S.muted }}>/mo</span>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily:S.sans,fontSize:11,color:S.muted,marginTop:10 }}>{getWearRange(item.rentalCount)}. Every item is inspected and verified before it ships.</p>
            </div>
            <button onClick={()=>{ addToSuitcase(item); setInSuitcase(true); }} style={{ width:"100%",background:inSuitcase?"#f0ede8":S.ink,color:inSuitcase?"#6b5e4e":S.cream,border:"none",cursor:inSuitcase?"default":"pointer",padding:"16px",fontFamily:S.sans,fontSize:13,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase" }}>
              {inSuitcase?"✓ In Your Suitcase":"Add to Suitcase"}
            </button>
            {inSuitcase&&<button onClick={()=>setPage("suitcase")} style={{ width:"100%",background:"transparent",color:S.ink,border:`1px solid #c9bfb0`,cursor:"pointer",padding:"12px",fontFamily:S.sans,fontSize:12,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",marginTop:10 }}>View Suitcase</button>}
            <div style={{ display:"flex",alignItems:"center",gap:12,marginTop:14 }}>
              <div style={{ flex:1,height:1,background:S.stone }}/>
              <span style={{ fontFamily:S.sans,fontSize:10,color:S.muted,letterSpacing:"0.1em",textTransform:"uppercase" }}>or</span>
              <div style={{ flex:1,height:1,background:S.stone }}/>
            </div>
            <button style={{ width:"100%",background:"transparent",color:S.ink,border:`1px solid ${S.ink}`,cursor:"pointer",padding:"14px",fontFamily:S.sans,fontSize:13,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",marginTop:14,display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}>
              Buy This Piece ${getBuyPrice(item)}
            </button>
            <p style={{ fontFamily:S.sans,fontSize:11,color:S.muted,textAlign:"center",marginTop:8 }}>One-time purchase. Yours to keep.</p>
          </div>
        </div>
        {related.length>0&&(
          <div style={{ marginTop:80 }}>
            <p style={{ fontFamily:S.sans,fontSize:11,letterSpacing:"0.18em",textTransform:"uppercase",color:S.tan,marginBottom:12 }}>Goes Well With</p>
            <h2 style={{ fontFamily:S.serif,fontSize:34,fontWeight:600,color:S.ink,marginBottom:32 }}>Complete the look.</h2>
            <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":isTablet?"1fr 1fr":"repeat(3,1fr)",gap:24 }}>
              {related.map(i=><MiniItemCard key={i.id} item={i} setPage={setPage}/>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── QUIZ ─────────────────────────────────────────────────────────────────────
function QuizPage({ setPage, setStyleProfile, isMobile, isTablet, pagePad }) {
  const [index,setIndex]=useState(0);
  const [liked,setLiked]=useState([]);
  const [done,setDone]=useState(false);
  const [animDir,setAnimDir]=useState(null);

  function swipe(dir) {
    setAnimDir(dir);
    setTimeout(()=>{
      const newLiked=dir==="right"?[...liked,SWIPE_ITEMS[index].id]:liked;
      if(index+1>=SWIPE_ITEMS.length){ setStyleProfile(newLiked); setDone(true); }
      else{ setLiked(newLiked); setIndex(i=>i+1); setAnimDir(null); }
    },280);
  }

  if(done) {
    const picks=ITEMS.filter(i=>i.condition==="Like New").slice(0,4);
    return (
      <div style={{ paddingTop:60,minHeight:"100vh",background:S.cream }}>
        <div style={{ maxWidth:960,margin:"0 auto",padding:`60px ${pagePad}px` }}>
          <p style={{ fontFamily:S.sans,fontSize:11,letterSpacing:"0.2em",textTransform:"uppercase",color:S.tan,marginBottom:14 }}>Your Style Profile</p>
          <h1 style={{ fontFamily:S.serif,fontSize:isMobile?38:54,fontWeight:600,color:S.ink,letterSpacing:"-1.5px",marginBottom:14 }}>We know your vibe.</h1>
          <p style={{ fontFamily:S.sans,fontSize:16,color:S.muted,marginBottom:52 }}>Based on your swipes, here's what we think you'll love.</p>
          <div style={{ marginBottom:56 }}>
            <p style={{ fontFamily:S.sans,fontSize:10,letterSpacing:"0.18em",textTransform:"uppercase",color:S.tan,marginBottom:20 }}>Suggested Outfits</p>
            <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:24 }}>
              {OUTFITS.slice(0,2).map(outfit=>{
                const pieces=outfit.itemIds.map(id=>ITEMS.find(i=>i.id===id));
                const total=pieces.reduce((s,p)=>s+getMonthlyPrice(p),0);
                return (
                  <div key={outfit.id} style={{ background:"#fff",border:`1px solid ${S.stone}`,padding:"28px" }}>
                    <p style={{ fontFamily:S.sans,fontSize:9,letterSpacing:"0.14em",textTransform:"uppercase",color:S.tan,marginBottom:8 }}>{outfit.occasion} · {outfit.style}</p>
                    <h3 style={{ fontFamily:S.serif,fontSize:24,fontWeight:600,color:S.ink,marginBottom:20 }}>{outfit.name}</h3>
                    <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:20 }}>
                      {pieces.map(p=><div key={p.id} style={{ background:p.color,height:60,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22 }}>{p.emoji}</div>)}
                    </div>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                      <span style={{ fontFamily:S.serif,fontSize:20,fontWeight:700,color:S.ink }}>${total}<span style={{ fontFamily:S.sans,fontSize:10,color:S.muted }}>/mo</span></span>
                      <button onClick={()=>setPage("browse")} style={{ background:S.ink,color:S.cream,border:"none",cursor:"pointer",padding:"8px 18px",fontFamily:S.sans,fontSize:10,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase" }}>Shop Outfit</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <p style={{ fontFamily:S.sans,fontSize:10,letterSpacing:"0.18em",textTransform:"uppercase",color:S.tan,marginBottom:20 }}>Individual Picks For You</p>
            <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":isTablet?"1fr 1fr":"repeat(4,1fr)",gap:16 }}>
              {picks.map(item=><MiniItemCard key={item.id} item={item} setPage={setPage}/>)}
            </div>
          </div>
          <div style={{ marginTop:52,textAlign:"center" }}>
            <button onClick={()=>setPage("browse")} style={{ background:S.ink,color:S.cream,border:"none",cursor:"pointer",padding:"14px 40px",fontFamily:S.sans,fontSize:13,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase" }}>Browse Full Catalog</button>
          </div>
        </div>
      </div>
    );
  }

  const current=SWIPE_ITEMS[index];
  return (
    <div style={{ paddingTop:60,minHeight:"100vh",background:S.ink,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center" }}>
      <p style={{ fontFamily:S.sans,fontSize:11,letterSpacing:"0.2em",textTransform:"uppercase",color:"#6b5e4e",marginBottom:12 }}>Style Discovery</p>
      <h1 style={{ fontFamily:S.serif,fontSize:44,fontWeight:600,color:S.cream,letterSpacing:"-1px",marginBottom:8 }}>What speaks to you?</h1>
      <p style={{ fontFamily:S.sans,fontSize:14,color:"#6b7280",marginBottom:52 }}>{index+1} of {SWIPE_ITEMS.length}</p>
      <div
        style={{
          width:isMobile?`min(340px, calc(100vw - ${pagePad * 2}px))`:340,
          border:"1px solid #1f2937",
          padding:isMobile?"40px 24px":"52px 40px",
          textAlign:"center",
          transition:"transform 0.28s,opacity 0.28s",
          transform:animDir==="left"?"translateX(-120px) rotate(-8deg)":animDir==="right"?"translateX(120px) rotate(8deg)":"none",
          opacity:animDir?0:1,
          position:"relative",
          overflow:"hidden",
          backgroundColor:"#fff",
          backgroundImage: current.image ? `url(${current.image})` : "linear-gradient(135deg, #1f2937, #111827)",
          backgroundSize:"cover",
          backgroundPosition:"center"
        }}
      >
        <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.32)" }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ fontSize:64,marginBottom:24,filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.45))" }}>{current.emoji}</div>
          <h2 style={{ fontFamily:S.serif,fontSize:30,fontWeight:600,color:"#fff",marginBottom:10 }}>{current.label}</h2>
          <p style={{ fontFamily:S.sans,fontSize:14,color:"rgba(255,255,255,0.9)" }}>{current.desc}</p>
        </div>
      </div>
      <div style={{ display:"flex",gap:24,marginTop:44 }}>
        <button onClick={()=>swipe("left")}  style={{ width:64,height:64,borderRadius:"50%",background:"#1f2937",border:"1px solid #374151",cursor:"pointer",fontSize:22,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center" }}>✕</button>
        <button onClick={()=>swipe("right")} style={{ width:64,height:64,borderRadius:"50%",background:S.gold,border:"none",cursor:"pointer",fontSize:22,display:"flex",alignItems:"center",justifyContent:"center" }}>♥</button>
      </div>
      <div style={{ display:"flex",gap:5,marginTop:36 }}>
        {SWIPE_ITEMS.map((_,i)=><div key={i} style={{ width:28,height:3,background:i<=index?"#c4a882":"#1f2937",transition:"background 0.2s" }}/>)}
      </div>
    </div>
  );
}

// ─── SUITCASE ─────────────────────────────────────────────────────────────────
function SuitcasePage({ suitcase, removeFromSuitcase, setPage, isMobile, isTablet, pagePad }) {
  const [acted,setActed]=useState({});
  const total=suitcase.reduce((s,i)=>s+getMonthlyPrice(i),0);
  const suggested=ITEMS.filter(i=>!suitcase.some(s=>s.id===i.id)).slice(0,4);

  if(suitcase.length===0) return (
    <div style={{ paddingTop:60,minHeight:"100vh",background:S.cream,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center" }}>
      <div style={{ fontSize:72,marginBottom:24 }}>🧳</div>
      <h2 style={{ fontFamily:S.serif,fontSize:44,fontWeight:600,color:S.ink,marginBottom:14 }}>Your suitcase is empty.</h2>
      <p style={{ fontFamily:S.sans,fontSize:16,color:S.muted,marginBottom:36 }}>Start adding pieces to build your wardrobe.</p>
      <button onClick={()=>setPage("browse")} style={{ background:S.ink,color:S.cream,border:"none",cursor:"pointer",padding:"14px 36px",fontFamily:S.sans,fontSize:13,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase" }}>Browse the Catalog</button>
    </div>
  );

  const actionButtons = [
    { label:"Swap",        icon:"⇄", color:"#1e3a5f", bg:"#eff6ff" },
    { label:"Upgrade",     icon:"↑", color:"#166534", bg:"#f0fdf4" },
    { label:"Change Size", icon:"⊡", color:"#854d0e", bg:"#fefce8" },
  ];

  return (
    <div style={{ paddingTop:60,minHeight:"100vh",background:S.cream }}>
      <div style={{ maxWidth:980,margin:"0 auto",padding:`52px ${pagePad}px` }}>
        <p style={{ fontFamily:S.sans,fontSize:11,letterSpacing:"0.2em",textTransform:"uppercase",color:S.tan,marginBottom:12 }}>Your Suitcase</p>
        <h1 style={{ fontFamily:S.serif,fontSize:isMobile?36:48,fontWeight:600,color:S.ink,letterSpacing:"-1.5px",marginBottom:44 }}>
          {suitcase.length} piece{suitcase.length!==1?"s":""} selected.
        </h1>

        <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 340px",gap:40,alignItems:"start" }}>
          <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
            {suitcase.map(item=>(
              <div key={item.id} style={{ background:"#fff",border:`1px solid ${S.stone}` }}>
                {/* Item row */}
                <div style={{ display:"flex",alignItems:"center",gap:20,padding:"18px 22px" }}>
                  <div style={{ width:64,height:64,background:item.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0 }}>{item.emoji}</div>
                  <div style={{ flex:1 }}>
                    <p style={{ fontFamily:S.sans,fontSize:9,letterSpacing:"0.12em",textTransform:"uppercase",color:S.tan,marginBottom:2 }}>{item.brand}</p>
                    <h3 style={{ fontFamily:S.serif,fontSize:19,fontWeight:600,color:S.ink }}>{item.name}</h3>
                  </div>
                  <div style={{ textAlign:"right",flexShrink:0 }}>
                    <div style={{ fontFamily:S.serif,fontSize:22,fontWeight:700,color:S.ink }}>${getMonthlyPrice(item)}<span style={{ fontFamily:S.sans,fontSize:10,color:S.muted }}>/mo</span></div>
                  </div>
                </div>
                {/* Action row */}
                <div style={{ display:"flex",borderTop:`1px solid ${S.stone}` }}>
                  {actionButtons.map((btn,i)=>(
                    <>
                      <button key={btn.label}
                        onClick={()=>setActed(a=>({...a,[`${item.id}-${btn.label}`]:true}))}
                        style={{ flex:1,background:acted[`${item.id}-${btn.label}`]?S.cream:btn.bg,color:acted[`${item.id}-${btn.label}`]?S.muted:btn.color,border:"none",cursor:"pointer",padding:"9px 0",fontFamily:S.sans,fontSize:10,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",transition:"all 0.15s" }}>
                        {acted[`${item.id}-${btn.label}`]?`✓ ${btn.label}`:`${btn.icon} ${btn.label}`}
                      </button>
                      {i<actionButtons.length-1&&<div style={{ width:1,background:S.stone }}/>}
                    </>
                  ))}
                  <div style={{ width:1,background:S.stone }}/>
                  <button onClick={()=>removeFromSuitcase(item.id)} style={{ flex:1,background:"transparent",color:"#ef4444",border:"none",cursor:"pointer",padding:"9px 0",fontFamily:S.sans,fontSize:10,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase" }}>
                    ✕ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary panel */}
          <div style={{ background:S.ink,padding:"36px 32px",position:isMobile?"static":"sticky",top:80 }}>
            <h2 style={{ fontFamily:S.serif,fontSize:26,fontWeight:600,color:S.cream,marginBottom:28 }}>Monthly Total</h2>
            <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:24 }}>
              {suitcase.map(item=>(
                <div key={item.id} style={{ display:"flex",justifyContent:"space-between" }}>
                  <span style={{ fontFamily:S.sans,fontSize:12,color:"#9ca3af" }}>{item.name}</span>
                  <span style={{ fontFamily:S.sans,fontSize:12,color:S.cream }}>${getMonthlyPrice(item)}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop:"1px solid #1f2937",paddingTop:20,marginBottom:28 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline" }}>
                <span style={{ fontFamily:S.sans,fontSize:14,fontWeight:600,color:S.cream }}>Total / month</span>
                <span style={{ fontFamily:S.serif,fontSize:30,fontWeight:700,color:S.cream }}>${total}</span>
              </div>
            </div>
            <button style={{ width:"100%",background:S.gold,color:S.ink,border:"none",cursor:"pointer",padding:"14px",fontFamily:S.sans,fontSize:13,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:12 }}>
              Checkout Create Account
            </button>
            <p style={{ fontFamily:S.sans,fontSize:11,color:"#4b5563",textAlign:"center",marginBottom:16 }}>Wear monthly or buy outright your choice.</p>
            <div style={{ borderTop:"1px solid #1f2937",paddingTop:16 }}>
              <p style={{ fontFamily:S.sans,fontSize:10,color:"#374151",textAlign:"center",lineHeight:1.6 }}>Want to keep a piece forever? Buy it from your Suitcase at checkout.</p>
            </div>
          </div>
        </div>

        {/* Suggested for you */}
        <div style={{ marginTop:80 }}>
          <p style={{ fontFamily:S.sans,fontSize:10,letterSpacing:"0.2em",textTransform:"uppercase",color:S.tan,marginBottom:12 }}>Suggested for You</p>
          <h2 style={{ fontFamily:S.serif,fontSize:36,fontWeight:600,color:S.ink,marginBottom:10 }}>Pieces that pair well.</h2>
          <p style={{ fontFamily:S.sans,fontSize:14,color:S.muted,marginBottom:36 }}>Based on your Suitcase, your style profile, and what's trending right now.</p>
          <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":isTablet?"1fr 1fr":"repeat(4,1fr)",gap:18 }}>
            {suggested.map(item=><MiniItemCard key={item.id} item={item} setPage={setPage}/>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SUSTAINABILITY ───────────────────────────────────────────────────────────
function SustainabilityPage({ isMobile, isTablet, pagePad }) {
  return (
    <div style={{ paddingTop:60,background:"#000",minHeight:"100vh",color:"#fff" }}>

      {/* Personal opening */}
      <section style={{ padding:`100px ${pagePad}px`,borderBottom:"1px solid #111" }}>
        <div style={{ maxWidth:820,margin:"0 auto" }}>
          <p style={{ fontFamily:S.sans,fontSize:11,letterSpacing:"0.22em",textTransform:"uppercase",color:"#444",marginBottom:28 }}>Our Mission</p>
          <h1 style={{ fontFamily:S.serif,fontSize:"clamp(48px, 8vw, 96px)",fontWeight:300,lineHeight:0.9,letterSpacing:"-3px",color:"#fff",marginBottom:44 }}>
            You don't need<br/><em style={{ fontStyle:"italic" }}>more clothes.</em>
          </h1>
          <p style={{ fontFamily:S.sans,fontSize:18,color:"#888",lineHeight:1.85,maxWidth:580,marginBottom:24 }}>
            If you're like most guys in college, you've got a closet full of stuff you don't wear, and nothing to put on for the occasion that actually matters. More shopping doesn't fix that.
          </p>
          <p style={{ fontFamily:S.sans,fontSize:18,color:"#aaa",lineHeight:1.85,maxWidth:580 }}>
            Davenport was built for exactly that problem. Access to the right pieces, from brands worth wearing, at a price that makes sense for where you are right now.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding:`80px ${pagePad}px`,borderBottom:"1px solid #111" }}>
        <div style={{ maxWidth:1080,margin:"0 auto" }}>
          <p style={{ fontFamily:S.sans,fontSize:11,letterSpacing:"0.2em",textTransform:"uppercase",color:"#333",marginBottom:48 }}>The bigger picture</p>
          <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":isTablet?"1fr 1fr":"repeat(3,1fr)",gap:1,background:"#111" }}>
            {[["92M","Tons","of textile waste enter landfills every single year"],["60%","Of clothes","are worn fewer than 5 times before being thrown away"],["$500B","Lost annually","to clothing that gets discarded instead of reused"],["20%","Of pollution","of global wastewater comes from textile dyeing"],["3,000L","Of water","used to produce a single pair of jeans"],["10%","Of emissions","of global carbon output is from the fashion industry"]].map(([stat,label,detail])=>(
              <div key={stat} style={{ background:"#000",padding:"52px 36px" }}>
                <div style={{ fontFamily:S.serif,fontSize:62,fontWeight:700,color:"#fff",lineHeight:1,marginBottom:6 }}>{stat}</div>
                <div style={{ fontFamily:S.sans,fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",color:"#555",marginBottom:12 }}>{label}</div>
                <div style={{ fontFamily:S.sans,fontSize:14,color:"#555",lineHeight:1.65 }}>{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Davenport Answer */}
      <section style={{ padding:`80px ${pagePad}px`,borderBottom:"1px solid #111" }}>
        <div style={{ maxWidth:820,margin:"0 auto" }}>
          <p style={{ fontFamily:S.sans,fontSize:11,letterSpacing:"0.2em",textTransform:"uppercase",color:"#333",marginBottom:36 }}>The Davenport Answer</p>
          {[
            ["Wear more. Own less.","Every piece in your Suitcase is one you didn't have to buy outright and throw away after a season. And if you fall in love with it, you can buy it. That's the whole idea."],
            ["Quality over quantity.","We work with brands built to last. Nothing in our catalog is fast fashion. Every piece is worth wearing, and worth passing on."],
            ["Pricing that makes sense.","As a piece gets more wear, the monthly price comes down. You pay for the state it's in. Transparent, fair, simple."],
            ["Cleaned. Checked. Reshipped.","Every return is inspected, cleaned, and verified before it goes back out. The lifecycle of each piece is extended as long as possible."],
          ].map(([t,d])=>(
            <div key={t} style={{ borderTop:"1px solid #111",padding:"36px 0" }}>
              <h3 style={{ fontFamily:S.serif,fontSize:30,fontWeight:600,color:"#fff",marginBottom:12 }}>{t}</h3>
              <p style={{ fontFamily:S.sans,fontSize:16,color:"#666",lineHeight:1.8 }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Inspiring close */}
      <section style={{ padding:`80px ${pagePad}px`,textAlign:"center" }}>
        <h2 style={{ fontFamily:S.serif,fontSize:"clamp(36px, 5vw, 62px)",fontWeight:600,color:"#fff",letterSpacing:"-2px",marginBottom:20 }}>
          A smarter way to dress.<br/><em style={{ fontStyle:"italic",color:"#9c8b78" }}>For everyone.</em>
        </h2>
        <p style={{ fontFamily:S.sans,fontSize:16,color:"#666",marginBottom:44,maxWidth:480,margin:"0 auto 44px" }}>
          When you wear instead of buying and tossing, you're part of something bigger. Better for your wallet. Better for the planet. Better for the next guy who wears it after you.
        </p>
        <button style={{ background:"#fff",color:"#000",border:"none",cursor:"pointer",padding:"16px 44px",fontFamily:S.sans,fontSize:13,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase" }}>
          Start Wearing Today
        </button>
      </section>
    </div>
  );
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
function AuthPage({ mode, pagePad }) {
  const [done,setDone]=useState(false);
  const inp={ width:"100%",padding:"13px 16px",border:`1px solid ${S.stone}`,background:S.cream,fontFamily:S.sans,fontSize:14,color:S.ink,outline:"none",marginBottom:14,boxSizing:"border-box" };
  if(done) return (
    <div style={{ paddingTop:60,minHeight:"100vh",background:S.cream,display:"flex",alignItems:"center",justifyContent:"center" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:52,marginBottom:20 }}>✓</div>
        <h2 style={{ fontFamily:S.serif,fontSize:36,color:S.ink,marginBottom:10 }}>{mode==="signup"?"Welcome to Davenport.":"Welcome back."}</h2>
        <p style={{ fontFamily:S.sans,color:S.muted }}>Your presence just got an upgrade.</p>
      </div>
    </div>
  );
  return (
    <div style={{ paddingTop:60,minHeight:"100vh",background:S.cream,display:"flex",alignItems:"center",justifyContent:"center" }}>
      <div style={{ width:"100%",maxWidth:400,padding:`0 ${Math.max(16, pagePad)}px` }}>
        <div style={{ textAlign:"center",marginBottom:44 }}>
          <p style={{ fontFamily:S.serif,fontSize:14,color:S.tan,marginBottom:8 }}>Davenport Wardrobe</p>
          <h1 style={{ fontFamily:S.serif,fontSize:36,fontWeight:600,color:S.ink,letterSpacing:"-0.8px" }}>{mode==="signup"?"Create your account.":"Sign back in."}</h1>
        </div>
        {mode==="signup"&&<input placeholder="Full name" style={inp}/>}
        <input placeholder="Email address" type="email" style={inp}/>
        <input placeholder="Password" type="password" style={inp}/>
        <button onClick={()=>setDone(true)} style={{ width:"100%",background:S.ink,color:S.cream,border:"none",cursor:"pointer",padding:14,fontFamily:S.sans,fontSize:13,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginTop:4 }}>
          {mode==="signup"?"Create Account":"Sign In"}
        </button>
      </div>
    </div>
  );
}

// ─── COMMUNITY ────────────────────────────────────────────────────────────────
const POSTS = [
  { id:1,  user:"marcus_w",   school:"UVA",          emoji:"👤", bg:"#1e293b", caption:"Campus-to-dinner in the dark wash denim. Easiest fit I've put together all semester.",    items:["Slim Dark Wash Denim","Navy Quarter-Zip"],          likes:214, wears:"Worn together 3 times", aspect:"tall" },
  { id:2,  user:"tyler.b",    school:"Georgetown",   emoji:"👤", bg:"#c4a882", caption:"Internship week 1. The camel overcoat did all the work.",                                   items:["Camel Overcoat","Black Slim Trousers"],             likes:187, wears:"Overcoat 3 wears",   aspect:"tall" },
  { id:3,  user:"jameson_k",  school:"Michigan",     emoji:"👤", bg:"#86a98a", caption:"Weekend in the sage linen. Never going back to synthetic fabrics.",                         items:["Linen Shirt Sage","White Linen Shorts"],         likes:302, wears:"Shirt 5 wears",      aspect:"wide" },
  { id:4,  user:"cole.r",     school:"USC",          emoji:"👤", bg:"#0f172a", caption:"Night out uniform. Black bomber does exactly what you need it to.",                          items:["Black Bomber Jacket","Merino Turtleneck"],         likes:421, wears:"Bomber 4 wears",    aspect:"tall" },
  { id:5,  user:"ben_a",      school:"NYU",          emoji:"👤", bg:"#f5f0e0", caption:"The cream cardigan goes with literally everything. Wore it 3 days straight.",               items:["Cream Knit Cardigan","Taupe Chinos"],               likes:156, wears:"Cardigan 3 wears",  aspect:"wide" },
  { id:6,  user:"luca.m",     school:"Vanderbilt",   emoji:"👤", bg:"#7c2d3c", caption:"Corduroy season. The burgundy hits different in fall light.",                               items:["Burgundy Corduroy Shirt","Slim Dark Wash Denim"],  likes:289, wears:"Shirt 8 wears",    aspect:"tall" },
  { id:7,  user:"alex_n",     school:"Duke",         emoji:"👤", bg:"#1d3461", caption:"Rugby shirt + white sneakers. Simple. Just works.",                                          items:["Striped Rugby Shirt","White Court Sneakers"],      likes:198, wears:"Shirt 10 wears",   aspect:"wide" },
  { id:8,  user:"noah.f",     school:"Emory",        emoji:"👤", bg:"#d6cfc7", caption:"Stone chore coat is the most versatile thing in my Suitcase.",                              items:["Stone Chore Coat","Olive Cargo Pants"],            likes:341, wears:"Coat 5 wears",     aspect:"tall" },
  { id:9,  user:"drew_p",     school:"Boston College",emoji:"👤",bg:"#292524", caption:"The turtleneck. That's it. That's the post.",                                               items:["Merino Turtleneck"],                                likes:512, wears:"9 wears",             aspect:"wide" },
];

function CommunityPage({ setPage, isMobile, isTablet, pagePad }) {
  const [filter, setFilter] = useState("All");
  const [liked, setLiked] = useState({});
  const schools = ["All", ...new Set(POSTS.map(p => p.school))];

  const filtered = filter === "All" ? POSTS : POSTS.filter(p => p.school === filter);

  function toggleLike(id) {
    setLiked(l => ({ ...l, [id]: !l[id] }));
  }

  return (
    <div style={{ paddingTop:60, minHeight:"100vh", background:S.cream }}>
      {/* Header */}
      <div style={{ padding:`52px ${pagePad}px 36px`, background:"#fff", borderBottom:`1px solid ${S.stone}` }}>
        <div style={{ maxWidth:1080, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:20 }}>
            <div>
              <p style={{ fontFamily:S.sans, fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase", color:S.tan, marginBottom:10 }}>The Community</p>
              <h1 style={{ fontFamily:S.serif, fontSize:isMobile?36:48, fontWeight:600, letterSpacing:"-1.5px", color:S.ink, marginBottom:10 }}>Worn by real people.</h1>
              <p style={{ fontFamily:S.sans, fontSize:15, color:S.muted, maxWidth:440 }}>See how Davenport pieces actually look on real guys, at real schools, in real life.</p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:10 }}>
              <div style={{ display:"flex", gap:10 }}>
                <a href="https://instagram.com/fromdavenport" target="_blank" rel="noreferrer"
                  style={{ display:"flex", alignItems:"center", gap:6, fontFamily:S.sans, fontSize:11, color:S.ink, textDecoration:"none", border:`1px solid ${S.stone}`, padding:"7px 14px" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                  @fromdavenport
                </a>
                <a href="https://tiktok.com/@fromdavenport" target="_blank" rel="noreferrer"
                  style={{ display:"flex", alignItems:"center", gap:6, fontFamily:S.sans, fontSize:11, color:S.ink, textDecoration:"none", border:`1px solid ${S.stone}`, padding:"7px 14px" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>
                  @fromdavenport
                </a>
              </div>
              <button style={{ background:S.ink, color:S.cream, border:"none", cursor:"pointer", padding:"10px 22px", fontFamily:S.sans, fontSize:12, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>
                + Share Your Look
              </button>
            </div>
          </div>

          {/* School filter */}
          <div style={{ display:"flex", gap:6, marginTop:28, flexWrap:"wrap" }}>
            {schools.map(s => (
              <button key={s} onClick={() => setFilter(s)}
                style={{ background:filter===s?S.ink:"#fff", color:filter===s?S.cream:S.muted, border:`1px solid ${filter===s?S.ink:S.stone}`, padding:"5px 14px", fontFamily:S.sans, fontSize:11, fontWeight:500, letterSpacing:"0.06em", cursor:"pointer", textTransform:"uppercase" }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry-style grid */}
      <div style={{ maxWidth:1080, margin:"0 auto", padding:`40px ${pagePad}px 80px` }}>
        <div style={{ columns:isMobile?"1 280px":isTablet?"2 280px":"3 300px", columnGap:20 }}>
          {filtered.map(post => (
            <div key={post.id} style={{ breakInside:"avoid", marginBottom:20, background:"#fff", border:`1px solid ${S.stone}` }}>
              {/* Visual */}
              <div style={{ background:post.bg, height: post.aspect==="tall" ? 280 : 180, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
                {/* Simulated photo feel */}
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%, rgba(0,0,0,0.15) 100%)" }}/>
                <div style={{ textAlign:"center", position:"relative", zIndex:1 }}>
                  <div style={{ width:52, height:52, borderRadius:"50%", background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, margin:"0 auto 12px", border:"1px solid rgba(255,255,255,0.2)" }}>👤</div>
                  <p style={{ fontFamily:S.sans, fontSize:11, color:"rgba(255,255,255,0.7)", letterSpacing:"0.06em" }}>@{post.user}</p>
                </div>
                {/* Video play indicator on some */}
                {post.id % 3 === 0 && (
                  <div style={{ position:"absolute", bottom:12, left:12, display:"flex", alignItems:"center", gap:5, background:"rgba(0,0,0,0.5)", padding:"4px 10px", borderRadius:2 }}>
                    <div style={{ width:0, height:0, borderTop:"5px solid transparent", borderBottom:"5px solid transparent", borderLeft:"8px solid #fff" }}/>
                    <span style={{ fontFamily:S.sans, fontSize:9, color:"#fff", letterSpacing:"0.06em" }}>VIDEO</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{ padding:"16px 18px 14px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                  <div>
                    <span style={{ fontFamily:S.sans, fontSize:12, fontWeight:600, color:S.ink }}>@{post.user}</span>
                    <span style={{ fontFamily:S.sans, fontSize:10, color:S.muted, marginLeft:8 }}>{post.school}</span>
                  </div>
                  <button onClick={() => toggleLike(post.id)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:5, color: liked[post.id] ? "#e11d48" : S.muted }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={liked[post.id]?"currentColor":"none"} stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                    </svg>
                    <span style={{ fontFamily:S.sans, fontSize:11 }}>{liked[post.id] ? post.likes+1 : post.likes}</span>
                  </button>
                </div>

                <p style={{ fontFamily:S.sans, fontSize:13, color:S.ink, lineHeight:1.65, marginBottom:12 }}>{post.caption}</p>

                {/* Tagged pieces */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:10 }}>
                  {post.items.map(item => (
                    <button key={item} onClick={() => { const found = ITEMS.find(i=>i.name===item); if(found) setPage(`item-${found.id}`); }}
                      style={{ background:S.cream, border:`1px solid ${S.stone}`, padding:"3px 10px", fontFamily:S.sans, fontSize:10, color:S.tan, cursor:"pointer", letterSpacing:"0.04em" }}>
                      {item}
                    </button>
                  ))}
                </div>

                <p style={{ fontFamily:S.sans, fontSize:9, color:"#c4bdb5", letterSpacing:"0.06em", textTransform:"uppercase" }}>{post.wears}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Upload CTA */}
        <div style={{ marginTop:20, padding:"44px", background:S.ink, textAlign:"center" }}>
          <p style={{ fontFamily:S.sans, fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase", color:"#6b5e4e", marginBottom:16 }}>Share Your Look</p>
          <h2 style={{ fontFamily:S.serif, fontSize:36, fontWeight:600, color:S.cream, letterSpacing:"-1px", marginBottom:12 }}>Wearing Davenport?</h2>
          <p style={{ fontFamily:S.sans, fontSize:14, color:"#6b7280", marginBottom:32, maxWidth:400, margin:"0 auto 32px" }}>Post a photo or video on Instagram or TikTok and tag <strong style={{ color:S.gold }}>@fromdavenport</strong> to be featured here.</p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <a href="https://instagram.com/fromdavenport" target="_blank" rel="noreferrer"
              style={{ background:"transparent", color:S.cream, border:`1px solid #374151`, padding:"12px 28px", fontFamily:S.sans, fontSize:12, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", textDecoration:"none", display:"inline-block" }}>
              Instagram
            </a>
            <a href="https://tiktok.com/@fromdavenport" target="_blank" rel="noreferrer"
              style={{ background:S.cream, color:S.ink, border:"none", padding:"12px 28px", fontFamily:S.sans, fontSize:12, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", textDecoration:"none", display:"inline-block" }}>
              TikTok
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


function Footer({ setPage, isMobile, pagePad }) {
  return (
    <footer style={{ background:S.ink,padding:`52px ${pagePad}px 36px`,borderTop:"1px solid #1a1a1a" }}>
      <div style={{ maxWidth:1080,margin:"0 auto",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:32,marginBottom:40 }}>
        <div>
          <div style={{ fontFamily:S.serif,fontSize:22,color:S.cream,marginBottom:8 }}>Davenport</div>
          <p style={{ fontFamily:S.sans,fontSize:12,color:"#6b7280",maxWidth:200,lineHeight:1.7,marginBottom:20 }}>Upgrade your presence. One piece at a time.</p>
          <div style={{ display:"flex",gap:14 }}>
            <a href="https://instagram.com/fromdavenport" target="_blank" rel="noreferrer"
              style={{ display:"flex",alignItems:"center",gap:7,fontFamily:S.sans,fontSize:11,color:"#9ca3af",textDecoration:"none",border:"1px solid #1f2937",padding:"7px 14px",transition:"border-color 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor="#9ca3af"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="#1f2937"}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              @fromdavenport
            </a>
            <a href="https://tiktok.com/@fromdavenport" target="_blank" rel="noreferrer"
              style={{ display:"flex",alignItems:"center",gap:7,fontFamily:S.sans,fontSize:11,color:"#9ca3af",textDecoration:"none",border:"1px solid #1f2937",padding:"7px 14px",transition:"border-color 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor="#9ca3af"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="#1f2937"}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>
              @fromdavenport
            </a>
          </div>
        </div>
        <div style={{ display:"flex",gap:56,flexWrap:"wrap" }}>
          {[["Shop",[["browse","Browse All"],["quiz","Find My Style"],["community","Community"]]],["Company",[["sustainability","Our Mission"],["signup","Sign Up"]]]].map(([col,links])=>(
            <div key={col}>
              <p style={{ fontFamily:S.sans,fontSize:9,letterSpacing:"0.16em",textTransform:"uppercase",color:"#4b5563",marginBottom:14 }}>{col}</p>
              {links.map(([p,label])=>(
                <button key={p} onClick={()=>setPage(p)} style={{ display:"block",background:"none",border:"none",cursor:"pointer",fontFamily:S.sans,fontSize:13,color:"#9ca3af",padding:"4px 0",textAlign:"left" }}>{label}</button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderTop:"1px solid #1f2937",paddingTop:20,display:"flex",justifyContent:"space-between",flexDirection:isMobile?"column":"row",gap:isMobile?8:0 }}>
        <p style={{ fontFamily:S.sans,fontSize:11,color:"#374151" }}>© 2025 Davenport Wardrobe</p>
        <p style={{ fontFamily:S.sans,fontSize:11,color:"#374151" }}>Built for men who mean it.</p>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page,setPage]=useState("home");
  const [suitcase,setSuitcase]=useState([]);
  const [styleProfile,setStyleProfile]=useState([]);
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const pagePad = isMobile ? 16 : isTablet ? 24 : 40;

  function addToSuitcase(item){ setSuitcase(s=>s.some(i=>i.id===item.id)?s:[...s,item]); }
  function removeFromSuitcase(id){ setSuitcase(s=>s.filter(i=>i.id!==id)); }

  function nav(p){
    if(p==="signup"){ setPage("auth-signup"); window.scrollTo(0,0); return; }
    if(p==="login"){  setPage("auth-login");  window.scrollTo(0,0); return; }
    setPage(p); window.scrollTo(0,0);
  }

  function render(){
    if(page==="home")          return <HomePage setPage={nav} isMobile={isMobile} isTablet={isTablet} pagePad={pagePad}/>;
    if(page==="browse")        return <BrowsePage setPage={nav} addToSuitcase={addToSuitcase} suitcase={suitcase} isMobile={isMobile} isTablet={isTablet} pagePad={pagePad}/>;
    if(page==="quiz")          return <QuizPage setPage={nav} setStyleProfile={setStyleProfile} isMobile={isMobile} isTablet={isTablet} pagePad={pagePad}/>;
    if(page==="suitcase")      return <SuitcasePage suitcase={suitcase} removeFromSuitcase={removeFromSuitcase} setPage={nav} isMobile={isMobile} isTablet={isTablet} pagePad={pagePad}/>;
    if(page==="community")     return <CommunityPage setPage={nav} isMobile={isMobile} isTablet={isTablet} pagePad={pagePad}/>;
    if(page==="sustainability") return <SustainabilityPage isMobile={isMobile} isTablet={isTablet} pagePad={pagePad}/>;
    if(page==="auth-signup")   return <AuthPage mode="signup" pagePad={pagePad}/>;
    if(page==="auth-login")    return <AuthPage mode="login" pagePad={pagePad}/>;
    if(page.startsWith("item-")) return <ItemDetailPage itemId={parseInt(page.replace("item-",""))} setPage={nav} addToSuitcase={addToSuitcase} suitcase={suitcase} isMobile={isMobile} isTablet={isTablet} pagePad={pagePad}/>;
    return <HomePage setPage={nav} isMobile={isMobile} isTablet={isTablet} pagePad={pagePad}/>;
  }

  return (
    <>
      <style>{FONTS}{`*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}body{background:#faf9f7;-webkit-font-smoothing:antialiased}button:focus,input:focus{outline:none}`}</style>
      <Nav page={page} setPage={nav} suitcase={suitcase} isMobile={isMobile} pagePad={pagePad}/>
      {render()}
      {page!=="quiz"&&<Footer setPage={nav} isMobile={isMobile} pagePad={pagePad}/>}
    </>
  );
}
