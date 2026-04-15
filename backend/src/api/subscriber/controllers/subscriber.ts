import { factories } from '@strapi/strapi';

const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateMap) {
    if (now > entry.resetAt) rateMap.delete(ip);
  }
}, 5 * 60_000);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s\-()]{6,20}$/;

export default factories.createCoreController('api::subscriber.subscriber', ({ strapi }) => ({
  async create(ctx) {
    const ip = ctx.request.ip || ctx.ip || 'unknown';
    if (isRateLimited(ip)) {
      ctx.status = 429;
      ctx.body = { error: { message: 'Too many requests. Please try again later.' } };
      return;
    }

    const body = ctx.request.body?.data || {};

    if (body.company_name) {
      ctx.status = 200;
      ctx.body = { data: { id: 0 } };
      return;
    }
    delete body.company_name;

    const value = String(body.contact_value || '').trim();
    const type = body.contact_type === 'phone' ? 'phone' : 'email';

    if (!value) {
      ctx.status = 400;
      ctx.body = { error: { message: 'Contact value is required.' } };
      return;
    }
    if (type === 'email' && !EMAIL_RE.test(value)) {
      ctx.status = 400;
      ctx.body = { error: { message: 'Invalid email address.' } };
      return;
    }
    if (type === 'phone' && !PHONE_RE.test(value)) {
      ctx.status = 400;
      ctx.body = { error: { message: 'Invalid phone number.' } };
      return;
    }

    ctx.request.body = { data: { contact_value: value, contact_type: type } };
    return await super.create(ctx);
  },
}));
