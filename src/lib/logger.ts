const isDev = process.env.NODE_ENV !== 'production';

export const logger = {
  log: (...args: unknown[]) => {
    if (isDev) console.log('[LOG]:', ...args);
  },
  info: (...args: unknown[]) => {
    if (isDev) console.info('[INFO]:', ...args);
  },
  warn: (...args: unknown[]) => {
    if (isDev) console.warn('[WARN]:', ...args);
  },
  error: (...args: unknown[]) => {
    if (isDev) console.error('[ERROR]:', ...args);
  },
};
