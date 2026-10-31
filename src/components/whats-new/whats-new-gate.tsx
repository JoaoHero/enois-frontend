import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useRouterState } from "@tanstack/react-router";

import { WHATS_NEW } from "@/constants/whats-new";
import { WhatsNewDialog } from "@rede-enois/design-system/domain";

import { authApi } from "@/lib/api";
import { isNoticeDismissed, noticeShowsModal } from "@/lib/notice-dismissal";
import { hasSession } from "@/lib/require-auth";
import { markWhatsNewSeen, shouldShowWhatsNew } from "@/lib/whats-new";

import { useAdminNotice } from "@/components/notices/admin-notice";

/**
 * "O que há de novo" once per release, mounted on the root next to the onboarding guard. Shares
 * the `auth-me` query with it (same key, one request) and never opens on top of an admin notice
 * popup.
 */
export function WhatsNewGate() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);
  const notice = useAdminNotice();

  const { data: user } = useQuery({
    queryKey: ["auth-me"],
    queryFn: () => authApi.me(),
    enabled: pathname === "/feed" && hasSession(),
    staleTime: 60_000,
  });

  useEffect(() => {
    // ponytail: dismissal is read from storage, so after closing an admin notice this opens on the
    // next navigation or visit, not in the same second. Fine for a once-per-release popup.
    const noticePending =
      !!notice && noticeShowsModal(notice.surface) && !isNoticeDismissed("modal", notice);
    if (!noticePending && shouldShowWhatsNew(pathname, user)) setOpen(true);
  }, [pathname, user, notice]);

  return (
    <WhatsNewDialog
      open={open}
      onOpenChange={(next) => {
        if (next) return;
        markWhatsNewSeen();
        setOpen(false);
      }}
      items={WHATS_NEW.items}
    />
  );
}
