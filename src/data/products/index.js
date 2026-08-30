// Central product aggregator.
// Every product folder exports one product object from its product.js file.
// Import each one here and add it to the `products` array below -
// this is the single source of truth the whole app maps over and filters on.
//
// Order here is the display order across the whole site (Home, Shop, ...) -
// products are sorted to flow smoothly through the color palette, starting
// with black, then grey, then out through the rest of the spectrum. See
// COLOR_ORDER in the generation script if this needs regenerating.

import backpack_black from "./backpack_black/product.js";
import beanbag_yankees from "./beanbag_yankees/product.js";
import black_tee from "./black_tee/product.js";
import black_waterprof_pants from "./black_waterprof_pants/product.js";
import crease_jacket from "./crease_jacket/product.js";
import crease_jacket_v2 from "./crease_jacket_v2/product.js";
import crease_pants from "./crease_pants/product.js";
import crease_puffer from "./crease_puffer/product.js";
import crease_vest from "./crease_vest/product.js";
import crease_zip_jacket_v1 from "./crease_zip_jacket_v1/product.js";
import double_waist_sweatpants from "./double_waist_sweatpants/product.js";
import flared_zip from "./flared_zip/product.js";
import grass_bag from "./grass_bag/product.js";
import hoodie_black_sprayed from "./hoodie_black_sprayed/product.js";
import hoodie_double_hood from "./hoodie_double_hood/product.js";
import mozaik_bag from "./mozaik_bag/product.js";
import multi_cargo_pants from "./multi_cargo_pants/product.js";
import pants_holes from "./pants_holes/product.js";
import pocket_pants from "./pocket_pants/product.js";
import sweatpants_black_sprayed from "./sweatpants_black_sprayed/product.js";
import zip_hoodie from "./zip_hoodie/product.js";
import zip_sweatpants from "./zip_sweatpants/product.js";
import backpack_grey from "./backpack_grey/product.js";
import grey_hoodie from "./grey_hoodie/product.js";
import grey_sweatpants from "./grey_sweatpants/product.js";
import grey_waterprof_pants from "./grey_waterprof_pants/product.js";
import hoodie_grey_sprayed from "./hoodie_grey_sprayed/product.js";
import sweatpants_grey_sprayed from "./sweatpants_grey_sprayed/product.js";
import beige_tee from "./beige_tee/product.js";
import brown_hoodie from "./brown_hoodie/product.js";
import brown_sweatpants from "./brown_sweatpants/product.js";
import camo_distressed_shorts from "./camo_distressed_shorts/product.js";
import camo_hoodie from "./camo_hoodie/product.js";
import camo_pants from "./camo_pants/product.js";
import camo_pink_patent_hoodie from "./camo_pink_patent_hoodie/product.js";
import camo_pink_patent_sweatpants from "./camo_pink_patent_sweatpants/product.js";
import camo_sweatpants from "./camo_sweatpants/product.js";
import split_camo_pants_grey from "./split_camo_pants_grey/product.js";
import split_camo_pants_light from "./split_camo_pants_light/product.js";
import green_hoodie from "./green_hoodie/product.js";
import green_sweatpants from "./green_sweatpants/product.js";
import lightgreen_hoodie from "./lightgreen_hoodie/product.js";
import lightgreen_sweatpants from "./lightgreen_sweatpants/product.js";
import beanbag_athletics from "./beanbag_athletics/product.js";
import blue_hoodie from "./blue_hoodie/product.js";
import blue_sweatpants from "./blue_sweatpants/product.js";
import beanbag_braves from "./beanbag_braves/product.js";
import baby_sweatpants from "./baby_sweatpants/product.js";
import babyblue_hoodie from "./babyblue_hoodie/product.js";
import purple_hoodie from "./purple_hoodie/product.js";
import purple_sweatpants from "./purple_sweatpants/product.js";
import pink_hoodie from "./pink_hoodie/product.js";
import pink_sweatpants from "./pink_sweatpants/product.js";
import red_hoodie from "./red_hoodie/product.js";
import red_sweatpants from "./red_sweatpants/product.js";
import orange_hoodie from "./orange_hoodie/product.js";
import orange_sweatpants from "./orange_sweatpants/product.js";
import yellow_hoodie from "./yellow_hoodie/product.js";
import yellow_sweatpants from "./yellow_sweatpants/product.js";

export const products = [
  backpack_black,
  beanbag_yankees,
  black_tee,
  black_waterprof_pants,
  crease_jacket,
  crease_jacket_v2,
  crease_pants,
  crease_puffer,
  crease_vest,
  crease_zip_jacket_v1,
  double_waist_sweatpants,
  flared_zip,
  grass_bag,
  hoodie_black_sprayed,
  hoodie_double_hood,
  mozaik_bag,
  multi_cargo_pants,
  pants_holes,
  pocket_pants,
  sweatpants_black_sprayed,
  zip_hoodie,
  zip_sweatpants,
  backpack_grey,
  grey_hoodie,
  grey_sweatpants,
  grey_waterprof_pants,
  hoodie_grey_sprayed,
  sweatpants_grey_sprayed,
  beige_tee,
  brown_hoodie,
  brown_sweatpants,
  camo_distressed_shorts,
  camo_hoodie,
  camo_pants,
  camo_pink_patent_hoodie,
  camo_pink_patent_sweatpants,
  camo_sweatpants,
  split_camo_pants_grey,
  split_camo_pants_light,
  green_hoodie,
  green_sweatpants,
  lightgreen_hoodie,
  lightgreen_sweatpants,
  beanbag_athletics,
  blue_hoodie,
  blue_sweatpants,
  beanbag_braves,
  baby_sweatpants,
  babyblue_hoodie,
  purple_hoodie,
  purple_sweatpants,
  pink_hoodie,
  pink_sweatpants,
  red_hoodie,
  red_sweatpants,
  orange_hoodie,
  orange_sweatpants,
  yellow_hoodie,
  yellow_sweatpants,
];

export const getProductById = (id) => products.find((p) => p.id === id);

export const getProductsByCategory = (category) =>
  products.filter((p) => p.category === category);

// Pass a pre-filtered list (e.g. one category's products) to scope the
// color options to what's actually available there. Defaults to every
// product for the global filter.
export const getAllColors = (productList = products) => [
  ...new Set(productList.flatMap((p) => p.colors)),
];
