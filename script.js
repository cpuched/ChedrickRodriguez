"use strict";

// Content is kept in data objects so the portfolio can grow without duplicating HTML.
const roles = {
  trainer: {
    title: "Universal Trainer",
    dates: "March 2025 — Present",
    description: "Now train and support teams across Manila, Peru, and India, adjusting my delivery to fit each team’s culture and operational setup. I work closely with cross-functional teams and leadership to keep processes aligned and updates cascaded on time, and I keep high-volume sessions engaging so people retain what they learn and stay ready for the floor.",
    bullets: [
      "Managed and facilitated training programs across diverse teams in Peru, India, and Manila, adapting delivery approaches to different cultural and operational environments.",
      "Coordinated with cross-functional teams and leadership to ensure consistent process alignment, timely cascading of updates, and effective resolution of training concerns.",
      "Successfully handled high-volume training sessions while maintaining engagement, knowledge retention, process accuracy, and operational readiness."
    ]
  },
  lead: {
    title: "Subject Matter Expert / Team Leader",
    previewLabel: "SUBJECT MATTER EXPERT / TEAM LEADER",
    dates: "October 2024 — February 2025",
    description: "Moved into leadership within two months, guiding a team of agents through live exam events and resolving concerns as they came up. I held the team to its KPIs, Zero Tolerance Policies, and QA standards, and made time for one-on-one coaching so teammates could grow while performance stayed strong.",
    bullets: [
      "Led a team of agents to ensure seamless operations during live events by efficiently addressing concerns and providing solutions.",
      "Maintained exceptional performance by consistently achieving key performance indicators (KPIs), adhering to Zero Tolerance Policies, and meeting quality assurance (QA) standards.",
      "Provided personalized coaching and mentorship to team members, fostering professional growth and cultivating a culture of positive leadership."
    ]
  },
  agent: {
    title: "Agent",
    dates: "August 2024 — September 2024",
    description: "Started as a remote proctor for high-stakes exams, where my job was protecting exam security from the first minute to the last. I documented incidents through CRM platforms with clear, detailed reports and professional correspondence, and stepped in on customer service calls and live chat whenever the team needed support.",
    bullets: [
      "Tasked with remotely proctoring a variety of high-stakes exams, responsible for promoting and maintaining the highest level of exam security.",
      "Documented exam incidents with detailed reports using CRM platforms and professional correspondence.",
      "Assisted in responding to customer service calls and live chat as needed."
    ]
  }
};

const skills = {
  web: [
    ["C", "", "assets/images/skills/c.webp"],
    ["Java", "", "assets/images/skills/java.webp"],
    ["Python", "", "assets/images/skills/python.webp"],
    ["HTML", "", "assets/images/skills/html-light.webp"],
    ["CSS", "", "assets/images/skills/css-light.webp"],
    ["JavaScript", "", "assets/images/skills/javascript-light.webp"],
    ["MySQL", "", "assets/images/skills/mysql.webp"],
    ["PostgreSQL", "", "assets/images/skills/postgres.webp"]
  ],
  tools: [
    ["CapCut", "", "assets/images/skills/capcut.webp"],
    ["DaVinci Resolve", "", "assets/images/skills/davinciresolve.webp"],
    ["Photoshop", "", "assets/images/skills/adobe-photoshop.webp"],
    ["Canva", "", "assets/images/skills/canva-com-logo.webp"],
    ["Excel", "", "assets/images/skills/microsoft-excel.webp"],
    ["Google Sheets", "", "assets/images/skills/google-sheets.webp"],
    ["GitHub", "", "assets/images/skills/github-light.webp"],
    ["Git", "", "assets/images/skills/git.webp"]
  ],
  communication: [ ["Facilitation", "", "↗"], ["Cross-cultural", "", "◎"], ["Knowledge Transfer", "", "⇄"], ["Coaching", "", "+" ] ],
  operations: [ ["Documentation", "", "≡"], ["Coordination", "", "⊞"], ["Incident Reporting", "", "!"], ["Quality Compliance", "", "✓"] ]
};

const evidence = {
  training: {
    title: "Global training",
    kicker: "EXPERIENCE → COMMUNICATION",
    description: "Training programs across Peru, India, and Manila developed practical ways of explaining processes and supporting different teams.",
    connections: ["Training facilitation", "Cross-cultural communication", "Knowledge transfer"]
  },
  operations: {
    title: "Live operations",
    kicker: "EXPERIENCE → OPERATIONS",
    description: "Working in live remote proctoring operations built a careful, structured approach to keeping work accurate and responsive.",
    connections: ["Operational coordination", "Incident reporting", "Quality and process compliance"]
  },
  digital: {
    title: "Digital practice",
    kicker: "EDUCATION → DIGITAL SKILLS",
    description: "Current IT studies and creative practice provide a growing foundation for building digital experiences and media.",
    connections: ["HTML, CSS, and JavaScript", "CapCut, DaVinci Resolve, Canva, and Photoshop", "Video editing experience"]
  }
};

