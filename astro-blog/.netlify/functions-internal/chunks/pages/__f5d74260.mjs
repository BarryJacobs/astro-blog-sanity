import { isRemotePath, joinPaths } from '@astrojs/internal-helpers/path';
import { createClient } from '@sanity/client';
import { A as AstroError, E as ExpectedImage, L as LocalImageUsedWrongly, M as MissingImageDimension, U as UnsupportedImageFormat, I as InvalidImageService, a as ExpectedImageOptions, c as createAstro, b as createComponent, d as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, e as addAttribute, s as spreadAttributes, f as renderHead, u as unescapeHTML, g as renderComponent, F as Fragment, h as renderSlot } from '../astro_7afa4864.mjs';
import 'clsx';
import imageUrlBuilder from '@sanity/image-url';
import { optimize } from 'svgo';
/* empty css                         */
const VALID_SUPPORTED_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];

function isLocalService(service) {
  if (!service) {
    return false;
  }
  return "transform" in service;
}
function parseQuality(quality) {
  let result = parseInt(quality);
  if (Number.isNaN(result)) {
    return quality;
  }
  return result;
}
const baseService = {
  validateOptions(options) {
    if (!options.src || typeof options.src !== "string" && typeof options.src !== "object") {
      throw new AstroError({
        ...ExpectedImage,
        message: ExpectedImage.message(
          JSON.stringify(options.src),
          typeof options.src,
          JSON.stringify(options, (_, v) => v === void 0 ? null : v)
        )
      });
    }
    if (!isESMImportedImage(options.src)) {
      if (options.src.startsWith("/@fs/") || !isRemotePath(options.src) && !options.src.startsWith("/")) {
        throw new AstroError({
          ...LocalImageUsedWrongly,
          message: LocalImageUsedWrongly.message(options.src)
        });
      }
      let missingDimension;
      if (!options.width && !options.height) {
        missingDimension = "both";
      } else if (!options.width && options.height) {
        missingDimension = "width";
      } else if (options.width && !options.height) {
        missingDimension = "height";
      }
      if (missingDimension) {
        throw new AstroError({
          ...MissingImageDimension,
          message: MissingImageDimension.message(missingDimension, options.src)
        });
      }
    } else {
      if (!VALID_SUPPORTED_FORMATS.includes(options.src.format)) {
        throw new AstroError({
          ...UnsupportedImageFormat,
          message: UnsupportedImageFormat.message(
            options.src.format,
            options.src.src,
            VALID_SUPPORTED_FORMATS
          )
        });
      }
      if (options.src.format === "svg") {
        options.format = "svg";
      }
    }
    if (!options.format) {
      options.format = "webp";
    }
    return options;
  },
  getHTMLAttributes(options) {
    let targetWidth = options.width;
    let targetHeight = options.height;
    if (isESMImportedImage(options.src)) {
      const aspectRatio = options.src.width / options.src.height;
      if (targetHeight && !targetWidth) {
        targetWidth = Math.round(targetHeight * aspectRatio);
      } else if (targetWidth && !targetHeight) {
        targetHeight = Math.round(targetWidth / aspectRatio);
      } else if (!targetWidth && !targetHeight) {
        targetWidth = options.src.width;
        targetHeight = options.src.height;
      }
    }
    const { src, width, height, format, quality, ...attributes } = options;
    return {
      ...attributes,
      width: targetWidth,
      height: targetHeight,
      loading: attributes.loading ?? "lazy",
      decoding: attributes.decoding ?? "async"
    };
  },
  getURL(options, imageConfig) {
    const searchParams = new URLSearchParams();
    if (isESMImportedImage(options.src)) {
      searchParams.append("href", options.src.src);
    } else if (isRemoteAllowed(options.src, imageConfig)) {
      searchParams.append("href", options.src);
    } else {
      return options.src;
    }
    const params = {
      w: "width",
      h: "height",
      q: "quality",
      f: "format"
    };
    Object.entries(params).forEach(([param, key]) => {
      options[key] && searchParams.append(param, options[key].toString());
    });
    const imageEndpoint = joinPaths("/", "/_image");
    return `${imageEndpoint}?${searchParams}`;
  },
  parseURL(url) {
    const params = url.searchParams;
    if (!params.has("href")) {
      return void 0;
    }
    const transform = {
      src: params.get("href"),
      width: params.has("w") ? parseInt(params.get("w")) : void 0,
      height: params.has("h") ? parseInt(params.get("h")) : void 0,
      format: params.get("f"),
      quality: params.get("q")
    };
    return transform;
  }
};

