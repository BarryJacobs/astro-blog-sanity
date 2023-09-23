import { u as urlForImage, e as getAllCategories, $ as $$MainLayout } from './__f5d74260.mjs';
import { c as createAstro, b as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, g as renderComponent } from '../astro_7afa4864.mjs';
import 'clsx';
/* empty css                                */import '@astrojs/internal-helpers/path';
import '@sanity/client';
import '@sanity/image-url';
import 'svgo';
/* empty css                         */import 'html-escaper';

const $$Astro$1 = createAstro("https://resilient-pavlova-922456.netlify.app/");
const $$CategoryCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CategoryCard;
  const { category } = Astro2.props;
  const { name, image, slug } = category;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/category/${slug.current}/`, "href")} aria-hidden="true" tabindex="-1" data-astro-cid-d242pyyr><article class="card" data-astro-cid-d242pyyr><div class="content" data-astro-cid-d242pyyr><h3 class="h4" data-astro-cid-d242pyyr>${name.toUpperCase()}</h3><img alt="Category image"${addAttribute(urlForImage(image).width(200).height(200).crop("center").fit("crop").format("webp").quality(40).url(), "src")} data-astro-cid-d242pyyr></div></article></a>`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/components/CategoryCard.astro", void 0);

const $$Astro = createAstro("https://resilient-pavlova-922456.netlify.app/");
const $$Categories = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Categories;
  const categories = await getAllCategories();
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Categories" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<section class="container" aria-label="New Blog Posts"><h1 class="h1">Categories</h1><div class="post-container">${categories.map((category) => renderTemplate`${renderComponent($$result2, "CategoryCard", $$CategoryCard, { "category": category })}`)}</div></section>` })}`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/pages/categories.astro", void 0);

const $$file = "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/pages/categories.astro";
const $$url = "/categories";

export { $$Categories as default, $$file as file, $$url as url };
