import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════
//  NUMIVAS GALLERY & VAULT v3
//  Display company app for coin collectors
//  Features: Vault, My Displays, Studio, Safe Share,
//  Discovery, Concierge, Gap Finder, Artist Follow
// ═══════════════════════════════════════════════════════

const I = {
  Vault: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M12 3v3m0 12v3M3 12h3m12 0h3"/></svg>,
  Display: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="1"/><path d="M8 21h8m-4-4v4"/></svg>,
  Studio: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="1"/><rect x="5" y="6" width="14" height="8" rx="0.5"/><path d="M8 18h2m4 0h2"/></svg>,
  Share: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>,
  Discover: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
  Concierge: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  Hunt: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6m-3-3h6"/></svg>,
  Plus: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14m-7-7h14"/></svg>,
  Lock: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  Check: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>,
  Bell: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9m-4.27 13a2 2 0 01-3.46 0"/></svg>,
  Right: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>,
  Export: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m4-5l5-5 5 5m-5-5v12"/></svg>,
  Phone: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  Mail: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>,
  QR: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="2" width="8" height="8" rx="1"/><rect x="14" y="2" width="8" height="8" rx="1"/><rect x="2" y="14" width="8" height="8" rx="1"/><rect x="14" y="14" width="4" height="4"/><path d="M22 14h-4v4m4 0v4h-4"/><rect x="5" y="5" width="2" height="2"/><rect x="17" y="5" width="2" height="2"/><rect x="5" y="17" width="2" height="2"/></svg>,
  Heart: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  HeartFill: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  Link: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
  Edit: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Swap: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M16 3l4 4-4 4M20 7H4M8 21l-4-4 4-4M4 17h16"/></svg>,
  Market: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 7v13a2 2 0 002 2h14a2 2 0 002-2V7l-3-5z"/><path d="M3 7h18"/><path d="M16 11a4 4 0 01-8 0"/></svg>,
  Tag: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><circle cx="7" cy="7" r="1"/></svg>,
  Store: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>,
  External: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6m4-3h6v6m-11 5L21 3"/></svg>,
  Eye: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Msg: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>,
};

// ─── Data ───
const COINS = [
  { id: "c1", name: "1921 Morgan Silver Dollar", year: 1921, mint: "Philadelphia", grade: "MS-65", value: 485, series: "Morgan Dollar" },
  { id: "c2", name: "1955 Double Die Lincoln Cent", year: 1955, mint: "Philadelphia", grade: "AU-58", value: 1850, series: "Lincoln Cent" },
  { id: "c3", name: "2006 Gold Eagle 1oz", year: 2006, mint: "West Point", grade: "PF-70", value: 2340, series: "Gold Eagle" },
  { id: "c4", name: "1893-S Morgan Dollar", year: 1893, mint: "San Francisco", grade: "VF-30", value: 5200, series: "Morgan Dollar" },
  { id: "c5", name: "1916-D Mercury Dime", year: 1916, mint: "Denver", grade: "VG-8", value: 1100, series: "Mercury Dime" },
  { id: "c6", name: "2024 Silver Eagle Type 2", year: 2024, mint: "Philadelphia", grade: "MS-70", value: 75, series: "Silver Eagle" },
];

const PRINTS = [
  { id: "p1", name: "Eagle's Vigil — Geometric Series", artist: "Elena Voss", edition: "42/200", type: "Limited Print", nft: false, desc: "Geometric cubist bald eagle in silver and gold tones — complements any Morgan or Eagle display." },
  { id: "p2", name: "The Voyage — Maritime Heritage", artist: "Marcus Chen", edition: "15/150", type: "Limited Print", nft: false, desc: "Tall ship at sunset, evoking trade routes that circulated early American coinage." },
  { id: "p3", name: "One Giant Leap — Space Collection", artist: "Sofia Albrecht", edition: "NFT #0087", type: "NFT Limited", nft: true, desc: "Apollo lunar module — pairs with commemorative space coins." },
  { id: "p4", name: "Raising the Standard — Valor Series", artist: "James Okoro", edition: "NFT #0214", type: "NFT Limited", nft: true, desc: "Iconic flag-raising scene for the Vault Edition with military commemoratives." },
];

const FRAMES = [
  { id: "f1", name: "Classic Protect", size: '20" × 30"', coins: 2, price: 289, desc: "Hinged front panel, 2 NGC/PCGS slab slots, UV-protective glass." },
  { id: "f2", name: "Collector Secure", size: '20" × 30"', coins: 6, price: 449, desc: "Pull-out coin tray, 6 slab slots, museum-grade framing, keyed lock." },
  { id: "f3", name: "Vault Edition", size: '36" × 36"', coins: 8, price: 749, desc: "Multi-tray system, 8+ slabs, full wall-safe mounting. The flagship." },
];

const MY_DISPLAYS = [
  {
    id: "d1", name: "The Morgan Legacy Wall", frame: "Vault Edition", frameId: "f3",
    print: { name: "Eagle's Vigil — Geometric Series", artist: "Elena Voss", thumb: "🦅" },
    coins: [COINS[0], COINS[3], COINS[1]],
    location: "Living Room — West Wall", qrLinked: true,
    story: "Three generations of Morgan dollars, anchored by my grandfather's 1893-S — the coin that started it all.",
    shareLink: "https://numivas.com/share/mg7k2x",
  },
  {
    id: "d2", name: "Gold Eagle Tribute", frame: "Collector Secure", frameId: "f2",
    print: { name: "The Voyage — Maritime Heritage", artist: "Marcus Chen", thumb: "⛵" },
    coins: [COINS[2], COINS[5]],
    location: "Home Office", qrLinked: false,
    story: "",
    shareLink: null,
  },
];

const STUDIO_PRINTS = [
  { id: "s1", name: "Westward Journey", artist: "Elena Voss", price: 185, type: "print", editions: "23 left", desc: "Lewis & Clark meets numismatic art — pairs with Westward Journey nickels.", thumb: "🏔️" },
  { id: "s2", name: "Liberty Ascending", artist: "Marcus Chen", price: 240, type: "nft", editions: "NFT — 50 total", desc: "Abstract Lady Liberty across 200 years of coinage.", thumb: "🗽" },
  { id: "s3", name: "The Double Eagle Dream", artist: "Sofia Albrecht", price: 320, type: "print", editions: "8 left", desc: "Saint-Gaudens' masterpiece in gold leaf and ink.", thumb: "🦅" },
  { id: "s4", name: "Flowing Hair — Origins", artist: "James Okoro", price: 150, type: "nft", editions: "NFT — 100 total", desc: "America's first silver dollar, reimagined.", thumb: "✨" },
  { id: "s5", name: "The Carson City Vault", artist: "Elena Voss", price: 275, type: "print", editions: "12 left", desc: "Dusty vaults and the legendary CC mintmark.", thumb: "🏛️" },
  { id: "s6", name: "Proof Perfection", artist: "Marcus Chen", price: 195, type: "nft", editions: "NFT — 75 total", desc: "Mirror-finish proof coins in generative art.", thumb: "💎" },
];

const ARTISTS = [
  { id: "a1", name: "Elena Voss", specialty: "Geometric & Cubist", works: 12, bio: "Blends cubist geometry with numismatic imagery. Known for bold metallic palettes." },
  { id: "a2", name: "Marcus Chen", specialty: "Digital & Generative NFT", works: 8, bio: "Fuses generative algorithms with hand-drawn elements. Pioneer in NFT numismatic art." },
  { id: "a3", name: "Sofia Albrecht", specialty: "Historical & Space", works: 6, bio: "Layers archival photography with painted textures. Specializes in commemorative themes." },
  { id: "a4", name: "James Okoro", specialty: "Cinematic & Valor", works: 9, bio: "Moody, cinematic depictions of American history. Military and heritage focus." },
];

const DISCOVERY = [
  { title: "The 1933 Double Eagle", sub: "The $18.9 Million Coin", body: "Only one 1933 Saint-Gaudens Double Eagle is legally owned by a private collector. It sold for $18.9 million in 2021. Roosevelt ordered all 445,500 melted during the Gold Recall — but a handful escaped, inspiring Elena Voss's geometric series for Numivas.", date: "Today", tag: "Legendary Rarities" },
  { title: "Meet Marcus Chen", sub: "New Numivas Featured Artist", body: "Marcus blends generative algorithms with hand-drawn elements to create NFT artworks that tell the stories behind coins. His 'Voyage' series pairs with maritime coins, and 'Liberty Ascending' drops next month. We sat down to discuss bringing numismatic history into digital art.", date: "Yesterday", tag: "Artist Spotlight", artist: true, artistId: "a2" },
  { title: "Why Coins Have Ridged Edges", sub: "Isaac Newton's Invention", body: "In the 1690s, people shaved silver from coin edges for profit. Newton introduced reeded edges so tampering was visible. This innovation appears on every quarter today — and inspired the textured border detail on our Classic Protect frame.", date: "Feb 8", tag: "Mint Secrets" },
  { title: "Sofia Albrecht's Space Series", sub: "From Canvas to the Cosmos", body: "Sofia's 'One Giant Leap' was created by layering NASA archival photography with hand-painted lunar textures. Each NFT edition has a unique star-field variation. Her next piece, 'Pale Blue Dot,' pairs with the 2024 Space Commemorative.", date: "Feb 7", tag: "Artist Spotlight", artist: true, artistId: "a3" },
  { title: "New Drop: Carson City Vault", sub: "Elena Voss Limited Print", body: "Only 50 editions of 'The Carson City Vault' were made — 12 remain. This richly detailed piece captures the dusty vaults where legendary CC-mint silver dollars were rediscovered decades after striking. Pairs perfectly with any Morgan Dollar display.", date: "Feb 6", tag: "New Release", artistId: "a1" },
];

