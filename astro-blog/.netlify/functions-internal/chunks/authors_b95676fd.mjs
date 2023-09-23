export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';

const page = () => import('./pages/authors_f88640d9.mjs').then(n => n.d);

export { page };
