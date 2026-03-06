import { useState } from "react";

const competitors = [
  { name: "Book4Time / Maestro", type: "Hotel Spa Software", color: "#7C9CBF" },
  { name: "MassageBook", type: "Practitioner Booking", color: "#9B8EC4" },
  { name: "Appointy / SimplyBook", type: "Scheduling Tool", color: "#C48E8E" },
  { name: "Thumbtack / Care.com", type: "General Freelance", color: "#C4A96B" },
  { name: "YOUR PLATFORM", type: "Wellness Marketplace", color: "#0D7C6E", highlight: true },
];

const categories = [
  {
    name: "Discovery & Marketplace",
    features: [
      { name: "Consumer-facing booking discovery", values: [true, true, true, true, true] },
      { name: "Spa/resort-facing practitioner search", values: [false, false, false, false, true] },
      { name: "Rural/resort market focus", values: [false, false, false, false, true] },
      { name: "Practitioner directory & profiles", values: [false, true, true, true, true] },
      { name: "Geo-based practitioner matching", values: [false, false, false, true, true] },
    ]
  },
  {
    name: "Practitioner Supply Side",
    features: [
      { name: "Independent practitioner onboarding", values: [false, true, true, true, true] },
      { name: "License & credential verification", values: [false, false, false, false, true] },
      { name: "Insurance & liability vetting", values: [false, false, false, false, true] },
      { name: "Practitioner rewards / incentive system", values: [false, false, false, false, true] },
      { name: "Performance-based visibility ranking", values: [false, false, false, false, true] },
      { name: "Supplementary pay / bonus structure", values: [false, false, false, false, true] },
      { name: "Certification tracking & points", values: [false, false, false, false, true] },
    ]
  },
  {
    name: "Spa / Resort Operations",
    features: [
      { name: "Spa room & space management", values: [true, false, false, false, false] },
      { name: "On-property staff scheduling", values: [true, false, false, false, false] },
      { name: "SaaS subscription for operators", values: [true, false, true, false, true] },
      { name: "Commission-based revenue model", values: [false, false, false, true, false] },
      { name: "Hotel PMS integration", values: [true, false, false, false, false] },
      { name: "Multi-property / group support", values: [true, false, false, false, true] },
      { name: "Outside practitioner intake flow", values: [false, false, false, false, true] },
    ]
  },
  {
    name: "Bookings & Payments",
    features: [
      { name: "Online appointment booking", values: [true, true, true, true, true] },
      { name: "Real-time availability sync", values: [true, true, true, false, true] },
      { name: "Automated payment processing", values: [true, true, true, true, true] },
      { name: "Payout splits (spa + practitioner)", values: [false, false, false, false, true] },
      { name: "Cancellation & no-show handling", values: [true, true, true, false, true] },
      { name: "Response-time booking acceptance", values: [false, false, false, false, true] },
    ]
  },
  {
    name: "Trust & Quality",
    features: [
      { name: "Guest ratings & reviews", values: [true, true, true, true, true] },
      { name: "Background check integration", values: [false, false, false, false, true] },
      { name: "Repeat-booking trust signals", values: [false, false, false, false, true] },
      { name: "Completion rate tracking", values: [false, false, false, false, true] },
      { name: "Wellness-specific vetting criteria", values: [false, false, false, false, true] },
    ]
  },
  {
    name: "Lifestyle & Retention (Network Perks)",
    features: [
      { name: "Resort stay perks for practitioners", values: [false, false, false, false, true] },
      { name: "Hotel & dining access rewards", values: [false, false, false, false, true] },
      { name: "Tiered loyalty / status system", values: [false, false, false, false, true] },
      { name: "In-network lifestyle benefits", values: [false, false, false, false, true] },
    ]
  },
];

