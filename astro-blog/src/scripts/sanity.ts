import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { Author, Category, Post, PaginatedPosts } from "../interfaces";
import { useSanityClient } from "@sanity/astro";
import imageUrlBuilder from "@sanity/image-url";

export const imageBuilder = imageUrlBuilder(useSanityClient());

export const urlForImage = (source: SanityImageSource) => {
  return imageBuilder.image(source);
};

export const getAllPosts = async () => {
  const query = `*[_type == "post" && defined(slug)] | order(publishedAt desc) { 
    title, description, slug, mainImage, publishedAt, 
    author->{ name, slug }, 
    categories[]->{ name, slug } }`;
  const data = await useSanityClient().fetch(query);
  return data as Post[];
};

export const getPaginatedPosts = async (
  pageSize: number,
  pageIndex: number,
) => {
  const query = `{
    "posts": *[_type == "post" && defined(slug)] | order(publishedAt desc)
      [(${pageIndex} * ${pageSize})...(${pageIndex} + 1) * ${pageSize}] { 
        title, description, slug, mainImage, publishedAt,
        author->{ name, slug },
        categories[]->{ name, slug }
      },
    "total": count(*[_type == "post" && defined(slug)] )
  }`;
  const data = await useSanityClient().fetch(query);
  return data as PaginatedPosts;
};

export const getRssPosts = async () => {
  const query = `*[_type == "post" && defined(slug)] | order(publishedAt desc) { 
    title, description, slug, publishedAt, 
    author->{ name }, 
  }`;
  const data = await useSanityClient().fetch(query);
  return data as Post[];
};

export const getAllAuthors = async () => {
  const query = `*[_type == "author" && defined(slug)]{ name, slug, image, bio, email }`;
  const data = await useSanityClient().fetch(query);
  return data as Author[];
};

export const getAllCategories = async () => {
  const query = `*[_type == "category" && defined(slug)] | order(name) { name, slug, image }`;
  const data = await useSanityClient().fetch(query);
  return data as Category[];
};

export const getPost = async (slug: string) => {
  const query = `*[_type == "post" && defined(slug) && slug.current == "${slug}"][0] {
    title, description, slug, mainImage, body, publishedAt,
    author->{ name, slug },
    categories[]->,
    "relatedPosts": *[_type == "post" && title != ^.title && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(publishedAt desc) [0..5] {
      title,
      slug,
      publishedAt,
      author->{ name, slug }
    }
  }`;
  const data = await useSanityClient().fetch(query);
  return data as Post;
};

export const getCategoryPosts = async (slug: string) => {
  const query = `*[_type == "category" && defined(slug) && slug.current == "${slug}"][0] 
   { _id, name, slug, 
     "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) 
        { slug, title, description, mainImage, publishedAt, author->{ name, slug }, categories[]->{ name, slug } }}`;
  const data = await useSanityClient().fetch(query);
  return data as Category;
};

export const getAuthorPosts = async (slug: string) => {
  const query = `*[_type == "author" && defined(slug) && slug.current == "${slug}"][0] 
   { _id, name, slug, 
     "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) 
        { slug, title, description, mainImage, publishedAt, author->{ name, slug }, categories[]->{ name, slug } }}`;
  const data = await useSanityClient().fetch(query);
  return data as Author;
};
