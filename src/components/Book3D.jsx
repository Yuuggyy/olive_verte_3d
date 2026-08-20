import { useState, useRef, useEffect } from 'react';

const C = {
  oliveDark:   '#3D4A1A',
  oliveMid:    '#556B2F',
  oliveLight:  '#7A8B5A',
  olivePale:   '#E8EED5',
  cream:       '#F0EAD6',
  creamLight:  '#F7F3E8',
  creamPaper:  '#FAF6EC',
  bordeaux:    '#8B0000',
  bordeauxL:   '#A52A2A',
  gold:        '#B8860B',
  goldLight:   '#D4A017',
  darkText:     '#2D3E24',
  softText:     'rgba(45,62,36,0.60)',
  borderDeco:   'rgba(139,0,0,0.35)',
  borderSoft:   'rgba(61,74,26,0.15)',
};

/* ─── SVG illustrations for left pages ─── */
function BotanicalIllustration({ category }) {
  const illustrations = {
    'Entrées': 'olive_branch',
    'Salades': 'leaves',
    'Burgers': 'wheat',
    'Pasta & Soup': 'herbs',
    'Plats Principaux': 'vine',
    'Desserts': 'fig',
    'Boissons': 'citrus',
  };
  const style = illustrations[category] || 'olive_branch';

  return (
    <svg viewBox="0 0 300 500" style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
      {/* Background paper */}
      <rect width="300" height="500" fill={C.creamPaper} />
      {/* Subtle texture */}
      <circle cx="60" cy="80" r="200" fill={C.olivePale} opacity="0.15" />
      <circle cx="240" cy="420" r="150" fill={C.olivePale} opacity="0.10" />

      {/* Olive branch */}
      <g transform="translate(80, 60)">
        {/* Stem */}
        <path d="M70,50 Q50,150 60,280 Q65,350 55,420" stroke={C.oliveMid} strokeWidth="2.5" fill="none" opacity="0.7" />
        {/* Leaves */}
        <ellipse cx="45" cy="100" rx="25" ry="10" fill={C.oliveMid} opacity="0.75" transform="rotate(-30 45 100)" />
        <ellipse cx="85" cy="120" rx="25" ry="10" fill={C.oliveMid} opacity="0.75" transform="rotate(30 85 120)" />
        <ellipse cx="40" cy="170" rx="28" ry="11" fill={C.oliveDark} opacity="0.65" transform="rotate(-25 40 170)" />
        <ellipse cx="90" cy="190" rx="28" ry="11" fill={C.oliveDark} opacity="0.65" transform="rotate(25 90 190)" />
        <ellipse cx="38" cy="250" rx="25" ry="9" fill={C.oliveMid} opacity="0.70" transform="rotate(-35 38 250)" />
        <ellipse cx="88" cy="270" rx="25" ry="9" fill={C.oliveMid} opacity="0.70" transform="rotate(35 88 270)" />
        <ellipse cx="55" cy="340" rx="22" ry="8" fill={C.oliveDark} opacity="0.60" transform="rotate(-30 55 340)" />
        <ellipse cx="80" cy="360" rx="22" ry="8" fill={C.oliveDark} opacity="0.60" transform="rotate(30 80 360)" />
        {/* Olives */}
        <circle cx="58" cy="100" r="5" fill={C.oliveDark} opacity="0.85" />
        <circle cx="72" cy="150" r="5" fill={C.oliveDark} opacity="0.85" />
        <circle cx="65" cy="210" r="5" fill={C.oliveDark} opacity="0.80" />
        <circle cx="62" cy="300" r="4.5" fill={C.oliveDark} opacity="0.75" />
        <circle cx="68" cy="390" r="4.5" fill={C.oliveDark} opacity="0.70" />
      </g>

      {/* Birds (decorative) */}
      <g transform="translate(150, 350)">
        <path d="M0,0 Q10,-15 20,-8 Q30,-15 40,0 Q25,5 0,0" fill={C.oliveDark} opacity="0.50" />
        <circle cx="35" cy="-5" r="2.5" fill={C.oliveDark} opacity="0.60" />
        <path d="M40,-5 L45,-8" stroke={C.oliveDark} strokeWidth="1" opacity="0.50" />
      </g>
      <g transform="translate(180, 380) scale(0.8)">
        <path d="M0,0 Q10,-15 20,-8 Q30,-15 40,0 Q25,5 0,0" fill={C.oliveDark} opacity="0.40" />
        <circle cx="35" cy="-5" r="2.5" fill={C.oliveDark} opacity="0.50" />
        <path d="M40,-5 L45,-8" stroke={C.oliveDark} strokeWidth="1" opacity="0.40" />
      </g>

      {/* Category name in elegant script */}
      <text x="150" y="470" textAnchor="middle" fontFamily="'Caveat', cursive" fontSize="22" fill={C.oliveDark} opacity="0.80">
        {category}
      </text>
    </svg>
  );
}

