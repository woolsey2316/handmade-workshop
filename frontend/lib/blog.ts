export type BlogPost = {
  id: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  categories: string[];
  comments: number;
  type?: "standard" | "video" | "gallery" | "audio" | "quote";
  quote?: { text: string; author: string };
};

export const blogCategories = [
  "Destination",
  "Food",
  "Landscape",
  "Nature",
  "Photography",
  "Travel",
  "Uncategorized",
] as const;

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Video Post",
    date: "April 9, 2016",
    author: "g5plusacc",
    categories: ["Uncategorized"],
    comments: 0,
    type: "video",
    excerpt:
      "In a professional context it often happens that private or corporate clients order a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a…",
    image: "/banner-2.jpg",
  },
  {
    id: "2",
    title: "I Love My Life Very Much",
    date: "August 2, 2015",
    author: "g5plusacc",
    categories: ["Food", "Nature"],
    comments: 0,
    excerpt:
      "In a professional context it often happens that private or corporate clients order a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a…",
    image: "/banner-3.jpg",
  },
  {
    id: "3",
    title: "Here Are Many Variations Of Passages",
    date: "August 2, 2015",
    author: "g5plusacc",
    categories: ["Destination", "Photography"],
    comments: 0,
    excerpt:
      "In a professional context it often happens that private or corporate clients order a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a…",
    image: "/banner-4.jpg",
  },
  {
    id: "4",
    title: "Inteligent Transitions In Ux Design",
    date: "August 2, 2015",
    author: "g5plusacc",
    categories: ["Landscape", "Travel"],
    comments: 0,
    excerpt:
      "In a professional context it often happens that private or corporate clients order a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a…",
    image: "/banner-11.jpg",
  },
  {
    id: "5",
    title: "Standard Post Example",
    date: "July 14, 2015",
    author: "g5plusacc",
    categories: ["Destination", "Nature"],
    comments: 0,
    excerpt:
      "In a professional context it often happens that private or corporate clients order a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a…",
    image: "/product-01-570x570.jpg",
  },
  {
    id: "6",
    title: "Image Post Example",
    date: "June 1, 2015",
    author: "g5plusacc",
    categories: ["Food", "Landscape"],
    comments: 0,
    excerpt:
      "In a professional context it often happens that private or corporate clients order a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a…",
    image: "/banner2.jpg",
  },
  {
    id: "7",
    title: "Gallery Post Example",
    date: "May 19, 2015",
    author: "g5plusacc",
    categories: ["Photography", "Travel"],
    comments: 0,
    type: "gallery",
    excerpt:
      "In a professional context it often happens that private or corporate clients order a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a…",
    image: "/banner-home-1.jpg",
  },
  {
    id: "8",
    title: "Amazing Youtube Video Post",
    date: "April 11, 2015",
    author: "g5plusacc",
    categories: ["Destination", "Travel"],
    comments: 0,
    type: "video",
    excerpt:
      "In a professional context it often happens that private or corporate clients order a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a…",
    image: "/product-17-570x570.jpg",
  },
  {
    id: "9",
    title: "Incredible Audio Player Post",
    date: "March 23, 2015",
    author: "g5plusacc",
    categories: ["Food", "Photography"],
    comments: 0,
    type: "audio",
    excerpt:
      "In a professional context it often happens that private or corporate clients order a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a…",
    image: "/product-11-570x570.jpg",
  },
  {
    id: "10",
    title: "Quote Post Example",
    date: "February 15, 2015",
    author: "g5plusacc",
    categories: ["Landscape", "Travel"],
    comments: 0,
    type: "quote",
    quote: {
      text: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
      author: "Oscar Wilde",
    },
    excerpt: "",
    image: "/banner-31.jpg",
  },
];

export const recentPosts = blogPosts.slice(1, 4);
