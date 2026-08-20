import { useState, useEffect } from 'react';
import { getCategories, getProduits, getParametres, createCommande, appelServeur } from '../lib/supabase';
import Book3D from '../components/Book3D';
import Panier from '../components/Panier';

const C = {
  oliveDark:   '#3D4A1A',
  oliveMid:    '#556B2F',
  oliveLight:  '#7A8B5A',
  olivePale:   '#E8EED5',
  cream:       '#F0EAD6',
  creamLight:  '#F7F3E8',
  creamPaper:  '#FAF6EC',
  bordeaux:    '#8B0000',
  gold:        '#B8860B',
  darkText:     '#2D3E24',
  softText:     'rgba(45,62,36,0.60)',
  borderSoft:   'rgba(61,74,26,0.15)',
};

function useIsMobile() {
  const [v, setV] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setV(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return v;
}

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [produits, setProduits]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [panier, setPanier]         = useState([]);
  const [showPanier, setShowPanier] = useState(false);
  const [showAppel, setShowAppel]   = useState(false);
  const [tableAppel, setTableAppel] = useState('');
  const [toast, setToast]           = useState('');
  const [parametres, setParametres] = useState(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    Promise.all([getCategories(), getProduits(), getParametres()]).then(([cats, prods, params]) => {
      setCategories(cats.data || []);
      setProduits(prods.data || []);
      setParametres(params.data || null);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (parametres?.nom_restaurant) document.title = `${parametres.nom_restaurant} — Menu`;
  }, [parametres]);

  const buildPages = () => {
    const pages = [];
    const sorted = [...categories].sort((a, b) => (a.ordre || 0) - (b.ordre || 0));
    sorted.forEach(cat => {
      const prods = produits.filter(p => p.categorie_id === cat.id);
      if (prods.length) pages.push({ categorie: cat, produits: prods });
    });
    const sans = produits.filter(p => !p.categorie_id || !categories.find(c => c.id === p.categorie_id));
    if (sans.length) pages.push({ categorie: { nom: 'Autres', emoji: '🍽️', description: '' }, produits: sans });
    return pages;
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const handleAdd = (produit) => {
    setPanier(prev => {
      const idx = prev.findIndex(i => i.id === produit.id);
      if (idx >= 0) {
        const n = [...prev];
        n[idx] = { ...n[idx], quantite: n[idx].quantite + produit.quantite };
        return n;
      }
      return [...prev, produit];
    });
    showToast(`✓ ${produit.nom} ajouté`);
  };

  const handleUpdateQty = (idx, delta) => {
    setPanier(prev => {
      const n = [...prev];
      n[idx] = { ...n[idx], quantite: Math.max(0, n[idx].quantite + delta) };
      return n.filter(i => i.quantite > 0);
    });
  };

  const handleRemove = (idx) => {
    setPanier(prev => prev.filter((_, i) => i !== idx));
  };

  const handleCommander = async (cmd) => {
    await createCommande({
      table: cmd.table,
      notes: cmd.notes,
      items: cmd.items,
      total: cmd.total,
      statut: 'recu',
    });
  };

  const handleAppel = async () => {
    if (!tableAppel.trim()) return;
    await appelServeur(tableAppel);
    setShowAppel(false);
    setTableAppel('');
    showToast('✓ Serveur appelé');
  };

  const panierCount = panier.reduce((s, i) => s + i.quantite, 0);
  const panierTotal = panier.reduce((s, i) => s + i.prix_unit * i.quantite, 0);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: C.cream }}>
      <div className="spinner" />
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: C.cream,
      padding: isMobile ? '12px' : '20px 40px',
    }}>
      {/* ── Header ── */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '12px 0' : '16px 0 20px',
        borderBottom: `1px solid ${C.borderSoft}`,
        marginBottom: isMobile ? 14 : 24,
      }}>
        <div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 22 : 28,
            fontWeight: 700, color: C.oliveDark,
            margin: 0, letterSpacing: '0.03em',
          }}>
            L'OLIVE VERTE
          </h1>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: isMobile ? 12 : 14,
            fontStyle: 'italic', color: C.softText,
            marginTop: 2,
          }}>
            {parametres?.slogan || 'Menu Foods & Drinks'}
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setShowAppel(true)} style={{
            padding: '8px 14px', borderRadius: 4,
            border: `1px solid ${C.borderSoft}`,
            background: 'transparent', cursor: 'pointer',
            color: C.oliveDark, fontSize: 12, fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            🔔 Appeler
          </button>
          <button onClick={() => setShowPanier(true)} style={{
            padding: '8px 14px', borderRadius: 4,
            border: 'none', cursor: 'pointer',
            background: C.oliveDark, color: C.creamLight,
            fontSize: 12, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            🛒 {panierCount > 0 ? `${panierCount} · ${panierTotal.toFixed(0)} £` : 'Panier'}
          </button>
        </div>
      </header>

      {/* ── Book ── */}
      <Book3D pages={buildPages()} onAdd={handleAdd} isMobile={isMobile} />

      {/* ── Appel Serveur Modal ── */}
      {showAppel && (
        <div className="modal-overlay" onClick={() => setShowAppel(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 360 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: C.oliveDark, marginBottom: 16 }}>
              Appeler le Serveur
            </h2>
            <div style={{ marginBottom: 16 }}>
              <label className="label">Votre numéro de table</label>
              <input type="text" value={tableAppel} onChange={e => setTableAppel(e.target.value)} placeholder="Ex: 12" />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setShowAppel(false)} className="btn-ghost" style={{ flex: 1 }}>Annuler</button>
              <button onClick={handleAppel} disabled={!tableAppel.trim()} className="btn-primary" style={{ flex: 1, opacity: !tableAppel.trim() ? 0.5 : 1 }}>
                Appeler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Panier ── */}
      <Panier
        panier={panier}
        show={showPanier}
        onClose={() => setShowPanier(false)}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
        onCommander={handleCommander}
      />

      {/* ── Toast ── */}
      {toast && <div className="toast">{toast}</div>}

      {/* ── Footer ── */}
      <footer style={{
        textAlign: 'center', marginTop: 30, padding: '16px 0',
        borderTop: `1px solid ${C.borderSoft}`,
        fontSize: 11, color: C.softText,
        fontFamily: "'Cormorant Garamond', serif",
      }}>
        {parametres?.nom_restaurant || "L'Olive Verte"} · {parametres?.adresse || 'Kinshasa, RDC'}<br />
        {parametres?.telephone || '+243 820 000 000'} — Inspire by YuuStore · +243 977 555 768
      </footer>
    </div>
  );
}