const navigation = document.querySelectorAll("[data-scroll]");
const content = document.querySelector(".content");
const modal = document.getElementById("modal");
const transitionCurtain = document.getElementById("transition-curtain");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let lastFocusedElement;
let isTransitioning = false;
let careerInteractionsReady = false;

function usesPageScroll() {
  return window.matchMedia("(max-width: 720px)").matches;
}

function scrollPortfolioTo(top, behavior) {
  if (usesPageScroll()) window.scrollTo({ top, behavior });
  else content.scrollTo({ top, behavior });
}

function syncNavigation(target) {
  navigation.forEach(item => {
    const active = item.dataset.scroll === target || item.dataset.page === target;
    item.classList.toggle("active", active);
    if (item.classList.contains("nav-item")) item.setAttribute("aria-current", active ? "page" : "false");
  });
}

function isAtPortfolioBottom() {
  if (usesPageScroll()) {
    const page = document.documentElement;
    return window.scrollY + window.innerHeight >= page.scrollHeight - 8;
  }
  return content.scrollTop + content.clientHeight >= content.scrollHeight - 8;
}

function scrollToHomeSection(target) {
  const scroll = behavior => {
    if (target === "home") scrollPortfolioTo(0, behavior);
    else {
      const section = document.getElementById(target);
      const destination = usesPageScroll()
        ? window.scrollY + section.getBoundingClientRect().top - 18
        : content.scrollTop + section.getBoundingClientRect().top - content.getBoundingClientRect().top - 34;
      scrollPortfolioTo(Math.max(0, destination), behavior);
    }
    syncNavigation(target);
  };
  if (reducedMotion) { scroll("auto"); return; }

  // Use the same red vertical swipe for in-page navigation as for screen changes.
  isTransitioning = true;
  transitionCurtain.className = "transition-curtain cover";
  window.setTimeout(() => {
    scroll("auto");
    transitionCurtain.className = "transition-curtain reveal";
    window.setTimeout(() => { transitionCurtain.className = "transition-curtain"; isTransitioning = false; }, 390);
  }, 370);
}

function renderStoryPreviews() {
  document.querySelectorAll(".story[data-role]").forEach(story => {
    const role = roles[story.dataset.role];
    const label = role.previewLabel ? `<p class="eyebrow">${role.previewLabel}</p>` : "";
    story.querySelector(".story-details").innerHTML = `<div>${label}<p>${role.description}</p></div>`;
  });
}

async function prepareCareerInteractions() {
  const careerStories = document.querySelector(".career-stories");
  if (!careerStories) return;

  const sources = [
    "assets/images/career-agent.webp",
    "assets/images/career-team-leader.webp",
    "assets/images/career-trainer.webp"
  ];
  const imageReady = sources.map(source => {
    const image = new Image();
    image.src = source;
    return typeof image.decode === "function"
      ? image.decode().catch(() => undefined)
      : new Promise(resolve => {
          image.addEventListener("load", resolve, { once:true });
          image.addEventListener("error", resolve, { once:true });
        });
  });
  const fontsReady = document.fonts?.ready ?? Promise.resolve();

  await Promise.all([...imageReady, fontsReady]);
  // Resolve the final font metrics and decoded backgrounds before enabling flex motion.
  careerStories.getBoundingClientRect();
  requestAnimationFrame(() => requestAnimationFrame(() => {
    careerStories.classList.add("is-ready");
    careerInteractionsReady = true;
  }));
}

function renderFullRole(roleKey) {
  const role = roles[roleKey];
  const bulletList = role.bullets.map(item => `<li>${item}</li>`).join("");
  openModal(role.title, "FULL DETAILS", `<div class="career-detail-layout"><div class="career-detail-copy"><p class="meta">${role.dates}</p><ul class="career-full-list">${bulletList}</ul></div></div>`, "career-modal");
}

function renderSkills(category) {
  const grid = document.getElementById("skills-grid");
  grid.scrollLeft = 0;
  grid.innerHTML = skills[category].map(([name, description, symbol]) => {
    const icon = symbol.endsWith(".webp")
      ? `<img src="${symbol}" alt="" loading="lazy" decoding="async">`
      : symbol;
    const modalDescription = description || "Will be added.";
    return `<button class="skill-card" type="button" data-skill="${name}" data-description="${modalDescription}"><span class="skill-symbol">${icon}</span><b>${name}</b></button>`;
  }).join("");
  enableDepthEffects();
}

