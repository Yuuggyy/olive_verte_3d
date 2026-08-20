import { useState, useRef, useCallback, useEffect } from 'react';

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

/* ─── SVG botanical illustration for left page ─── */
function BotanicalIllustration({ category }) {
  return (
    <svg viewBox="0 0 300 500" style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="500" fill={C.creamPaper} />
      <circle cx="60" cy="80" r="200" fill={C.olivePale} opacity="0.15" />
      <circle cx="240" cy="420" r="150" fill={C.olivePale} opacity="0.10" />
      <g transform="translate(80, 60)">
        <path d="M70,50 Q50,150 60,280 Q65,350 55,420" stroke={C.oliveMid} strokeWidth="2.5" fill="none" opacity="0.7" />
        <ellipse cx="45" cy="100" rx="25" ry="10" fill={C.oliveMid} opacity="0.75" transform="rotate(-30 45 100)" />
        <ellipse cx="85" cy="120" rx="25" ry="10" fill={C.oliveMid} opacity="0.75" transform="rotate(30 85 120)" />
        <ellipse cx="40" cy="170" rx="28" ry="11" fill={C.oliveDark} opacity="0.65" transform="rotate(-25 40 170)" />
        <ellipse cx="90" cy="190" rx="28" ry="11" fill={C.oliveDark} opacity="0.65" transform="rotate(25 90 190)" />
        <ellipse cx="38" cy="250" rx="25" ry="9" fill={C.oliveMid} opacity="0.70" transform="rotate(-35 38 250)" />
        <ellipse cx="88" cy="270" rx="25" ry="9" fill={C.oliveMid} opacity="0.70" transform="rotate(35 88 270)" />
        <ellipse cx="55" cy="340" rx="22" ry="8" fill={C.oliveDark} opacity="0.60" transform="rotate(-30 55 340)" />
        <ellipse cx="80" cy="360" rx="22" ry="8" fill={C.oliveDark} opacity="0.60" transform="rotate(30 80 360)" />
        <circle cx="58" cy="100" r="5" fill={C.oliveDark} opacity="0.85" />
        <circle cx="72" cy="150" r="5" fill={C.oliveDark} opacity="0.85" />
        <circle cx="65" cy="210" r="5" fill={C.oliveDark} opacity="0.80" />
        <circle cx="62" cy="300" r="4.5" fill={C.oliveDark} opacity="0.75" />
        <circle cx="68" cy="390" r="4.5" fill={C.oliveDark} opacity="0.70" />
      </g>
      <g transform="translate(150, 350)">
        <path d="M0,0 Q10,-15 20,-8 Q30,-15 40,0 Q25,5 0,0" fill={C.oliveDark} opacity="0.50" />
        <circle cx="35" cy="-5" r="2.5" fill={C.oliveDark} opacity="0.60" />
        <path d="M40,-5 L45,-8" stroke={C.oliveDark} strokeWidth="1" opacity="0.50" />
      </g>
      <g transform="translate(180, 380) scale(0.8)">
        <path d="M0,0 Q10,-15 20,-8 Q30,-15 40,0 Q25,5 0,0" fill={C.oliveDark} opacity="0.40" />
        <circle cx="35" cy="-5" r="2.5" fill={C.oliveDark} opacity="0.50" />
      </g>
      <text x="150" y="470" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="22" fill={C.oliveDark} opacity="0.80">
        {category}
      </text>
    </svg>
  );
}

