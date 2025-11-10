/* scripts.js — Lorena Jacob | Consultoria Gratuita */

/* 🌿 Detecta se o dispositivo é touch (para estilização condicional, se quiser usar no CSS) */
(function () {
  const html = document.documentElement;
  html.classList.add("js");
  if ("ontouchstart" in window) {
    html.classList.add("touch");
  }
})();

/* 🎯 Rolagem suave até o formulário */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".btn-cta");
  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(btn.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 20,
          behavior: "smooth",
        });
      }
    });
  }
});

/* 💬 Confirmação visual de envio do formulário */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Simula envio (você pode substituir por lógica real)
      alert("🎉 Obrigado! Sua solicitação de consultoria foi enviada com sucesso.");

      form.reset();
    });
  }
});

/* 🔗 (Opcional) Preserva parâmetros UTM na navegação */
(function () {
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign"];
  const urlParams = new URLSearchParams(window.location.search);
  const storedUtms = JSON.parse(localStorage.getItem("lorena_utms") || "{}");

  let hasNewUtm = false;
  utmKeys.forEach((key) => {
    if (urlParams.has(key)) {
      storedUtms[key] = urlParams.get(key);
      hasNewUtm = true;
    }
  });

  if (hasNewUtm) localStorage.setItem("lorena_utms", JSON.stringify(storedUtms));

  document.querySelectorAll("a[href]").forEach((a) => {
    try {
      const href = new URL(a.href, window.location.origin);
      utmKeys.forEach((key) => {
        if (storedUtms[key] && !href.searchParams.has(key)) {
          href.searchParams.set(key, storedUtms[key]);
        }
      });
      a.href = href.toString();
    } catch {}
  });
})();