// Real sentiment from Capterra, Trustpilot, BBB, SiteJabber — sourced March 2026
const sentiment = [
  {
    rating: "4.2 / 5", ratingNum: 4.2, source: "Capterra / GetApp",
    praise: "Robust reporting, strong PMS integrations, reliable cloud uptime, versatile across hotel types",
    complaints: "Expensive licensing; clunky POS; difficult to move/edit appointments; backend glitches disrupt live operations",
    verdict: "Powerful but rigid — built for enterprise hotels, not flexible or independent staffing",
  },
  {
    rating: "4.7 / 5", ratingNum: 4.7, source: "Capterra (437 reviews)",
    praise: "Easy to use, great customer support, well-suited for solo therapists building a practice",
    complaints: "Slow product updates; reliability declining; recent update hides availability unless clients create accounts (drops bookings); weak business-level controls for multi-therapist operations",
    verdict: "Good for solo therapists — not built for spa operator needs or supply-side discovery",
  },
  {
    rating: "4.6 / 5", ratingNum: 4.6, source: "Capterra (284 reviews)",
    praise: "Easy setup, strong automated reminders, highly customizable, affordable, good integrations",
    complaints: "Deep configuration is opaque with hidden interdependencies; mobile app weaker than desktop; feature gating frustrates growing businesses",
    verdict: "Solid generic scheduler — wellness-agnostic with no vetting layer and no spa-side demand generation",
  },
  {
    rating: "1.8 / 5", ratingNum: 1.8, source: "SiteJabber (1,534 reviews)",
    praise: "Easy profile setup; can help early-stage businesses get initial exposure when leads are genuine",
    complaints: "Widespread fake and ghost leads; charges multiple providers for the same lead; no credential vetting; refunds routinely denied; quality and trust deteriorated badly 2023–2025",
    verdict: "Deeply distrusted by service providers — pay-to-play model with no quality or trust guarantee",
  },
  {
    rating: "N/A", ratingNum: 5, source: "Your design",
    praise: "Vetted, reliable, resort-focused — purpose-built to solve the trust and discovery gap competitors ignore",
    complaints: "—",
    verdict: "The gap no one else has filled",
    highlight: true,
  },
];

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="8.5" fill="#0D7C6E" fillOpacity="0.12" stroke="#0D7C6E" strokeWidth="1"/>
    <path d="M5 9l3 3 5-5" stroke="#0D7C6E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const XMark = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="8.5" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1"/>
    <path d="M6.5 6.5l5 5M11.5 6.5l-5 5" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

function StarRating({ num }) {
  return (
    <div style={{ display: "flex", gap: 2, justifyContent: "center", marginTop: 3 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 1l1.3 2.6L10 4l-2 1.9.5 2.6L6 7.3 3.5 8.5 4 5.9 2 4l2.7-.4L6 1z"
            fill={i <= Math.round(num) ? "#F59E0B" : "#E5E7EB"}
            stroke={i <= Math.round(num) ? "#F59E0B" : "#D1D5DB"}
            strokeWidth="0.5"/>
        </svg>
      ))}
    </div>
  );
}