/* ─── ProduitCard — premium style ─── */
export function ProduitCard({ produit, onAdd }) {
  const [qty, setQty] = useState(0);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (qty < 1) return;
    onAdd({ ...produit, quantite: qty, prix_unit: produit.prix });
    setAdded(true);
    setQty(0);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div style={{
      padding: '10px 0',
      borderBottom: `1px dashed ${C.borderSoft}`,
      display: 'flex', alignItems: 'flex-start', gap: 8,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 14.5, fontWeight: 600, color: C.darkText,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            maxWidth: '62vw',
          }}>{produit.nom}</span>
          {/* Dotted leader */}
          <span style={{ flex: 1, borderBottom: `1px dotted ${C.borderSoft}`, position: 'relative', top: -2, minWidth: 8 }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: C.bordeaux, fontFamily: "'Playfair Display', serif", whiteSpace: 'nowrap', flexShrink: 0 }}>
            {Number(produit.prix).toFixed(0)} £
          </span>
        </div>
        {produit.description && (
          <p style={{ fontSize: 11.5, color: C.softText, fontStyle: 'italic', marginTop: 2, lineHeight: 1.3, fontFamily: "'Cormorant Garamond', serif" }}>
            {produit.description}
          </p>
        )}
        {/* Discrete add control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
          {qty > 0 && (
            <button onClick={() => setQty(q => q - 1)} style={{
              width: 24, height: 24, borderRadius: '50%', border: `1px solid ${C.borderSoft}`,
              background: 'transparent', cursor: 'pointer', fontSize: 14, color: C.softText,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              lineHeight: 1,
            }}>−</button>
          )}
          {qty > 0 && (
            <span style={{ fontSize: 13, fontWeight: 700, color: C.oliveDark, minWidth: 16, textAlign: 'center' }}>{qty}</span>
          )}
          <button onClick={() => setQty(q => q + 1)} style={{
            width: 24, height: 24, borderRadius: '50%', border: `1px solid ${C.borderSoft}`,
            background: 'transparent', cursor: 'pointer', fontSize: 14, color: C.oliveDark,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            lineHeight: 1,
          }}>+</button>
          {qty > 0 && (
            <button onClick={handleAdd} style={{
              padding: '4px 12px', borderRadius: 3, border: 'none', cursor: 'pointer',
              background: added ? C.oliveMid : `linear-gradient(135deg, ${C.oliveDark}, ${C.oliveMid})`,
              color: C.creamLight, fontSize: 11, fontWeight: 600,
              letterSpacing: '0.05em', textTransform: 'uppercase',
              transition: 'all 0.2s',
            }}>
              {added ? '✓ Ajouté' : 'Commander'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Book3D — double-page premium flip book ─── */
export default function Book3D({ pages, onAdd, isMobile }) {
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState('right');
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const total = pages?.length || 0;

  const goNext = () => {
    if (current < total - 1 && !flipping) {
      setFlipDir('right');
      setFlipping(true);
      setTimeout(() => {
        setCurrent(c => c + 1);
        setFlipping(false);
      }, 350);
    }
  };

  const goPrev = () => {
    if (current > 0 && !flipping) {
      setFlipDir('left');
      setFlipping(true);
      setTimeout(() => {
        setCurrent(c => c - 1);
        setFlipping(false);
      }, 350);
    }
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - (touchStartY.current || 0));
    if (Math.abs(dx) > 60 && dy < 40) {
      if (dx < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (!pages || total === 0) return (
    <div style={{ textAlign: 'center', padding: '60px 20px', color: C.softText }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🍽️</div>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 16 }}>La carte est vide.</p>
    </div>
  );

  const page = pages[current];

  return (
    <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{ position: 'relative' }}>

      {/* ── Category tabs (scrollable, elegant) ── */}
      <div style={{
        display: 'flex', gap: 4,
        overflowX: 'auto', padding: '0 0 14px',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
      }} className="tabs-scroll">
        {pages.map((p, i) => (
          <button key={i} onClick={() => {
            if (i !== current && !flipping) {
              setFlipDir(i > current ? 'right' : 'left');
              setFlipping(true);
              setTimeout(() => { setCurrent(i); setFlipping(false); }, 350);
            }
          }} style={{
            padding: '8px 16px',
            border: 'none',
            cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap',
            background: i === current ? C.oliveDark : 'transparent',
            color: i === current ? C.creamLight : C.softText,
            fontSize: 12, fontWeight: i === current ? 600 : 400,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            borderBottom: i === current ? `2px solid ${C.bordeaux}` : `1px solid ${C.borderSoft}`,
            transition: 'all 0.25s',
            fontFamily: "Inter, sans-serif",
          }}>
            {p.categorie.emoji && `${p.categorie.emoji} `}{p.categorie.nom}
          </button>
        ))}
      </div>

      {/* ── Double-page spread ── */}
      <div key={current} className="flip-enter" style={{
        display: 'flex',
        gap: 0,
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(45,62,36,0.12), 0 2px 8px rgba(45,62,36,0.08)',
        transform: flipping ? (flipDir === 'right' ? 'perspective(1200px) rotateY(-8deg)' : 'perspective(1200px) rotateY(8deg)') : 'perspective(1200px) rotateY(0deg)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        transformOrigin: flipDir === 'right' ? 'left center' : 'right center',
        background: C.creamPaper,
      }}>

        {/* ── LEFT PAGE: Illustration ── */}
        {!isMobile && (
          <div style={{
            width: '40%',
            minWidth: 200,
            maxHeight: '70vh',
            overflow: 'hidden',
            position: 'relative',
            borderRight: `1px solid ${C.borderSoft}`,
            background: C.creamPaper,
          }} className="paper-texture">
            <BotanicalIllustration category={page.categorie.nom} />

            {/* Logo at top */}
            <div style={{
              position: 'absolute', top: 24, left: 0, right: 0,
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 18, fontWeight: 700,
                color: C.oliveDark,
                letterSpacing: '0.05em',
              }}>L'OLIVE VERTE</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 11, fontStyle: 'italic',
                color: C.softText,
                marginTop: 2,
              }}>Menu Foods & Drinks</div>
            </div>

            {/* Category description at bottom */}
            <div style={{
              position: 'absolute', bottom: 20, left: 20, right: 20,
              textAlign: 'center',
            }}>
              <p style={{
                fontFamily: "'Caveat', cursive",
                fontSize: 16, color: C.oliveMid, opacity: 0.80,
              }}>
                {page.categorie.description || ''}
              </p>
            </div>
          </div>
        )}

        {/* ── RIGHT PAGE: Menu items ── */}
        <div style={{
          flex: 1,
          padding: isMobile ? '20px 16px' : '28px 32px',
          background: C.creamPaper,
          position: 'relative',
          maxHeight: '70vh',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
        }} className="paper-texture">

          {/* Decorative frame */}
          <div style={{
            position: 'absolute',
            top: 12, left: 12, right: 12, bottom: 12,
            border: `1px solid ${C.borderDeco}`,
            pointerEvents: 'none',
            borderRadius: 1,
          }} />

          {/* Corner accents */}
          <div style={{ position: 'absolute', top: 10, left: 10, width: 14, height: 14, borderTop: `2px solid ${C.bordeaux}`, borderLeft: `2px solid ${C.bordeaux}` }} />
          <div style={{ position: 'absolute', top: 10, right: 10, width: 14, height: 14, borderTop: `2px solid ${C.bordeaux}`, borderRight: `2px solid ${C.bordeaux}` }} />
          <div style={{ position: 'absolute', bottom: 10, left: 10, width: 14, height: 14, borderBottom: `2px solid ${C.bordeaux}`, borderLeft: `2px solid ${C.bordeaux}` }} />
          <div style={{ position: 'absolute', bottom: 10, right: 10, width: 14, height: 14, borderBottom: `2px solid ${C.bordeaux}`, borderRight: `2px solid ${C.bordeaux}` }} />

          {/* Category header */}
          <div style={{
            textAlign: 'center',
            marginBottom: 16,
            paddingBottom: 12,
            borderBottom: `1px solid ${C.borderDeco}`,
          }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? 20 : 24,
              fontWeight: 700,
              color: C.oliveDark,
              margin: 0,
              letterSpacing: '0.04em',
            }}>
              {page.categorie.emoji && <span style={{ marginRight: 8 }}>{page.categorie.emoji}</span>}
              {page.categorie.nom}
            </h2>
            {!isMobile && page.categorie.description && (
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: 13,
                color: C.softText,
                marginTop: 4,
              }}>
                {page.categorie.description}
              </p>
            )}
          </div>

          {/* Products */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {page.produits.map(p => (
              <ProduitCard key={p.id} produit={p} onAdd={onAdd} />
            ))}
          </div>

          {/* Page number */}
          <div style={{
            textAlign: 'center', marginTop: 20, marginBottom: 4,
            fontSize: 11, color: C.softText,
            fontFamily: "'Cormorant Garamond', serif",
          }}>
            — {current + 1} —
          </div>
        </div>
      </div>

      {/* ── Navigation arrows ── */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginTop: 14,
      }}>
        <button onClick={goPrev} disabled={current === 0} style={{
          width: 40, height: 40, borderRadius: '50%',
          border: `1px solid ${current === 0 ? C.borderSoft : C.oliveMid}`,
          background: 'transparent', cursor: current === 0 ? 'default' : 'pointer',
          color: current === 0 ? C.borderSoft : C.oliveDark,
          fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s',
          opacity: current === 0 ? 0.3 : 1,
        }}>‹</button>

        {/* Dots indicator */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {pages.map((_, i) => (
            <div key={i} onClick={() => {
              if (i !== current && !flipping) {
                setFlipDir(i > current ? 'right' : 'left');
                setFlipping(true);
                setTimeout(() => { setCurrent(i); setFlipping(false); }, 350);
              }
            }} style={{
              width: i === current ? 24 : 6, height: 6, borderRadius: 3,
              background: i === current ? C.oliveDark : C.borderSoft,
              transition: 'all 0.25s', cursor: 'pointer',
            }} />
          ))}
        </div>

        <button onClick={goNext} disabled={current === total - 1} style={{
          width: 40, height: 40, borderRadius: '50%',
          border: `1px solid ${current === total - 1 ? C.borderSoft : C.oliveMid}`,
          background: 'transparent', cursor: current === total - 1 ? 'default' : 'pointer',
          color: current === total - 1 ? C.borderSoft : C.oliveDark,
          fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s',
          opacity: current === total - 1 ? 0.3 : 1,
        }}>›</button>
      </div>

      {/* Swipe hint */}
      <div style={{
        textAlign: 'center', marginTop: 10,
        fontSize: 11, color: C.softText,
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
      }}>
        Glissez ← → pour tourner les pages
      </div>
    </div>
  );
}
