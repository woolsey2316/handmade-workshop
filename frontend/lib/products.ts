export type Product = {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  priceMax?: number;
  image: string;
  rating?: number;
  badge?: "New" | "Hot" | "Sold";
  category:
    | "Birthday Gifts"
    | "Every Day"
    | "Greeting Cards"
    | "Illumination"
    | "Jewelry"
    | "Love"
    | "Personal"
    | "Romantic"
    | "Special Goods"
    | "Uncategorized";
};

export const categories = [
  { name: "Birthday Gifts", count: 15 },
  { name: "Every Day", count: 7 },
  { name: "Greeting Cards", count: 3 },
  { name: "Illumination", count: 11 },
  { name: "Jewelry", count: 7 },
  { name: "Love", count: 2 },
  { name: "Personal", count: 11 },
  { name: "Romantic", count: 5 },
  { name: "Special Goods", count: 13 },
  { name: "Uncategorized", count: 2 },
] as const;

export const colorFilters = [
  { name: "Blue", count: 6, hex: "#4a7fb5" },
  { name: "Green", count: 6, hex: "#6a9a6a" },
  { name: "Red", count: 1, hex: "#c45c5c" },
  { name: "White", count: 7, hex: "#f5f5f5" },
] as const;

export const productTags = [
  "Birthday",
  "Every Day",
  "Greeting Cards",
  "Illumination",
  "Jewelry",
  "Love",
  "Person",
  "Romantic",
  "Special Goods",
  "Women",
] as const;

export const sortOptions = [
  { value: "default", label: "Default sorting" },
  { value: "popularity", label: "Sort by popularity" },
  { value: "rating", label: "Sort by average rating" },
  { value: "latest", label: "Sort by latest" },
  { value: "price-asc", label: "Sort by price: low to high" },
  { value: "price-desc", label: "Sort by price: high to low" },
] as const;

