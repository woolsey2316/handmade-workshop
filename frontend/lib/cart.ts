import { shopProducts, type Product } from "@/lib/products";

export type CartItem = {
  product: Product;
  quantity: number;
};

export function unitPrice(product: Product) {
  if (product.salePrice && product.salePrice < product.price) {
    return product.salePrice;
  }
  return product.price;
}

export function lineTotal(item: CartItem) {
  return unitPrice(item.product) * item.quantity;
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + lineTotal(item), 0);
}

/** Demo cart so the filled layout matches the theme (empty cart is still available once cleared). */
export function getDemoCartItems(): CartItem[] {
  const picks = ["Yellow Pillow", "Bracelets With Names", "Flower Bending"]
    .map((name) => shopProducts.find((p) => p.name === name))
    .filter((p): p is Product => Boolean(p));

  return picks.map((product, index) => ({
    product,
    quantity: index === 1 ? 2 : 1,
  }));
}
