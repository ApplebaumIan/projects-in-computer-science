// filepath: documentation/src/utils/jsUtils.ts
// Minimal utility used by the showcase components.

export function sortBy<T, K = any>(arr: T[], iteratee: (item: T) => K): T[] {
  // Stable-ish copy-sort implementation that handles numbers and strings.
  return [...arr].sort((a, b) => {
    const va = iteratee(a) as any;
    const vb = iteratee(b) as any;
    if (va === vb) return 0;
    if (va == null) return 1;
    if (vb == null) return -1;
    if (typeof va === 'number' && typeof vb === 'number') return va - vb;
    const sa = String(va);
    const sb = String(vb);
    return sa.localeCompare(sb);
  });
}

