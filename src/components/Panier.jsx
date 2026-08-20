import { useState } from 'react';

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

export default function Panier({ panier, show, onClose, onUpdateQty, onRemove, onCommander }) {
  const [tableNum, setTableNum] = useState('');
  const [notes, setNotes] = useState('');
  const [step, setStep] = useState('cart'); // cart -> checkout -> confirm
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  const total = panier.reduce((s, i) => s + i.prix_unit * i.quantite, 0);
  const count = panier.reduce((s, i) => s + i.quantite, 0);

  const handleCommander = () => {
    if (!tableNum.trim()) return;
    setLoading(true);
    onCommander({ table: tableNum, notes, items: panier, total });
    setTimeout(() => {
      setLoading(false);
      setStep('confirm');
    }, 1000);
  };

  const handleClose = () => {
    setStep('cart');
    setTableNum('');
    setNotes('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 440, maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingBottom: 14, borderBottom: `1px solid ${C.borderSoft}`,
          marginBottom: 14,
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 20, color: C.oliveDark, margin: 0,
          }}>
            {step === 'confirm' ? 'Commande Envoyée' : 'Votre Panier'}
          </h2>
          <button onClick={handleClose} style={{
            width: 32, height: 32, borderRadius: '50%', border: 'none',
            background: C.olivePale, cursor: 'pointer', fontSize: 16, color: C.oliveDark,
          }}>✕</button>
        </div>

        {step === 'confirm' ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>✓</div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: C.oliveDark }}>
              Votre commande a été envoyée en cuisine!
            </p>
            <p style={{ fontSize: 13, color: C.softText, marginTop: 8, fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
              Table {tableNum} — {count} article(s) — {total.toFixed(0)} £
            </p>
            <button onClick={handleClose} className="btn-primary" style={{ marginTop: 20 }}>
              Fermer
            </button>
          </div>
        ) : step === 'cart' ? (
          <>
            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: 14 }}>
              {panier.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px 0', color: C.softText }}>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>🛒</div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 14 }}>
                    Votre panier est vide
                  </p>
                </div>
              ) : (
                panier.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 0', borderBottom: `1px dashed ${C.borderSoft}`,
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 600, color: C.darkText, margin: 0 }}>
                        {item.nom}
                      </p>
                      <p style={{ fontSize: 12, color: C.softText, marginTop: 2 }}>
                        {item.prix_unit.toFixed(0)} £ × {item.quantite} = {(item.prix_unit * item.quantite).toFixed(0)} £
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <button onClick={() => onUpdateQty(i, -1)} style={{
                        width: 26, height: 26, borderRadius: '50%',
                        border: `1px solid ${C.borderSoft}`, background: 'transparent',
                        cursor: 'pointer', fontSize: 14, color: C.oliveDark,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>−</button>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.oliveDark, minWidth: 18, textAlign: 'center' }}>
                        {item.quantite}
                      </span>
                      <button onClick={() => onUpdateQty(i, 1)} style={{
                        width: 26, height: 26, borderRadius: '50%',
                        border: 'none', background: C.oliveMid, color: C.creamLight,
                        cursor: 'pointer', fontSize: 14,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>+</button>
                      <button onClick={() => onRemove(i)} style={{
                        width: 26, height: 26, borderRadius: '50%',
                        border: 'none', background: 'transparent',
                        cursor: 'pointer', fontSize: 14, color: C.bordeaux, marginLeft: 4,
                      }}>✕</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {panier.length > 0 && (
              <>
                {/* Total */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 0', borderTop: `1px solid ${C.borderSoft}`,
                  marginBottom: 14,
                }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: C.oliveDark }}>
                    Total
                  </span>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: C.bordeaux }}>
                    {total.toFixed(0)} £
                  </span>
                </div>
                <button onClick={() => setStep('checkout')} className="btn-primary" style={{ width: '100%' }}>
                  Passer la commande
                </button>
              </>
            )}
          </>
        ) : (
          /* Checkout step */
          <>
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: 14 }}>
              <div style={{ marginBottom: 16 }}>
                <label className="label">Numéro de table</label>
                <input type="text" value={tableNum} onChange={e => setTableNum(e.target.value)} placeholder="Ex: 12" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="label">Notes (optionnel)</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Allergies, préférences, etc." />
              </div>

              {/* Summary */}
              <div style={{
                background: C.olivePale, borderRadius: 4, padding: 14,
                marginBottom: 14,
              }}>
                {panier.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4, color: C.darkText }}>
                    <span>{item.quantite}× {item.nom}</span>
                    <span style={{ fontWeight: 700, color: C.bordeaux }}>{(item.prix_unit * item.quantite).toFixed(0)} £</span>
                  </div>
                ))}
                <div style={{ borderTop: `1px solid ${C.borderSoft}`, marginTop: 8, paddingTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 15, color: C.oliveDark }}>Total</span>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 16, color: C.bordeaux }}>{total.toFixed(0)} £</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setStep('cart')} className="btn-ghost" style={{ flex: 1 }}>
                Retour
              </button>
              <button onClick={handleCommander} disabled={!tableNum.trim() || loading} className="btn-primary" style={{ flex: 2, opacity: !tableNum.trim() || loading ? 0.5 : 1 }}>
                {loading ? 'Envoi...' : 'Confirmer la commande'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