function matchPattern(url, remotePattern) {
  return matchProtocol(url, remotePattern.protocol) && matchHostname(url, remotePattern.hostname, true) && matchPort(url, remotePattern.port) && matchPathname(url, remotePattern.pathname, true);
}
function matchPort(url, port) {
  return !port || port === url.port;
}
function matchProtocol(url, protocol) {
  return !protocol || protocol === url.protocol.slice(0, -1);
}
function matchHostname(url, hostname, allowWildcard) {
  if (!hostname) {
    return true;
  } else if (!allowWildcard || !hostname.startsWith("*")) {
    return hostname === url.hostname;
  } else if (hostname.startsWith("**.")) {
    const slicedHostname = hostname.slice(2);
    return slicedHostname !== url.hostname && url.hostname.endsWith(slicedHostname);
  } else if (hostname.startsWith("*.")) {
    const slicedHostname = hostname.slice(1);
    const additionalSubdomains = url.hostname.replace(slicedHostname, "").split(".").filter(Boolean);
    return additionalSubdomains.length === 1;
  }
  return false;
}
function matchPathname(url, pathname, allowWildcard) {
  if (!pathname) {
    return true;
  } else if (!allowWildcard || !pathname.endsWith("*")) {
    return pathname === url.pathname;
  } else if (pathname.endsWith("/**")) {
    const slicedPathname = pathname.slice(0, -2);
    return slicedPathname !== url.pathname && url.pathname.startsWith(slicedPathname);
  } else if (pathname.endsWith("/*")) {
    const slicedPathname = pathname.slice(0, -1);
    const additionalPathChunks = url.pathname.replace(slicedPathname, "").split("/").filter(Boolean);
    return additionalPathChunks.length === 1;
  }
  return false;
}

function isESMImportedImage(src) {
  return typeof src === "object";
}
function isRemoteImage(src) {
  return typeof src === "string";
}
function isRemoteAllowed(src, {
  domains = [],
  remotePatterns = []
}) {
  if (!isRemotePath(src))
    return false;
  const url = new URL(src);
  return domains.some((domain) => matchHostname(url, domain)) || remotePatterns.some((remotePattern) => matchPattern(url, remotePattern));
}
async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      '../sharp_0feaea15.mjs'
    ).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset)
      globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: typeof options.src === "object" && "then" in options.src ? (await options.src).default ?? await options.src : options.src
  };
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && // If `getURL` returned the same URL as the user provided, it means the service doesn't need to do anything
  !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    imageURL = globalThis.astroAsset.addStaticImage(validatedOptions);
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    attributes: service.getHTMLAttributes !== void 0 ? service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$d = createAstro("https://resilient-pavlova-922456.netlify.app/");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(image.attributes)}>`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/node_modules/astro/components/Image.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[]};
					const getImage = async (options) => await getImage$1(options, imageConfig);

const sanityClientInstance = createClient(
            {"apiVersion":"v2023-08-24","projectId":"qjexr8ir","dataset":"production","useCdn":true}
          );

globalThis.sanityClientInstance = sanityClientInstance;

const $$Astro$c = createAstro("https://resilient-pavlova-922456.netlify.app/");
const $$MainHead = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$MainHead;
  const { title, description } = Astro2.props;
  return renderTemplate`<head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="description"${addAttribute(description, "content")}><title>${title}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">${renderHead()}</head>`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/layouts/MainHead.astro", void 0);

