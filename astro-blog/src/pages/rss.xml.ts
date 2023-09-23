import { getRssPosts } from "../scripts/sanity";
import rss from "@astrojs/rss";

const posts = await getRssPosts();

export const GET = () => {
  return rss({
    stylesheet: "/rss/styles.xsl",
    title: import.meta.env.VITE_WEBSITE_TITLE,
    description: import.meta.env.VITE_WEBSITE_DESCRIPTION,
    site: import.meta.env.VITE_WEBSITE_URL,
    items: posts.map((post) => ({
      link: `/post/${post.slug.current}/`,
      title: post.title,
      pubDate: post.publishedAt,
      description: post.description,
      customData: `<author>${post.author.name}</author>`,
    })),
    customData: `<language>en-gb</language>`,
  });
};
