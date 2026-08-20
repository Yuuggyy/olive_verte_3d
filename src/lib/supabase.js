import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nphcxnrtthatpzocmbxi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5waGN4bnJ0dGhhdHB6b2NtYnhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE1MzU0MDAsImV4cCI6MjAyNzEwNTQwMH0.placeholder';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// === MOCK DATA (premium menu) ===
const MOCK_CATEGORIES = [
  { id: 'c1', nom: 'Entrées', emoji: '🫒', description: 'Pour commencer en douceur', ordre: 1 },
  { id: 'c2', nom: 'Salades', emoji: '🥗', description: 'Fraîcheur du jardin', ordre: 2 },
  { id: 'c3', nom: 'Burgers', emoji: '🍔', description: 'Savoureux et généreux', ordre: 3 },
  { id: 'c4', nom: 'Pasta & Soup', emoji: '🍝', description: 'Plats de caractère', ordre: 4 },
  { id: 'c5', nom: 'Plats Principaux', emoji: '🍽️', description: 'Les grands classiques', ordre: 5 },
  { id: 'c6', nom: 'Desserts', emoji: '🍮', description: 'La douceur finale', ordre: 6 },
  { id: 'c7', nom: 'Boissons', emoji: '🥤', description: 'Pour accompagner', ordre: 7 },
];

const MOCK_PRODUITS = [
  // Entrées
  { id: 'p1', categorie_id: 'c1', nom: 'Mélange de Noix aux Épices Piri Piri', prix: 8, description: 'Noix grillées, épices piri piri maison' },
  { id: 'p2', categorie_id: 'c1', nom: 'Assiette de Tapas', prix: 24, description: 'Sélection variée de tapas méditerranéennes' },
  { id: 'p3', categorie_id: 'c1', nom: 'Quesadillas de Bœuf / Poulet', prix: 15, description: 'Tortilla, fromage fondu, viande au choix' },
  { id: 'p4', categorie_id: 'c1', nom: 'Samoussa de Bœuf / Poulet', prix: 12, description: 'Triangles croustillants, garniture au choix' },
  { id: 'p5', categorie_id: 'c1', nom: 'Ailes de Poulet BBQ', prix: 14, description: 'Échalons et graines de sésame' },
  { id: 'p6', categorie_id: 'c1', nom: 'Tacos au Bœuf', prix: 14, description: 'Bœuf épicé, salsa, guacamole' },
  { id: 'p7', categorie_id: 'c1', nom: 'Croquettes de Crevettes', prix: 19, description: 'Oignons verts, zeste de citron, paprika' },
  { id: 'p8', categorie_id: 'c1', nom: 'Calmars Frits', prix: 17, description: 'Sauce tartar maison' },
  { id: 'p9', categorie_id: 'c1', nom: 'Boulettes de Bœuf à l\'Italienne', prix: 18, description: 'Ragoût de tomate, fondue parmesan et basilic' },
  { id: 'p10', categorie_id: 'c1', nom: 'Morceaux de Bœuf Pimentés', prix: 18, description: 'Bœuf mariné, piment doux' },
  // Salades
  { id: 'p11', categorie_id: 'c2', nom: 'Poulet Mayo à la Congolaise', prix: 18, description: 'Poulet grillé, mayonnaise maison' },
  { id: 'p12', categorie_id: 'c2', nom: 'Salade Verte Méditerranéenne', prix: 16, description: 'Tomate cerise, olives, laitue romaine, betterave, noix, vinaigrette balsamique' },
  // Burgers
  { id: 'p13', categorie_id: 'c3', nom: 'Hamburger Viande', prix: 18, description: 'Steak haché, cheddar, salade, sauce maison' },
  { id: 'p14', categorie_id: 'c3', nom: 'Hamburger Poulet Croustillant', prix: 15, description: 'Filet de poulet pané, coleslaw, sauce burger' },
  // Pasta & Soup
  { id: 'p15', categorie_id: 'c4', nom: 'Spaghetti Bolognaise', prix: 24, description: 'Sauce bolognaise mijotée, parmesan' },
  { id: 'p16', categorie_id: 'c4', nom: 'Penne au Poulet', prix: 22, description: 'Sauce champignons et fromage' },
  { id: 'p17', categorie_id: 'c4', nom: 'Soupe du Jour', prix: 12, description: 'Préparation du chef selon le marché' },
  // Plats Principaux
  { id: 'p18', categorie_id: 'c5', nom: 'Poulet Rôti aux Herbes', prix: 26, description: 'Herbes de Provence, légumes de saison' },
  { id: 'p19', categorie_id: 'c5', nom: 'Bœuf Braisé à l\'Olive', prix: 32, description: 'Mijoté d\'olives vertes, tomates, oignons' },
  { id: 'p20', categorie_id: 'c5', nom: 'Poisson Grillé du Jour', prix: 28, description: 'Selon arrivage, sauce vierge' },
  // Desserts
  { id: 'p21', categorie_id: 'c6', nom: 'Tiramisu Maison', prix: 12, description: 'Café, mascarpone, cacao' },
  { id: 'p22', categorie_id: 'c6', nom: 'Crème Brûlée', prix: 10, description: 'Vanille de Madagascar' },
  { id: 'p23', categorie_id: 'c6', nom: 'Tarte aux Olives Sucrées', prix: 14, description: 'Spécialité de la maison' },
  // Boissons
  { id: 'p24', categorie_id: 'c7', nom: 'Jus d\'Orange Frais', prix: 5, description: 'Pressé minute' },
  { id: 'p25', categorie_id: 'c7', nom: 'Limonade Maison', prix: 4, description: 'Citron, menthe, eau gazeuse' },
  { id: 'p26', categorie_id: 'c7', nom: 'Café Espresso', prix: 3, description: 'Pure arabica' },
];

const MOCK_PARAMS = {
  nom_restaurant: "L'Olive Verte",
  slogan: 'Menu Foods & Drinks',
  telephone: '+243 820 000 000',
  adresse: 'Kinshasa, RDC',
};

// Try Supabase, fall back to mock
export async function getCategories() {
  try {
    const { data, error } = await supabase.from('categories').select('*').order('ordre');
    if (error || !data || data.length === 0) throw new Error('fallback');
    return { data };
  } catch {
    return { data: MOCK_CATEGORIES };
  }
}

export async function getProduits() {
  try {
    const { data, error } = await supabase.from('produits').select('*');
    if (error || !data || data.length === 0) throw new Error('fallback');
    return { data };
  } catch {
    return { data: MOCK_PRODUITS };
  }
}

export async function getParametres() {
  try {
    const { data, error } = await supabase.from('parametres').select('*').limit(1).single();
    if (error || !data) throw new Error('fallback');
    return { data };
  } catch {
    return { data: MOCK_PARAMS };
  }
}

export async function createCommande(commande) {
  try {
    const { data, error } = await supabase.from('commandes').insert(commande).select().single();
    if (error) throw new Error('fallback');
    return { data };
  } catch {
    return { data: { id: 'mock-' + Date.now(), ...commande } };
  }
}

export async function appelServeur(tableNum) {
  try {
    const { data, error } = await supabase.from('appels').insert({ table: tableNum, statut: 'pending' }).select().single();
    if (error) throw new Error('fallback');
    return { data };
  } catch {
    return { data: { id: 'mock-' + Date.now(), table: tableNum, statut: 'pending' } };
  }
}
