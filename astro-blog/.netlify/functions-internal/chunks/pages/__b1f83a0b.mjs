import { g as getCategoryPosts, $ as $$MainLayout, a as $$PostCard, b as getAuthorPosts, c as $$CategoryCloud, f as formatDate, u as urlForImage, d as getPost, e as getAllCategories } from './__a9ecf238.mjs';
import { c as createAstro, b as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead, e as addAttribute, s as spreadAttributes, h as renderSlot, F as Fragment } from '../astro_7afa4864.mjs';
import 'clsx';
import { isPortableTextToolkitList, isPortableTextListItemBlock, isPortableTextToolkitSpan, isPortableTextBlock, isPortableTextToolkitTextNode, nestLists, LIST_NEST_MODE_HTML, buildMarksTree } from '@portabletext/toolkit';

const $$Astro$f = createAstro();
const $$$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$$2;
  const { slug } = Astro2.params;
  const categoryPosts = await getCategoryPosts(slug);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": categoryPosts.name }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<section class="container"${addAttribute(`Posts about ${categoryPosts.name}`, "aria-label")}><h1 class="h1">Posts about <span>${categoryPosts.name}</span></h1><div class="post-container">${categoryPosts.posts && categoryPosts.posts.map((post) => renderTemplate`${renderComponent($$result2, "PostCard", $$PostCard, { "post": post, "heading": "h2" })}`)}</div></section>` })}`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/pages/category/[...slug].astro", void 0);

const $$file$2 = "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/pages/category/[...slug].astro";
const $$url$2 = "/category/[...slug]";

const ____slug_$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$$2,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

function isComponent(it) {
  return typeof it === "function";
}
function mergeComponents(components, overrides) {
  const cmps = { ...components };
  for (const [key, override] of Object.entries(overrides)) {
    const current = components[key];
    const value = !current || isComponent(override) || isComponent(current) ? override : {
      ...current,
      ...override
    };
    cmps[key] = value;
  }
  return cmps;
}

const getTemplate = (prop, type) => `PortableText [components.${prop}] is missing "${type}"`;
const unknownTypeWarning = (type) => getTemplate("type", type);
const unknownMarkWarning = (markType) => getTemplate("mark", markType);
const unknownBlockWarning = (style) => getTemplate("block", style);
const unknownListWarning = (listItem) => getTemplate("list", listItem);
const unknownListItemWarning = (listStyle) => getTemplate("listItem", listStyle);
const getWarningMessage = (nodeType, type) => {
  const fncs = {
    block: unknownBlockWarning,
    list: unknownListWarning,
    listItem: unknownListItemWarning,
    mark: unknownMarkWarning,
    type: unknownTypeWarning
  };
  return fncs[nodeType](type);
};
function printWarning(message) {
  console.warn(message);
}

const key = Symbol("astro-portabletext");
function useContext(node) {
  if (!(key in globalThis)) {
    throw new Error(`PortableText "context" has not been initialised`);
  }
  return globalThis[key](node);
}

