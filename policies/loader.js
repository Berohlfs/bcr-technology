/**
 * Loads the HTML fragment for the active app policy (see registry.js).
 * Keep this file free of per-project strings except fallbacks below.
 */
(function () {
  const html = document.documentElement;

  function policyErrorHtml(supportEmail) {
    const email = String(supportEmail);
    const text = email.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const href = "mailto:" + encodeURIComponent(email);
    return (
      '<a class="policy-back" href="./">← BCR Technology</a>' +
      '<article class="policy-document"><h1>Privacy policy unavailable</h1>' +
      "<p>This policy could not be loaded. For privacy requests, email " +
      '<a href="' +
      href +
      '">' +
      text +
      "</a>.</p></article>"
    );
  }

  async function loadActiveAppPolicy() {
    const reg = typeof window !== "undefined" ? window.BCRPolicies : null;
    if (!reg || !html.classList.contains("app-policy-mode")) return;
    const id = reg.getActivePolicyId && reg.getActivePolicyId();
    const entry = id && reg.POLICIES ? reg.POLICIES[id] : null;
    if (!entry) return;

    const root = document.getElementById("app-policy-root");
    const inner = root && root.querySelector(".app-policy-inner");
    if (!inner) return;

    const support = reg.supportEmail || "bernardo@bcr.tec.br";

    try {
      const res = await fetch(entry.fragmentUrl, { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      inner.innerHTML = await res.text();
      document.title = entry.documentTitle;
    } catch (_) {
      inner.innerHTML = policyErrorHtml(support);
      document.title = "Privacy Policy | BCR Technology";
    }
  }

  void loadActiveAppPolicy();
})();
