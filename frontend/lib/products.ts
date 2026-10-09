export type Product = {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  priceMax?: number;
  image: string;
  rating?: number;
  badge?: "New" | "Hot" | "Sold";
  category: "Birthday Gifts" | "Personal" | "Special Goods";
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
    rating: 3,
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
    rating: 2,
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
    rating: 3,
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
    rating: 3,
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
    rating: 2,
    badge: "Hot",
    category: "Personal",
  },
  {
    id: "19",
    name: "Knit Handmade Bracelets",
    price: 40,
    image: "/product-08-570x570.jpg",
    rating: 4,
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
];

export const blogPosts = [
  {
    id: "1",
    title: "Video Post",
    date: "April 9, 2016",
    author: "g5plusacc",
    excerpt:
      "In a professional context it often happens that private or corporate clients order a publication to be made and presented with the actual …",
    image: "/banner-2.jpg",
  },
  {
    id: "2",
    title: "I Love My Life Very Much",
    date: "August 2, 2015",
    author: "g5plusacc",
    excerpt:
      "In a professional context it often happens that private or corporate clients order a publication to be made and presented with the actual …",
    image: "/banner-3.jpg",
  },
  {
    id: "3",
    title: "Here Are Many Variations Of Passages",
    date: "August 2, 2015",
    author: "g5plusacc",
    excerpt:
      "In a professional context it often happens that private or corporate clients order a publication to be made and presented with the actual …",
    image: "/banner-4.jpg",
  },
  {
    id: "4",
    title: "Inteligent Transitions In Ux Design",
    date: "August 2, 2015",
    author: "g5plusacc",
    excerpt:
      "In a professional context it often happens that private or corporate clients order a publication to be made and presented with the actual …",
    image: "/banner-11.jpg",
  },
  {
    id: "5",
    title: "Standard Post Example",
    date: "July 14, 2015",
    author: "g5plusacc",
    excerpt:
      "In a professional context it often happens that private or corporate clients order a publication to be made and presented with the actual …",
    image: "/product-01-300x300.jpg",
  },
  {
    id: "6",
    title: "Image Post Example",
    date: "June 1, 2015",
    author: "g5plusacc",
    excerpt:
      "In a professional context it often happens that private or corporate clients order a publication to be made and presented with the actual …",
    image: "/banner2.jpg",
  },
];

export const navLinks = [
  { label: "Home", href: "#" },
  { label: "Pages", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Features", href: "#" },
  { label: "Shop", href: "#" },
];