const GAPS_COINS = [
  { series: "Morgan Dollar", missing: ["1889-CC", "1895 Proof", "1892-S"], alertOn: true },
  { series: "Gold Eagle", missing: ["1986 Proof", "1991", "2000-W"], alertOn: true },
];
const GAPS_PRINTS = [
  { series: "Elena Voss — Geometric Series", missing: ["Eagle's Vigil II", "Liberty's Watch"], alertOn: false },
  { series: "Marcus Chen — NFT Voyages", missing: ["Pacific Crossing #12", "Atlantic Dawn #08"], alertOn: true },
];

// ─── Marketplace Data ───
const MKT_LISTINGS = [
  { id: "m1", type: "coin", name: "1889-CC Morgan Dollar", seller: "CollectorJim", rating: 4.9, sales: 23, grade: "VF-25", price: 3400, img: "🪙", desc: "Key date Carson City Morgan. Original surfaces, PCGS holder.", listed: "2 days ago", views: 47 },
  { id: "m2", type: "print", name: "Eagle's Vigil — Geometric", seller: "NancyK_Coins", rating: 5.0, sales: 8, artist: "Elena Voss", edition: "118/200", price: 210, img: "🦅", desc: "Mint condition, never framed. Includes COA.", listed: "5 hrs ago", views: 12 },
  { id: "m3", type: "display", name: "Complete Morgan Wall Display", seller: "SilverHeritage", rating: 4.8, sales: 15, frame: "Vault Edition", coinCount: 6, printCount: 1, price: 4800, img: "🖼️", desc: "Full Vault Edition with 6 Morgans plus 'Westward Journey' print. Wall-ready.", listed: "1 day ago", views: 89 },
  { id: "m4", type: "nft", name: "Pacific Crossing #12", seller: "DigitalMintNFT", rating: 4.7, sales: 31, artist: "Marcus Chen", edition: "NFT #0012", price: 380, img: "⛵", desc: "Rare early edition from Voyages series. Full Numivas provenance.", listed: "3 days ago", views: 34 },
  { id: "m5", type: "coin", name: "2000-W Gold Eagle Proof", seller: "EagleEyeNumi", rating: 4.9, sales: 42, grade: "PF-69", price: 2100, img: "🪙", desc: "Low-mintage West Point proof. NGC holder, gorgeous cameo.", listed: "6 hrs ago", views: 28 },
  { id: "m6", type: "display", name: "Gold Eagle Showcase", seller: "VaultBuilder", rating: 4.6, sales: 11, frame: "Collector Secure", coinCount: 4, printCount: 1, price: 2900, img: "🖼️", desc: "Collector Secure with 4 Gold Eagle proofs and 'Liberty Ascending' NFT.", listed: "4 days ago", views: 63 },
  { id: "m7", type: "print", name: "The Mint at Midnight", seller: "ArtfulCollector", rating: 5.0, sales: 5, artist: "James Okoro", edition: "7/75", price: 350, img: "🏛️", desc: "Early edition of Okoro's cinematic piece. Numivas COA.", listed: "12 hrs ago", views: 19 },
  { id: "m8", type: "coin", name: "1895 Morgan Proof", seller: "RareCoinVault", rating: 5.0, sales: 67, grade: "PF-63", price: 42000, img: "🪙", desc: "'King of Morgans.' ~880 proofs struck. PCGS + CAC.", listed: "1 day ago", views: 312 },
];
const MY_LISTED = [
  { id: "ml1", type: "coin", name: "1942/1 Mercury Dime", price: 1200, views: 18, inquiries: 2, listed: "3 days ago" },
  { id: "ml2", type: "print", name: "Flowing Hair — Origins (NFT #041)", price: 190, views: 9, inquiries: 0, listed: "1 day ago" },
];

// ─── Design Tokens ───
const c = {
  bg: "#09090C", s1: "#101216", s2: "#181C22", s3: "#1E2229",
  b: "rgba(178,158,118,0.09)", ba: "rgba(178,158,118,0.22)",
  g: "#B29E76", gb: "#CCBA94", gd: "#7A6E56",
  t: "#E0DAD0", ts: "#9A9184", td: "#5A544A",
  green: "#7AB886", greenBg: "rgba(122,184,134,0.07)", greenBo: "rgba(122,184,134,0.18)",
  nft: "#88AAD0", nftBg: "rgba(136,170,208,0.07)", nftBo: "rgba(136,170,208,0.18)",
  red: "#D08888",
};
const f = { d: "'Libre Baskerville','Georgia',serif", b: "'Karla','Helvetica Neue',sans-serif" };

// ─── Reusable Components ───
const Pill = ({ children, active, accent, onClick }) => (
  <button onClick={onClick} style={{
    padding: "5px 12px", borderRadius: "100px",
    border: `1px solid ${active ? (accent || c.ba) : c.b}`,
    background: active ? (accent === c.nft ? c.nftBg : "rgba(178,158,118,0.07)") : "transparent",
    color: active ? (accent || c.g) : c.td,
    fontFamily: f.b, fontSize: "11px", fontWeight: 700, letterSpacing: "0.5px",
    cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
  }}>{children}</button>
);

const Label = ({ children, right }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "9px" }}>
    <div style={{ fontFamily: f.b, fontSize: "9.5px", letterSpacing: "3px", textTransform: "uppercase", color: c.td, fontWeight: 800 }}>{children}</div>
    {right}
  </div>
);

const Box = ({ children, style: s, onClick, glow }) => (
  <div onClick={onClick} style={{
    background: c.s1, border: `1px solid ${glow ? c.ba : c.b}`, borderRadius: "12px", padding: "14px",
    cursor: onClick ? "pointer" : "default", transition: "all 0.25s ease", ...s,
  }}>{children}</div>
);

const Btn = ({ children, gold, small, full, style: s, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled} style={{
    padding: small ? "6px 13px" : "10px 18px", borderRadius: small ? "7px" : "9px",
    border: gold ? "none" : `1px solid ${c.ba}`,
    background: gold ? `linear-gradient(135deg, ${c.g}, ${c.gd})` : "transparent",
    color: gold ? c.bg : c.g, fontFamily: f.b, fontSize: small ? "11px" : "13px", fontWeight: 700,
    cursor: disabled ? "default" : "pointer", display: "inline-flex", alignItems: "center",
    justifyContent: "center", gap: "5px", width: full ? "100%" : "auto",
    opacity: disabled ? 0.4 : 1, transition: "all 0.2s", letterSpacing: "0.2px", ...s,
  }}>{children}</button>
);

const NFTBadge = () => (
  <span style={{ fontFamily: f.b, fontSize: "9px", fontWeight: 800, letterSpacing: "1px", padding: "2px 7px", borderRadius: "5px", background: c.nftBg, color: c.nft, border: `1px solid ${c.nftBo}` }}>NFT</span>
);

const VerifiedBadge = () => (
  <span style={{ fontFamily: f.b, fontSize: "8px", fontWeight: 800, letterSpacing: "0.5px", padding: "2px 6px", borderRadius: "4px", background: c.greenBg, color: c.green, border: `1px solid ${c.greenBo}`, display: "inline-flex", alignItems: "center", gap: "2px" }}>✓ VERIFIED</span>
);

const TypeBadge = ({ type }) => {
  const map = {
    coin: { label: "COIN", bg: "rgba(178,158,118,0.06)", color: c.g, bo: c.ba },
    print: { label: "PRINT", bg: "rgba(178,158,118,0.06)", color: c.g, bo: c.ba },
    nft: { label: "NFT PRINT", bg: c.nftBg, color: c.nft, bo: c.nftBo },
    display: { label: "FULL DISPLAY", bg: "rgba(204,164,84,0.06)", color: "#CCA454", bo: "rgba(204,164,84,0.16)" },
  };
  const t = map[type] || map.coin;
  return <span style={{ fontFamily: f.b, fontSize: "8px", fontWeight: 800, letterSpacing: "1px", padding: "2px 6px", borderRadius: "4px", background: t.bg, color: t.color, border: `1px solid ${t.bo}` }}>{t.label}</span>;
};