const navData = [
  { name: "Blog", path: "/blog/0" },
  { name: "Authors", path: "/authors/" },
  { name: "Categories", path: "/categories/" }
];

const SPRITESHEET_NAMESPACE = `astroicon`;

const baseURL = "https://api.astroicon.dev/v1/";
const requests = /* @__PURE__ */ new Map();
const fetchCache = /* @__PURE__ */ new Map();
async function get(pack, name) {
  const url = new URL(`./${pack}/${name}`, baseURL).toString();
  if (requests.has(url)) {
    return await requests.get(url);
  }
  if (fetchCache.has(url)) {
    return fetchCache.get(url);
  }
  let request = async () => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(await res.text());
    }
    const contentType = res.headers.get("Content-Type");
    if (!contentType.includes("svg")) {
      throw new Error(`[astro-icon] Unable to load "${name}" because it did not resolve to an SVG!

Recieved the following "Content-Type":
${contentType}`);
    }
    const svg = await res.text();
    fetchCache.set(url, svg);
    requests.delete(url);
    return svg;
  };
  let promise = request();
  requests.set(url, promise);
  return await promise;
}

const splitAttrsTokenizer = /([a-z0-9_\:\-]*)\s*?=\s*?(['"]?)(.*?)\2\s+/gim;
const domParserTokenizer = /(?:<(\/?)([a-zA-Z][a-zA-Z0-9\:]*)(?:\s([^>]*?))?((?:\s*\/)?)>|(<\!\-\-)([\s\S]*?)(\-\->)|(<\!\[CDATA\[)([\s\S]*?)(\]\]>))/gm;
const splitAttrs = (str) => {
  let res = {};
  let token;
  if (str) {
    splitAttrsTokenizer.lastIndex = 0;
    str = " " + (str || "") + " ";
    while (token = splitAttrsTokenizer.exec(str)) {
      res[token[1]] = token[3];
    }
  }
  return res;
};
function optimizeSvg(contents, name, options) {
  return optimize(contents, {
    plugins: [
      "removeDoctype",
      "removeXMLProcInst",
      "removeComments",
      "removeMetadata",
      "removeXMLNS",
      "removeEditorsNSData",
      "cleanupAttrs",
      "minifyStyles",
      "convertStyleToAttrs",
      {
        name: "cleanupIDs",
        params: { prefix: `${SPRITESHEET_NAMESPACE}:${name}` }
      },
      "removeRasterImages",
      "removeUselessDefs",
      "cleanupNumericValues",
      "cleanupListOfValues",
      "convertColors",
      "removeUnknownsAndDefaults",
      "removeNonInheritableGroupAttrs",
      "removeUselessStrokeAndFill",
      "removeViewBox",
      "cleanupEnableBackground",
      "removeHiddenElems",
      "removeEmptyText",
      "convertShapeToPath",
      "moveElemsAttrsToGroup",
      "moveGroupAttrsToElems",
      "collapseGroups",
      "convertPathData",
      "convertTransform",
      "removeEmptyAttrs",
      "removeEmptyContainers",
      "mergePaths",
      "removeUnusedNS",
      "sortAttrs",
      "removeTitle",
      "removeDesc",
      "removeDimensions",
      "removeStyleElement",
      "removeScriptElement"
    ]
  }).data;
}
const preprocessCache = /* @__PURE__ */ new Map();
function preprocess(contents, name, { optimize }) {
  if (preprocessCache.has(contents)) {
    return preprocessCache.get(contents);
  }
  if (optimize) {
    contents = optimizeSvg(contents, name);
  }
  domParserTokenizer.lastIndex = 0;
  let result = contents;
  let token;
  if (contents) {
    while (token = domParserTokenizer.exec(contents)) {
      const tag = token[2];
      if (tag === "svg") {
        const attrs = splitAttrs(token[3]);
        result = contents.slice(domParserTokenizer.lastIndex).replace(/<\/svg>/gim, "").trim();
        const value = { innerHTML: result, defaultProps: attrs };
        preprocessCache.set(contents, value);
        return value;
      }
    }
  }
}
function normalizeProps(inputProps) {
  const size = inputProps.size;
  delete inputProps.size;
  const w = inputProps.width ?? size;
  const h = inputProps.height ?? size;
  const width = w ? toAttributeSize(w) : void 0;
  const height = h ? toAttributeSize(h) : void 0;
  return { ...inputProps, width, height };
}
const toAttributeSize = (size) => String(size).replace(/(?<=[0-9])x$/, "em");
async function load(name, inputProps, optimize) {
  const key = name;
  if (!name) {
    throw new Error("<Icon> requires a name!");
  }
  let svg = "";
  let filepath = "";
  if (name.includes(":")) {
    const [pack, ..._name] = name.split(":");
    name = _name.join(":");
    filepath = `/src/icons/${pack}`;
    let get$1;
    try {
      const files = /* #__PURE__ */ Object.assign({

});
      const keys = Object.fromEntries(
        Object.keys(files).map((key2) => [key2.replace(/\.[cm]?[jt]s$/, ""), key2])
      );
      if (!(filepath in keys)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const mod = files[keys[filepath]];
      if (typeof mod.default !== "function") {
        throw new Error(
          `[astro-icon] "${filepath}" did not export a default function!`
        );
      }
      get$1 = mod.default;
    } catch (e) {
    }
    if (typeof get$1 === "undefined") {
      get$1 = get.bind(null, pack);
    }
    const contents = await get$1(name, inputProps);
    if (!contents) {
      throw new Error(
        `<Icon pack="${pack}" name="${name}" /> did not return an icon!`
      );
    }
    if (!/<svg/gim.test(contents)) {
      throw new Error(
        `Unable to process "<Icon pack="${pack}" name="${name}" />" because an SVG string was not returned!

Recieved the following content:
${contents}`
      );
    }
    svg = contents;
  } else {
    filepath = `/src/icons/${name}.svg`;
    try {
      const files = /* #__PURE__ */ Object.assign({});
      if (!(filepath in files)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const contents = files[filepath];
      if (!/<svg/gim.test(contents)) {
        throw new Error(
          `Unable to process "${filepath}" because it is not an SVG!

Recieved the following content:
${contents}`
        );
      }
      svg = contents;
    } catch (e) {
      throw new Error(
        `[astro-icon] Unable to load "${filepath}". Does the file exist?`
      );
    }
  }
  const { innerHTML, defaultProps } = preprocess(svg, key, { optimize });
  if (!innerHTML.trim()) {
    throw new Error(`Unable to parse "${filepath}"!`);
  }
  return {
    innerHTML,
    props: { ...defaultProps, ...normalizeProps(inputProps) }
  };
}

const $$Astro$b = createAstro("https://resilient-pavlova-922456.netlify.app/");
const $$Icon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Icon;
  let { name, pack, title, optimize = true, class: className, ...inputProps } = Astro2.props;
  let props = {};
  if (pack) {
    name = `${pack}:${name}`;
  }
  let innerHTML = "";
  try {
    const svg = await load(name, { ...inputProps, class: className }, optimize);
    innerHTML = svg.innerHTML;
    props = svg.props;
  } catch (e) {
    {
      throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
    }
  }
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(props)}${addAttribute(name, "astro-icon")}>${unescapeHTML((title ? `<title>${title}</title>` : "") + innerHTML)}</svg>`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/node_modules/astro-icon/lib/Icon.astro", void 0);

const sprites = /* @__PURE__ */ new WeakMap();
function trackSprite(request, name) {
  let currentSet = sprites.get(request);
  if (!currentSet) {
    currentSet = /* @__PURE__ */ new Set([name]);
  } else {
    currentSet.add(name);
  }
  sprites.set(request, currentSet);
}
const warned = /* @__PURE__ */ new Set();
async function getUsedSprites(request) {
  const currentSet = sprites.get(request);
  if (currentSet) {
    return Array.from(currentSet);
  }
  if (!warned.has(request)) {
    const { pathname } = new URL(request.url);
    console.log(`[astro-icon] No sprites found while rendering "${pathname}"`);
    warned.add(request);
  }
  return [];
}

const $$Astro$a = createAstro("https://resilient-pavlova-922456.netlify.app/");
const $$Spritesheet = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Spritesheet;
  const { optimize = true, style, ...props } = Astro2.props;
  const names = await getUsedSprites(Astro2.request);
  const icons = await Promise.all(names.map((name) => {
    return load(name, {}, optimize).then((res) => ({ ...res, name })).catch((e) => {
      {
        throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
      }
    });
  }));
  return renderTemplate`${maybeRenderHead()}<svg${addAttribute(`position: absolute; width: 0; height: 0; overflow: hidden; ${style ?? ""}`.trim(), "style")}${spreadAttributes({ "aria-hidden": true, ...props })} astro-icon-spritesheet>${icons.map((icon) => renderTemplate`<symbol${spreadAttributes(icon.props)}${addAttribute(`${SPRITESHEET_NAMESPACE}:${icon.name}`, "id")}>${unescapeHTML(icon.innerHTML)}</symbol>`)}</svg>`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/node_modules/astro-icon/lib/Spritesheet.astro", void 0);

const $$Astro$9 = createAstro("https://resilient-pavlova-922456.netlify.app/");
const $$SpriteProvider = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$SpriteProvider;
  const content = await Astro2.slots.render("default");
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(content)}` })}${renderComponent($$result, "Spritesheet", $$Spritesheet, {})}`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/node_modules/astro-icon/lib/SpriteProvider.astro", void 0);

const $$Astro$8 = createAstro("https://resilient-pavlova-922456.netlify.app/");
const $$Sprite = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Sprite;
  let { name, pack, title, class: className, x, y, ...inputProps } = Astro2.props;
  const props = normalizeProps(inputProps);
  if (pack) {
    name = `${pack}:${name}`;
  }
  const href = `#${SPRITESHEET_NAMESPACE}:${name}`;
  trackSprite(Astro2.request, name);
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(props)}${addAttribute(className, "class")}${addAttribute(name, "astro-icon")}>${title ? renderTemplate`<title>${title}</title>` : ""}<use${spreadAttributes({ "xlink:href": href, width: props.width, height: props.height, x, y })}></use></svg>`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/node_modules/astro-icon/lib/Sprite.astro", void 0);

Object.assign($$Sprite, { Provider: $$SpriteProvider });

const $$Astro$7 = createAstro("https://resilient-pavlova-922456.netlify.app/");
const $$Link = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Link;
  const {
    text,
    href,
    style,
    icon,
    isFilled = true,
    borderVisible = false,
    classes,
    ...rest
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute([
    "link",
    classes,
    style,
    { filled: isFilled, bordered: borderVisible }
  ], "class:list")}${spreadAttributes(rest)}>${icon && icon.side === "left" && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon.name, "height": 24, "width": 24 })}`}<span>${text}</span>${icon && icon.side === "right" && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon.name, "height": 24, "width": 24 })}`}</a>`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/components/Link.astro", void 0);

