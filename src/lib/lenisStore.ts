/**
 * lenisStore — module-level singleton so any component can access the
 * Lenis instance without prop-drilling or React context overhead.
 *
 * Usage:
 *   import { lenisStore } from '@/lib/lenisStore';
 *   lenisStore.get()?.scrollTo(element, { duration: 1.5 });
 */

import type Lenis from "lenis";

let _instance: Lenis | null = null;

export const lenisStore = {
  set(l: Lenis) {
    _instance = l;
  },
  get(): Lenis | null {
    return _instance;
  },
  /** Scroll to a position / element / selector via Lenis. No-op if not ready. */
  scrollTo(
    target: number | string | HTMLElement,
    opts?: Parameters<Lenis["scrollTo"]>[1]
  ) {
    _instance?.scrollTo(target as never, opts);
  },
};
