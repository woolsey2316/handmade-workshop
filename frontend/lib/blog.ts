export type BlogContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string };

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  categories: string[];
  tags: string[];
  comments: number;
  content: BlogContentBlock[];
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

const standardBody: BlogContentBlock[] = [
  {
    type: "paragraph",
    text: "In a professional context it often happens that private or corporate clients order a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied newspaper or the internet. They are to focus on the text, disregarding the layout and its elements. Besides, random text risks to be unintendedly humorous or offensive, an unacceptable risk in corporate environments.",
  },
  {
    type: "paragraph",
    text: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Aenean commodo ligula eget dolor aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Aenean commodo ligula eget dolor aenean massa. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
  },
  {
    type: "heading",
    text: "What we will do? It is for you",
  },
  {
    type: "paragraph",
    text: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
  },
  {
    type: "quote",
    text: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
  },
  {
    type: "paragraph",
    text: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Aenean commodo ligula eget dolor aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec vitae sapien ut libero venenatis faucibus. Nulla consequat massa quis enim.",
  },
];

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function withDefaults(
  post: Omit<BlogPost, "slug" | "tags" | "content"> &
    Partial<Pick<BlogPost, "slug" | "tags" | "content">>,
): BlogPost {
  return {
    ...post,
    slug: post.slug ?? slugify(post.title),
    tags: post.tags ?? post.categories,
    content: post.content ?? standardBody,
  };
}

export const blogPosts: BlogPost[] = [
  withDefaults({
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
  }),
  withDefaults({
    id: "2",
    title: "I Love My Life Very Much",
    date: "August 2, 2015",
    author: "g5plusacc",
    categories: ["Food", "Nature"],
    comments: 0,
    excerpt:
      "In a professional context it often happens that private or corporate clients order a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a…",
    image: "/banner-3.jpg",
  }),
  withDefaults({
    id: "3",
    title: "Here Are Many Variations Of Passages",
    date: "August 2, 2015",
    author: "g5plusacc",
    categories: ["Destination", "Photography"],
    comments: 0,
    excerpt:
      "In a professional context it often happens that private or corporate clients order a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a…",
    image: "/banner-4.jpg",
  }),
  withDefaults({
    id: "4",
    title: "Inteligent Transitions In Ux Design",
    date: "August 2, 2015",
    author: "g5plusacc",
    categories: ["Landscape", "Travel"],
    comments: 0,
    excerpt:
      "In a professional context it often happens that private or corporate clients order a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a…",
    image: "/banner-11.jpg",
  }),
  withDefaults({
    id: "5",
    title: "Standard Post Example",
    date: "July 14, 2015",
    author: "g5plusacc",
    categories: ["Destination", "Nature"],
    comments: 0,
    excerpt:
      "In a professional context it often happens that private or corporate clients order a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a…",
    image: "/product-01-570x570.jpg",
  }),
  withDefaults({
    id: "6",
    title: "Image Post Example",
    date: "June 1, 2015",
    author: "g5plusacc",
    categories: ["Food", "Landscape"],
    comments: 0,
    excerpt:
      "In a professional context it often happens that private or corporate clients order a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a…",
    image: "/banner2.jpg",
  }),
  withDefaults({
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
  }),
  withDefaults({
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
  }),
  withDefaults({
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
  }),
  withDefaults({
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
  }),
];

export const recentPosts = blogPosts.slice(1, 4);

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAdjacentPosts(slug: string) {
  const index = blogPosts.findIndex((post) => post.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: blogPosts[index + 1] ?? null,
    next: blogPosts[index - 1] ?? null,
  };
}

export function postHref(post: Pick<BlogPost, "slug">) {
  return `/blog/${post.slug}`;
}
