// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";

import { markWhatsNewSeen, shouldShowWhatsNew } from "./whats-new";

describe("whats-new popup", () => {
  beforeEach(() => localStorage.clear());

  it("opens on the feed once per release, then stays closed", () => {
    expect(shouldShowWhatsNew("/feed", { onboardingCompleted: true })).toBe(true);
    markWhatsNewSeen();
    expect(shouldShowWhatsNew("/feed", { onboardingCompleted: true })).toBe(false);
  });

  it("opens again when the release id changes", () => {
    localStorage.setItem("whats-new-seen", "an-older-release");
    expect(shouldShowWhatsNew("/feed", { onboardingCompleted: true })).toBe(true);
  });

  it("waits for the onboarding and stays off other pages and signed-out visits", () => {
    expect(shouldShowWhatsNew("/feed", { onboardingCompleted: false })).toBe(false);
    expect(shouldShowWhatsNew("/boas-vindas", { onboardingCompleted: true })).toBe(false);
    expect(shouldShowWhatsNew("/feed", null)).toBe(false);
  });

  it("treats a backend without the onboarding field as done", () => {
    expect(shouldShowWhatsNew("/feed", {})).toBe(true);
  });
});
