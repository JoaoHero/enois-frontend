import { WHATS_NEW } from "@/constants/whats-new";
import type { AuthUser } from "@/types/application/auth/auth-user";

/** Last release id the person closed, per browser. */
const SEEN_KEY = "whats-new-seen";

function lastSeen(): string | null {
  try {
    return localStorage.getItem(SEEN_KEY);
  } catch {
    // ponytail: no storage (restricted private tab) means "seen", never a popup on every visit.
    return WHATS_NEW.id;
  }
}

export function markWhatsNewSeen(): void {
  try {
    localStorage.setItem(SEEN_KEY, WHATS_NEW.id);
  } catch {
    // Without storage there is nothing to remember; lastSeen() already treats it as seen.
  }
}

/**
 * The popup opens on the feed only, for a signed-in person who is not about to be sent to the
 * onboarding, once per release. Seen state lives in localStorage, so another device shows it once
 * more (sync it on the profile if that ever bothers anyone).
 */
export function shouldShowWhatsNew(
  pathname: string,
  user: Pick<AuthUser, "onboardingCompleted"> | null | undefined,
): boolean {
  return (
    pathname === "/feed" &&
    !!user &&
    user.onboardingCompleted !== false &&
    lastSeen() !== WHATS_NEW.id
  );
}
