import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 'creatine-monohydrate',
    name: 'Creatine Monohydrate',
    slug: 'creatine-monohydrate',
    tagline: 'Cognitive output & cellular energy catalyst.',
    subtitle: '100% Creapure® micro-crystallized creatine monohydrate for physical output and cognitive resilience.',
    price: 45,
    subscriptionPrice: 38.25,
    accentColor: 'creatine',
    accentHex: '#005F73',
    pantone: 'Pantone 7708C',
    description: 'A daily ritual for cognitive clarity and cellular energy. Creapure® is recognized as the global gold standard for creatine purity. Sourced from Germany, our creatine undergoes rigorous testing to ensure it is 100% free of impurities, byproducts, or synthetic fillers. Designed to dissolve instantly in water, it supports ATP synthesis, muscle hydration, and neuron energy demand.',
    benefits: [
      'Enhances cellular ATP regeneration for high-intensity physical output.',
      'Supports cognitive resilience under fatigue and sleep deprivation.',
      'Promotes cellular hydration and muscle volume.',
      'Neutral taste for seamless daily integrations.'
    ],
    ingredients: [
      {
        name: 'Creapure® Creatine Monohydrate',
        amount: '5000 mg',
        dailyValue: '100%',
        purpose: 'Cellular Hydration & ATP Synthesis',
        description: 'Micro-crystallized pharmaceutical-grade creatine synthesized through a clean chemical pathway to ensure absolute purity.'
      }
    ],
    sourcingStory: 'Synthesized in a state-of-the-art facility in AlzChem, Germany. We source exclusively from Creapure® to ensure a completely vegan, kosher, and halal certified formulation that is free from contaminants like DHT and DCD commonly found in cheaper imports.',
    rating: 4.9,
    reviewsCount: 142,
    usageInstructions: 'Mix 1 scoop (5g) with 8-12 oz of water or your favorite ritual beverage daily. Consistency is key: consume at the same time each day to maintain cellular saturation.',
    category: 'daily',
    categoryLabel: 'Daily Rituals',
    variants: [
      { id: 'creatine-100g', name: '100g', price: 25, subscriptionPrice: 21.25 },
      { id: 'creatine-250g', name: '250g', price: 45, subscriptionPrice: 38.25, isDefault: true },
      { id: 'creatine-500g', name: '500g', price: 75, subscriptionPrice: 63.75 }
    ],
    images: ['/products/creatine.png'],
    highlights: [
      { label: 'Origin', value: 'AlzChem, Germany' },
      { label: 'Purity', value: '99.99% Creapure®' },
      { label: 'Formulation', value: '100% Single Ingredient' }
    ]
  },
  {
    id: 'vitamin-d3-k2',
    name: 'Vitamin D3 + K2',
    slug: 'vitamin-d3-k2',
    tagline: 'Synergistic calcium mapping & immune defense.',
    subtitle: 'Plant-derived D3 and micro-encapsulated K2 (MK-7) in organic cold-pressed olive oil carrier.',
    price: 38,
    subscriptionPrice: 32.30,
    accentColor: 'vitamind3',
    accentHex: '#1A365D',
    pantone: 'Pantone 2372C',
    description: 'An essential daily lipid-based formulation that bridges the gap in modern indoor lifestyles. Vitamin D3 requires Vitamin K2 to ensure calcium is correctly mapped into bone tissue rather than depositing in arterial walls. Formulated with organic cold-pressed extra virgin olive oil for maximum lipid solubility and absorption.',
    benefits: [
      'Promotes bone mineralization by assisting calcium absorption.',
      'Supports cardiovascular elasticity and arterial health via MK-7.',
      'Modulates over 2,000 genes associated with immune response.',
      'Optimizes natural hormone production and neurological vitality.'
    ],
    ingredients: [
      {
        name: 'Vitamin D3 (Cholecalciferol from Lichen)',
        amount: '5000 IU',
        dailyValue: '625%',
        purpose: 'Immune & Mineral Absorption',
        description: 'Plant-sourced vegan Vitamin D3 derived from wild harvested lichens, avoiding animal-derived lanolin.'
      },
      {
        name: 'Vitamin K2 (as MK-7)',
        amount: '100 mcg',
        dailyValue: '83%',
        purpose: 'Calcium Mapping & Cardiovascular Support',
        description: 'Micro-encapsulated Menaquinone-7 derived from natural fermentation of natto, offering superior half-life and stability.'
      }
    ],
    sourcingStory: 'Our D3 is derived from wild lichen sustainably harvested in northern Canada. Our K2 MK-7 is naturally fermented in Norway, utilizing clean supercritical CO2 extraction without chemical solvents.',
    rating: 4.8,
    reviewsCount: 98,
    usageInstructions: 'Take 1 liquid softgel daily with a meal containing fats to optimize absorption. Best integrated into your morning ritual.',
    category: 'essential',
    categoryLabel: 'Core Essentials',
    variants: [
      { id: 'd3k2-60', name: '60 Softgels', price: 38, subscriptionPrice: 32.30, isDefault: true },
      { id: 'd3k2-120', name: '120 Softgels', price: 68, subscriptionPrice: 57.80 }
    ],
    images: ['/products/d3k2.png'],
    highlights: [
      { label: 'Carrier', value: 'Organic EVOO' },
      { label: 'Vegan', value: '100% Plant-Sourced' },
      { label: 'Bioavailability', value: 'MK-7 Active Form' }
    ]
  },
  {
    id: 'omega-3-fish-oil',
    name: 'Omega-3 Fish Oil',
    slug: 'omega-3-fish-oil',
    tagline: 'High-potency triglyceride cardiovascular & brain baseline.',
    subtitle: 'Wild-caught, molecularly distilled cold-water fish oil with elevated EPA and DHA concentration.',
    price: 48,
    subscriptionPrice: 40.80,
    accentColor: 'omega3',
    accentHex: '#8D99AE',
    pantone: 'Pantone 7543C',
    description: 'Premium lipid support in its native triglyceride form for up to 70% higher absorption than synthetic ethyl esters. Sourced from wild-caught, sustainably managed anchovies, our oil undergoes advanced molecular distillation to remove all heavy metals, PCBs, and oxidation products, resulting in a clean profile with zero fishy aftertaste.',
    benefits: [
      'Supports brain structure and cognitive performance (DHA).',
      'Modulates inflammatory pathways and supports joint mobility (EPA).',
      'Maintains healthy lipid panels and blood pressure levels.',
      'Supports ocular cell membrane structural integrity.'
    ],
    ingredients: [
      {
        name: 'Total Omega-3 Fatty Acids',
        amount: '1200 mg',
        dailyValue: 'N/A',
        purpose: 'Cellular Membrane Integrity',
        description: 'Triglyceride-form marine lipids providing high bio-efficacy.'
      },
      {
        name: 'EPA (Eicosapentaenoic Acid)',
        amount: '680 mg',
        dailyValue: 'N/A',
        purpose: 'Cardiovascular & Joint Modulator',
        description: 'Primary pathway modulator for systemic inflammatory responses.'
      },
      {
        name: 'DHA (Docosahexaenoic Acid)',
        amount: '480 mg',
        dailyValue: 'N/A',
        purpose: 'Cognitive & Neural Baseline',
        description: 'Core structural component of cerebral cortex and retina membranes.'
      }
    ],
    sourcingStory: 'Sourced from MSC-certified wild anchovies harvested in the cold waters of the Humboldt Current off Peru. Distilled and refined in Norway under strict GMP standards to achieve ultra-low oxidation (Totox) scores.',
    rating: 4.7,
    reviewsCount: 112,
    usageInstructions: 'Take 2 softgels daily with your evening meal. Store in a cool, dry place away from direct sunlight.',
    category: 'essential',
    categoryLabel: 'Core Essentials',
    variants: [
      { id: 'omega3-60', name: '60 Softgels', price: 48, subscriptionPrice: 40.80, isDefault: true },
      { id: 'omega3-120', name: '120 Softgels', price: 82, subscriptionPrice: 69.70 }
    ],
    images: ['/products/omega3.png'],
    highlights: [
      { label: 'Purity', value: 'Totox Score < 5' },
      { label: 'Sourcing', value: 'MSC Wild Anchovy' },
      { label: 'Form', value: 'Native Triglyceride' }
    ]
  },
  {
    id: 'magnesium-bisglycinate',
    name: 'Magnesium Bisglycinate',
    slug: 'magnesium-bisglycinate',
    tagline: 'Bioavailable neurological calm & recovery catalyst.',
    subtitle: '100% chelated magnesium bisglycinate for maximum muscle relaxation and sleep cycles.',
    price: 36,
    subscriptionPrice: 30.60,
    accentColor: 'magnesium',
    accentHex: '#959595',
    pantone: 'Pantone Cool Gray 6C',
    description: 'A calming mineral ritual to close the day. Unlike other forms of magnesium, magnesium bisglycinate is bound to the amino acid glycine, which acts as an inhibitory neurotransmitter in the brain. This chelated form bypasses standard mineral channels in the gut, ensuring rapid absorption without digestive distress or laxative effects.',
    benefits: [
      'Supports nervous system calming and stress modulation.',
      'Promotes muscle fiber relaxation and decreases nocturnal cramping.',
      'Improves sleep efficiency, deep sleep duration, and morning alertness.',
      'Saturates cellular magnesium levels for 300+ enzymatic reactions.'
    ],
    ingredients: [
      {
        name: 'Magnesium (as Magnesium Bisglycinate Chelate)',
        amount: '200 mg',
        dailyValue: '48%',
        purpose: 'Neurological Recovery & Relaxant',
        description: 'Fully chelated Albion™ mineral compound, bound to glycine for cellular assimilation.'
      }
    ],
    sourcingStory: 'Manufactured utilizing patented Albion™ Minerals technology in Utah, USA. We verify each batch through inductively coupled plasma mass spectrometry (ICP-MS) to guarantee zero unchelated magnesium oxide.',
    rating: 4.9,
    reviewsCount: 165,
    usageInstructions: 'Take 2 capsules or mix 1 scoop of our unflavored powder in warm water 30-60 minutes before sleep as a wind-down ritual.',
    category: 'daily',
    categoryLabel: 'Daily Rituals',
    variants: [
      { id: 'mag-120', name: '120 Capsules (60 Servings)', price: 36, subscriptionPrice: 30.60, isDefault: true },
      { id: 'mag-powder', name: '200g Pure Powder (40 Servings)', price: 34, subscriptionPrice: 28.90 }
    ],
    images: ['/products/magnesium.png'],
    highlights: [
      { label: 'Form', value: 'Fully Chelated Albion™' },
      { label: 'Gut', value: 'Zero Digestive Distress' },
      { label: 'Purity', value: 'ICP-MS Heavy Metal Tested' }
    ]
  },
  {
    id: 'psyllium-husk',
    name: 'Psyllium Husk',
    slug: 'psyllium-husk',
    tagline: 'Soluble fiber baseline & metabolic wellness.',
    subtitle: 'Organic, premium three-sifted blonde psyllium husk for digestive rhythm and heart health.',
    price: 32,
    subscriptionPrice: 27.20,
    accentColor: 'psyllium',
    accentHex: '#C2A690',
    pantone: 'Pantone 2325C',
    description: 'An editorial gut wellness ritual. Psyllium husk is a premium source of soluble fiber. When mixed with water, it forms a gel that sweeps the digestive tract, aiding natural elimination, supporting microbiome diversity, and binding to cholesterol in the digestive tract to support cardiovascular longevity. Three-sifted for an exceptionally smooth texture.',
    benefits: [
      'Promotes digestive regularity and structural bowel transit.',
      'Supports healthy blood glucose levels after meals.',
      'Maintains healthy lipid panels and cardiovascular parameters.',
      'Acts as a prebiotic to feed beneficial gut microflora.'
    ],
    ingredients: [
      {
        name: 'Organic Blonde Psyllium Husk (Plantago ovata)',
        amount: '5000 mg',
        dailyValue: '18% Fiber',
        purpose: 'Digestive Sweep & Soluble Gel Formation',
        description: 'Raw, triple-sifted organic seed husks containing high mucilage content.'
      }
    ],
    sourcingStory: 'Cultivated in the fertile, sun-drenched organic fields of Gujarat, India. Our partners use traditional, chemical-free processing methods and triple-sift the husks to remove all heavy outer hulls, leaving only pure, gel-forming soluble fiber.',
    rating: 4.8,
    reviewsCount: 84,
    usageInstructions: 'Vigorously mix 1 tablespoon (5g) in 10-12 oz of cold water. Drink immediately before it gels. Follow with an additional glass of water. Take once daily, ideally in the morning.',
    category: 'daily',
    categoryLabel: 'Daily Rituals',
    variants: [
      { id: 'psyllium-300g', name: '300g Organic Powder Jar', price: 32, subscriptionPrice: 27.20, isDefault: true },
      { id: 'psyllium-refill', name: '600g Eco-Refill Pouch', price: 54, subscriptionPrice: 45.90 }
    ],
    images: ['/products/psyllium.png'],
    highlights: [
      { label: 'Process', value: 'Triple-Sifted Blonde' },
      { label: 'Organic', value: 'USDA Certified Organic' },
      { label: 'Texture', value: 'Ultra-Fine, Clump-Free' }
    ]
  },
  {
    id: 'l-theanine',
    name: 'L-Theanine',
    slug: 'l-theanine',
    tagline: 'Cognitive balance, neural focus & stress modulator.',
    subtitle: 'Sunsheila™ pure L-Theanine derived from green tea leaves to modulate alpha wave neurological states.',
    price: 28,
    subscriptionPrice: 23.80,
    accentColor: 'ltheanine',
    accentHex: '#556B2F',
    pantone: 'Pantone 5763C',
    description: 'The ultimate tool for cognitive composure. L-Theanine is a unique amino acid that crosses the blood-brain barrier. It stimulates the production of alpha brain waves, creating a state of deep, alert relaxation similar to meditation. When paired with caffeine, it synergistically smooths the jitters, sharpening focus and extending attention spans.',
    benefits: [
      'Induces alpha brain wave activity for calm, focused attention.',
      'Soothes physiological responses to stress and elevated cortisol.',
      'Enhances sleep quality by calming hyper-active neural states.',
      'Mitigates the negative side effects (jitters/crashes) of caffeine.'
    ],
    ingredients: [
      {
        name: 'L-Theanine',
        amount: '200 mg',
        dailyValue: 'N/A',
        purpose: 'Alpha Brainwave Modulator',
        description: 'High-purity green-tea extraction structurally identical to the amino acids found in native Camellia sinensis.'
      }
    ],
    sourcingStory: 'Extracted from premium green tea leaves cultivated in Uji, Japan. Using a patented, water-based extraction process that eliminates chemical solvent residues, we isolate L-Theanine at a purity exceeding 99%.',
    rating: 4.8,
    reviewsCount: 76,
    usageInstructions: 'Take 1 capsule daily. For cognitive synergy, consume alongside morning espresso. For stress reduction, take in the afternoon or before bed.',
    category: 'cognitive',
    categoryLabel: 'Cognitive Health',
    variants: [
      { id: 'theanine-60', name: '60 Capsules (2 Months)', price: 28, subscriptionPrice: 23.80, isDefault: true }
    ],
    images: ['/products/theanine.png'],
    highlights: [
      { label: 'Source', value: 'Uji Green Tea Leaves' },
      { label: 'Synergy', value: 'Caffeine Smoothing' },
      { label: 'Purity', value: '99.8% Active Isomer' }
    ]
  },
  {
    id: 'iron-bisglycinate',
    name: 'Iron Bisglycinate',
    slug: 'iron-bisglycinate',
    tagline: 'High-absorption, non-constipating heme pathway baseline.',
    subtitle: 'Gentle, chelated iron bisglycinate paired with organic Acerola Cherry Vitamin C for enhanced uptake.',
    price: 34,
    subscriptionPrice: 28.90,
    accentColor: 'iron',
    accentHex: '#C05621',
    pantone: 'Pantone 7599C',
    description: 'A clean, gentle cellular oxygenator. Traditional iron salts like ferrous sulfate are poorly absorbed, causing oxidation and severe digestive discomfort. Our iron is fully chelated to glycine, forming a stable ring structure that passes through the stomach intact. Complemented with natural Vitamin C from organic acerola cherry to enhance cellular iron transport channels.',
    benefits: [
      'Supports healthy red blood cell production and hemoglobin levels.',
      'Promotes cellular energy metabolism and oxygen transport.',
      'Combats unexplained fatigue and cognitive fog.',
      'Gentle on the stomach with zero gastrointestinal irritation.'
    ],
    ingredients: [
      {
        name: 'Iron (as Ferrochel™ Iron Bisglycinate)',
        amount: '25 mg',
        dailyValue: '139%',
        purpose: 'Hemoglobin Support & Cellular Energy',
        description: 'Patented Ferrochel™ iron chelate, showing 2x-4x higher absorption than inorganic salts.'
      },
      {
        name: 'Vitamin C (from Organic Acerola Cherry)',
        amount: '40 mg',
        dailyValue: '44%',
        purpose: 'Uptake Enhancer',
        description: 'Natural food-form ascorbic acid containing bioflavonoids for optimal iron transport.'
      }
    ],
    sourcingStory: 'Utilizing Ferrochel™ chelate from Balchem, USA. Our organic Acerola is sourced from family farms in Brazil, harvested at peak green-ripeness to guarantee maximum natural Vitamin C content.',
    rating: 4.7,
    reviewsCount: 54,
    usageInstructions: 'Take 1 capsule daily, ideally on an empty stomach with water or juice. Do not take with calcium supplements or coffee, which can hinder absorption.',
    category: 'essential',
    categoryLabel: 'Core Essentials',
    variants: [
      { id: 'iron-60', name: '60 Capsules (60 Days)', price: 34, subscriptionPrice: 28.90, isDefault: true }
    ],
    images: ['/products/iron.png'],
    highlights: [
      { label: 'Form', value: 'Ferrochel™ Bisglycinate' },
      { label: 'Uptake', value: 'Acerola Vitamin C Co-factor' },
      { label: 'Digestion', value: 'Gastrointestinal Friendly' }
    ]
  },
  {
    id: 'affron-saffron',
    name: 'Affron® Saffron',
    slug: 'affron-saffron',
    tagline: 'Premium mood, stress and sleep cycle modulator.',
    subtitle: 'Clinically validated affron® Saffron extract, standardized to 3.5% Lepticrosalides®.',
    price: 44,
    subscriptionPrice: 37.40,
    accentColor: 'saffron',
    accentHex: '#FFAA00',
    pantone: 'Pantone 3514C',
    description: 'An ancient luxury backed by modern neurological science. Saffron is the world’s most expensive spice, celebrated for centuries. Our formulation utilizes affron®, a patented extract clinically proven in multiple peer-reviewed studies to support emotional equilibrium, calm temporary anxiety, and promote deep, restorative sleep. Standardized to active Lepticrosalides®.',
    benefits: [
      'Improves mood parameters and emotional wellness.',
      'Soothes daily stress, mental tension, and emotional fatigue.',
      'Improves sleep latency, sleep quality, and nightly melatonin curves.',
      'Supports neurotransmitter balance (Serotonin and Dopamine).'
    ],
    ingredients: [
      {
        name: 'affron® Saffron Extract (Crocus sativus L. stigmata)',
        amount: '28 mg',
        dailyValue: 'N/A',
        purpose: 'Neurotransmitter & Mood Modulator',
        description: 'Standardized Spanish saffron extract containing 3.5% Lepticrosalides® (crocin, safranal, picrocrocin).'
      }
    ],
    sourcingStory: 'Exclusively sourced from Spanish-cultivated Crocus sativus flowers. Harvested by hand at sunrise during the brief autumn bloom, our saffron is processed in Madrid under strict patented extraction technologies that preserve the delicate active compounds.',
    rating: 4.9,
    reviewsCount: 62,
    usageInstructions: 'Take 1 capsule daily. For mood and stress, consume in the morning. For sleep cycle support, take 1-2 hours before bed.',
    category: 'cognitive',
    categoryLabel: 'Cognitive Health',
    variants: [
      { id: 'saffron-60', name: '60 Capsules (2 Months)', price: 44, subscriptionPrice: 37.40, isDefault: true }
    ],
    images: ['/products/saffron.png'],
    highlights: [
      { label: 'Extract', value: 'Patented affron®' },
      { label: 'Standardization', value: '3.5% Lepticrosalides®' },
      { label: 'Harvesting', value: 'Handpicked in Spain' }
    ]
  },
  {
    id: 'berberine-cinnamon',
    name: 'Berberine + Cinnamon',
    slug: 'berberine-cinnamon',
    tagline: 'AMPK metabolic activator & cellular glucose modulator.',
    subtitle: '97% pure Berberine HCl paired with organic Ceylon Cinnamon to optimize glucose pathways.',
    price: 42,
    subscriptionPrice: 35.70,
    accentColor: 'berberine',
    accentHex: '#8C5333',
    pantone: 'Pantone 7586C',
    description: 'A modern formulation for metabolic health. Berberine is a powerful botanical alkaloid that acts as an AMPK (AMP-activated protein kinase) trigger—often called the metabolic master switch. Pairing high-purity Berberine with organic, true Ceylon Cinnamon creates a powerful synergistic pathway for glucose uptake, metabolic efficiency, and cellular longevity.',
    benefits: [
      'Triggers AMPK pathways, mimicking fasting-induced cellular states.',
      'Supports healthy blood glucose levels and insulin sensitivity.',
      'Promotes mitochondrial biogenesis and longevity pathways.',
      'Aids in lipid metabolism and cardiovascular profiles.'
    ],
    ingredients: [
      {
        name: 'Berberine HCl (from Berberis aristata)',
        amount: '500 mg',
        dailyValue: 'N/A',
        purpose: 'AMPK Pathway Activator',
        description: '97% pure botanical hydrochloride extract derived from Indian Barberry roots.'
      },
      {
        name: 'Organic Ceylon Cinnamon (Cinnamomum verum)',
        amount: '200 mg',
        dailyValue: 'N/A',
        purpose: 'Synergistic Insulin Pathway Support',
        description: 'True Ceylon cinnamon bark powder containing natural polyphenol compounds.'
      }
    ],
    sourcingStory: 'Our Berberine is sustainably extracted from wild-harvested barberry root in the Himalayan foothills of India. We pair it with organic Ceylon Cinnamon sourced from sustainable family estates in Sri Lanka, ensuring zero cassia-cinnamon toxic coumarin compounds.',
    rating: 4.8,
    reviewsCount: 89,
    usageInstructions: 'Take 1 capsule 15-30 minutes before your largest carbohydrate-rich meal, up to twice daily.',
    category: 'essential',
    categoryLabel: 'Core Essentials',
    variants: [
      { id: 'berb-60', name: '60 Capsules (1 Month)', price: 42, subscriptionPrice: 35.70, isDefault: true },
      { id: 'berb-120', name: '120 Capsules (2 Months)', price: 74, subscriptionPrice: 62.90 }
    ],
    images: ['/products/berberine.png'],
    highlights: [
      { label: 'Active purity', value: '97% Berberine HCl' },
      { label: 'Cinnamon Form', value: '100% Organic Ceylon' },
      { label: 'Pathway', value: 'AMPK Master Modulator' }
    ]
  },
  {
    id: 'beetroot',
    name: 'Beetroot Extract',
    slug: 'beetroot',
    tagline: 'Nitric oxide synthesis, circulation & cardiovascular baseline.',
    subtitle: 'Standardized beetroot extract (1.5% Nitrate) for cardiovascular efficiency and blood flow.',
    price: 35,
    subscriptionPrice: 29.75,
    accentColor: 'beetroot',
    accentHex: '#A61C3C',
    pantone: 'Pantone 207C',
    description: 'A visual red elixir for systemic circulation. Beetroot contains concentrated dietary nitrates, which convert into Nitric Oxide (NO) in the bloodstream. NO relaxes blood vessel walls, decreasing cardiovascular workload, supporting oxygen delivery to brain and muscle tissue, and promoting exceptional baseline energy and endurance.',
    benefits: [
      'Stimulates endogenous nitric oxide synthesis for arterial health.',
      'Enhances oxygen delivery and endurance capacities.',
      'Supports healthy, natural blood pressure maintenance.',
      'Rich in betalains and natural antioxidants.'
    ],
    ingredients: [
      {
        name: 'Beetroot Extract (Beta vulgaris)',
        amount: '1000 mg',
        dailyValue: 'N/A',
        purpose: 'Nitric Oxide Synthesis & Blood Flow',
        description: 'Standardized root extract providing guaranteed 1.5% bio-active nitrate content.'
      }
    ],
    sourcingStory: 'Cultivated in organic, nutrient-dense volcanic soil in the Loire Valley, France. Low-temperature vacuum drying processes are utilized to extract the juice, ensuring all active nitric oxide precursors and delicate betalain antioxidants are completely preserved.',
    rating: 4.6,
    reviewsCount: 42,
    usageInstructions: 'Take 2 capsules or mix 1 scoop of our extract powder into pre-workout or morning juice. Excellent as a clean energy booster without caffeine.',
    category: 'daily',
    categoryLabel: 'Daily Rituals',
    variants: [
      { id: 'beet-120', name: '120 Vegan Capsules', price: 35, subscriptionPrice: 29.75, isDefault: true }
    ],
    images: ['/products/beetroot.png'],
    highlights: [
      { label: 'Source', value: 'French Volcanic Soils' },
      { label: 'Bioactive', value: '1.5% Active Nitrates' },
      { label: 'Stimulant', value: '100% Caffeine-Free' }
    ]
  },
  {
    id: 'myo-inositol-d-chiro',
    name: 'Myo-Inositol + D-Chiro',
    slug: 'myo-inositol-d-chiro',
    tagline: 'Hormonal, endocrine & cellular insulin harmony.',
    subtitle: 'Myo-Inositol and D-Chiro-Inositol at the clinically validated 40:1 physiological ratio.',
    price: 40,
    subscriptionPrice: 34.00,
    accentColor: 'myoinositol',
    accentHex: '#B09FCA',
    pantone: 'Pantone 2572C',
    description: 'A daily ritual for metabolic and endocrine synchronization. Inositols function as secondary messengers in cellular signaling pathways, directly modulating insulin receptors and ovarian hormone messaging. Formulated at the exact 40:1 ratio found naturally in healthy follicular fluid to maximize hormonal balance and cellular sugar clearance.',
    benefits: [
      'Supports ovarian health, regular menstrual cycles, and egg quality.',
      'Improves cellular insulin sensitivity and glucose uptake.',
      'Soothes endocrine imbalances and associated stress levels.',
      'Supports skin clarity and healthy lipid profiles.'
    ],
    ingredients: [
      {
        name: 'Myo-Inositol',
        amount: '2000 mg',
        dailyValue: 'N/A',
        purpose: 'Secondary Cellular Messenger',
        description: 'High-purity form of inositol, crucial for hormone signal transduction.'
      },
      {
        name: 'D-Chiro-Inositol (Caronositol®)',
        amount: '50 mg',
        dailyValue: 'N/A',
        purpose: 'Synergistic Endocrine Harmony',
        description: 'Patented D-chiro-inositol naturally extracted from Carob pods.'
      }
    ],
    sourcingStory: 'Utilizing Caronositol® extracted from Mediterranean Carob trees in Spain. Our Myo-Inositol is derived from organic non-GMO corn via clean enzymatic conversion processes in northern Italy.',
    rating: 4.9,
    reviewsCount: 134,
    usageInstructions: 'Mix 1 scoop of our dissolvable powder into water or smoothie twice daily, once in the morning and once in the evening. Soluble and tasteless.',
    category: 'essential',
    categoryLabel: 'Core Essentials',
    variants: [
      { id: 'inositol-60s', name: '120g Powder (60 Servings)', price: 40, subscriptionPrice: 34.00, isDefault: true }
    ],
    images: ['/products/inositol.png'],
    highlights: [
      { label: 'Ratio', value: '40:1 Physiological Match' },
      { label: 'Form', value: 'Caronositol® Carob Extract' },
      { label: 'Solubility', value: 'Dissolves Instantly, Tasteless' }
    ]
  }
];

export const getProductBySlug = (slug: string) => {
  return products.find(p => p.slug === slug);
};

export const getProductsByCategory = (category: 'daily' | 'cognitive' | 'essential') => {
  return products.filter(p => p.category === category);
};