export default function CompetitiveMatrix() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [showSentiment, setShowSentiment] = useState(false);

  const filtered = activeCategory === null ? categories : categories.filter(c => c.name === activeCategory);
  const totalFeatures = categories.flatMap(c => c.features).length;
  const scores = competitors.map((_, ci) =>
    categories.flatMap(c => c.features).filter(f => f.values[ci]).length
  );

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#FAFAF8", minHeight: "100vh", color: "#1A2E2B" }}>

      {/* Header */}
      <div style={{ background: "#0D1F1C", padding: "40px 48px 32px", borderBottom: "3px solid #0D7C6E" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#0D7C6E", marginBottom: 12, textTransform: "uppercase", fontFamily: "sans-serif" }}>
            Product Market Fit · Competitive Intelligence
          </div>
          <h1 style={{ fontSize: 36, fontWeight: "normal", color: "#F5F5F0", margin: "0 0 8px", letterSpacing: "-0.5px" }}>
            Feature Comparison Matrix
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 15, margin: "0 0 32px", fontFamily: "sans-serif" }}>
            Wellness Practitioner Marketplace · Rural Resort Focus · March 2026
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {competitors.map((c, i) => (
              <div key={i} style={{
                background: c.highlight ? "#0D7C6E" : "rgba(255,255,255,0.06)",
                border: c.highlight ? "none" : "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8, padding: "12px 20px", flex: "1 1 160px", maxWidth: 220
              }}>
                <div style={{ fontSize: 28, fontWeight: "bold", color: c.highlight ? "#fff" : "#E5E7EB", lineHeight: 1 }}>
                  {scores[i]}<span style={{ fontSize: 14, fontWeight: "normal", color: c.highlight ? "rgba(255,255,255,0.7)" : "#6B7280" }}>/{totalFeatures}</span>
                </div>
                <div style={{ fontSize: 12, color: c.highlight ? "rgba(255,255,255,0.85)" : "#9CA3AF", marginTop: 4, fontFamily: "sans-serif" }}>{c.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 48px 64px" }}>

        {/* Controls */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={() => setActiveCategory(null)} style={{
              padding: "7px 16px", borderRadius: 20, border: "1.5px solid",
              borderColor: activeCategory === null ? "#0D7C6E" : "#D1D5DB",
              background: activeCategory === null ? "#0D7C6E" : "white",
              color: activeCategory === null ? "white" : "#6B7280",
              fontSize: 13, cursor: "pointer", fontFamily: "sans-serif"
            }}>All Categories</button>
            {categories.map(c => (
              <button key={c.name} onClick={() => setActiveCategory(c.name === activeCategory ? null : c.name)} style={{
                padding: "7px 16px", borderRadius: 20, border: "1.5px solid",
                borderColor: activeCategory === c.name ? "#0D7C6E" : "#D1D5DB",
                background: activeCategory === c.name ? "#E8F5F3" : "white",
                color: activeCategory === c.name ? "#0D7C6E" : "#6B7280",
                fontSize: 13, cursor: "pointer", fontFamily: "sans-serif"
              }}>{c.name}</button>
            ))}
          </div>
          <button onClick={() => setShowSentiment(s => !s)} style={{
            padding: "8px 20px", borderRadius: 20, border: "1.5px solid",
            borderColor: showSentiment ? "#F59E0B" : "#D1D5DB",
            background: showSentiment ? "#FEF3C7" : "white",
            color: showSentiment ? "#92400E" : "#6B7280",
            fontSize: 13, cursor: "pointer", fontFamily: "sans-serif", whiteSpace: "nowrap", fontWeight: showSentiment ? 600 : 400
          }}>
            ★ {showSentiment ? "Hide" : "Show"} User Sentiment
          </button>
        </div>

        {/* Sentiment panel */}
        {showSentiment && (
          <div style={{ marginBottom: 32, overflowX: "auto" }}>
            <div style={{ fontSize: 11, color: "#9CA3AF", fontFamily: "sans-serif", marginBottom: 12, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              User Sentiment — sourced from Capterra, Trustpilot, SiteJabber & BBB · March 2026
            </div>
            <div style={{ display: "flex", gap: 12, minWidth: 900 }}>
              {sentiment.map((s, i) => (
                <div key={i} style={{
                  flex: 1,
                  background: s.highlight ? "#E8F5F3" : "white",
                  border: `1.5px solid ${s.highlight ? "#0D7C6E" : "#E5E7EB"}`,
                  borderTop: `4px solid ${competitors[i].color}`,
                  borderRadius: 8, padding: "14px 14px 12px", fontFamily: "sans-serif"
                }}>
                  <div style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 600 }}>
                    {competitors[i].name}
                  </div>
                  {s.ratingNum < 5 ? (
                    <>
                      <div style={{
                        fontSize: 22, fontWeight: "bold", lineHeight: 1,
                        color: s.ratingNum < 2.5 ? "#DC2626" : s.ratingNum < 3.5 ? "#D97706" : "#059669"
                      }}>{s.rating}</div>
                      <StarRating num={s.ratingNum} />
                      <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 3, marginBottom: 10 }}>{s.source}</div>
                    </>
                  ) : (
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#0D7C6E", marginBottom: 10, marginTop: 4 }}>Not yet rated</div>
                  )}
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: "#059669", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>✓ Users praise</div>
                    <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.55 }}>{s.praise}</div>
                  </div>
                  {s.complaints !== "—" && (
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: "#DC2626", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>✗ Common complaints</div>
                      <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.55 }}>{s.complaints}</div>
                    </div>
                  )}
                  <div style={{
                    fontSize: 11, color: s.highlight ? "#0D7C6E" : "#6B7280", fontStyle: "italic",
                    borderTop: "1px solid #F3F4F6", paddingTop: 8, marginTop: 4, lineHeight: 1.5
                  }}>{s.verdict}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feature table */}
        <div style={{ overflowX: "auto", borderRadius: 10, border: "1px solid #E5E7EB", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 860 }}>
            <thead>
              <tr style={{ background: "#F9FAF8" }}>
                <th style={{
                  textAlign: "left", padding: "14px 20px", fontSize: 12, fontWeight: 600,
                  color: "#6B7280", fontFamily: "sans-serif", letterSpacing: "0.05em",
                  textTransform: "uppercase", borderBottom: "2px solid #E5E7EB", width: "30%"
                }}>Feature</th>
                {competitors.map((c, i) => (
                  <th key={i} style={{
                    padding: "14px 12px", fontSize: 12, fontWeight: c.highlight ? 700 : 600,
                    color: c.highlight ? "#0D7C6E" : "#374151", fontFamily: "sans-serif",
                    textAlign: "center",
                    borderBottom: c.highlight ? "3px solid #0D7C6E" : "2px solid #E5E7EB",
                    background: c.highlight ? "#F0FAF8" : "transparent"
                  }}>
                    <div>{c.name}</div>
                    <div style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 400, marginTop: 2 }}>{c.type}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((cat, ci) => (
                <>
                  <tr key={`cat-${ci}`}>
                    <td colSpan={6} style={{
                      padding: "10px 20px 6px", background: "#F3F4F6", fontSize: 11, fontWeight: 700,
                      letterSpacing: "0.12em", textTransform: "uppercase", color: "#374151",
                      fontFamily: "sans-serif", borderTop: "1px solid #E5E7EB"
                    }}>{cat.name}</td>
                  </tr>
                  {cat.features.map((feat, fi) => {
                    const rowKey = `${ci}-${fi}`;
                    const isHovered = hoveredRow === rowKey;
                    const isGap = feat.values[4] && !feat.values.slice(0, 4).some(Boolean);
                    return (
                      <tr key={rowKey}
                        onMouseEnter={() => setHoveredRow(rowKey)}
                        onMouseLeave={() => setHoveredRow(null)}
                        style={{ background: isHovered ? "#F0FAF8" : fi % 2 === 0 ? "white" : "#FAFAFA" }}
                      >
                        <td style={{
                          padding: "11px 20px", fontSize: 13.5, color: "#1A2E2B",
                          fontFamily: "sans-serif", borderBottom: "1px solid #F3F4F6",
                          display: "flex", alignItems: "center", gap: 8
                        }}>
                          {isGap && (
                            <span style={{
                              fontSize: 9, background: "#FEF3C7", color: "#92400E",
                              padding: "2px 7px", borderRadius: 10, fontWeight: 700,
                              letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap"
                            }}>GAP</span>
                          )}
                          {feat.name}
                        </td>
                        {feat.values.map((val, vi) => (
                          <td key={vi} style={{
                            padding: "11px 12px", textAlign: "center", borderBottom: "1px solid #F3F4F6",
                            background: competitors[vi].highlight ? (isHovered ? "#D9F2EC" : "#F0FAF8") : "transparent"
                          }}>
                            {val ? <Check /> : <XMark />}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 24, marginTop: 20, fontFamily: "sans-serif", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#6B7280" }}>
            <Check /><span>Feature exists</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#6B7280" }}>
            <XMark /><span>Feature missing</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#6B7280" }}>
            <span style={{ fontSize: 9, background: "#FEF3C7", color: "#92400E", padding: "2px 7px", borderRadius: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>GAP</span>
            <span>Feature only your platform has — market gap</span>
          </div>
        </div>
      </div>
    </div>
  );
}
