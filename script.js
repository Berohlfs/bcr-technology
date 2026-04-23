(function () {
  const STORAGE_KEY = "bcr-lang";
  const supported = ["en", "pt"];
  const body = document.body;
  const html = document.documentElement;

  function applyLang(lang) {
    if (!supported.includes(lang)) lang = "en";
    body.classList.remove("lang-en", "lang-pt");
    body.classList.add("lang-" + lang);
    html.lang = lang === "pt" ? "pt-BR" : "en";
    document.querySelectorAll("[data-set-lang]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.setLang === lang);
    });
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {}
  }

  const saved = (() => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (_) {
      return null;
    }
  })();
  applyLang(saved || "en");

  document.querySelectorAll("[data-set-lang]").forEach((btn) => {
    btn.addEventListener("click", () => applyLang(btn.dataset.setLang));
  });

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