const FramePreview = ({ coins = 2, size = "md", thumb = "🖼️", style: s }) => {
  const w = size === "sm" ? 80 : size === "lg" ? 260 : 160;
  const slotW = size === "sm" ? 12 : size === "lg" ? 28 : 18;
  const slotH = size === "sm" ? 15 : size === "lg" ? 34 : 22;
  const showCoins = Math.min(coins, size === "sm" ? 3 : 6);
  return (
    <div style={{
      width: w, border: `${size === "sm" ? 2 : 4}px solid #252219`, borderRadius: "3px",
      background: "#0D0C0A", padding: size === "sm" ? "5px" : "10px", margin: "0 auto",
      boxShadow: "0 4px 16px rgba(0,0,0,0.4), inset 0 0 12px rgba(178,158,118,0.02)", ...s,
    }}>
      <div style={{
        width: "100%", aspectRatio: "16/10",
        background: "linear-gradient(145deg, rgba(178,158,118,0.07), rgba(178,158,118,0.02))",
        borderRadius: "2px", marginBottom: size === "sm" ? "4px" : "8px",
        display: "flex", alignItems: "center", justifyContent: "center",
        border: `1px solid rgba(178,158,118,0.08)`, fontSize: size === "sm" ? "14px" : size === "lg" ? "28px" : "20px",
      }}>{thumb}</div>
      <div style={{ display: "flex", gap: size === "sm" ? "2px" : "4px", justifyContent: "center", flexWrap: "wrap" }}>
        {Array.from({ length: showCoins }).map((_, i) => (
          <div key={i} style={{
            width: slotW, height: slotH, borderRadius: "2px",
            background: "rgba(178,158,118,0.05)", border: `1px solid rgba(178,158,118,0.08)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: size === "sm" ? "6px" : size === "lg" ? "12px" : "8px",
          }}>🪙</div>
        ))}
        {coins > showCoins && <span style={{ fontFamily: f.b, fontSize: "7px", color: c.td, alignSelf: "center" }}>+{coins - showCoins}</span>}
      </div>
    </div>
  );
};

// ═══ MAIN APP ═══
export default function NumivasApp() {
  const [tab, setTab] = useState("displays");
  const [mounted, setMounted] = useState(false);
  const [vaultSec, setVaultSec] = useState("coins");
  const [studioStep, setStudioStep] = useState("prints");
  const [selPrint, setSelPrint] = useState(null);
  const [selFrame, setSelFrame] = useState(null);
  const [storyIdx, setStoryIdx] = useState(0);
  const [gapTab, setGapTab] = useState("coins");
  const [gapAlerts, setGapAlerts] = useState({ coins: GAPS_COINS, prints: GAPS_PRINTS });
  const [callReq, setCallReq] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [shareLnk, setShareLnk] = useState("");
  const [pFilter, setPFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [followedArtists, setFollowedArtists] = useState(["a1", "a2"]);
  const [expandedDisplay, setExpandedDisplay] = useState("d1");
  const [qrModal, setQrModal] = useState(null);
  const [storyText, setStoryText] = useState("");
  const [showArtists, setShowArtists] = useState(false);
  const [discFilter, setDiscFilter] = useState("all");
  const [mktTab, setMktTab] = useState("browse");
  const [mktFilter, setMktFilter] = useState("all");
  const [mktDetail, setMktDetail] = useState(null);
  const [listModal, setListModal] = useState(false);
  const [listType, setListType] = useState("coin");

  useEffect(() => { setMounted(true); }, []);

  const totalVal = COINS.reduce((s, co) => s + co.value, 0);
  const filtStudio = pFilter === "all" ? STUDIO_PRINTS : pFilter === "nft" ? STUDIO_PRINTS.filter(p => p.type === "nft") : STUDIO_PRINTS.filter(p => p.type === "print");
  const filtDisc = discFilter === "all" ? DISCOVERY : discFilter === "artists" ? DISCOVERY.filter(d => d.artist || d.artistId) : DISCOVERY.filter(d => !d.artist);

  const filtMkt = mktFilter === "all" ? MKT_LISTINGS : MKT_LISTINGS.filter(l => l.type === mktFilter);

  const toggleFollow = (id) => setFollowedArtists(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  const toggleGap = (type, idx) => {
    setGapAlerts(prev => {
      const u = { ...prev }; u[type] = [...u[type]];
      u[type][idx] = { ...u[type][idx], alertOn: !u[type][idx].alertOn }; return u;
    });
  };

  const tabs = [
    { id: "displays", label: "Displays", icon: <I.Display /> },
    { id: "vault", label: "Vault", icon: <I.Vault /> },
    { id: "studio", label: "Studio", icon: <I.Studio /> },
    { id: "market", label: "Market", icon: <I.Market /> },
    { id: "share", label: "Share", icon: <I.Share /> },
    { id: "discover", label: "Discover", icon: <I.Discover /> },
    { id: "concierge", label: "Help", icon: <I.Concierge /> },
    { id: "hunt", label: "Gaps", icon: <I.Hunt /> },
  ];

  return (
    <div style={{ minHeight: "100vh", background: c.bg, fontFamily: f.d, color: c.t, position: "relative" }}>
      <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Karla:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", opacity: 0.02, background: "radial-gradient(ellipse at 25% 0%, #B29E76, transparent 55%), radial-gradient(ellipse at 75% 100%, #B29E76, transparent 55%)" }}/>

      {/* HEADER */}
      <header style={{ padding: "16px 18px 12px", borderBottom: `1px solid ${c.b}`, position: "relative", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: f.b, fontSize: "8.5px", letterSpacing: "4px", textTransform: "uppercase", color: c.gd, fontWeight: 800 }}>Gallery & Vault</div>
            <h1 style={{ fontSize: "22px", fontWeight: 400, letterSpacing: "3px", margin: 0, color: c.gb }}>NUMIVAS</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", background: "rgba(178,158,118,0.05)", borderRadius: "18px", padding: "4px 10px", border: `1px solid ${c.b}` }}>
            <I.Lock /><span style={{ fontFamily: f.b, fontSize: "8.5px", color: c.gd, letterSpacing: "1.5px", fontWeight: 800 }}>PRIVATE</span>
          </div>
        </div>
      </header>

      {/* NAV */}
      <nav style={{ display: "flex", gap: "1px", padding: "5px 6px", overflowX: "auto", borderBottom: `1px solid ${c.b}`, scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            display: "flex", alignItems: "center", gap: "4px", padding: "6px 10px", borderRadius: "7px", border: "none",
            cursor: "pointer", fontFamily: f.b, fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.3px", whiteSpace: "nowrap",
            transition: "all 0.2s", background: tab === t.id ? "rgba(178,158,118,0.1)" : "transparent",
            color: tab === t.id ? c.g : c.td,
          }}>
            <span style={{ opacity: tab === t.id ? 1 : 0.35, transition: "opacity 0.2s" }}>{t.icon}</span>{t.label}
          </button>
        ))}
      </nav>

      {/* CONTENT */}
      <main style={{ padding: "16px 14px 36px", maxWidth: "560px", margin: "0 auto",
        opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(8px)", transition: "all 0.4s" }}>

        {/* ═══════════ MY DISPLAYS (Digital Twin) ═══════════ */}
        {tab === "displays" && (<div>
          <div style={{ marginBottom: "18px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 400, margin: "0 0 3px" }}>My Displays</h2>
            <p style={{ fontFamily: f.b, fontSize: "12px", color: c.td, margin: 0 }}>
              A digital twin of every Numivas frame on your wall.
            </p>
          </div>

          {MY_DISPLAYS.map((disp) => {
            const expanded = expandedDisplay === disp.id;
            return (
              <Box key={disp.id} glow={expanded} onClick={() => setExpandedDisplay(expanded ? null : disp.id)}
                style={{ marginBottom: "12px", transition: "all 0.3s" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <FramePreview coins={disp.coins.length} size="sm" thumb={disp.print.thumb} style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "16px", fontWeight: 700 }}>{disp.name}</div>
                    <div style={{ fontFamily: f.b, fontSize: "11px", color: c.ts, marginTop: "1px" }}>
                      {disp.frame} · {disp.coins.length} coins
                    </div>
                    <div style={{ fontFamily: f.b, fontSize: "10px", color: c.td, marginTop: "2px" }}>📍 {disp.location}</div>
                    <div style={{ display: "flex", gap: "6px", marginTop: "6px", flexWrap: "wrap" }}>
                      {disp.qrLinked && (
                        <span style={{ fontFamily: f.b, fontSize: "9px", fontWeight: 700, padding: "2px 7px", borderRadius: "5px", background: c.greenBg, color: c.green, border: `1px solid ${c.greenBo}`, display: "flex", alignItems: "center", gap: "3px" }}>
                          <I.QR /> QR LINKED
                        </span>
                      )}
                      {disp.shareLink && (
                        <span style={{ fontFamily: f.b, fontSize: "9px", fontWeight: 700, padding: "2px 7px", borderRadius: "5px", background: "rgba(178,158,118,0.06)", color: c.g, border: `1px solid ${c.b}`, display: "flex", alignItems: "center", gap: "3px" }}>
                          <I.Link /> SHARED
                        </span>
                      )}
                    </div>
                  </div>
                  <span style={{ color: c.td, flexShrink: 0, transform: expanded ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}><I.Right /></span>
                </div>

                {expanded && (
                  <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: `1px solid ${c.b}` }} onClick={e => e.stopPropagation()}>
                    {/* Print */}
                    <Label>Print</Label>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", background: c.s2, borderRadius: "9px", marginBottom: "12px" }}>
                      <span style={{ fontSize: "22px" }}>{disp.print.thumb}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: f.b, fontSize: "13px", fontWeight: 600 }}>{disp.print.name}</div>
                        <div style={{ fontFamily: f.b, fontSize: "10px", color: c.td }}>by {disp.print.artist}</div>
                      </div>
                      <Btn small onClick={() => {}}><I.Swap /> Swap</Btn>
                    </div>

                    {/* Coins in this display */}
                    <Label>Coins in Display</Label>
                    {disp.coins.map(co => (
                      <div key={co.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", background: c.s2, borderRadius: "9px", marginBottom: "4px" }}>
                        <span style={{ fontSize: "16px" }}>🪙</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: f.b, fontSize: "12px", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{co.name}</div>
                          <div style={{ fontFamily: f.b, fontSize: "10px", color: c.td }}>{co.grade} · ${co.value.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}

                    {/* Story */}
                    {disp.story && (
                      <div style={{ marginTop: "10px", padding: "10px 12px", background: "rgba(178,158,118,0.04)", borderRadius: "9px", border: `1px solid ${c.b}` }}>
                        <div style={{ fontFamily: f.b, fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: c.gd, fontWeight: 800, marginBottom: "4px" }}>Your Story</div>
                        <div style={{ fontFamily: f.d, fontSize: "13px", color: c.ts, lineHeight: 1.65, fontStyle: "italic" }}>"{disp.story}"</div>
                      </div>
                    )}

                    {/* Actions */}
                    <div style={{ display: "flex", gap: "6px", marginTop: "12px", flexWrap: "wrap" }}>
                      <Btn small onClick={() => setQrModal(disp)}>
                        <I.QR /> {disp.qrLinked ? "View QR" : "Link QR Code"}
                      </Btn>
                      <Btn small onClick={() => { setShareLnk(disp.shareLink || `https://numivas.com/share/${Math.random().toString(36).slice(2,8)}`); setShareModal(true); }}>
                        <I.Share /> Share Display
                      </Btn>
                      <Btn small><I.Edit /> Edit</Btn>
                      <Btn small onClick={() => { setTab("market"); setMktTab("sell"); }}><I.Tag /> List on Market</Btn>
                    </div>
                  </div>
                )}
              </Box>
            );
          })}

          <button onClick={() => setTab("studio")} style={{
            width: "100%", padding: "14px", border: `2px dashed ${c.b}`, borderRadius: "12px",
            background: "transparent", color: c.g, cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", gap: "6px", fontFamily: f.b, fontSize: "12px", fontWeight: 700, marginTop: "4px",
          }}><I.Plus /> Create New Display in Studio</button>

          {/* QR Modal */}
          {qrModal && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "20px" }} onClick={() => setQrModal(null)}>
              <div onClick={e => e.stopPropagation()} style={{ background: c.s1, border: `1px solid ${c.ba}`, borderRadius: "18px", padding: "24px", maxWidth: "340px", width: "100%", textAlign: "center" }}>
                <div style={{ fontSize: "14px", marginBottom: "8px", fontWeight: 700 }}>QR Code</div>
                <div style={{ fontFamily: f.b, fontSize: "11px", color: c.ts, marginBottom: "16px" }}>
                  Place this QR on the back of your "{qrModal.name}" frame. When scanned, visitors see the digital display.
                </div>
                {/* QR visual */}
                <div style={{ width: "140px", height: "140px", margin: "0 auto 16px", background: "#fff", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", padding: "12px" }}>
                  <div style={{ width: "100%", height: "100%", display: "grid", gridTemplateColumns: "repeat(7,1fr)", gridTemplateRows: "repeat(7,1fr)", gap: "2px" }}>
                    {Array.from({ length: 49 }).map((_, i) => {
                      const row = Math.floor(i / 7); const col = i % 7;
                      const isCorner = (row < 3 && col < 3) || (row < 3 && col > 3) || (row > 3 && col < 3);
                      const isFill = isCorner || Math.random() > 0.45;
                      return <div key={i} style={{ background: isFill ? "#09090C" : "#fff", borderRadius: "1px" }} />;
                    })}
                  </div>
                </div>
                <div style={{ fontFamily: f.b, fontSize: "10px", color: c.td, marginBottom: "14px" }}>
                  {qrModal.shareLink || "https://numivas.com/share/..."}
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Btn gold full>Download QR</Btn>
                  <Btn small onClick={() => setQrModal(null)}>Close</Btn>
                </div>
              </div>
            </div>
          )}
        </div>)}

        {/* ═══════════ VAULT ═══════════ */}
        {tab === "vault" && (<div>
          <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
            <Pill active={vaultSec === "coins"} onClick={() => setVaultSec("coins")}>🪙 My Coins</Pill>
            <Pill active={vaultSec === "prints"} onClick={() => setVaultSec("prints")}>🖼️ My Prints</Pill>
          </div>

          {vaultSec === "coins" && (<>
            <Box glow style={{ marginBottom: "16px", background: "linear-gradient(145deg, rgba(178,158,118,0.05), rgba(178,158,118,0.01))" }}>
              <div style={{ fontFamily: f.b, fontSize: "9.5px", letterSpacing: "3px", textTransform: "uppercase", color: c.td, fontWeight: 800, marginBottom: "5px" }}>Collection Value</div>
              <div style={{ fontSize: "36px", fontWeight: 400, color: c.g, lineHeight: 1 }}>${totalVal.toLocaleString()}</div>
              <div style={{ fontFamily: f.b, fontSize: "11px", color: c.td, marginTop: "2px" }}>{COINS.length} coins</div>
              <div style={{ display: "flex", gap: "7px", marginTop: "12px" }}>
                <Btn small><I.Export /> Export for Heirs</Btn>
                <Btn small>Print PDF</Btn>
              </div>
            </Box>

            {!showAdd ? (
              <button onClick={() => setShowAdd(true)} style={{ width: "100%", padding: "13px", border: `2px dashed ${c.b}`, borderRadius: "11px", background: "transparent", color: c.g, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontFamily: f.b, fontSize: "12px", fontWeight: 700, marginBottom: "16px" }}><I.Plus /> Add a Coin</button>
            ) : (
              <Box style={{ marginBottom: "16px" }}>
                <div style={{ fontFamily: f.b, fontSize: "9.5px", letterSpacing: "2px", textTransform: "uppercase", color: c.g, fontWeight: 800, marginBottom: "12px" }}>Add New Coin</div>
                {["Coin Name", "Year", "Mint", "Grade", "Value ($)", "Series"].map((fl, i) => (
                  <div key={i} style={{ marginBottom: "8px" }}>
                    <label style={{ fontFamily: f.b, fontSize: "10px", color: c.td, display: "block", marginBottom: "2px", fontWeight: 700 }}>{fl}</label>
                    <input style={{ width: "100%", padding: "8px 10px", background: "rgba(0,0,0,0.3)", border: `1px solid ${c.b}`, borderRadius: "7px", color: c.t, fontFamily: f.b, fontSize: "12px", outline: "none", boxSizing: "border-box" }}/>
                  </div>
                ))}
                <div style={{ border: `2px dashed ${c.b}`, borderRadius: "9px", padding: "18px", textAlign: "center", marginBottom: "12px", cursor: "pointer" }}>
                  <div style={{ fontFamily: f.b, fontSize: "11px", color: c.td }}>📷 Upload Photo or Scan Barcode</div>
                </div>
                <div style={{ display: "flex", gap: "7px" }}>
                  <Btn gold full onClick={() => setShowAdd(false)}>Save to Vault</Btn>
                  <Btn small onClick={() => setShowAdd(false)}>Cancel</Btn>
                </div>
              </Box>
            )}

            <Label>Your Coins</Label>
            {COINS.map(co => (
              <Box key={co.id} style={{ marginBottom: "6px", display: "flex", alignItems: "center", gap: "10px", padding: "11px 12px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(178,158,118,0.1), rgba(178,158,118,0.03))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>🪙</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "14px", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{co.name}</div>
                  <div style={{ fontFamily: f.b, fontSize: "10px", color: c.td, marginTop: "1px" }}>{co.mint} · {co.grade} · {co.series}</div>
                </div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: c.g, flexShrink: 0 }}>${co.value.toLocaleString()}</div>
              </Box>
            ))}
          </>)}

          {vaultSec === "prints" && (<>
            <Label>Your Prints & NFTs</Label>
            {PRINTS.map(p => (
              <Box key={p.id} style={{ marginBottom: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: 700 }}>{p.name}</div>
                    <div style={{ fontFamily: f.b, fontSize: "10px", color: c.td, marginTop: "1px" }}>by {p.artist} · {p.edition}</div>
                  </div>
                  {p.nft && <NFTBadge />}
                </div>
                <div style={{ fontFamily: f.b, fontSize: "11px", color: c.ts, lineHeight: 1.55 }}>{p.desc}</div>
              </Box>
            ))}
            <button style={{ width: "100%", padding: "13px", border: `2px dashed ${c.b}`, borderRadius: "11px", background: "transparent", color: c.g, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontFamily: f.b, fontSize: "12px", fontWeight: 700, marginTop: "4px" }}><I.Plus /> Add a Print</button>
          </>)}

          <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "9px 12px", background: "rgba(178,158,118,0.03)", borderRadius: "9px", marginTop: "14px", border: `1px solid ${c.b}` }}>
            <I.Lock /><span style={{ fontFamily: f.b, fontSize: "10px", color: c.td }}>Your collection data is private and encrypted.</span>
          </div>
        </div>)}

        {/* ═══════════ STUDIO ═══════════ */}
        {tab === "studio" && (<div>
          <div style={{ marginBottom: "18px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 400, margin: "0 0 3px" }}>Design Studio</h2>
            <p style={{ fontFamily: f.b, fontSize: "12px", color: c.td, margin: 0 }}>Choose a print, pick a frame, tell your story.</p>
          </div>

          <div style={{ display: "flex", gap: "3px", marginBottom: "18px" }}>
            {[{ id: "prints", l: "1. Print" }, { id: "frame", l: "2. Frame" }, { id: "preview", l: "3. Preview" }].map(s => (
              <button key={s.id} onClick={() => setStudioStep(s.id)} style={{
                flex: 1, padding: "7px", borderRadius: "7px", border: "none", cursor: "pointer",
                fontFamily: f.b, fontSize: "10px", fontWeight: 800, letterSpacing: "0.5px",
                background: studioStep === s.id ? "rgba(178,158,118,0.1)" : "rgba(255,255,255,0.02)",
                color: studioStep === s.id ? c.g : c.td, transition: "all 0.2s",
              }}>{s.l}</button>
            ))}
          </div>

          {studioStep === "prints" && (<>
            <div style={{ display: "flex", gap: "4px", marginBottom: "12px" }}>
              <Pill active={pFilter === "all"} onClick={() => setPFilter("all")}>All</Pill>
              <Pill active={pFilter === "print"} onClick={() => setPFilter("print")}>🖼️ Prints</Pill>
              <Pill active={pFilter === "nft"} onClick={() => setPFilter("nft")} accent={c.nft}>◆ NFTs</Pill>
            </div>
            {filtStudio.map(p => (
              <Box key={p.id} glow={selPrint?.id === p.id} onClick={() => setSelPrint(p)} style={{ marginBottom: "7px" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "8px", background: "linear-gradient(135deg, rgba(178,158,118,0.08), rgba(178,158,118,0.02))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", flexShrink: 0, border: `1px solid ${c.b}` }}>{p.thumb}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: 700 }}>{p.name}</div>
                        <div style={{ fontFamily: f.b, fontSize: "10px", color: c.td, marginTop: "1px" }}>by {p.artist} · {p.editions}</div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontFamily: f.b, fontSize: "13px", fontWeight: 800, color: c.g }}>${p.price}</div>
                        {p.type === "nft" && <span style={{ fontFamily: f.b, fontSize: "8px", fontWeight: 800, color: c.nft }}>NFT</span>}
                      </div>
                    </div>
                    <div style={{ fontFamily: f.b, fontSize: "10px", color: c.ts, marginTop: "3px", lineHeight: 1.45 }}>{p.desc}</div>
                  </div>
                </div>
                {selPrint?.id === p.id && (
                  <div style={{ marginTop: "10px", display: "flex", justifyContent: "flex-end" }}>
                    <Btn small gold onClick={e => { e.stopPropagation(); setStudioStep("frame"); }}>Select Print <I.Right /></Btn>
                  </div>
                )}
              </Box>
            ))}
          </>)}

          {studioStep === "frame" && (<>
            {selPrint && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 12px", background: c.greenBg, borderRadius: "8px", border: `1px solid ${c.greenBo}`, marginBottom: "12px" }}>
                <I.Check /><span style={{ fontFamily: f.b, fontSize: "11px", color: c.green, fontWeight: 700 }}>Print: {selPrint.name}</span>
              </div>
            )}
            <Label>Choose Your Numivas Display</Label>
            {FRAMES.map(fr => (
              <Box key={fr.id} glow={selFrame?.id === fr.id} onClick={() => setSelFrame(fr)} style={{ marginBottom: "8px" }}>
                <div style={{ display: "flex", gap: "12px" }}>
                  <FramePreview coins={fr.coins} size="sm" style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: "15px", fontWeight: 700 }}>{fr.name}</div>
                        <div style={{ fontFamily: f.b, fontSize: "10px", color: c.td }}>{fr.size} · {fr.coins} slabs</div>
                      </div>
                      <div style={{ fontFamily: f.b, fontSize: "15px", fontWeight: 800, color: c.g }}>${fr.price}</div>
                    </div>
                    <div style={{ fontFamily: f.b, fontSize: "10px", color: c.ts, marginTop: "3px", lineHeight: 1.45 }}>{fr.desc}</div>
                  </div>
                </div>
                {selFrame?.id === fr.id && (
                  <div style={{ marginTop: "10px", display: "flex", justifyContent: "flex-end" }}>
                    <Btn small gold onClick={e => { e.stopPropagation(); setStudioStep("preview"); }}>Preview <I.Right /></Btn>
                  </div>
                )}
              </Box>
            ))}
          </>)}

          {studioStep === "preview" && (<>
            <Box glow style={{ textAlign: "center", padding: "22px", marginBottom: "14px" }}>
              <div style={{ fontFamily: f.b, fontSize: "9.5px", letterSpacing: "3px", textTransform: "uppercase", color: c.td, fontWeight: 800, marginBottom: "14px" }}>Your Numivas Display</div>
              <FramePreview coins={selFrame?.coins || 2} size="lg" thumb={selPrint?.thumb || "🖼️"} />
              <div style={{ fontSize: "18px", fontWeight: 700, marginTop: "14px" }}>{selFrame?.name || "Frame"}</div>
              <div style={{ fontFamily: f.b, fontSize: "11px", color: c.td, marginTop: "2px" }}>
                with "{selPrint?.name || "Print"}" by {selPrint?.artist || "Artist"}
              </div>
              <div style={{ fontFamily: f.b, fontSize: "10px", color: c.td }}>{selFrame?.size} · {selFrame?.coins} coin slots</div>

              {/* Story Input */}
              <div style={{ marginTop: "14px", textAlign: "left" }}>
                <Label>Tell Your Story (optional)</Label>
                <textarea value={storyText} onChange={e => setStoryText(e.target.value)}
                  placeholder="e.g. These coins belonged to my grandfather..."
                  style={{ width: "100%", minHeight: "70px", padding: "10px", background: c.s2, border: `1px solid ${c.b}`, borderRadius: "8px", color: c.t, fontFamily: f.d, fontSize: "13px", outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.6 }} />
                <div style={{ fontFamily: f.b, fontSize: "10px", color: c.td, marginTop: "3px" }}>
                  This personal narrative will appear on your digital display and in shared links.
                </div>
              </div>

              {/* Total */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "rgba(178,158,118,0.05)", borderRadius: "9px", border: `1px solid ${c.ba}`, margin: "14px 0" }}>
                <span style={{ fontFamily: f.b, fontSize: "11px", color: c.ts }}>Frame + Print</span>
                <span style={{ fontSize: "20px", fontWeight: 700, color: c.g }}>${((selFrame?.price || 0) + (selPrint?.price || 0)).toLocaleString()}</span>
              </div>
              <Btn gold full style={{ marginBottom: "8px" }}>Add to Cart</Btn>
              <Btn full small onClick={() => { setStudioStep("prints"); setSelPrint(null); setSelFrame(null); setStoryText(""); }}>← Start Over</Btn>
            </Box>
          </>)}
        </div>)}

        {/* ═══════════ MARKETPLACE ═══════════ */}
        {tab === "market" && (<div>
          <div style={{ marginBottom: "16px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 400, margin: "0 0 3px" }}>Marketplace</h2>
            <p style={{ fontFamily: f.b, fontSize: "12px", color: c.td, margin: 0 }}>Buy, sell, and trade within the Numivas collector community.</p>
          </div>

          {/* Sub-tabs */}
          <div style={{ display: "flex", gap: "2px", marginBottom: "16px", background: c.s1, borderRadius: "8px", padding: "3px", border: `1px solid ${c.b}` }}>
            {[{ id: "browse", l: "🔍 Browse" }, { id: "sell", l: "📤 Sell" }, { id: "store", l: "🏛️ Numivas Store" }].map(t => (
              <button key={t.id} onClick={() => { setMktTab(t.id); setMktDetail(null); }} style={{
                flex: 1, padding: "7px", borderRadius: "6px", border: "none", cursor: "pointer",
                fontFamily: f.b, fontSize: "10px", fontWeight: 700,
                background: mktTab === t.id ? "rgba(178,158,118,0.1)" : "transparent",
                color: mktTab === t.id ? c.g : c.td, transition: "all 0.2s",
              }}>{t.l}</button>
            ))}
          </div>

          {/* BROWSE */}
          {mktTab === "browse" && !mktDetail && (<>
            <div style={{ display: "flex", gap: "4px", marginBottom: "12px", overflowX: "auto", scrollbarWidth: "none" }}>
              <Pill on={mktFilter === "all"} onClick={() => setMktFilter("all")}>All</Pill>
              <Pill on={mktFilter === "coin"} onClick={() => setMktFilter("coin")}>🪙 Coins</Pill>
              <Pill on={mktFilter === "print"} onClick={() => setMktFilter("print")}>🖼️ Prints</Pill>
              <Pill on={mktFilter === "nft"} onClick={() => setMktFilter("nft")} accent={c.nft}>◆ NFTs</Pill>
              <Pill on={mktFilter === "display"} onClick={() => setMktFilter("display")} accent="#CCA454">🖼️ Displays</Pill>
            </div>
            {filtMkt.map(item => (
              <Box key={item.id} onClick={() => setMktDetail(item)} style={{ marginBottom: "7px", cursor: "pointer" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "8px", background: item.type === "display" ? "rgba(204,164,84,0.06)" : "linear-gradient(135deg,rgba(178,158,118,0.07),rgba(178,158,118,0.02))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0, border: `1px solid ${c.b}` }}>{item.img}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "6px" }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: "13px", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                        <div style={{ display: "flex", gap: "4px", alignItems: "center", marginTop: "2px", flexWrap: "wrap" }}>
                          <TypeBadge type={item.type} /><VerifiedBadge />
                        </div>
                      </div>
                      <div style={{ fontFamily: f.b, fontSize: "14px", fontWeight: 800, color: c.g, flexShrink: 0 }}>${item.price.toLocaleString()}</div>
                    </div>
                    <div style={{ fontFamily: f.b, fontSize: "9px", color: c.td, marginTop: "3px", display: "flex", gap: "8px", alignItems: "center" }}>
                      <span>by {item.seller}</span><span>★ {item.rating}</span><span><I.Eye /> {item.views}</span><span>{item.listed}</span>
                    </div>
                  </div>
                </div>
              </Box>
            ))}
          </>)}

          {/* LISTING DETAIL */}
          {mktTab === "browse" && mktDetail && (<div>
            <button onClick={() => setMktDetail(null)} style={{ fontFamily: f.b, fontSize: "10px", fontWeight: 700, color: c.g, background: "none", border: "none", cursor: "pointer", marginBottom: "10px", display: "flex", alignItems: "center", gap: "3px" }}>
              <span style={{ transform: "rotate(180deg)", display: "inline-flex" }}><I.Right /></span> Back to listings
            </button>
            <Box glow style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "12px" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "10px", background: "linear-gradient(135deg,rgba(178,158,118,0.08),rgba(178,158,118,0.02))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", flexShrink: 0, border: `1px solid ${c.b}` }}>{mktDetail.img}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "17px", fontWeight: 700, marginBottom: "3px" }}>{mktDetail.name}</div>
                  <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "4px" }}><TypeBadge type={mktDetail.type} /><VerifiedBadge /></div>
                  {mktDetail.grade && <div style={{ fontFamily: f.b, fontSize: "10px", color: c.ts }}>Grade: {mktDetail.grade}</div>}
                  {mktDetail.artist && <div style={{ fontFamily: f.b, fontSize: "10px", color: c.ts }}>Artist: {mktDetail.artist} · {mktDetail.edition}</div>}
                  {mktDetail.frame && <div style={{ fontFamily: f.b, fontSize: "10px", color: c.ts }}>{mktDetail.frame} · {mktDetail.coinCount} coins · {mktDetail.printCount} print</div>}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: "rgba(178,158,118,0.04)", borderRadius: "8px", border: `1px solid ${c.ba}`, marginBottom: "12px" }}>
                <span style={{ fontFamily: f.b, fontSize: "10px", color: c.ts }}>Asking Price</span>
                <span style={{ fontSize: "22px", fontWeight: 700, color: c.g }}>${mktDetail.price.toLocaleString()}</span>
              </div>
              <div style={{ fontFamily: f.b, fontSize: "12px", color: c.ts, lineHeight: 1.6, marginBottom: "12px" }}>{mktDetail.desc}</div>
              <div style={{ padding: "10px 12px", background: c.s2, borderRadius: "8px", marginBottom: "12px" }}>
                <Lbl>Seller</Lbl>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "-6px" }}>
                  <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg,rgba(178,158,118,0.1),rgba(178,158,118,0.03))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px" }}>👤</div>
                  <div><div style={{ fontFamily: f.b, fontSize: "12px", fontWeight: 700 }}>{mktDetail.seller}</div><div style={{ fontFamily: f.b, fontSize: "10px", color: c.td }}>★ {mktDetail.rating} · {mktDetail.sales} sales on Numivas</div></div>
                </div>
              </div>
              <Btn gold full style={{ marginBottom: "6px" }}><I.Msg /> Contact Seller</Btn>
              <div style={{ display: "flex", gap: "6px" }}>
                <Btn full small><I.Heart /> Save</Btn>
                <Btn full small><I.Bell /> Alert if Price Drops</Btn>
              </div>
            </Box>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", padding: "8px 10px", background: c.greenBg, borderRadius: "8px", border: `1px solid ${c.greenBo}` }}>
              <I.Check />
              <div style={{ fontFamily: f.b, fontSize: "10px", color: c.green, lineHeight: 1.45 }}>
                <strong>Numivas Protected.</strong> All transactions verified. Coins authenticated, prints include COA, displays inspected before transfer.
              </div>
            </div>
          </div>)}

          {/* SELL */}
          {mktTab === "sell" && (<div>
            {MY_LISTED.length > 0 && (<>
              <Lbl>Your Active Listings</Lbl>
              {MY_LISTED.map(l => (
                <Box key={l.id} style={{ marginBottom: "6px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "13px", fontWeight: 700 }}>{l.name}</div>
                    <div style={{ fontFamily: f.b, fontSize: "9px", color: c.td, marginTop: "1px" }}>
                      ${l.price.toLocaleString()} · {l.views} views · {l.inquiries} inquiries · {l.listed}
                    </div>
                  </div>
                  <span style={{ fontFamily: f.b, fontSize: "8px", fontWeight: 800, padding: "2px 6px", borderRadius: "4px", background: c.greenBg, color: c.green, border: `1px solid ${c.greenBo}` }}>ACTIVE</span>
                </Box>
              ))}
              <div style={{ height: "12px" }} />
            </>)}

            <Lbl>List Something for Sale</Lbl>
            <div style={{ fontFamily: f.b, fontSize: "11px", color: c.ts, marginBottom: "12px", marginTop: "-6px", lineHeight: 1.5 }}>
              Sell to other Numivas collectors. All listings reviewed and verified before going live.
            </div>
            <div style={{ display: "flex", gap: "4px", marginBottom: "12px" }}>
              <Pill on={listType === "coin"} onClick={() => setListType("coin")}>🪙 Coin</Pill>
              <Pill on={listType === "print"} onClick={() => setListType("print")}>🖼️ Print</Pill>
              <Pill on={listType === "display"} onClick={() => setListType("display")} accent="#CCA454">🖼️ Display</Pill>
            </div>

            {listType === "coin" && COINS.map(co => (
              <Box key={co.id} style={{ marginBottom: "5px", display: "flex", alignItems: "center", gap: "9px", padding: "10px 11px" }}>
                <span style={{ fontSize: "16px" }}>🪙</span>
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: f.b, fontSize: "12px", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{co.name}</div><div style={{ fontFamily: f.b, fontSize: "9px", color: c.td }}>{co.grade} · Vault value: ${co.value.toLocaleString()}</div></div>
                <Btn small gold onClick={() => setListModal(true)}><I.Tag /> List</Btn>
              </Box>
            ))}
            {listType === "print" && PRINTS.map(p => (
              <Box key={p.id} style={{ marginBottom: "5px", display: "flex", alignItems: "center", gap: "9px", padding: "10px 11px" }}>
                <span style={{ fontSize: "16px" }}>{p.nft ? "◆" : "🖼️"}</span>
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: f.b, fontSize: "12px", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div><div style={{ fontFamily: f.b, fontSize: "9px", color: c.td }}>by {p.artist} · {p.edition}</div></div>
                <Btn small gold onClick={() => setListModal(true)}><I.Tag /> List</Btn>
              </Box>
            ))}
            {listType === "display" && MY_DISPLAYS.map(d => (
              <Box key={d.id} style={{ marginBottom: "5px" }}>
                <div style={{ display: "flex", gap: "9px", alignItems: "center" }}>
                  <FramePreview coins={d.coins.length} size="sm" thumb={d.print.thumb} style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1 }}><div style={{ fontFamily: f.b, fontSize: "12px", fontWeight: 600 }}>{d.name}</div><div style={{ fontFamily: f.b, fontSize: "9px", color: c.td }}>{d.frame} · {d.coins.length} coins · 1 print</div></div>
                  <Btn small gold onClick={() => setListModal(true)}><I.Tag /> List</Btn>
                </div>
              </Box>
            ))}

            {/* List Modal */}
            {listModal && (
              <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "18px" }} onClick={() => setListModal(false)}>
                <div onClick={e => e.stopPropagation()} style={{ background: c.s1, border: `1px solid ${c.ba}`, borderRadius: "16px", padding: "20px", maxWidth: "360px", width: "100%" }}>
                  <div style={{ fontSize: "15px", fontWeight: 700, marginBottom: "12px" }}>Create Listing</div>
                  <div style={{ marginBottom: "8px" }}>
                    <label style={{ fontFamily: f.b, fontSize: "9px", color: c.td, display: "block", marginBottom: "2px", fontWeight: 700 }}>Asking Price ($)</label>
                    <input placeholder="e.g. 1200" style={{ width: "100%", padding: "8px 10px", background: "rgba(0,0,0,0.25)", border: `1px solid ${c.b}`, borderRadius: "7px", color: c.t, fontFamily: f.b, fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <label style={{ fontFamily: f.b, fontSize: "9px", color: c.td, display: "block", marginBottom: "2px", fontWeight: 700 }}>Description</label>
                    <textarea placeholder="Condition, provenance, why you're selling..." rows={3} style={{ width: "100%", padding: "8px 10px", background: "rgba(0,0,0,0.25)", border: `1px solid ${c.b}`, borderRadius: "7px", color: c.t, fontFamily: f.b, fontSize: "12px", outline: "none", boxSizing: "border-box", resize: "vertical" }} />
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <label style={{ fontFamily: f.b, fontSize: "9px", color: c.td, display: "block", marginBottom: "2px", fontWeight: 700 }}>Photos (optional)</label>
                    <div style={{ border: `2px dashed ${c.b}`, borderRadius: "7px", padding: "14px", textAlign: "center", cursor: "pointer" }}><div style={{ fontFamily: f.b, fontSize: "10px", color: c.td }}>📷 Add Photos</div></div>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", padding: "8px 10px", background: c.greenBg, borderRadius: "7px", border: `1px solid ${c.greenBo}`, marginBottom: "12px" }}>
                    <I.Check /><span style={{ fontFamily: f.b, fontSize: "9px", color: c.green, lineHeight: 1.4 }}>Numivas reviews and verifies before publishing.</span>
                  </div>
                  <div style={{ display: "flex", gap: "6px" }}><Btn gold full onClick={() => setListModal(false)}>Submit for Review</Btn><Btn small onClick={() => setListModal(false)}>Cancel</Btn></div>
                </div>
              </div>
            )}
          </div>)}

          {/* NUMIVAS STORE */}
          {mktTab === "store" && (<div>
            <Box glow style={{ textAlign: "center", padding: "20px", marginBottom: "14px", background: "linear-gradient(145deg,rgba(178,158,118,0.05),rgba(178,158,118,0.01))" }}>
              <div style={{ fontSize: "36px", marginBottom: "8px" }}>🏛️</div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 4px" }}>Numivas Official Store</h3>
              <p style={{ fontFamily: f.b, fontSize: "11px", color: c.ts, margin: "0 0 14px", lineHeight: 1.5 }}>
                New display frames, limited prints, and NFT collections from Numivas.
              </p>
              <Btn gold full><I.External /> Open Numivas Store</Btn>
            </Box>
            <Lbl>Quick Links</Lbl>
            {[
              { l: "Browse Display Frames", s: "Classic Protect, Collector Secure, Vault Edition", e: "🖼️" },
              { l: "New Print Releases", s: "Latest limited editions from our artists", e: "🎨" },
              { l: "NFT Collections", s: "Digital-first art with physical print pairing", e: "◆" },
              { l: "Accessories & Mounting", s: "LED kits, plaques, wall hardware", e: "🔧" },
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "9px", padding: "10px 11px", background: c.s1, border: `1px solid ${c.b}`, borderRadius: "8px", marginBottom: "5px", cursor: "pointer" }}>
                <span style={{ fontSize: "16px", flexShrink: 0 }}>{t.e}</span>
                <div style={{ flex: 1 }}><div style={{ fontFamily: f.b, fontSize: "12px", fontWeight: 600 }}>{t.l}</div><div style={{ fontFamily: f.b, fontSize: "9px", color: c.td }}>{t.s}</div></div>
                <I.External />
              </div>
            ))}
            <div style={{ marginTop: "10px", padding: "10px 12px", background: "rgba(178,158,118,0.03)", borderRadius: "8px", border: `1px solid ${c.b}`, display: "flex", alignItems: "center", gap: "6px" }}>
              <I.Check /><span style={{ fontFamily: f.b, fontSize: "10px", color: c.ts }}>All store purchases include free shipping, COA, and lifetime frame warranty.</span>
            </div>
          </div>)}
        </div>)}

        {/* ═══════════ SAFE SHARE ═══════════ */}
        {tab === "share" && (<div>
          <div style={{ marginBottom: "18px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 400, margin: "0 0 3px" }}>Safe Share</h2>
            <p style={{ fontFamily: f.b, fontSize: "12px", color: c.td, margin: 0 }}>Share a digital twin of your display — it mirrors the frame on your wall.</p>
          </div>

          {MY_DISPLAYS.map((disp, i) => (
            <Box key={disp.id} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px" }}>
                <FramePreview coins={disp.coins.length} size="sm" thumb={disp.print.thumb} style={{ flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "15px", fontWeight: 700 }}>{disp.name}</div>
                  <div style={{ fontFamily: f.b, fontSize: "10px", color: c.td, marginTop: "1px" }}>{disp.frame} · {disp.coins.length} coins · 1 print</div>
                  <div style={{ fontFamily: f.b, fontSize: "10px", color: disp.shareLink ? c.green : c.td, marginTop: "1px" }}>
                    {disp.shareLink ? "Currently shared" : "Not shared"}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                <Btn small gold onClick={() => { setShareLnk(disp.shareLink || `https://numivas.com/share/${Math.random().toString(36).slice(2,8)}`); setShareModal(true); }}>
                  <I.Share /> Generate Link
                </Btn>
                <Btn small onClick={() => setQrModal(disp)}><I.QR /> QR for Frame</Btn>
                <Btn small>Edit Display</Btn>
              </div>
            </Box>
          ))}

          <button onClick={() => setTab("studio")} style={{ width: "100%", padding: "13px", border: `2px dashed ${c.b}`, borderRadius: "11px", background: "transparent", color: c.g, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontFamily: f.b, fontSize: "12px", fontWeight: 700, marginTop: "4px" }}><I.Plus /> Create New Display</button>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", padding: "9px 12px", background: "rgba(178,158,118,0.03)", borderRadius: "9px", marginTop: "14px", border: `1px solid ${c.b}` }}>
            <I.Lock />
            <div style={{ fontFamily: f.b, fontSize: "10px", color: c.td, lineHeight: 1.5 }}>
              Shared displays are <strong style={{ color: c.g }}>view-only</strong>. No values shown. No downloads. Links revocable anytime. QR codes on frames link directly to the digital display.
            </div>
          </div>

          {shareModal && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "20px" }} onClick={() => setShareModal(false)}>
              <div onClick={e => e.stopPropagation()} style={{ background: c.s1, border: `1px solid ${c.ba}`, borderRadius: "16px", padding: "22px", maxWidth: "360px", width: "100%" }}>
                <div style={{ textAlign: "center", marginBottom: "16px" }}>
                  <div style={{ fontSize: "26px", marginBottom: "5px" }}>🔗</div>
                  <h3 style={{ fontSize: "17px", fontWeight: 400, margin: "0 0 3px" }}>Secure Link Ready</h3>
                  <p style={{ fontFamily: f.b, fontSize: "11px", color: c.td, margin: 0 }}>Recipients see your display as it looks on the wall</p>
                </div>
                <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "7px", padding: "9px", fontFamily: f.b, fontSize: "11px", color: c.g, wordBreak: "break-all", marginBottom: "12px", border: `1px solid ${c.b}` }}>{shareLnk}</div>
                <Btn gold full onClick={() => setShareModal(false)}>Copy Link</Btn>
              </div>
            </div>
          )}

          {qrModal && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "20px" }} onClick={() => setQrModal(null)}>
              <div onClick={e => e.stopPropagation()} style={{ background: c.s1, border: `1px solid ${c.ba}`, borderRadius: "16px", padding: "22px", maxWidth: "320px", width: "100%", textAlign: "center" }}>
                <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>Frame QR Code</div>
                <div style={{ fontFamily: f.b, fontSize: "11px", color: c.ts, marginBottom: "14px" }}>Attach to back of your "{qrModal.name}" frame</div>
                <div style={{ width: "120px", height: "120px", margin: "0 auto 14px", background: "#fff", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }}>
                  <div style={{ width: "100%", height: "100%", display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "2px" }}>
                    {Array.from({ length: 49 }).map((_, i) => {
                      const r = Math.floor(i/7), co = i%7;
                      const corner = (r<3&&co<3)||(r<3&&co>3)||(r>3&&co<3);
                      return <div key={i} style={{ background: corner || Math.random()>0.45 ? "#09090C" : "#fff", borderRadius: "1px" }}/>;
                    })}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  <Btn gold full>Download QR</Btn>
                  <Btn small onClick={() => setQrModal(null)}>Close</Btn>
                </div>
              </div>
            </div>
          )}
        </div>)}

        {/* ═══════════ DISCOVER ═══════════ */}
        {tab === "discover" && (<div>
          <div style={{ marginBottom: "14px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 400, margin: "0 0 3px" }}>The Daily Discovery</h2>
            <p style={{ fontFamily: f.b, fontSize: "12px", color: c.td, margin: 0 }}>Coin stories, new artists, fresh drops.</p>
          </div>

          {/* Filter + Artists CTA */}
          <div style={{ display: "flex", gap: "4px", marginBottom: "14px", alignItems: "center" }}>
            <Pill active={discFilter === "all"} onClick={() => setDiscFilter("all")}>All</Pill>
            <Pill active={discFilter === "coins"} onClick={() => setDiscFilter("coins")}>🪙 Coins</Pill>
            <Pill active={discFilter === "artists"} onClick={() => setDiscFilter("artists")} accent={c.nft}>🎨 Artists</Pill>
            <div style={{ flex: 1 }} />
            <button onClick={() => setShowArtists(!showArtists)} style={{
              fontFamily: f.b, fontSize: "10px", fontWeight: 700, color: c.g,
              background: "none", border: "none", cursor: "pointer", letterSpacing: "0.3px",
            }}>{showArtists ? "Hide" : "Artists"} ♥</button>
          </div>

          {/* Artist Follow Panel */}
          {showArtists && (
            <Box style={{ marginBottom: "14px", background: c.s2 }}>
              <Label>Numivas Artists — Follow for Notifications</Label>
              {ARTISTS.map(a => {
                const followed = followedArtists.includes(a.id);
                return (
                  <div key={a.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0", borderBottom: `1px solid ${c.b}` }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(178,158,118,0.1), rgba(178,158,118,0.03))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>🎨</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: f.b, fontSize: "12px", fontWeight: 700 }}>{a.name}</div>
                      <div style={{ fontFamily: f.b, fontSize: "10px", color: c.td }}>{a.specialty} · {a.works} works</div>
                    </div>
                    <button onClick={() => toggleFollow(a.id)} style={{
                      display: "flex", alignItems: "center", gap: "4px", padding: "5px 10px",
                      borderRadius: "20px", border: "none", cursor: "pointer",
                      fontFamily: f.b, fontSize: "10px", fontWeight: 700,
                      background: followed ? "rgba(178,158,118,0.1)" : "rgba(255,255,255,0.03)",
                      color: followed ? c.g : c.td, transition: "all 0.2s",
                    }}>
                      {followed ? <I.HeartFill /> : <I.Heart />}
                      {followed ? "Following" : "Follow"}
                    </button>
                  </div>
                );
              })}
              <div style={{ fontFamily: f.b, fontSize: "10px", color: c.td, marginTop: "8px", lineHeight: 1.45 }}>
                💡 You'll be notified when followed artists release new prints or NFTs.
              </div>
            </Box>
          )}

          {/* Stories */}
          {filtDisc.map((story, i) => (
            <Box key={i} glow={storyIdx === i} onClick={() => setStoryIdx(i)} style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "4px", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: f.b, fontSize: "8.5px", fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", padding: "2px 7px", borderRadius: "4px", background: story.artist ? c.nftBg : "rgba(178,158,118,0.06)", color: story.artist ? c.nft : c.g, border: `1px solid ${story.artist ? c.nftBo : c.ba}` }}>{story.tag}</span>
                    <span style={{ fontFamily: f.b, fontSize: "10px", color: c.td }}>{story.date}</span>
                    {story.artistId && followedArtists.includes(story.artistId) && (
                      <span style={{ fontFamily: f.b, fontSize: "8px", fontWeight: 800, color: c.g, display: "flex", alignItems: "center", gap: "2px" }}><I.HeartFill /> Following</span>
                    )}
                  </div>
                  <h3 style={{ fontSize: storyIdx === i ? "18px" : "15px", fontWeight: 700, margin: "0 0 1px", transition: "font-size 0.25s" }}>{story.title}</h3>
                  <div style={{ fontFamily: f.b, fontSize: "11px", color: c.ts, fontStyle: "italic" }}>{story.sub}</div>
                </div>
                {storyIdx !== i && <span style={{ color: c.td, flexShrink: 0, marginTop: "5px" }}><I.Right /></span>}
              </div>
              {storyIdx === i && (
                <div style={{ marginTop: "9px", paddingTop: "9px", borderTop: `1px solid ${c.b}` }}>
                  <div style={{ fontFamily: f.d, fontSize: "13.5px", lineHeight: 1.7, color: c.ts }}>{story.body}</div>
                  {story.artistId && (
                    <div style={{ display: "flex", gap: "6px", marginTop: "10px" }}>
                      <Btn small>View Portfolio →</Btn>
                      {!followedArtists.includes(story.artistId) && (
                        <Btn small onClick={e => { e.stopPropagation(); toggleFollow(story.artistId); }}>
                          <I.Heart /> Follow Artist
                        </Btn>
                      )}
                    </div>
                  )}
                </div>
              )}
            </Box>
          ))}
        </div>)}

        {/* ═══════════ CONCIERGE ═══════════ */}
        {tab === "concierge" && (<div>
          <div style={{ marginBottom: "18px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 400, margin: "0 0 3px" }}>My Concierge</h2>
            <p style={{ fontFamily: f.b, fontSize: "12px", color: c.td, margin: 0 }}>Display advice, app help, and finding rare prints.</p>
          </div>

          <Box glow style={{ textAlign: "center", padding: "22px", marginBottom: "14px", background: "linear-gradient(145deg, rgba(178,158,118,0.05), rgba(178,158,118,0.01))" }}>
            <div style={{ width: "66px", height: "66px", borderRadius: "50%", margin: "0 auto 10px", background: "linear-gradient(135deg, #B29E76, #6A5C3E)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", boxShadow: "0 4px 16px rgba(178,158,118,0.18)" }}>👤</div>
            <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 2px" }}>Sarah Mitchell</h3>
            <div style={{ fontFamily: f.b, fontSize: "11px", color: c.g, fontWeight: 700 }}>Display Specialist</div>
            <div style={{ fontFamily: f.b, fontSize: "10px", color: c.td, marginBottom: "16px" }}>Your dedicated rep · Numivas since 2021</div>
            <Btn gold full onClick={() => setCallReq(true)} style={{ marginBottom: "7px" }}>
              {callReq ? <><I.Check /> Call Requested</> : <><I.Phone /> Request a Call</>}
            </Btn>
            <Btn full small><I.Mail /> Send a Message</Btn>
          </Box>

          <Label>How can we help?</Label>
          {[
            { l: "Which display frame fits my collection?", e: "🖼️" },
            { l: "Help setting up my Vault or Studio", e: "⚙️" },
            { l: "Finding a specific NFT limited print", e: "◆" },
            { l: "Mounting & installation guidance", e: "🔧" },
            { l: "Troubleshooting the app", e: "📱" },
            { l: "QR code setup for my frame", e: "📲" },
            { l: "Custom framing or special requests", e: "✨" },
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "9px", padding: "11px 12px", background: c.s1, border: `1px solid ${c.b}`, borderRadius: "9px", marginBottom: "5px", cursor: "pointer" }}>
              <span style={{ fontSize: "14px", flexShrink: 0 }}>{t.e}</span>
              <span style={{ fontFamily: f.b, fontSize: "12px", color: c.ts, flex: 1 }}>{t.l}</span>
              <I.Right />
            </div>
          ))}
        </div>)}

        {/* ═══════════ GAP FINDER ═══════════ */}
        {tab === "hunt" && (<div>
          <div style={{ marginBottom: "18px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 400, margin: "0 0 3px" }}>Gap Finder</h2>
            <p style={{ fontFamily: f.b, fontSize: "12px", color: c.td, margin: 0 }}>Track missing coins and prints.</p>
          </div>

          <div style={{ display: "flex", gap: "5px", marginBottom: "14px" }}>
            <Pill active={gapTab === "coins"} onClick={() => setGapTab("coins")}>🪙 Coins</Pill>
            <Pill active={gapTab === "prints"} onClick={() => setGapTab("prints")} accent={c.nft}>🖼️ Prints & NFTs</Pill>
          </div>

          {gapAlerts[gapTab].map((s, i) => (
            <Box key={`${gapTab}-${i}`} style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "9px" }}>
                <h3 style={{ fontSize: "15px", fontWeight: 700, margin: 0 }}>{s.series}</h3>
                <button onClick={() => toggleGap(gapTab, i)} style={{
                  display: "flex", alignItems: "center", gap: "4px", padding: "4px 9px", borderRadius: "18px", border: "none", cursor: "pointer",
                  fontFamily: f.b, fontSize: "9px", fontWeight: 800, letterSpacing: "0.5px",
                  background: s.alertOn ? "rgba(178,158,118,0.1)" : "rgba(255,255,255,0.03)",
                  color: s.alertOn ? c.g : c.td, transition: "all 0.2s",
                }}><I.Bell /> {s.alertOn ? "ON" : "OFF"}</button>
              </div>
              <div style={{ fontFamily: f.b, fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: c.td, fontWeight: 800, marginBottom: "6px" }}>
                {gapTab === "coins" ? "Missing" : "Looking for"}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {s.missing.map((m, j) => (
                  <span key={j} style={{ padding: "4px 9px", background: "rgba(0,0,0,0.2)", border: `1px solid ${c.b}`, borderRadius: "6px", fontFamily: f.b, fontSize: "11px", color: c.ts }}>{m}</span>
                ))}
              </div>
            </Box>
          ))}

          <button style={{ width: "100%", padding: "13px", border: `2px dashed ${c.b}`, borderRadius: "11px", background: "transparent", color: c.g, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontFamily: f.b, fontSize: "12px", fontWeight: 700, marginTop: "4px" }}><I.Plus /> Add to Watch List</button>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "7px", padding: "9px 12px", background: "rgba(178,158,118,0.03)", borderRadius: "9px", marginTop: "14px", border: `1px solid ${c.b}` }}>
            <span style={{ fontSize: "13px", flexShrink: 0, marginTop: "1px" }}>💡</span>
            <span style={{ fontFamily: f.b, fontSize: "10px", color: c.td, lineHeight: 1.5 }}>Gentle notifications when matches appear — no pressure.</span>
          </div>
        </div>)}

      </main>
      <style>{`
        input::placeholder,textarea::placeholder{color:#3E3A34}
        button:active{transform:scale(0.98)}
        ::-webkit-scrollbar{display:none}
        *{box-sizing:border-box;margin:0}
      `}</style>
    </div>
  );
}