function openModal(title, kicker, content, variant = "") {
  lastFocusedElement = document.activeElement;
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-kicker").textContent = kicker;
  document.getElementById("modal-content").innerHTML = content;
  modal.classList.toggle("career-modal", variant === "career-modal");
  modal.classList.toggle("company-gallery-modal", variant === "company-gallery-modal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  document.querySelector(".app-shell").inert = true;
  document.querySelector(".mobile-nav").inert = true;
  modal.querySelector(".modal-card").scrollTop = 0;
  modal.querySelector(".modal-close").focus();
}

function closeModal() {
  modal.classList.remove("open");
  modal.classList.remove("career-modal");
  modal.classList.remove("company-gallery-modal");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  document.querySelector(".app-shell").inert = false;
  document.querySelector(".mobile-nav").inert = false;
  if (lastFocusedElement) lastFocusedElement.focus();
}

function setupSectionObservers() {
  const revealTargets = document.querySelectorAll(".home-section, .evidence-section");
  const observerRoot = usesPageScroll() ? null : content;
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(target => target.classList.add("is-visible"));
    return;
  }

  revealTargets.forEach(target => target.classList.add("reveal-pending"));
  document.getElementById("experience")?.classList.add("is-visible");
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, { root: observerRoot, threshold: .05 });
  revealTargets.forEach(target => revealObserver.observe(target));

  const progressObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) syncNavigation(isAtPortfolioBottom() ? "contact" : entry.target.id);
    });
  }, { root: observerRoot, rootMargin: "-18% 0px -62% 0px", threshold: 0 });
  document.querySelectorAll(".home-section").forEach(section => progressObserver.observe(section));
}

// Measure before tilting; measuring a transformed surface on every move causes feedback jitter.
function trackSurfacePointer(surface, update, reset) {
  let bounds;
  let layoutWidth = 0;
  let layoutHeight = 0;
  let frame = 0;
  let pointerX = 0;
  let pointerY = 0;
  let pointerTarget = surface;
  const measure = () => {
    bounds = surface.getBoundingClientRect();
    layoutWidth = surface.clientWidth;
    layoutHeight = surface.clientHeight;
  };
  const clear = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    bounds = null;
    reset();
  };
  surface.addEventListener("pointerenter", measure);
  surface.addEventListener("pointermove", event => {
    if (event.pointerType === "touch" || usesPageScroll() || window.matchMedia("(prefers-reduced-motion: reduce)").matches || modal.classList.contains("open")) { clear(); return; }
    if (!bounds || Math.abs(surface.clientWidth - layoutWidth) > 1 || Math.abs(surface.clientHeight - layoutHeight) > 1) measure();
    pointerX = event.clientX;
    pointerY = event.clientY;
    pointerTarget = event.target;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const x = Math.max(-.5, Math.min(.5, (pointerX - bounds.left) / bounds.width - .5));
      const y = Math.max(-.5, Math.min(.5, (pointerY - bounds.top) / bounds.height - .5));
      update(x, y, pointerTarget);
    });
  });
  surface.addEventListener("pointerleave", clear);
  surface.addEventListener("pointercancel", clear);
  // Scrolling invalidates pointer coordinates; settle until the next movement.
  content.addEventListener("scroll", clear, { passive: true });
  window.addEventListener("resize", clear, { passive: true });
}

