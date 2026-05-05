const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function splitTitle() {
  const title = document.querySelector(".split-title");
  if (!title) return;

  const words = title.textContent.trim().split(" ");
  title.innerHTML = words
    .map((word) => `<span class="split-word"><span>${word}</span></span>`)
    .join(" ");
}

function animateCounters() {
  document.querySelectorAll("[data-counter]").forEach((counter) => {
    const value = Number(counter.dataset.counter);
    const state = { value: 0 };

    gsap.to(state, {
      value,
      duration: 1.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: counter,
        start: "top 82%",
        once: true,
      },
      onUpdate: () => {
        counter.textContent = Math.round(state.value).toString();
      },
    });
  });
}

function initReveals() {
  gsap.utils.toArray(".reveal").forEach((item) => {
    if (item.matches(".capability-card, .impact-card, .stack-column")) return;

    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 84%",
      },
    });
  });
}

function initScrollProgress() {
  const progress = document.querySelector(".scroll-progress span");
  if (!progress) return;

  gsap.to(progress, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.2,
    },
  });
}

function initHero() {
  const lines = document.querySelectorAll(".split-word > span");

  gsap.from(lines, {
    yPercent: 110,
    opacity: 0,
    duration: 1.05,
    ease: "power4.out",
    stagger: 0.045,
    delay: 0.18,
  });

  gsap.to(".hero-visual img", {
    y: -46,
    rotate: -1.8,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  [".card-one", ".card-two", ".card-three"].forEach((selector, index) => {
    const config = [
      { y: 36, x: -24 },
      { y: -42, x: 28 },
      { y: 22, x: -16 },
    ][index];

    if (!document.querySelector(selector)) return;
    gsap.to(selector, {
      ...config,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}

function initMotionCards() {
  gsap.utils.toArray(".motion-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotateX: y * -7,
        rotateY: x * 9,
        y: -8,
        transformPerspective: 850,
        duration: 0.28,
        ease: "power2.out",
      });
    });

    card.addEventListener("pointerleave", () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        y: 0,
        duration: 0.45,
        ease: "elastic.out(1, 0.45)",
      });
    });
  });
}

function initStory() {
  const cards = gsap.utils.toArray(".story-card");
  if (!cards.length) return;

  cards.forEach((card, index) => {
    gsap.set(card, {
      opacity: index === 0 ? 1 : 0,
      y: index === 0 ? 0 : 72,
      scale: index === 0 ? 1 : 0.96,
    });
  });

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".pin-story",
      start: "top top",
      end: `+=${cards.length * 90}%`,
      scrub: 1.15,
      pin: true,
      snap: {
        snapTo: 1 / (cards.length - 1),
        duration: 0.25,
        directional: false,
      },
    },
  });

  cards.forEach((card, index) => {
    if (index === 0) return;

    timeline
      .to(cards[index - 1], {
        opacity: 0,
        y: -70,
        scale: 0.96,
        duration: 0.55,
      })
      .to(
        card,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
        },
        "<"
      );
  });
}

