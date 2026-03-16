/**
 * navStore — module-level singleton holding ordered navigation waypoints.
 *
 * Populated by ScrollEngine after all ScrollTriggers are registered.
 * Consumed by NavControls to drive Prev / Next navigation.
 */

export interface NavWaypoint {
  /** Scroll position in pixels */
  scroll: number;
  /** Short display label shown in the nav pill */
  label: string;
}

let _waypoints: NavWaypoint[] = [];
let _listeners: Array<() => void> = [];

export const navStore = {
  set(w: NavWaypoint[]) {
    _waypoints = w;
    _listeners.forEach((fn) => fn());
  },
  get(): NavWaypoint[] {
    return _waypoints;
  },
  subscribe(fn: () => void): () => void {
    _listeners.push(fn);
    return () => { _listeners = _listeners.filter((l) => l !== fn); };
  },
};
