(function ($) {
  "use strict";

  // Copiar carteira ao clicar (usado para Token Address por exemplo)
  function copyWallet() {
    const wallet = document.getElementById("walletInput").value;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(wallet)
        .then(() => showCopyMessage())
        .catch(() => fallbackCopyText(wallet));
    } else {
      fallbackCopyText(wallet);
    }
  }

  function fallbackCopyText(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.top = 0;
    textarea.style.left = 0;
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      const successful = document.execCommand("copy");
      successful ? showCopyMessage() : alert("Não foi possível copiar");
    } catch (err) {
      alert("Erro ao copiar: " + err);
    }

    document.body.removeChild(textarea);
  }

  function showCopyMessage() {
    const msg = document.getElementById("copyMessage");
    if (!msg) return;
    msg.style.visibility = "visible";
    setTimeout(() => {
      msg.style.visibility = "hidden";
    }, 2000);
  }

  // Timer para fim de presale (countdown)
  function setupCountdown(selector, targetDateStr) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const targetTime = new Date(targetDateStr).getTime();

    function updateAllTimers() {
      const current = Date.now();
      const remaining = Math.max(0, Math.floor((targetTime - current) / 1000));

      const d = String(Math.floor(remaining / 86400)).padStart(2, '0');
      const h = String(Math.floor((remaining % 86400) / 3600)).padStart(2, '0');
      const m = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
      const s = String(remaining % 60).padStart(2, '0');

      elements.forEach(el => {
        el.innerHTML = `
          <li class="days">${d}<span>d</span></li>
          <li class="hours">${h}<span>h</span></li>
          <li class="minutes">${m}<span>m</span></li>
          <li class="seconds">${s}<span>s</span></li>
        `;
      });
    }

    updateAllTimers();
    setInterval(updateAllTimers, 1000);
  }

  



  
  // Executa ao carregar
  document.addEventListener("DOMContentLoaded", () => {
    setupCountdown(".presale-end-time", "2025-06-27T14:59:59Z");
  });

})(jQuery);
