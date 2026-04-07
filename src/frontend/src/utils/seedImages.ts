// Seed product images — referenced here so the build pipeline retains them.
// These images are served as imageUrl values from the backend for seeded products.
export const SEED_PRODUCT_IMAGES = [
  "/assets/generated/banana-split.dim_400x400.jpg",
  "/assets/generated/cola-float.dim_400x400.jpg",
  "/assets/generated/cold-coffee-icecream.dim_400x400.jpg",
  "/assets/generated/chocolate-icecream.dim_400x400.jpg",
  "/assets/generated/fresh-lime-soda.dim_400x400.jpg",
  "/assets/generated/fruit-salad-icecream.dim_400x400.jpg",
  "/assets/generated/hot-chocolate-fudge.dim_400x400.jpg",
  "/assets/generated/orange-blossom-mocktail.dim_400x400.jpg",
  "/assets/generated/pineapple-blossom-mocktail.dim_400x400.jpg",
  "/assets/generated/special-of-the-day.dim_400x400.jpg",
  "/assets/generated/tutti-frutti.dim_400x400.jpg",
  "/assets/generated/vanilla-hot-chocolate-sauce.dim_400x400.jpg",
  "/assets/generated/vanilla-classic.dim_400x400.jpg",
  "/assets/generated/mother-of-icecream-shop.dim_800x500.jpg",
] as const;

export type SeedImagePath = (typeof SEED_PRODUCT_IMAGES)[number];

// Map of product name (lowercase, trimmed) → seed image path for easy lookup
// Includes all known name variants from the backend seed data
export const SEED_IMAGE_MAP: Record<string, string> = {
  // Banana Split — various casing/spacing
  "banana split": "/assets/generated/banana-split.dim_400x400.jpg",
  "banana split vanilla,chocolate,strawberry":
    "/assets/generated/banana-split.dim_400x400.jpg",

  // Cola Float
  "cola float with ice-cream": "/assets/generated/cola-float.dim_400x400.jpg",
  "cola float with ice cream": "/assets/generated/cola-float.dim_400x400.jpg",
  "cola float": "/assets/generated/cola-float.dim_400x400.jpg",

  // Cold Coffee
  "cold coffee with ice-cream":
    "/assets/generated/cold-coffee-icecream.dim_400x400.jpg",
  "cold coffee with ice cream":
    "/assets/generated/cold-coffee-icecream.dim_400x400.jpg",
  "cold coffee": "/assets/generated/cold-coffee-icecream.dim_400x400.jpg",

  // Chocolate
  chocolate: "/assets/generated/chocolate-icecream.dim_400x400.jpg",

  // Fresh Lime Soda
  "fresh lime soda with mint":
    "/assets/generated/fresh-lime-soda.dim_400x400.jpg",
  "fresh lime soda": "/assets/generated/fresh-lime-soda.dim_400x400.jpg",
  "fresh lime": "/assets/generated/fresh-lime-soda.dim_400x400.jpg",

  // Fruit Salad
  "fruit salad with ice cream":
    "/assets/generated/fruit-salad-icecream.dim_400x400.jpg",
  "fruit salad with ice-cream":
    "/assets/generated/fruit-salad-icecream.dim_400x400.jpg",
  "fruit salad": "/assets/generated/fruit-salad-icecream.dim_400x400.jpg",

  // Hot Chocolate Fudge
  "hot chocolate fudge":
    "/assets/generated/hot-chocolate-fudge.dim_400x400.jpg",
  "hot chocolate": "/assets/generated/hot-chocolate-fudge.dim_400x400.jpg",

  // Orange Blossom Mocktail
  "orange blossom mocktail":
    "/assets/generated/orange-blossom-mocktail.dim_400x400.jpg",
  "orange blossom": "/assets/generated/orange-blossom-mocktail.dim_400x400.jpg",

  // Pineapple Blossom Mocktail
  "pineapple blossom mocktail":
    "/assets/generated/pineapple-blossom-mocktail.dim_400x400.jpg",
  "pineapple blossom":
    "/assets/generated/pineapple-blossom-mocktail.dim_400x400.jpg",
  "pineappple blossom mocktail":
    "/assets/generated/pineapple-blossom-mocktail.dim_400x400.jpg",
  "pineappple blossom":
    "/assets/generated/pineapple-blossom-mocktail.dim_400x400.jpg",

  // Special of the Day
  "special of the day": "/assets/generated/special-of-the-day.dim_400x400.jpg",

  // Tutti Frutti
  "tutti frutti": "/assets/generated/tutti-frutti.dim_400x400.jpg",
  "tutti frutti vanilla,strawberry & fresh fruits":
    "/assets/generated/tutti-frutti.dim_400x400.jpg",

  // Vanilla with Hot Chocolate Sauce
  "vanilla with hot chocolate sauce":
    "/assets/generated/vanilla-hot-chocolate-sauce.dim_400x400.jpg",
  "vanilla with hot chocolate":
    "/assets/generated/vanilla-hot-chocolate-sauce.dim_400x400.jpg",

  // Vanilla (must be last — most generic)
  vanilla: "/assets/generated/vanilla-classic.dim_400x400.jpg",
};