const $$Astro$6 = createAstro("https://resilient-pavlova-922456.netlify.app/");
const $$Nav = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Nav;
  return renderTemplate`${maybeRenderHead()}<nav aria-label="Primary"><div class="navbar"><div class="navbar-left"><a href="/" class="logomark" aria-label="Go home">${renderComponent($$result, "Image", $$Image, { "src": "/images/logo.png", "alt": "PA Consulting", "width": 60, "height": 60 })}</a></div><div class="navbar-right"><ul>${navData.map((item) => renderTemplate`${renderComponent($$result, "Link", $$Link, { "text": item.name, "href": item.path, "style": "primary", "isFilled": false, "data-navLink": true })}`)}</ul></div></div></nav>`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/components/Nav.astro", void 0);

const $$Astro$5 = createAstro("https://resilient-pavlova-922456.netlify.app/");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer><div><small>Copyright PA Consulting &copy; <span id="copyright"></span> | All rights reserved</small></div></footer>`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/components/Footer.astro", void 0);

const $$Astro$4 = createAstro("https://resilient-pavlova-922456.netlify.app/");
const $$MainLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { title, description } = Astro2.props;
  return renderTemplate`<html lang="en">${renderComponent($$result, "MainHead", $$MainHead, { "title": title, "description": description })}${maybeRenderHead()}<body>${renderComponent($$result, "Nav", $$Nav, {})}<main>${renderSlot($$result, $$slots["default"])}</main>${renderComponent($$result, "Footer", $$Footer, {})}</body></html>`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/layouts/MainLayout.astro", void 0);

function l() {
  return globalThis.sanityClientInstance || console.error(
    "[@sanity/astro]: sanityClientInstance has not been initialized correctly"
  ), globalThis.sanityClientInstance;
}

const imageBuilder = imageUrlBuilder(l());
const urlForImage = (source) => {
  return imageBuilder.image(source);
};
const getPaginatedPosts = async (pageSize, pageIndex) => {
  const query = `{
    "posts": *[_type == "post" && defined(slug)] | order(publishedAt desc)
      [(${pageIndex} * ${pageSize})...(${pageIndex} + 1) * ${pageSize}] { 
        title, description, slug, mainImage, publishedAt,
        author->{ name, slug },
        categories[]->{ name, slug }
      },
    "total": count(*[_type == "post" && defined(slug)] )
  }`;
  const data = await l().fetch(query);
  return data;
};
const getAllAuthors = async () => {
  const query = `*[_type == "author" && defined(slug)]{ name, slug, image, bio, email }`;
  const data = await l().fetch(query);
  return data;
};
const getAllCategories = async () => {
  const query = `*[_type == "category" && defined(slug)] | order(name) { name, slug, image }`;
  const data = await l().fetch(query);
  return data;
};
const getPost = async (slug) => {
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
  const data = await l().fetch(query);
  return data;
};
const getCategoryPosts = async (slug) => {
  const query = `*[_type == "category" && defined(slug) && slug.current == "${slug}"][0] 
   { _id, name, slug, 
     "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) 
        { slug, title, description, mainImage, publishedAt, author->{ name, slug }, categories[]->{ name, slug } }}`;
  const data = await l().fetch(query);
  return data;
};
const getAuthorPosts = async (slug) => {
  const query = `*[_type == "author" && defined(slug) && slug.current == "${slug}"][0] 
   { _id, name, slug, 
     "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) 
        { slug, title, description, mainImage, publishedAt, author->{ name, slug }, categories[]->{ name, slug } }}`;
  const data = await l().fetch(query);
  return data;
};

const formatDate = (date) => new Date(date).toLocaleDateString("en-GB", {
  timeZone: "UTC"
});
const isIntegerString = (value) => {
  if (!value)
    return void 0;
  const num = parseInt(value, 10);
  return !Number.isNaN(num) && Number.isInteger(num) ? num : void 0;
};

const $$Astro$3 = createAstro("https://resilient-pavlova-922456.netlify.app/");
const $$CategoryCloud = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$CategoryCloud;
  const { categories } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<ul class="categories">${categories.map((category) => renderTemplate`<li><a class="badge"${addAttribute(`/category/${category.slug.current}/`, "href")}>${category.name}</a></li>`)}</ul>`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/components/CategoryCloud.astro", void 0);

