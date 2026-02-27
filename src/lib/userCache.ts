/**
 * In-memory + localStorage cache for user profile to avoid duplicate Firestore reads
 * and show data instantly when available. Also coalesces in-flight getDoc requests.
 */

const MEMORY_TTL_MS = 5 * 60 * 1000; // 5 min in-memory
const STORAGE_KEY = "equi_username";
const STORAGE_TS_KEY = "equi_username_ts";

let memoryCache: { uid: string; username: string; ts: number } | null = null;
let inFlightPromise: Promise<string | null> | null = null;
let inFlightUid: string | null = null;

export function getCachedUsername(uid: string): string | null {
  if (memoryCache && memoryCache.uid === uid && Date.now() - memoryCache.ts < MEMORY_TTL_MS) {
    return memoryCache.username;
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
  } catch {
    /* ignore */
  }
  return null;
}

export function setCachedUsername(uid: string, username: string): void {
  memoryCache = { uid, username, ts: Date.now() };
  try {
    localStorage.setItem(STORAGE_KEY, username);
    localStorage.setItem(STORAGE_TS_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}

export function clearUserCache(): void {
  memoryCache = null;
  inFlightPromise = null;
  inFlightUid = null;
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_TS_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * Fetch username from Firestore with request coalescing: only one network request per uid at a time.
 * Callers should use getCachedUsername(uid) first for instant display, then call this to refresh.
 */
export function fetchUsernameOnce(
  uid: string,
  fetcher: () => Promise<string | null>
): Promise<string | null> {
  if (inFlightUid === uid && inFlightPromise) return inFlightPromise;
  inFlightUid = uid;
  inFlightPromise = fetcher()
    .then((name) => {
      if (name) setCachedUsername(uid, name);
      return name;
    })
    .finally(() => {
      if (inFlightUid === uid) {
        inFlightUid = null;
        inFlightPromise = null;
      }
    });
  return inFlightPromise;
}