/* ─── ProduitCard — premium menu style ─── */
export function ProduitCard({ produit, onAdd, isMobile }) {
  const [qty, setQty] = useState(1);

  if (isMobile) {
    return (
      <div style={{ padding: '14px 0', borderBottom: '1px dashed ' + C.borderSoft, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: C.darkText, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '58vw' }}>
              {produit.nom}
            </span>
            <span style={{ flex: 1, borderBottom: '1px dotted ' + C.borderSoft, position: 'relative', top: -2, minWidth: 8 }} />
            <span style={{ fontSize: 15, fontWeight: 800, color: C.bordeaux, whiteSpace: 'nowrap', flexShrink: 0 }}>
              {Number(produit.prix).toFixed(0)} £
            </span>
          </div>
          {produit.description && (
            <p style={{ fontSize: 12, color: C.softText, fontStyle: 'italic', marginTop: 2, lineHeight: 1.3, fontFamily: "'Cormorant Garamond', serif" }}>
              {produit.description}
            </p>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{
                width: 28, height: 28, borderRadius: '50%', border: '1px solid ' + C.borderSoft,
                background: 'transparent', cursor: 'pointer', fontSize: 15, color: C.softText,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>−</button>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.oliveDark, minWidth: 18, textAlign: 'center' }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{
                width: 28, height: 28, borderRadius: '50%', border: 'none',
                background: C.oliveMid, color: C.creamLight, cursor: 'pointer', fontSize: 15,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>+</button>
            </div>
            <button onClick={() => { onAdd({ ...produit, quantite: qty, prix_unit: produit.prix }); setQty(1); }} style={{
              flex: 1, padding: '7px 12px', borderRadius: 4, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, ' + C.oliveDark + ', ' + C.oliveMid + ')',
              color: C.creamLight, fontSize: 13, fontWeight: 600, letterSpacing: '0.03em',
            }}>Ajouter</button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop compact
  return (
    <div style={{ padding: '8px 0', borderBottom: '1px dashed ' + C.borderSoft }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 13.5, fontWeight: 700, color: C.darkText, whiteSpace: 'nowrap' }}>
          {produit.nom}
        </span>
        <span style={{ flex: 1, borderBottom: '1px dotted ' + C.borderSoft, position: 'relative', top: -2, minWidth: 8 }} />
        <span style={{ fontSize: 13.5, fontWeight: 800, color: C.bordeaux, whiteSpace: 'nowrap' }}>
          {Number(produit.prix).toFixed(0)} £
        </span>
      </div>
      {produit.description && (
        <p style={{ fontSize: 10.5, color: C.softText, fontStyle: 'italic', marginTop: 2, lineHeight: 1.3, fontFamily: "'Cormorant Garamond', serif" }}>
          {produit.description.length > 55 ? produit.description.slice(0, 55) + '…' : produit.description}
        </p>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
        <button onClick={() => onAdd({ ...produit, quantite: 1, prix_unit: produit.prix })} style={{
          width: 26, height: 26, borderRadius: 4, border: 'none',
          background: C.oliveDark, color: C.creamLight, fontSize: 16, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>+</button>
      </div>
    </div>
  );
}

/* ─── Decorative frame corners ─── */
function DecoFrame() {
  return (
    <>
      <div style={{ position: 'absolute', top: 10, left: 10, right: 10, bottom: 10, border: '1px solid ' + C.borderDeco, pointerEvents: 'none', borderRadius: 1 }} />
      <div style={{ position: 'absolute', top: 8, left: 8, width: 16, height: 16, borderTop: '2px solid ' + C.bordeaux, borderLeft: '2px solid ' + C.bordeaux }} />
      <div style={{ position: 'absolute', top: 8, right: 8, width: 16, height: 16, borderTop: '2px solid ' + C.bordeaux, borderRight: '2px solid ' + C.bordeaux }} />
      <div style={{ position: 'absolute', bottom: 8, left: 8, width: 16, height: 16, borderBottom: '2px solid ' + C.bordeaux, borderLeft: '2px solid ' + C.bordeaux }} />
      <div style={{ position: 'absolute', bottom: 8, right: 8, width: 16, height: 16, borderBottom: '2px solid ' + C.bordeaux, borderRight: '2px solid ' + C.bordeaux }} />
    </>
  );
}

/* ─── Desktop page content ─── */
function PageContent({ produits, categorie, pageNum, totalPages, onAdd, side }) {
  return (
    <div style={{ width: '100%', height: '100%', background: C.creamPaper, padding: '20px 16px 12px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <DecoFrame />
      {side === 'left' && categorie && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <BotanicalIllustration category={categorie.nom} />
          <div style={{ position: 'absolute', top: 24, left: 0, right: 0, textAlign: 'center' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: C.oliveDark, letterSpacing: '0.05em' }}>L'OLIVE VERTE</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 10, fontStyle: 'italic', color: C.softText, marginTop: 2 }}>Menu Foods & Drinks</div>
          </div>
          <p style={{ position: 'absolute', bottom: 30, fontFamily: "'Caveat', cursive", fontSize: 16, color: C.oliveMid, opacity: 0.8 }}>
            {categorie.description || ''}
          </p>
        </div>
      )}
      {side === 'right' && categorie && (
        <>
          <div style={{ textAlign: 'center', marginBottom: 12, paddingBottom: 10, borderBottom: '1px solid ' + C.borderDeco, position: 'relative', zIndex: 1 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: C.oliveDark, margin: 0, letterSpacing: '0.04em' }}>
              {categorie.emoji && <span style={{ marginRight: 6 }}>{categorie.emoji}</span>}
              {categorie.nom}
            </h3>
            <span style={{ fontSize: 10, fontWeight: 500, color: C.softText, fontFamily: "'Cormorant Garamond', serif" }}>
              ({produits.length} articles)
            </span>
          </div>
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative', zIndex: 1 }}>
            {produits.map(p => <ProduitCard key={p.id} produit={p} onAdd={onAdd} isMobile={false} />)}
          </div>
          <p style={{ textAlign: 'right', fontSize: 10, color: C.borderSoft, marginTop: 6, fontFamily: "'Cormorant Garamond', serif", position: 'relative', zIndex: 1 }}>
            — {pageNum} —
          </p>
        </>
      )}
    </div>
  );
}

/* ─── Flipping page (desktop) ─── */
function FlippingPage({ flipping, flipDir, fromPage, toPage, onAdd, totalPages, spreadIndex }) {
  if (!flipping) return null;
  return (
    <div style={{
      position: 'absolute', width: '50%', top: 0, bottom: 0,
      [flipDir === 'next' ? 'right' : 'left']: 0,
      transformOrigin: flipDir === 'next' ? 'left center' : 'right center',
      transformStyle: 'preserve-3d', zIndex: 20,
      animation: 'pageFlip 0.6s cubic-bezier(0.4,0,0.2,1) forwards',
    }}>
      <style>{`@keyframes pageFlip { from { transform: rotateY(0deg); } to { transform: rotateY(${flipDir === 'next' ? '-180deg' : '180deg'}); } }`}</style>
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden',
        backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
        borderRadius: flipDir === 'next' ? '0 4px 4px 0' : '4px 0 0 4px',
      }}>
        {fromPage && <PageContent produits={fromPage.produits} categorie={fromPage.categorie} pageNum={flipDir === 'next' ? spreadIndex * 2 + 2 : spreadIndex * 2 + 1} totalPages={totalPages} onAdd={onAdd} side={flipDir === 'next' ? 'right' : 'left'} />}
      </div>
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden',
        backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
        transform: 'rotateY(180deg) scaleX(-1)',
        borderRadius: flipDir === 'next' ? '4px 0 0 4px' : '0 4px 4px 0',
      }}>
        {toPage && <PageContent produits={toPage.produits} categorie={toPage.categorie} pageNum={flipDir === 'next' ? spreadIndex * 2 + 3 : spreadIndex * 2} totalPages={totalPages} onAdd={onAdd} side={flipDir === 'next' ? 'left' : 'right'} />}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Book3D — main component with real page curl
═══════════════════════════════════════════ */
export default function Book3D({ pages, onAdd, isMobile }) {
  const [spread, setSpread] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState(null);
  const [nextSpread, setNextSpread] = useState(0);
  const totalSpreads = Math.ceil((pages?.length || 0) / 2);

  // Mobile state — real page-turn following the finger
  const [activeCat, setActiveCat] = useState(0);
  const [dragDir, setDragDir] = useState(null);
  const [dragProgress, setDragProgress] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isHorizontalSwipe = useRef(null);
  const containerWidth = useRef(0);
  const dragDirRef = useRef(null);

  const flip = useCallback((dir) => {
    if (flipping) return;
    if (dir === 'next' && spread >= totalSpreads - 1) return;
    if (dir === 'prev' && spread <= 0) return;
    const next = dir === 'next' ? spread + 1 : spread - 1;
    setFlipDir(dir); setNextSpread(next); setFlipping(true);
    setTimeout(() => { setSpread(next); setFlipping(false); setFlipDir(null); }, 600);
  }, [flipping, spread, totalSpreads]);

  if (!pages || pages.length === 0) return (
    <div style={{ textAlign: 'center', padding: '60px 20px', color: C.softText }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🍽️</div>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 15 }}>Aucun produit disponible</p>
    </div>
  );

  // ═══════════════════════════════════════════
  //  MOBILE — Real page curl following the finger
  // ═══════════════════════════════════════════
  if (isMobile) {
    const categories = [];
    pages.forEach(p => {
      if (!categories.find(c => c.nom === p.categorie?.nom)) {
        categories.push({ ...p.categorie, _products: [] });
      }
      const cat = categories.find(c => c.nom === p.categorie?.nom);
      cat._products.push(...p.produits);
    });

    const catCount = categories.length;
    const panelWidth = containerWidth.current || window.innerWidth;

    const goToCat = (idx) => {
      if (idx < 0 || idx >= catCount) return;
      setDragDir(null); dragDirRef.current = null; setDragProgress(0);
      setActiveCat(idx);
    };

    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      isHorizontalSwipe.current = null;
      setIsSwiping(true);
    };

    const handleTouchMove = (e) => {
      const dx = e.touches[0].clientX - touchStartX.current;
      const dy = e.touches[0].clientY - touchStartY.current;

      if (isHorizontalSwipe.current === null) {
        if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
          isHorizontalSwipe.current = Math.abs(dx) > Math.abs(dy);
        }
      }

      if (isHorizontalSwipe.current === true) {
        e.preventDefault?.();

        if (dragDirRef.current === null && Math.abs(dx) > 4) {
          const dir = dx < 0 ? 'next' : 'prev';
          if ((dir === 'next' && activeCat < catCount - 1) || (dir === 'prev' && activeCat > 0)) {
            dragDirRef.current = dir;
            setDragDir(dir);
          } else {
            dragDirRef.current = 'blocked';
          }
        }

        if (dragDirRef.current === 'next' || dragDirRef.current === 'prev') {
          const progress = Math.min(1, Math.abs(dx) / panelWidth);
          setDragProgress(progress);
        } else if (dragDirRef.current === 'blocked') {
          const elastic = Math.min(0.15, Math.abs(dx) / panelWidth * 0.3);
          setDragProgress(elastic);
        }
      }
    };

    const handleTouchEnd = () => {
      setIsSwiping(false);
      const threshold = 0.3;

      if (dragProgress > threshold && (dragDirRef.current === 'next' || dragDirRef.current === 'prev')) {
        const dir = dragDirRef.current;
        setDragProgress(1);
        setTimeout(() => {
          setActiveCat(c => dir === 'next' ? c + 1 : c - 1);
          setDragDir(null); dragDirRef.current = null; setDragProgress(0);
        }, 280);
      } else {
        setDragProgress(0);
        setTimeout(() => { setDragDir(null); dragDirRef.current = null; }, 280);
      }
      isHorizontalSwipe.current = null;
    };

    const currentCat = categories[activeCat];
    const underneathCat = dragDir === 'next' ? categories[activeCat + 1] : dragDir === 'prev' ? currentCat : null;
    const turnAngle = -dragProgress * 90;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: C.creamPaper, overflow: 'hidden' }}
        ref={el => { if (el) containerWidth.current = el.offsetWidth; }}>
        
        {/* Category tabs */}
        <div style={{ flexShrink: 0, background: '#FFFFFF', borderBottom: '1px solid ' + C.borderSoft, padding: '10px 12px' }}>
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
            {categories.map((cat, i) => (
              <button key={i} onClick={() => goToCat(i)} style={{
                flexShrink: 0, padding: '8px 16px', borderRadius: 24,
                background: i === activeCat ? C.oliveDark : 'transparent',
                color: i === activeCat ? C.creamLight : C.softText,
                border: i === activeCat ? 'none' : '1px solid ' + C.borderSoft,
                fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap',
                transition: 'all 0.25s ease', fontFamily: "'Inter', sans-serif",
              }}>
                <span style={{ fontSize: 14 }}>{cat?.emoji || '🍽️'}</span>{cat?.nom}
              </button>
            ))}
          </div>
        </div>

        {/* Category title */}
        <div style={{ flexShrink: 0, background: C.creamPaper, padding: '14px 20px 10px', borderBottom: '2px solid ' + C.bordeaux, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: C.oliveDark, margin: 0, letterSpacing: '0.03em' }}>
            {currentCat?.nom}
            <span style={{ fontSize: 12, fontWeight: 500, color: C.softText, marginLeft: 8, fontFamily: "'Cormorant Garamond', serif" }}>
              ({currentCat?._products.length})
            </span>
          </h2>
          {currentCat?.emoji && (
            <span style={{ width: 36, height: 36, borderRadius: '50%', background: '#FFFFFF', border: '1px solid ' + C.borderSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
              {currentCat.emoji}
            </span>
          )}
        </div>

        {/* Page curl — real 3D page turn following the finger */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ flex: 1, overflow: 'hidden', position: 'relative', touchAction: 'pan-y', perspective: 1400 }}
        >
          {/* Page underneath (revealed during turn) */}
          {underneathCat && (
            <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: '4px 20px 100px', background: C.creamPaper, zIndex: 1 }}>
              {underneathCat._products.map(p => <ProduitCard key={p.id} produit={p} onAdd={onAdd} isMobile={true} />)}
            </div>
          )}

          {/* Active page — the one that physically turns */}
          <div style={{
            position: 'absolute', inset: 0,
            overflowY: dragDir ? 'hidden' : 'auto', WebkitOverflowScrolling: 'touch',
            padding: '4px 20px 100px', background: C.creamPaper, zIndex: 2,
            transform: dragDir === 'prev'
              ? 'rotateY(' + (90 - dragProgress * 90) + 'deg)'
              : 'rotateY(' + turnAngle + 'deg)',
            transformOrigin: dragDir === 'prev' ? 'right center' : 'left center',
            backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
            boxShadow: dragDir ? '0 0 24px rgba(45,62,36,0.15)' : 'none',
            transition: isSwiping ? 'none' : 'transform 0.28s cubic-bezier(0.25,0.1,0.25,1), box-shadow 0.28s',
          }}>
            <DecoFrame />
            {(dragDir === 'prev' ? categories[activeCat - 1] : currentCat)?._products.map(p => (
              <ProduitCard key={p.id} produit={p} onAdd={onAdd} isMobile={true} />
            ))}
          </div>
        </div>

        {/* Dots */}
        <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', gap: 6, padding: '8px 0', background: '#FFFFFF', borderTop: '1px solid ' + C.borderSoft }}>
          {categories.map((_, i) => (
            <div key={i} onClick={() => goToCat(i)} style={{
              width: i === activeCat ? 24 : 7, height: 7, borderRadius: 4,
              background: i === activeCat ? C.oliveDark : C.borderSoft,
              transition: 'all 0.3s', cursor: 'pointer',
            }} />
          ))}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════
  //  DESKTOP — Double-page book with 3D flip
  // ═══════════════════════════════════════════
  const leftPage = pages[spread * 2] || null;
  const rightPage = pages[spread * 2 + 1] || null;
  const nextLeftPage = pages[nextSpread * 2] || null;
  const nextRightPage = pages[nextSpread * 2 + 1] || null;
  const flippingFromPage = flipDir === 'next' ? rightPage : leftPage;
  const flippingToPage = flipDir === 'next' ? nextLeftPage : nextRightPage;
  const bookHeight = 560;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <div
        onTouchStart={(e) => touchStartX.current = e.touches[0].clientX}
        onTouchEnd={(e) => {
          if (touchStartX.current === 0) return;
          const diff = touchStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 40) flip(diff > 0 ? 'next' : 'prev');
          touchStartX.current = 0;
        }}
        style={{ width: '100%', maxWidth: 820, perspective: '2000px', userSelect: 'none' }}
      >
        <div style={{
          display: 'flex', height: bookHeight, position: 'relative',
          boxShadow: '0 12px 40px rgba(45,62,36,0.12), 0 4px 12px rgba(45,62,36,0.06)',
          borderRadius: '4px 8px 8px 4px', transformStyle: 'preserve-3d',
        }}>
          {/* Spine */}
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 4, transform: 'translateX(-50%)', background: 'linear-gradient(to right, ' + C.cream + ', ' + C.borderSoft + ', ' + C.cream + ')', zIndex: 15 }} />
          
          {/* Left page */}
          <div style={{ flex: 1, overflow: 'hidden', borderRadius: '4px 0 0 4px', opacity: flipping && flipDir === 'prev' ? 0 : 1, background: C.creamPaper }}>
            {leftPage ? <PageContent produits={leftPage.produits} categorie={leftPage.categorie} pageNum={spread * 2 + 1} totalPages={pages.length} onAdd={onAdd} side="left" /> : <div style={{ width: '100%', height: '100%', background: C.creamPaper }} />}
          </div>
          
          {/* Right page */}
          <div style={{ flex: 1, overflow: 'hidden', borderRadius: '0 4px 4px 0', opacity: flipping && flipDir === 'next' ? 0 : 1, background: C.creamPaper }}>
            {rightPage ? <PageContent produits={rightPage.produits} categorie={rightPage.categorie} pageNum={spread * 2 + 2} totalPages={pages.length} onAdd={onAdd} side="right" /> : <div style={{ width: '100%', height: '100%', background: C.creamPaper }} />}
          </div>
          
          {/* Underneath pages during flip */}
          {flipping && flipDir === 'next' && nextLeftPage && (
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '50%', overflow: 'hidden', borderRadius: '4px 0 0 4px', zIndex: 5 }}>
              <PageContent produits={nextLeftPage.produits} categorie={nextLeftPage.categorie} pageNum={nextSpread * 2 + 1} totalPages={pages.length} onAdd={onAdd} side="left" />
            </div>
          )}
          {flipping && flipDir === 'prev' && nextRightPage && (
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%', overflow: 'hidden', borderRadius: '0 4px 4px 0', zIndex: 5 }}>
              <PageContent produits={nextRightPage.produits} categorie={nextRightPage.categorie} pageNum={nextSpread * 2 + 2} totalPages={pages.length} onAdd={onAdd} side="right" />
            </div>
          )}
          
          {/* Flipping page */}
          <FlippingPage flipping={flipping} flipDir={flipDir} fromPage={flippingFromPage} toPage={flippingToPage} onAdd={onAdd} totalPages={pages.length} spreadIndex={spread} />
        </div>
      </div>
      
      {/* Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <button onClick={() => flip('prev')} disabled={spread === 0 || flipping} style={{
          width: 44, height: 44, borderRadius: '50%',
          background: spread === 0 ? C.olivePale : C.oliveDark, border: 'none',
          color: spread === 0 ? C.borderSoft : C.creamLight, fontSize: 20, cursor: spread === 0 ? 'default' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>‹</button>
        <div style={{ display: 'flex', gap: 6 }}>
          {Array.from({ length: totalSpreads }).map((_, i) => (
            <div key={i} onClick={() => !flipping && setSpread(i)} style={{
              width: i === spread ? 24 : 7, height: 7, borderRadius: 4,
              background: i === spread ? C.oliveDark : C.borderSoft,
              transition: 'all 0.3s', cursor: 'pointer',
            }} />
          ))}
        </div>
        <button onClick={() => flip('next')} disabled={spread >= totalSpreads - 1 || flipping} style={{
          width: 44, height: 44, borderRadius: '50%',
          background: spread >= totalSpreads - 1 ? C.olivePale : C.oliveDark, border: 'none',
          color: spread >= totalSpreads - 1 ? C.borderSoft : C.creamLight, fontSize: 20,
          cursor: spread >= totalSpreads - 1 ? 'default' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>›</button>
      </div>
      <p style={{ fontSize: 11, color: C.softText, fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>
        Glissez ← → ou cliquez sur les flèches pour tourner les pages
      </p>
    </div>
  );
}
