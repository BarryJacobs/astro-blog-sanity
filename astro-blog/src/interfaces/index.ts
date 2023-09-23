import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { PortableTextValue } from "../types";

export interface Slug {
  current: string;
}

export interface Author {
  name: string;
  slug: Slug;
  image: SanityImageSource;
  bio: PortableTextValue | PortableTextValue[];
  email: string;
}

export interface Category {
  name: string;
  slug: Slug;
  tagline: string;
  image: SanityImageSource;
  details: PortableTextValue | PortableTextValue[];
  posts?: Post[];
}

export interface Post {
  title: string;
  description: string;
  slug: Slug;
  mainImage: SanityImageSource;
  body: PortableTextValue | PortableTextValue[];
  publishedAt: Date;
  author: Author;
  categories: Category[];
  relatedPosts?: Post[];
}

export interface PaginatedPosts {
  posts: Post[];
  total: number;
}