const $$Astro$e = createAstro();
const $$Block = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$Block;
  const props = Astro2.props;
  const { node, index, isInline, ...attrs } = props;
  const styleIs = (style) => style === node.style;
  const { getUnknownComponent } = useContext(node);
  const UnknownStyle = getUnknownComponent();
  return renderTemplate`${styleIs("h1") ? renderTemplate`${maybeRenderHead()}<h1${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h1>` : styleIs("h2") ? renderTemplate`<h2${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h2>` : styleIs("h3") ? renderTemplate`<h3${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h3>` : styleIs("h4") ? renderTemplate`<h4${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h4>` : styleIs("h5") ? renderTemplate`<h5${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h5>` : styleIs("h6") ? renderTemplate`<h6${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h6>` : styleIs("blockquote") ? renderTemplate`<blockquote${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</blockquote>` : styleIs("normal") ? renderTemplate`<p${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</p>` : renderTemplate`${renderComponent($$result, "UnknownStyle", UnknownStyle, { ...props }, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })}`}`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/node_modules/astro-portabletext/components/Block.astro", void 0);

const $$Astro$d = createAstro();
const $$HardBreak = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$HardBreak;
  return renderTemplate`${maybeRenderHead()}<br>`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/node_modules/astro-portabletext/components/HardBreak.astro", void 0);

const $$Astro$c = createAstro();
const $$List = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$List;
  const { node, index, isInline, ...attrs } = Astro2.props;
  const listItemIs = (listItem) => listItem === node.listItem;
  return renderTemplate`${listItemIs("menu") ? renderTemplate`${maybeRenderHead()}<menu${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</menu>` : listItemIs("number") ? renderTemplate`<ol${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</ol>` : renderTemplate`<ul${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</ul>`}`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/node_modules/astro-portabletext/components/List.astro", void 0);

const $$Astro$b = createAstro();
const $$ListItem = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$ListItem;
  const { node, index, isInline, ...attrs } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</li>`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/node_modules/astro-portabletext/components/ListItem.astro", void 0);

const $$Astro$a = createAstro();
const $$Mark = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Mark;
  const props = Astro2.props;
  const { node, index, isInline, ...attrs } = props;
  const markTypeIs = (markType) => markType === node.markType;
  const { getUnknownComponent } = useContext(node);
  const UnknownMarkType = getUnknownComponent();
  return renderTemplate`${markTypeIs("code") ? renderTemplate`${maybeRenderHead()}<code${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</code>` : markTypeIs("em") ? renderTemplate`<em${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</em>` : markTypeIs("link") ? renderTemplate`<a${addAttribute(node.markDef.href, "href")}${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</a>` : markTypeIs("strike-through") ? renderTemplate`<del${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</del>` : markTypeIs("strong") ? renderTemplate`<strong${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</strong>` : markTypeIs("underline") ? renderTemplate`<span style="text-decoration: underline;"${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</span>` : renderTemplate`${renderComponent($$result, "UnknownMarkType", UnknownMarkType, { ...props }, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })}`}`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/node_modules/astro-portabletext/components/Mark.astro", void 0);

const $$Astro$9 = createAstro();
const $$UnknownBlock = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$UnknownBlock;
  return renderTemplate`${maybeRenderHead()}<p data-portabletext-unknown="block">${renderSlot($$result, $$slots["default"])}</p>`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/node_modules/astro-portabletext/components/UnknownBlock.astro", void 0);

const $$Astro$8 = createAstro();
const $$UnknownList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$UnknownList;
  return renderTemplate`${maybeRenderHead()}<ul data-portabletext-unknown="list">${renderSlot($$result, $$slots["default"])}</ul>`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/node_modules/astro-portabletext/components/UnknownList.astro", void 0);

const $$Astro$7 = createAstro();
const $$UnknownListItem = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$UnknownListItem;
  return renderTemplate`${maybeRenderHead()}<li data-portabletext-unknown="listitem">${renderSlot($$result, $$slots["default"])}</li>`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/node_modules/astro-portabletext/components/UnknownListItem.astro", void 0);

const $$Astro$6 = createAstro();
const $$UnknownMark = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$UnknownMark;
  return renderTemplate`${maybeRenderHead()}<span data-portabletext-unknown="mark">${renderSlot($$result, $$slots["default"])}</span>`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/node_modules/astro-portabletext/components/UnknownMark.astro", void 0);

const $$Astro$5 = createAstro();
const $$UnknownType = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$UnknownType;
  const { node, isInline } = Astro2.props;
  const warning = getWarningMessage("type", node._type);
  return renderTemplate`${isInline ? renderTemplate`${maybeRenderHead()}<span style="display:none" data-portabletext-unknown="type">${warning}</span>` : renderTemplate`<div style="display:none" data-portabletext-unknown="type">${warning}</div>`}`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/node_modules/astro-portabletext/components/UnknownType.astro", void 0);

const $$Astro$4 = createAstro();
const $$PortableText = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$PortableText;
  const {
    value,
    components: componentOverrides = {},
    listNestingMode = LIST_NEST_MODE_HTML,
    onMissingComponent = true,
    class: astroClass
  } = Astro2.props;
  const components = mergeComponents(
    {
      type: {},
      unknownType: $$UnknownType,
      block: {
        h1: $$Block,
        h2: $$Block,
        h3: $$Block,
        h4: $$Block,
        h5: $$Block,
        h6: $$Block,
        blockquote: $$Block,
        normal: $$Block
      },
      unknownBlock: $$UnknownBlock,
      list: {
        bullet: $$List,
        number: $$List,
        menu: $$List
      },
      unknownList: $$UnknownList,
      listItem: {
        bullet: $$ListItem,
        number: $$ListItem,
        menu: $$ListItem
      },
      unknownListItem: $$UnknownListItem,
      mark: {
        code: $$Mark,
        em: $$Mark,
        link: $$Mark,
        "strike-through": $$Mark,
        strong: $$Mark,
        underline: $$Mark
      },
      unknownMark: $$UnknownMark,
      hardBreak: $$HardBreak
    },
    componentOverrides
  );
  const noop = () => {
  };
  const missingComponentHandler = ((handler) => {
    if (typeof handler === "function") {
      return handler;
    }
    return !handler ? noop : printWarning;
  })(onMissingComponent);
  const serializeNode = (isInline) => (node, index = 0) => asComponentProps(node, index, isInline);
  const serializeChildren = (node, isInline) => node.children.map(serializeNode(isInline));
  const serializeMarksTree = (node) => buildMarksTree(node).map(serializeNode(true));
  const asComponentProps = (node, index, isInline) => ({
    node,
    index,
    isInline,
    class: astroClass
  });
  const provideComponent = (nodeType, type) => {
    const component = components[nodeType];
    return isComponent(component) ? component : component[type] ?? missingComponentHandler(getWarningMessage(nodeType, type), {
      nodeType,
      type
    });
  };
  const prepareForRender = (props) => {
    const { node } = props;
    return isPortableTextToolkitList(node) ? [
      provideComponent("list", node.listItem) ?? components.unknownList,
      serializeChildren(node, false)
    ] : isPortableTextListItemBlock(node) ? [
      provideComponent("listItem", node.listItem) ?? components.unknownListItem,
      serializeMarksTree(node).map((children) => {
        if (node.style !== "normal") {
          const { listItem, ...blockNode } = node;
          children = serializeNode(false)(blockNode, 0);
        }
        return children;
      })
    ] : isPortableTextToolkitSpan(node) ? [
      provideComponent("mark", node.markType) ?? components.unknownMark,
      serializeChildren(node, true)
    ] : isPortableTextBlock(node) ? [
      provideComponent(
        "block",
        node.style ?? (node.style = "normal")
        /* Make sure style has been set */
      ) ?? components.unknownBlock,
      serializeMarksTree(node)
    ] : isPortableTextToolkitTextNode(node) ? [
      "\n" === node.text && isComponent(components.hardBreak) ? components.hardBreak : node.text,
      []
    ] : [provideComponent("type", node._type) ?? components.unknownType, []];
  };
  globalThis[key] = (node) => {
    return {
      getDefaultComponent: provideDefaultComponent.bind(null, node),
      getUnknownComponent: provideUnknownComponent.bind(null, node)
    };
  };
  const provideDefaultComponent = (node) => {
    return isPortableTextToolkitList(node) ? $$List : isPortableTextListItemBlock(node) ? $$ListItem : isPortableTextToolkitSpan(node) ? $$Mark : isPortableTextBlock(node) ? $$Block : isPortableTextToolkitTextNode(node) ? $$HardBreak : $$UnknownType;
  };
  const provideUnknownComponent = (node) => {
    return isPortableTextToolkitList(node) ? components.unknownList : isPortableTextListItemBlock(node) ? components.unknownListItem : isPortableTextToolkitSpan(node) ? components.unknownMark : isPortableTextBlock(node) ? components.unknownBlock : !isPortableTextToolkitTextNode(node) ? components.unknownType : (() => {
      throw new Error(
        `[PortableText getUnknownComponent] Unable to provide component with node type ${node._type}`
      );
    })();
  };
  const blocks = Array.isArray(value) ? value : [value];
  function* renderBlocks() {
    for (const it of nestLists(blocks, listNestingMode)) {
      yield asComponentProps(it, 0, false);
    }
  }
  return renderTemplate`${[...renderBlocks()].map(function render(props) {
    const [Cmp, children] = prepareForRender(props);
    return !isComponent(Cmp) ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${Cmp}` })}` : renderTemplate`${renderComponent($$result, "Cmp", Cmp, { ...props }, { "default": ($$result2) => renderTemplate`${children.map(render)}` })}`;
  })}`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/node_modules/astro-portabletext/components/PortableText.astro", void 0);

const $$Astro$3 = createAstro();
const $$$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$$1;
  const { slug } = Astro2.params;
  const authorPosts = await getAuthorPosts(slug);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": authorPosts.name }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<section class="container"${addAttribute(`Posts by ${authorPosts.name}`, "aria-label")}><h1 class="h1">Posts by <span>${authorPosts.name}</span></h1><div class="post-container">${authorPosts.posts && authorPosts.posts.map((post) => renderTemplate`${renderComponent($$result2, "PostCard", $$PostCard, { "post": post, "heading": "h2" })}`)}</div></section>` })}`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/pages/author/[...slug].astro", void 0);

const $$file$1 = "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/pages/author/[...slug].astro";
const $$url$1 = "/author/[...slug]";

const ____slug_$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$$1,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$2 = createAstro();
const $$PostHeader = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$PostHeader;
  const { post } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<header><div class="container"><small>${renderComponent($$result, "CategoryCloud", $$CategoryCloud, { "categories": post.categories })}</small><h1 class="h2">${post.title}</h1><p>
by <a${addAttribute(`/author/${post.author.slug.current}/`, "href")}>${post.author.name}</a>
• ${formatDate(post.publishedAt)}</p></div><img class="hero-image" alt="Post image"${addAttribute(urlForImage(post.mainImage).width(1200).height(600).crop("center").fit("crop").format("webp").quality(40).url(), "src")}></header>`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/components/PostHeader.astro", void 0);

const $$Astro$1 = createAstro();
const $$RelatedPosts = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$RelatedPosts;
  const { posts } = Astro2.props;
  return renderTemplate`${posts && posts.length > 0 && renderTemplate`${maybeRenderHead()}<aside class="container" aria-label="Related posts"><h2 class="h3">Related Posts</h2>${posts.map((post) => renderTemplate`<div class="post"><h3 class="h4"><a${addAttribute(`/post/${post.slug.current}/`, "href")}>${post.title}</a></h3><small><a${addAttribute(`/author/${post.author.slug.current}/`, "href")}>${post.author.name}</a>${" "}
• ${formatDate(post.publishedAt)}</small></div>`)}</aside>`}`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/components/RelatedPosts.astro", void 0);

const $$Astro = createAstro();
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { slug } = Astro2.params;
  const post = await getPost(slug);
  const categories = await getAllCategories();
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "post.title": post.title, "post.description": post.description }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "PostHeader", $$PostHeader, { "post": post })}${maybeRenderHead()}<div class="post-content"><div class="content">${renderComponent($$result2, "PortableText", $$PortableText, { "value": post.body })}</div><div class="sidebar"><aside class="container" aria-label="Blog categories"><h2 class="h3">Blog Categories</h2>${renderComponent($$result2, "CategoryCloud", $$CategoryCloud, { "categories": categories })}</aside>${renderComponent($$result2, "RelatedPosts", $$RelatedPosts, { "posts": post.relatedPosts })}</div></div>` })}`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/pages/post/[...slug].astro", void 0);

const $$file = "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/pages/post/[...slug].astro";
const $$url = "/post/[...slug]";

const ____slug_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$PortableText as $, ____slug_$2 as _, ____slug_$1 as a, ____slug_ as b };
