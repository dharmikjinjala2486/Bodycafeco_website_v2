// Central product image map — keyed by product ID
// Magnesium Bisglycinate has no dedicated image; falls back to a placeholder style via CSS.

import imgBeetroot         from './Product_image/Beetroot.png';
import imgAffronSaffron    from './Product_image/Affron Saffron.png';
import imgBerberine        from './Product_image/Berberine + Cinnamon.png';
import imgCreatine         from './Product_image/Creatine Monohydrate.png';
import imgIron             from './Product_image/Iron Bisglycinate.png';
import imgTheanine         from './Product_image/L-Theanine.png';
import imgMyoInositol      from './Product_image/Myo-Inositol & D Chiro.png';
import imgOmega3           from './Product_image/Omega 3 Fish Oil.png';
import imgPsyllium         from './Product_image/Psyllium Husk.png';
import imgVitaminD3K2      from './Product_image/Vitamin D3 + K2.png';
import imgMagnesium        from './Product_image/MAGNESIUM BISGLYCINATE CHELATE.png';

export const productImages: Record<string, string> = {
  'beetroot':              imgBeetroot,
  'affron-saffron':        imgAffronSaffron,
  'berberine-cinnamon':    imgBerberine,
  'creatine-monohydrate':  imgCreatine,
  'iron-bisglycinate':     imgIron,
  'l-theanine':            imgTheanine,
  'myo-inositol-d-chiro':  imgMyoInositol,
  'omega-3-fish-oil':      imgOmega3,
  'psyllium-husk':         imgPsyllium,
  'vitamin-d3-k2':         imgVitaminD3K2,
  'magnesium-bisglycinate': imgMagnesium,
};

/** Returns the real product photo URL, or undefined for products without one (e.g. Magnesium). */
export const getProductImage = (productId: string): string | undefined =>
  productImages[productId];
