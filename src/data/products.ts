export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  arabicName: string;
  brand: string;
  price: number;
  compareAt?: number;
  category: 'polos' | 'tshirts' | 'pants';
  description: string;
  arabicLine: string;
  fabric: string;
  image: string;
  gallery: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  rating: number;
  reviewCount: number;
  stock: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  reviews: Review[];
}

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export const CATEGORIES = [
  { slug: 'polos', name: 'Polos', tagline: 'The Signature Collection' },
  { slug: 'tshirts', name: 'T-Shirts', tagline: 'Essential Everyday Luxury' },
  { slug: 'pants', name: 'Pants', tagline: 'Comfort, Perfected' },
] as const;

export const PRODUCTS: Product[] = [
  {
    id: 'ms-01',
    slug: 'polo-white',
    name: 'Signature Polo — White',
    arabicName: 'بولو سيغناتور — أبيض',
    brand: 'Master Store',
    price: 5900,
    compareAt: 7500,
    category: 'polos',
    description:
      'The crown piece of the Master Store collection. Cut from breathable premium piqué cotton with a structured collar, mother-of-pearl buttons and the signature embroidered crest. A timeless silhouette that moves effortlessly from casual afternoons to elevated evenings.',
    arabicLine: 'بولو قطن فاخر بجودة عالية',
    fabric: '100% Premium Piqué Cotton — 220 GSM',
    image: '/images/polo-white.jpg',
    gallery: ['/images/polo-white.jpg', '/images/polo-white-detail-1.jpg', '/images/polo-white-detail-2.jpg'],
    sizes: SIZES,
    colors: [
      { name: 'White', hex: '#f5f5f0' },
      { name: 'Navy', hex: '#1e2a4a' },
      { name: 'Black', hex: '#111111' },
    ],
    rating: 4.8,
    reviewCount: 214,
    stock: 34,
    isBestSeller: true,
    reviews: [
      { id: 'r1', author: 'Adem H.', rating: 5, date: '2026-07-02', comment: 'Exceptional quality. The fabric feels luxurious and the fit is perfect. Best polo I have owned.' },
      { id: 'r2', author: 'Yacine B.', rating: 5, date: '2026-06-24', comment: 'Very elegant, true to size. Delivery was fast and packaging was premium.' },
      { id: 'r3', author: 'Mohamed L.', rating: 4, date: '2026-06-11', comment: 'Great polo overall. The white stays bright even after several washes.' },
    ],
  },
  {
    id: 'ms-02',
    slug: 'polo-black',
    name: 'Signature Polo — Black',
    arabicName: 'بولو سيغناتور — أسود',
    brand: 'Master Store',
    price: 5900,
    compareAt: 7500,
    category: 'polos',
    description:
      'Understated power. The black Signature Polo is tailored from dense piqué cotton with reinforced seams, a ribbed collar that keeps its shape, and the Master Store crest in tonal embroidery. Sharp, versatile, unmistakably premium.',
    arabicLine: 'بولو أسود أنيق بخامة راقية',
    fabric: '100% Premium Piqué Cotton — 220 GSM',
    image: '/images/polo-black.jpg',
    gallery: ['/images/polo-black.jpg', '/images/polo-black-detail-1.jpg', '/images/polo-black-detail-2.jpg'],
    sizes: SIZES,
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'White', hex: '#f5f5f0' },
      { name: 'Navy', hex: '#1e2a4a' },
    ],
    rating: 4.9,
    reviewCount: 186,
    stock: 27,
    isBestSeller: true,
    reviews: [
      { id: 'r1', author: 'Riad K.', rating: 5, date: '2026-07-08', comment: 'The black is deep and rich, does not fade. Fits like it was made for me.' },
      { id: 'r2', author: 'Sofiane M.', rating: 5, date: '2026-06-30', comment: 'Premium feel from the collar to the stitching. Worth every dinar.' },
      { id: 'r3', author: 'Walid T.', rating: 5, date: '2026-06-15', comment: 'Ordered two more after the first one. Highly recommended.' },
    ],
  },
  {
    id: 'ms-03',
    slug: 'polo-navy',
    name: 'Signature Polo — Navy',
    arabicName: 'بولو سيغناتور — أزرق داكن',
    brand: 'Master Store',
    price: 5900,
    category: 'polos',
    description:
      'A deep, confident navy crafted from long-staple piqué cotton. The Signature Polo in navy pairs a refined slim-regular fit with the embroidered Master Store crest — an essential that anchors any premium wardrobe.',
    arabicLine: 'بولو كحلي كلاسيكي بلمسة فاخرة',
    fabric: '100% Premium Piqué Cotton — 220 GSM',
    image: '/images/polo-navy.jpg',
    gallery: ['/images/polo-navy.jpg', '/images/polo-navy-detail-1.jpg', '/images/polo-navy-detail-2.jpg'],
    sizes: SIZES,
    colors: [
      { name: 'Navy', hex: '#1e2a4a' },
      { name: 'White', hex: '#f5f5f0' },
      { name: 'Black', hex: '#111111' },
    ],
    rating: 4.7,
    reviewCount: 158,
    stock: 41,
    isNew: true,
    reviews: [
      { id: 'r1', author: 'Amine Z.', rating: 5, date: '2026-07-10', comment: 'The navy color is beautiful in person. Elegant and comfortable all day.' },
      { id: 'r2', author: 'Karim D.', rating: 4, date: '2026-06-28', comment: 'Great fit and fabric. Sizes run true.' },
    ],
  },
  {
    id: 'ms-04',
    slug: 'polo-collection',
    name: 'Signature Polo — Full Collection',
    arabicName: 'مجموعة بولو سيغناتور الكاملة',
    brand: 'Master Store',
    price: 6500,
    category: 'polos',
    description:
      'Every shade of mastery in one place. The Full Collection polo is available in seven curated colors — from crisp white to deep forest — each cut from the same premium piqué cotton and finished with the signature crest. Choose your color, own the room.',
    arabicLine: 'بولو فاخر متوفر بعدة ألوان',
    fabric: '100% Premium Piqué Cotton — 220 GSM',
    image: '/images/polo-collection.jpg',
    gallery: ['/images/polo-collection.jpg', '/images/polo-collection-detail-1.jpg', '/images/polo-collection-detail-2.jpg'],
    sizes: SIZES,
    colors: [
      { name: 'Navy', hex: '#1e2a4a' },
      { name: 'Red', hex: '#b01e24' },
      { name: 'Royal Blue', hex: '#2743b8' },
      { name: 'Forest', hex: '#1e4d33' },
      { name: 'Black', hex: '#111111' },
      { name: 'White', hex: '#f5f5f0' },
      { name: 'Sky', hex: '#9cc8e8' },
    ],
    rating: 4.8,
    reviewCount: 342,
    stock: 58,
    isBestSeller: true,
    reviews: [
      { id: 'r1', author: 'Bilal R.', rating: 5, date: '2026-07-05', comment: 'Bought it in three colors. The quality is consistent and outstanding across all of them.' },
      { id: 'r2', author: 'Hicham G.', rating: 5, date: '2026-06-20', comment: 'Finally a store with real premium polos in Algeria. The colors are exactly as shown.' },
      { id: 'r3', author: 'Islam F.', rating: 4, date: '2026-06-08', comment: 'Very good fabric, breathable in the heat. Will order again.' },
    ],
  },
  {
    id: 'ms-05',
    slug: 'oversized-tee-white',
    name: 'Oversized T-Shirt — White',
    arabicName: 'تيشيرت أوفرسايز — أبيض',
    brand: 'Master Store',
    price: 2900,
    category: 'tshirts',
    description:
      'The definitive oversized tee. Heavyweight combed cotton with dropped shoulders and a boxy drape that holds its structure wash after wash. Pre-shrunk, bio-washed, and cut for a silhouette that reads effortless luxury.',
    arabicLine: 'تيشيرت أوفرسايز قطن ثقيل',
    fabric: '100% Combed Cotton — 240 GSM Heavyweight',
    image: '/images/oversized-tee-white.jpg',
    gallery: ['/images/oversized-tee-white.jpg', '/images/oversized-tee-white-detail-1.jpg', '/images/oversized-tee-white-detail-2.jpg'],
    sizes: SIZES,
    colors: [
      { name: 'White', hex: '#f7f7f2' },
      { name: 'Black', hex: '#111111' },
    ],
    rating: 4.6,
    reviewCount: 271,
    stock: 63,
    isBestSeller: true,
    reviews: [
      { id: 'r1', author: 'Nassim O.', rating: 5, date: '2026-07-12', comment: 'Heavyweight and structured, exactly how an oversized tee should be. The white is crisp.' },
      { id: 'r2', author: 'Abdou S.', rating: 4, date: '2026-06-26', comment: 'Great drape and thick fabric. Size down if you want a regular fit.' },
    ],
  },
  {
    id: 'ms-06',
    slug: 'oversized-tee-black',
    name: 'Oversized T-Shirt — Black',
    arabicName: 'تيشيرت أوفرسايز — أسود',
    brand: 'Master Store',
    price: 2900,
    category: 'tshirts',
    description:
      'A wardrobe cornerstone in deep jet black. The heavyweight 240 GSM cotton gives this oversized tee a premium hand-feel and a clean architectural drape. Garment-dyed for a rich black that resists fading.',
    arabicLine: 'تيشيرت أسود ثقيل بقصّة واسعة',
    fabric: '100% Combed Cotton — 240 GSM Heavyweight',
    image: '/images/oversized-tee-black.jpg',
    gallery: ['/images/oversized-tee-black.jpg', '/images/oversized-tee-black-detail-1.jpg', '/images/oversized-tee-black-detail-2.jpg'],
    sizes: SIZES,
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'White', hex: '#f7f7f2' },
    ],
    rating: 4.7,
    reviewCount: 198,
    stock: 47,
    reviews: [
      { id: 'r1', author: 'Fares N.', rating: 5, date: '2026-07-09', comment: 'Perfect black tee. Thick, no fading after many washes. The oversized cut is on point.' },
      { id: 'r2', author: 'Lotfi A.', rating: 4, date: '2026-06-18', comment: 'Solid quality and fast delivery to my wilaya. Recommended.' },
    ],
  },
  {
    id: 'ms-07',
    slug: 'classic-tee-white',
    name: 'Essential Tee — White',
    arabicName: 'تيشيرت أساسي — أبيض',
    brand: 'Master Store',
    price: 2500,
    category: 'tshirts',
    description:
      'The purest essential. A clean regular-fit white tee in soft ringspun cotton with a reinforced ribbed collar. Lightweight yet opaque, it layers beautifully and stands alone with quiet confidence.',
    arabicLine: 'تيشيرت أبيض ناعم للاستعمال اليومي',
    fabric: '100% Ringspun Cotton — 180 GSM',
    image: '/images/classic-tee-white.jpg',
    gallery: ['/images/classic-tee-white.jpg', '/images/classic-tee-white-detail-1.jpg', '/images/classic-tee-white-detail-2.jpg'],
    sizes: SIZES,
    colors: [{ name: 'White', hex: '#fafafa' }],
    rating: 4.5,
    reviewCount: 143,
    stock: 72,
    isNew: true,
    reviews: [
      { id: 'r1', author: 'Mehdi C.', rating: 5, date: '2026-07-06', comment: 'Soft, clean, and well cut. The perfect everyday white tee.' },
      { id: 'r2', author: 'Anis B.', rating: 4, date: '2026-06-22', comment: 'Very comfortable fabric. Great value for the quality.' },
    ],
  },
  {
    id: 'ms-08',
    slug: 'grey-sweatpants',
    name: 'Grey Sweatpants',
    arabicName: 'بنطال رياضي — رمادي',
    brand: 'Master Store',
    price: 4300,
    category: 'pants',
    description:
      'Comfort elevated to an art form. These grey sweatpants are brushed on the inside for a cloud-soft feel, with a tapered leg, ribbed cuffs and an adjustable drawstring waist. Premium fleece that keeps its shape from sofa to street.',
    arabicLine: 'بنطال قطن مريح',
    fabric: '80% Cotton 20% Polyester Brushed Fleece — 320 GSM',
    image: '/images/grey-sweatpants.jpg',
    gallery: ['/images/grey-sweatpants.jpg', '/images/grey-sweatpants-detail-1.jpg', '/images/grey-sweatpants-detail-2.jpg'],
    sizes: SIZES,
    colors: [{ name: 'Grey', hex: '#b9b9b9' }],
    rating: 4.1,
    reviewCount: 126,
    stock: 19,
    isBestSeller: true,
    reviews: [
      { id: 'r1', author: 'Oussama D.', rating: 4, date: '2026-07-01', comment: 'Very comfortable and warm. The taper at the ankle is exactly right.' },
      { id: 'r2', author: 'Tarek M.', rating: 4, date: '2026-06-14', comment: 'Good thick fleece. True to size and fast shipping.' },
    ],
  },
  {
    id: 'ms-09',
    slug: 'essential-joggers',
    name: 'Essential Joggers — Black & Ivory',
    arabicName: 'بنطال رياضي — أسود وأبيض',
    brand: 'Master Store',
    price: 4900,
    category: 'pants',
    description:
      'Two icons of ease. The Essential Joggers arrive in deep black and soft ivory, cut from dense brushed fleece with a modern tapered fit, elastic cuffs and a drawstring waist. Minimal, refined, made to move.',
    arabicLine: 'بنطال فاخر باللونين الأسود والأبيض',
    fabric: '80% Cotton 20% Polyester Brushed Fleece — 320 GSM',
    image: '/images/essential-joggers.jpg',
    gallery: ['/images/essential-joggers.jpg', '/images/essential-joggers-detail-1.jpg', '/images/essential-joggers-detail-2.jpg'],
    sizes: SIZES,
    colors: [
      { name: 'Black', hex: '#161616' },
      { name: 'Ivory', hex: '#f2efe6' },
    ],
    rating: 4.6,
    reviewCount: 94,
    stock: 26,
    isNew: true,
    reviews: [
      { id: 'r1', author: 'Slimane K.', rating: 5, date: '2026-07-11', comment: 'Both colors look premium. The fleece is thick and the fit is modern.' },
      { id: 'r2', author: 'Djamel H.', rating: 4, date: '2026-06-29', comment: 'Excellent joggers for the price. Comfortable waistband and clean cuffs.' },
    ],
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const relatedProducts = (product: Product, count = 4) => {
  const sameCat = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id);
  const others = PRODUCTS.filter((p) => p.category !== product.category);
  return [...sameCat, ...others].slice(0, count);
};

export const WILAYAS = [
  'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar',
  'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger',
  'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma',
  'Constantine', 'Médéa', 'Mostaganem', "M'Sila", 'Mascara', 'Ouargla', 'Oran', 'El Bayadh',
  'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued',
  'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent',
  'Ghardaïa', 'Relizane', 'Timimoun', 'Bordj Badji Mokhtar', 'Ouled Djellal', 'Béni Abbès',
  'In Salah', 'In Guezzam', 'Touggourt', 'Djanet', "El M'Ghair", 'El Meniaa',
];

export const fmt = (n: number) => '$' + n.toLocaleString('en-US');