const $$Astro$2 = createAstro("https://resilient-pavlova-922456.netlify.app/");
const $$PostCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$PostCard;
  const { post, heading } = Astro2.props;
  const Heading = heading;
  const url = `/post/${post.slug.current}/`;
  return renderTemplate`${maybeRenderHead()}<article class="card"><small>${renderComponent($$result, "CategoryCloud", $$CategoryCloud, { "categories": post.categories })}</small><a${addAttribute(url, "href")} aria-hidden="true" tabindex="-1"><img alt="Post image"${addAttribute(urlForImage(post.mainImage).width(400).height(250).crop("center").fit("crop").format("webp").quality(40).url(), "src")}></a><div class="content"><div>${renderComponent($$result, "Heading", Heading, { "class": "h3" }, { "default": ($$result2) => renderTemplate`<a${addAttribute(url, "href")}>${post.title}</a>` })}<small>
by <a${addAttribute(`/author/${post.author.slug.current}/`, "href")}>${post.author.name}</a> • ${formatDate(post.publishedAt)}</small></div><p>${post.description}</p>${renderComponent($$result, "Link", $$Link, { "href": url, "text": "Read Post", "style": "secondary" })}</div></article>`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/components/PostCard.astro", void 0);

const $$Astro$1 = createAstro("https://resilient-pavlova-922456.netlify.app/");
const $$Pagination = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { prevUrl, nextUrl } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<nav aria-label="Blog pages">${prevUrl && renderTemplate`${renderComponent($$result, "Link", $$Link, { "text": "Previous", "href": prevUrl, "style": "primary", "borderVisible": true, "isFilled": false, "icon": {
    name: "tabler:arrow-big-left-line",
    side: "left"
  } })}`}${nextUrl && renderTemplate`${renderComponent($$result, "Link", $$Link, { "text": "Next", "href": nextUrl, "style": "primary", "borderVisible": true, "isFilled": false, "icon": {
    name: "tabler:arrow-big-right-line",
    side: "right"
  } })}`}</nav>`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/components/Pagination.astro", void 0);

const $$Astro = createAstro("https://resilient-pavlova-922456.netlify.app/");
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { page } = Astro2.params;
  const pageNumber = isIntegerString(page);
  if (pageNumber === void 0)
    return Astro2.redirect("/404");
  const pageSize = 3;
  const paginatedPosts = await getPaginatedPosts(pageSize, pageNumber);
  if (paginatedPosts.posts.length === 0)
    return Astro2.redirect("/404");
  const previousPageLink = pageNumber > 0 ? `/blog/${pageNumber - 1}/` : "";
  const nextPageLink = paginatedPosts.total > (pageNumber + 1) * pageSize ? `/blog/${pageNumber + 1}/` : "";
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Blog" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<section class="container" aria-label="New Blog Posts"><h1 class="h1">Blog Posts</h1><div class="post-container">${paginatedPosts.posts.map((post) => renderTemplate`${renderComponent($$result2, "PostCard", $$PostCard, { "post": post, "heading": "h2" })}`)}</div>${renderComponent($$result2, "Pagination", $$Pagination, { "prevUrl": previousPageLink, "nextUrl": nextPageLink })}</section>` })}`;
}, "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/pages/blog/[...page].astro", void 0);

const $$file = "/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/pages/blog/[...page].astro";
const $$url = "/blog/[...page]";

const ____page_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$MainLayout as $, ____page_ as _, $$PostCard as a, getAuthorPosts as b, $$CategoryCloud as c, getPost as d, getAllCategories as e, formatDate as f, getCategoryPosts as g, $$Link as h, getAllAuthors as i, getConfiguredImageService as j, imageConfig as k, isRemoteAllowed as l, baseService as m, parseQuality as p, urlForImage as u };
