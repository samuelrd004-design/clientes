(function () {
  "use strict";

  // Header shadow on scroll
  var header = document.querySelector(".site-header");
  if (header) {
    var applyScrollState = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    applyScrollState();
    window.addEventListener("scroll", applyScrollState, { passive: true });
  }

  // Mobile nav toggle
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      document.body.style.overflow = open ? "hidden" : "";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  // Picker "Para quem é a consulta?"
  var pickerTabs = document.querySelectorAll(".picker__tab");
  var pickerText = document.getElementById("pickerText");
  var pickerCta = document.getElementById("pickerCta");
  var pickerCtaLabel = document.getElementById("pickerCtaLabel");

  if (pickerTabs.length && pickerText && pickerCta) {
    pickerTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        pickerTabs.forEach(function (t) {
          t.classList.remove("is-active");
          t.setAttribute("aria-pressed", "false");
        });
        tab.classList.add("is-active");
        tab.setAttribute("aria-pressed", "true");
        pickerText.textContent = tab.getAttribute("data-text");
        pickerCta.href = tab.getAttribute("data-href");
        if (pickerCtaLabel) pickerCtaLabel.textContent = tab.getAttribute("data-label");
      });
    });
  }

  // FAQ accordion
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var btn = item.querySelector(".faq-item__q");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var wasOpen = item.classList.contains("is-open");
      faqItems.forEach(function (i) {
        i.classList.remove("is-open");
        i.querySelector(".faq-item__q").setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Scroll-reveal
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  }
})();