export const products: Product[] = [
  {
    id: "1",
    name: "Birthday Gifts Grouped",
    price: 35,
    image: "/product-01-570x570.jpg",
    rating: 5,
    badge: "New",
    category: "Birthday Gifts",
  },
  {
    id: "2",
    name: "Yellow Pillow",
    price: 40,
    image: "/product-03-570x570.jpg",
    rating: 5,
    badge: "New",
    category: "Personal",
  },
  {
    id: "3",
    name: "Bracelets With Names",
    price: 40,
    salePrice: 35,
    image: "/product-05-570x570.jpg",
    rating: 3.5,
    category: "Special Goods",
  },
  {
    id: "4",
    name: "Knit Handmade Bracelets",
    price: 40,
    image: "/product-08-570x570.jpg",
    rating: 4,
    category: "Birthday Gifts",
  },
  {
    id: "5",
    name: "Colorful Bracelet",
    price: 40,
    image: "/product-12-570x570.jpg",
    category: "Personal",
  },
  {
    id: "6",
    name: "Knit From Wool Bracelets",
    price: 40,
    salePrice: 30,
    image: "/product-13-570x570.jpg",
    rating: 4,
    category: "Special Goods",
  },
  {
    id: "7",
    name: "Friendship Bracelets",
    price: 40,
    priceMax: 45,
    image: "/product-14-570x570.jpg",
    rating: 2.5,
    badge: "Hot",
    category: "Birthday Gifts",
  },
  {
    id: "8",
    name: "Flower Bending",
    price: 35,
    image: "/product-15-570x570.jpg",
    rating: 4,
    badge: "New",
    category: "Special Goods",
  },
  {
    id: "9",
    name: "Wool Knit Scarf-Coat",
    price: 45,
    salePrice: 40,
    image: "/product-17-570x570.jpg",
    rating: 4,
    badge: "New",
    category: "Personal",
  },
  {
    id: "10",
    name: "Funny Wool Basket",
    price: 40,
    salePrice: 30,
    image: "/product-18-570x570.jpg",
    rating: 3.5,
    category: "Personal",
  },
  {
    id: "11",
    name: "Greeting Cards",
    price: 14,
    priceMax: 15,
    image: "/product-11-570x570.jpg",
    badge: "Sold",
    category: "Special Goods",
  },
  {
    id: "12",
    name: "Handmade Paper Stars",
    price: 45,
    image: "/product-21-570x570.jpg",
    rating: 4,
    badge: "Hot",
    category: "Special Goods",
  },
  {
    id: "13",
    name: "Shaking Wrist",
    price: 40,
    image: "/product-09-300x300.jpg",
    rating: 4.67,
    category: "Special Goods",
  },
  {
    id: "14",
    name: "Yellow Pillow",
    price: 40,
    image: "/product-03-570x570.jpg",
    rating: 5,
    badge: "New",
    category: "Birthday Gifts",
  },
  {
    id: "15",
    name: "Bracelets With Names",
    price: 40,
    salePrice: 35,
    image: "/product-05-570x570.jpg",
    rating: 3.5,
    category: "Birthday Gifts",
  },
  {
    id: "16",
    name: "Knit From Wool Bracelets",
    price: 40,
    salePrice: 30,
    image: "/product-13-570x570.jpg",
    rating: 4,
    category: "Birthday Gifts",
  },
  {
    id: "17",
    name: "Colorful Bracelet",
    price: 40,
    image: "/product-12-570x570.jpg",
    category: "Birthday Gifts",
  },
  {
    id: "18",
    name: "Friendship Bracelets",
    price: 40,
    priceMax: 45,
    image: "/product-14-570x570.jpg",
    rating: 2.5,
    badge: "Hot",
    category: "Personal",
  },
  {
    id: "19",
    name: "Knit Handmade Bracelets",
    price: 40,
    image: "/product-08-570x570.jpg",
    rating: 4.5,
    category: "Personal",
  },
  {
    id: "20",
    name: "Flower Bending",
    price: 35,
    image: "/product-15-570x570.jpg",
    rating: 4,
    badge: "New",
    category: "Birthday Gifts",
  },
  {
    id: "21",
    name: "Basket Of Wool",
    price: 40,
    image: "/product-01-570x570.jpg",
    rating: 5,
    category: "Personal",
  },
  {
    id: "22",
    name: "Birthday Greeting Cards",
    price: 40,
    salePrice: 35,
    image: "/product-11-570x570.jpg",
    rating: 4.33,
    category: "Birthday Gifts",
  },
  {
    id: "23",
    name: "Earrings",
    price: 40,
    image: "/product-05-570x570.jpg",
    rating: 4.5,
    badge: "New",
    category: "Jewelry",
  },
  {
    id: "24",
    name: "Gift Box Logo",
    price: 40,
    image: "/product-21-570x570.jpg",
    rating: 4,
    badge: "New",
    category: "Birthday Gifts",
  },
  {
    id: "25",
    name: "Gift Boxes",
    price: 40,
    image: "/banner-11.jpg",
    rating: 4,
    badge: "Hot",
    category: "Birthday Gifts",
  },
  {
    id: "26",
    name: "Glowing Greeting Card",
    price: 35,
    image: "/product-11-300x300.jpg",
    rating: 4.5,
    category: "Special Goods",
  },
  {
    id: "27",
    name: "Hearts Made Of Cotton",
    price: 40,
    image: "/banner-11.jpg",
    rating: 5,
    category: "Personal",
  },
];

/** Unique catalog products for the shop grid (first occurrence of each name). */
export const shopProducts: Product[] = (() => {
  const seen = new Set<string>();
  return products.filter((product) => {
    if (seen.has(product.name)) return false;
    seen.add(product.name);
    return true;
  });
})();

export const topRatedProducts = shopProducts
  .filter((p) => (p.rating ?? 0) >= 5)
  .slice(0, 3);

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "contact" },
  { label: "Blog", href: "blog" },
  { label: "Shop", href: "shop" },
  { label: "Cart", href: "cart" },
  { label: "Checkout", href: "checkout" }
];