function initHorizontal() {
  const section = document.querySelector(".horizontal");
  const track = document.querySelector(".horizontal-track");
  if (!section || !track) return;

  const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + 80);

  gsap.to(track, {
    x: () => -getDistance(),
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${getDistance()}`,
      scrub: 1,
      pin: true,
      invalidateOnRefresh: true,
    },
  });
}

function initSecurityCards() {
  gsap.utils.toArray(".security-item, .faq-item").forEach((card) => {
    gsap.fromTo(
      card,
      { y: 60, rotateX: 8 },
      {
        y: 0,
        rotateX: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 78%",
          end: "bottom 55%",
          scrub: 1,
        },
      }
    );
  });
}

function initSectionMotion() {
  gsap.utils.toArray(".capability-card").forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 70,
      rotateZ: index % 2 === 0 ? -2 : 2,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 82%",
      },
    });
  });

  gsap.utils.toArray(".impact-card").forEach((card, index) => {
    gsap.fromTo(
      card,
      { y: 70, opacity: 0, scale: 0.94 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        delay: index * 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      }
    );
  });

  gsap.utils.toArray(".stack-column").forEach((card, index) => {
    gsap.fromTo(
      card,
      { xPercent: index === 1 ? 0 : index === 0 ? -12 : 12, opacity: 0.35 },
      {
        xPercent: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".stack",
          start: "top 80%",
          end: "bottom 55%",
          scrub: 1,
        },
      }
    );
  });
}

function initButtons() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      event.preventDefault();
      if (!gsap.plugins.ScrollToPlugin && !window.ScrollToPlugin) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      gsap.to(window, {
        duration: 0.75,
        scrollTo: { y: target, offsetY: 72 },
        ease: "power2.inOut",
      });
    });
  });
}

function initEstimator() {
  const leadForm = document.querySelector("#leadForm");
  const projectType = document.querySelector("#projectType");
  const pageCount = document.querySelector("#pageCount");
  const pageValue = document.querySelector("#pageValue");
  const motionLevel = document.querySelector("#motionLevel");
  const deliverySpeed = document.querySelector("#deliverySpeed");
  const estimateTotal = document.querySelector("#estimateTotal");
  const estimateNote = document.querySelector("#estimateNote");
  const quoteButton = document.querySelector("#quoteButton");
  const quoteStatus = document.querySelector("#quoteStatus");
  const fullName = document.querySelector("#fullName");
  const companyName = document.querySelector("#companyName");
  const contactInfo = document.querySelector("#contactInfo");
  const projectBrief = document.querySelector("#projectBrief");

  if (!leadForm || !projectType || !pageCount || !motionLevel || !deliverySpeed || !estimateTotal) return;

  let currentEstimate = "";

  const formatter = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  });

  const updateEstimate = () => {
    const base = Number(projectType.value);
    const pages = Number(pageCount.value);
    const motion = Number(motionLevel.value);
    const speed = Number(deliverySpeed.value);
    const pageCost = Math.max(0, pages - 1) * 4500;
    const estimate = Math.round((base + pageCost + motion) * speed);
    const low = Math.round(estimate * 0.88);
    const high = Math.round(estimate * 1.18);

    if (pageValue) pageValue.textContent = pages.toString();
    currentEstimate = `${formatter.format(low)} - ${formatter.format(high)}`;
    estimateTotal.textContent = currentEstimate;

    if (estimateNote) {
      estimateNote.textContent =
        pages > 7
          ? "Kapsam buyudugu icin net teklif oncesi ekran listesi cikarilmasi gerekir."
          : "Bu aralik tasarim, frontend gelistirme ve temel yayin hazirligini kapsar.";
    }
  };

  const openMailFallback = () => {
    const full = fullName?.value.trim() || "Ad soyad belirtilmedi";
    const company = companyName?.value.trim() || "Firma adi belirtilmedi";
    const contact = contactInfo?.value.trim() || "Iletisim belirtilmedi";
    const brief = projectBrief?.value.trim() || "Proje ozeti belirtilmedi";
    const subject = encodeURIComponent(`bekolitech teklif talebi - ${company}`);
    const body = encodeURIComponent(
      [
        "Merhaba bekolitech,",
        "",
        "Web projem icin teklif almak istiyorum.",
        "",
        `Ad Soyad: ${full}`,
        `Firma: ${company}`,
        `Iletisim: ${contact}`,
        `Proje tipi: ${projectType.selectedOptions[0].textContent}`,
        `Ekran sayisi: ${pageCount.value}`,
        `Animasyon seviyesi: ${motionLevel.selectedOptions[0].textContent}`,
        `Teslim onceligi: ${deliverySpeed.selectedOptions[0].textContent}`,
        `On fiyat araligi: ${currentEstimate}`,
        "",
        `Proje ozeti: ${brief}`,
      ].join("\n")
    );

    if (quoteStatus) quoteStatus.textContent = "Form endpoint erisilemedi. Mail uygulamasi aciliyor.";
    window.location.href = `mailto:teklif@bekolitech.com?subject=${subject}&body=${body}`;
  };

  const sendQuote = async (event) => {
    event.preventDefault();

    if (!leadForm.reportValidity()) return;
    if (quoteStatus) quoteStatus.textContent = "Basvuru gonderiliyor...";
    if (quoteButton) quoteButton.setAttribute("aria-busy", "true");

    const formData = new FormData(leadForm);
    formData.set("on_fiyat_araligi", currentEstimate);
    formData.set("ekran_sayisi", pageCount.value);
    formData.set("motion_seviyesi_etiket", motionLevel.selectedOptions[0].textContent || "");
    formData.set("teslim_onceligi_etiket", deliverySpeed.selectedOptions[0].textContent || "");
    formData.set("proje_tipi_etiket", projectType.selectedOptions[0].textContent || "");
    formData.set("source_page", window.location.href);

    try {
      const response = await fetch(leadForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) throw new Error("request_failed");

      if (quoteStatus) {
        quoteStatus.textContent =
          "Basvurunuz alindi. Kisa sure icinde donus saglanacak. Acil durum icin WhatsApp hattini da kullanabilirsiniz.";
      }

      leadForm.reset();
      pageCount.value = "5";
      updateEstimate();
    } catch {
      openMailFallback();
    } finally {
      if (quoteButton) quoteButton.removeAttribute("aria-busy");
    }
  };

  [projectType, pageCount, motionLevel, deliverySpeed].forEach((field) => {
    field.addEventListener("input", updateEstimate);
    field.addEventListener("change", updateEstimate);
  });

  leadForm.addEventListener("submit", sendQuote);
  updateEstimate();
}

function loadScrollToPluginFallback() {
  return new Promise((resolve) => {
    if (gsap.plugins.ScrollToPlugin || window.ScrollToPlugin) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js";
    script.onload = resolve;
    script.onerror = resolve;
    document.head.appendChild(script);
  });
}

async function init() {
  splitTitle();
  initEstimator();

  if (prefersReducedMotion || !window.gsap || !window.ScrollTrigger) {
    document.querySelectorAll(".reveal").forEach((item) => {
      item.style.opacity = 1;
      item.style.transform = "none";
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  await loadScrollToPluginFallback();
  if (window.ScrollToPlugin) gsap.registerPlugin(window.ScrollToPlugin);

  initScrollProgress();
  initHero();
  initReveals();
  animateCounters();
  initStory();
  initHorizontal();
  initSecurityCards();
  initSectionMotion();
  initMotionCards();
  initButtons();
}

window.addEventListener("load", init);