// Restrained depth keeps large containers calm while their smaller cards respond locally.
function enableDepthEffects() {
  if (reducedMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  document.querySelectorAll(".hero,.resume-panel,.skill-card,.education-hero,.evidence-card,.role.story").forEach(surface => {
    if (surface.dataset.depthReady) return;
    surface.dataset.depthReady = "true";
    surface.classList.add("depth-surface");
    trackSurfacePointer(surface, (x, y, target) => {
      const nestedInteractive = target.closest?.(".role.story,.education-hero,.skill-card,.evidence-card,.filter");
      if (surface.classList.contains("resume-panel") && nestedInteractive) {
        surface.style.transform = "";
        return;
      }
      const strength = surface.classList.contains("hero") ? 5 : surface.classList.contains("resume-panel") ? 1.25 : 3.5;
      const lift = surface.classList.contains("resume-panel") ? -3 : -2;
      surface.style.transform = `perspective(1100px) rotateX(${y * -strength}deg) rotateY(${x * strength}deg) translateY(${lift}px)`;
    }, () => { surface.style.transform = ""; });
  });
}

document.querySelectorAll("[data-scroll]").forEach(item => item.addEventListener("click", event => {
  event.preventDefault();
  if (!isTransitioning) scrollToHomeSection(item.dataset.scroll);
}));

// Keep navigation in sync with the section currently nearest the top of Home.
function updateNavigationOnScroll() {
  if (isTransitioning) return;
  if (isAtPortfolioBottom()) {
    syncNavigation("contact");
    return;
  }
  const sectionNames = ["experience", "education", "skills", "contact"];
  const current = sectionNames.reduce((active, name) => {
    const top = document.getElementById(name).getBoundingClientRect().top;
    return top <= 170 ? name : active;
  }, "home");
  syncNavigation(current);
}

let scrollDepthTimer;
function settleDepthWhileScrolling() {
  document.body.classList.add("is-scrolling");
  window.clearTimeout(scrollDepthTimer);
  scrollDepthTimer = window.setTimeout(() => document.body.classList.remove("is-scrolling"), 140);
}

content.addEventListener("scroll", updateNavigationOnScroll);
content.addEventListener("scroll", settleDepthWhileScrolling, { passive:true });
window.addEventListener("scroll", updateNavigationOnScroll, { passive:true });
window.addEventListener("scroll", settleDepthWhileScrolling, { passive:true });

function activateRole(button) {
  if (button.classList.contains("active")) return;
  document.querySelectorAll(".role").forEach(role => { role.classList.remove("active"); role.setAttribute("aria-selected", "false"); });
  button.classList.add("active"); button.setAttribute("aria-selected", "true");
}

document.querySelectorAll(".role").forEach(button => {
  button.addEventListener("focus", () => { if (careerInteractionsReady) activateRole(button); });
  button.addEventListener("click", () => {
    activateRole(button);
    renderFullRole(button.dataset.role);
  });
  button.addEventListener("pointerenter", event => {
    if (careerInteractionsReady && event.pointerType === "mouse" && window.matchMedia("(hover: hover) and (pointer: fine)").matches) activateRole(button);
  });
});

// Education follows the career accordion: the current chapter stays expanded.
document.querySelectorAll(".education-hero").forEach(school => {
  const activateSchool = () => {
    document.querySelectorAll(".education-hero").forEach(item => item.classList.toggle("school-active", item === school));
  };
  school.addEventListener("pointerenter", event => {
    if (event.pointerType === "mouse" && window.matchMedia("(hover: hover) and (pointer: fine)").matches) activateSchool();
  });
  school.addEventListener("focus", activateSchool);
  school.addEventListener("click", activateSchool);
});

const portraitSwap = document.querySelector(".portrait-swap");
if (portraitSwap) {
  portraitSwap.addEventListener("click", () => {
    const showFunny = !portraitSwap.classList.contains("show-funny");
    portraitSwap.classList.toggle("show-funny", showFunny);
    portraitSwap.setAttribute("aria-pressed", String(showFunny));
    portraitSwap.setAttribute("aria-label", showFunny ? "Show Chedrick's professional portrait" : "Show Chedrick's funny portrait");
    portraitSwap.querySelector(".profile-professional").classList.toggle("is-active", !showFunny);
    portraitSwap.querySelector(".profile-funny").classList.toggle("is-active", showFunny);
  });
}

document.querySelectorAll("[data-skill-filter]").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll("[data-skill-filter]").forEach(tab => tab.classList.toggle("active", tab === button));
  renderSkills(button.dataset.skillFilter);
}));

document.addEventListener("click", event => {
  const skill = event.target.closest("[data-skill]");
  const evidenceCard = event.target.closest("[data-evidence]");
  const companyGallery = event.target.closest("[data-company-gallery]");
  if (skill?.dataset.description) openModal(skill.dataset.skill, "SKILL PROFILE", `<p>${skill.dataset.description}</p>`);
  if (companyGallery) {
    const placeholders = Array.from({ length: 16 }, (_, index) => `<div class="company-gallery-placeholder"><span>PHOTO ${String(index + 1).padStart(2, "0")}</span></div>`).join("");
    openModal("Photo Gallery", "DATAMATICS", `<p class="gallery-coming-soon">Work photos will be added soon.</p><div class="company-gallery-grid" aria-label="Datamatics photo placeholders">${placeholders}</div>`, "company-gallery-modal");
  }
  if (evidenceCard) {
    const item = evidence[evidenceCard.dataset.evidence];
    openModal(item.title, item.kicker, `<p>${item.description}</p><ul>${item.connections.map(connection => `<li>${connection}</li>`).join("")}</ul>`);
  }
});

modal.querySelector(".modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", event => {
  if (!modal.classList.contains("open")) return;
  if (event.key === "Escape") closeModal();
  if (event.key === "Tab") {
    const controls = [...modal.querySelectorAll('button, a[href], input, select, textarea, [tabindex="0"]')].filter(control => !control.disabled);
    const first = controls[0];
    const last = controls[controls.length - 1];
    if ((event.shiftKey && document.activeElement === first) || (!event.shiftKey && document.activeElement === last)) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    }
  }
});

renderStoryPreviews();
prepareCareerInteractions();
renderSkills("web");
enableDepthEffects();
setupSectionObservers();
syncNavigation("home");
