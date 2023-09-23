import 'cookie';
import 'kleur/colors';
import 'string-width';
import '@astrojs/internal-helpers/path';
import './chunks/astro_7afa4864.mjs';
import 'clsx';
import 'mime';
import { compile } from 'path-to-regexp';
import 'html-escaper';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

new TextEncoder();

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/image-endpoint.js","pathname":"/_image","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const e=document.querySelectorAll(\"[data-navLink]\");e.forEach(t=>{t.getAttribute(\"href\")===window.location.pathname&&t.setAttribute(\"aria-current\",\"page\")});document.querySelector(\"#copyright\").textContent=new Date().getFullYear().toString();\n"}],"styles":[{"type":"inline","content":"a[data-astro-cid-d242pyyr]{-webkit-text-decoration:none;text-decoration:none}h3[data-astro-cid-d242pyyr]{text-wrap:nowrap;text-align:center}\n"},{"type":"external","src":"/_astro/404.7c6ce8d7.css"}],"routeData":{"route":"/categories","type":"page","pattern":"^\\/categories\\/?$","segments":[[{"content":"categories","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/categories.astro","pathname":"/categories","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const e=document.querySelectorAll(\"[data-navLink]\");e.forEach(t=>{t.getAttribute(\"href\")===window.location.pathname&&t.setAttribute(\"aria-current\",\"page\")});document.querySelector(\"#copyright\").textContent=new Date().getFullYear().toString();\n"}],"styles":[{"type":"external","src":"/_astro/404.7c6ce8d7.css"}],"routeData":{"route":"/category/[...slug]","type":"page","pattern":"^\\/category(?:\\/(.*?))?\\/?$","segments":[[{"content":"category","dynamic":false,"spread":false}],[{"content":"...slug","dynamic":true,"spread":true}]],"params":["...slug"],"component":"src/pages/category/[...slug].astro","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const e=document.querySelectorAll(\"[data-navLink]\");e.forEach(t=>{t.getAttribute(\"href\")===window.location.pathname&&t.setAttribute(\"aria-current\",\"page\")});document.querySelector(\"#copyright\").textContent=new Date().getFullYear().toString();\n"}],"styles":[{"type":"external","src":"/_astro/404.7c6ce8d7.css"},{"type":"inline","content":"h3[data-astro-cid-32rj7774]{text-wrap:nowrap}.actions[data-astro-cid-32rj7774]{display:flex;gap:.5em}\n"}],"routeData":{"route":"/authors","type":"page","pattern":"^\\/authors\\/?$","segments":[[{"content":"authors","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/authors.astro","pathname":"/authors","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const e=document.querySelectorAll(\"[data-navLink]\");e.forEach(t=>{t.getAttribute(\"href\")===window.location.pathname&&t.setAttribute(\"aria-current\",\"page\")});document.querySelector(\"#copyright\").textContent=new Date().getFullYear().toString();\n"}],"styles":[{"type":"external","src":"/_astro/404.7c6ce8d7.css"}],"routeData":{"route":"/author/[...slug]","type":"page","pattern":"^\\/author(?:\\/(.*?))?\\/?$","segments":[[{"content":"author","dynamic":false,"spread":false}],[{"content":"...slug","dynamic":true,"spread":true}]],"params":["...slug"],"component":"src/pages/author/[...slug].astro","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const e=document.querySelectorAll(\"[data-navLink]\");e.forEach(t=>{t.getAttribute(\"href\")===window.location.pathname&&t.setAttribute(\"aria-current\",\"page\")});document.querySelector(\"#copyright\").textContent=new Date().getFullYear().toString();\n"}],"styles":[{"type":"external","src":"/_astro/404.7c6ce8d7.css"}],"routeData":{"route":"/blog/[...page]","type":"page","pattern":"^\\/blog(?:\\/(.*?))?\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"...page","dynamic":true,"spread":true}]],"params":["...page"],"component":"src/pages/blog/[...page].astro","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const e=document.querySelectorAll(\"[data-navLink]\");e.forEach(t=>{t.getAttribute(\"href\")===window.location.pathname&&t.setAttribute(\"aria-current\",\"page\")});document.querySelector(\"#copyright\").textContent=new Date().getFullYear().toString();\n"}],"styles":[{"type":"external","src":"/_astro/404.7c6ce8d7.css"}],"routeData":{"route":"/post/[...slug]","type":"page","pattern":"^\\/post(?:\\/(.*?))?\\/?$","segments":[[{"content":"post","dynamic":false,"spread":false}],[{"content":"...slug","dynamic":true,"spread":true}]],"params":["...slug"],"component":"src/pages/post/[...slug].astro","prerender":false,"_meta":{"trailingSlash":"ignore"}}}],"base":"/","compressHTML":true,"componentMetadata":[["/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/pages/author/[...slug].astro",{"propagation":"none","containsHead":true}],["/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/pages/authors.astro",{"propagation":"none","containsHead":true}],["/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/pages/blog/[...page].astro",{"propagation":"none","containsHead":true}],["/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/pages/categories.astro",{"propagation":"none","containsHead":true}],["/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/pages/category/[...slug].astro",{"propagation":"none","containsHead":true}],["/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/src/pages/post/[...slug].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var r=(i,c,s)=>{let n=async()=>{await(await i())()},t=new IntersectionObserver(e=>{for(let o of e)if(o.isIntersecting){t.disconnect(),n();break}});for(let e of s.children)t.observe(e)};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000empty-middleware":"_empty-middleware.mjs","/src/pages/authors.astro":"chunks/pages/authors_a0e7f218.mjs","/src/pages/categories.astro":"chunks/pages/categories_505a1db6.mjs","/node_modules/astro/dist/assets/image-endpoint.js":"chunks/pages/image-endpoint_f660a157.mjs","\u0000@astrojs-manifest":"manifest_2dd0e045.mjs","\u0000@astro-page:node_modules/astro/dist/assets/image-endpoint@_@js":"chunks/image-endpoint_c1606fab.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_d72f814f.mjs","\u0000@astro-page:src/pages/categories@_@astro":"chunks/categories_f47c891a.mjs","\u0000@astro-page:src/pages/category/[...slug]@_@astro":"chunks/_.._f8102198.mjs","\u0000@astro-page:src/pages/authors@_@astro":"chunks/authors_8203cde6.mjs","\u0000@astro-page:src/pages/author/[...slug]@_@astro":"chunks/_.._0013794f.mjs","\u0000@astro-page:src/pages/blog/[...page]@_@astro":"chunks/_.._1e1341af.mjs","\u0000@astro-page:src/pages/post/[...slug]@_@astro":"chunks/_.._f84b301a.mjs","\u0000@astro-page:src/pages/404@_@astro":"chunks/404_7c1e7890.mjs","/Users/barry/Development/Astro/astro-blog-sanity/astro-blog/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_5988e66d.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.876af8ed.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/404.7c6ce8d7.css","/_astro/authors.cf10f167.css","/_astro/categories.2cb055b4.css","/favicon.svg","/images/logo.png","/index.html","/404.html"]});

export { manifest };
