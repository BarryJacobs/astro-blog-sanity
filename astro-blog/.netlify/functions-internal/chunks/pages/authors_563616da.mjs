import { u as urlForImage, h as $$Link, i as getAllAuthors, $ as $$MainLayout } from './__f5d74260.mjs';
import { c as createAstro, b as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, g as renderComponent } from '../astro_7afa4864.mjs';
import 'clsx';
import { $ as $$PortableText } from './__cebf141f.mjs';
/* empty css                             */import '@astrojs/internal-helpers/path';
import '@sanity/client';
import '@sanity/image-url';
import 'svgo';
/* empty css                         */import 'html-escaper';
import '@portabletext/toolkit';

const $$Astro$1 = createAstro("https://resilient-pavlova-922456.netlify.app/");
const $$AuthorCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$AuthorCard;
  const { author } = Astro2.props;
  const { name, image, bio, email } = author;
  return renderTemplate`${maybeRenderHead()}<article class="card" data-astro-cid-32rj7774><div class="content" data-astro-cid-32rj7774><h3 class="h4" data-astro-cid-32rj7774>${name.toUpperCase()}</h3><img alt="Author image"${addAttribute(urlForImage(image).width(200).height(200).crop("center").fit("crop").format("webp").quality(40).url(), "src")} data-astro-cid-32rj7774>${renderComponent($$result, "PortableText", $$PortableText, { "value": bio, "data-astro-cid-32rj7774": true })}<div class="actions" data-astro-cid-32rj7774>${renderComponent($$result, "Link", $$Link, { "href": `/author/${author.slug.current}`, "style": "secondary", "text": "View Posts", "data-astro-cid-32rj7774": true })}${renderComponent($$result, "Link", $$Link, { "href": `mailto:${email}`, "style": "primary", "text": "Contact", "data-astro-cid-32rj7774": true })}</div></div></article>`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/components/AuthorCard.astro", void 0);

const $$Astro = createAstro("https://resilient-pavlova-922456.netlify.app/");
const $$Authors = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Authors;
  const authors = await getAllAuthors();
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Authors" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<section class="container" aria-label="New Blog Posts"><h1 class="h1">Authors</h1><div class="post-container">${authors.map((author) => renderTemplate`${renderComponent($$result2, "AuthorCard", $$AuthorCard, { "author": author })}`)}</div></section>` })}`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/pages/authors.astro", void 0);

const $$file = "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/pages/authors.astro";
const $$url = "/authors";

export { $$Authors as default, $$file as file, $$url as url };
