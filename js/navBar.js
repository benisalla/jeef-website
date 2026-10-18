//---------------------------< responsive nav bar >---------------------------//
const toggleBtn = document.querySelector(".toggle-btn");
const navContent = document.querySelector(".nav-content");
const navBarContainer = document.querySelector(".navBar-container");
const emptyPusher = document.querySelector(".empty-pusher");

const MOBILE_BREAKPOINT = 750;
const FIXED_SCROLL_OFFSET = 70;

function toggleNavBar() {
  if (!toggleBtn || !navContent) return;

  if (window.innerWidth < MOBILE_BREAKPOINT) {
    toggleBtn.classList.add("collapsed");
    navContent.classList.add("collapsed");
  } else {
    toggleBtn.classList.remove("collapsed", "active");
    navContent.classList.remove("collapsed", "active");
  }
}

function openMenu(open) {
  toggleBtn.classList.toggle("active", open);
  navContent.classList.toggle("active", open);
  toggleBtn.setAttribute("aria-expanded", String(open));
}

if (toggleBtn && navContent) {
  toggleBtn.setAttribute("role", "button");
  toggleBtn.setAttribute("tabindex", "0");
  toggleBtn.setAttribute("aria-label", "Menu");
  toggleBtn.setAttribute("aria-expanded", "false");

  toggleBtn.addEventListener("click", () => {
    openMenu(!toggleBtn.classList.contains("active"));
  });

  toggleBtn.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openMenu(!toggleBtn.classList.contains("active"));
    }
  });

  // Close the mobile menu after choosing a link, or when clicking outside of it.
  navContent.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => openMenu(false));
  });

  document.addEventListener("click", (event) => {
    if (
      navContent.classList.contains("active") &&
      !navContent.contains(event.target) &&
      !toggleBtn.contains(event.target)
    ) {
      openMenu(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") openMenu(false);
  });

  toggleNavBar();
  window.addEventListener("resize", toggleNavBar);
}

//---------------------------< sticky nav bar >---------------------------//
if (navBarContainer) {
  let ticking = false;

  function updateFixedNav() {
    const fixed = window.scrollY > FIXED_SCROLL_OFFSET;
    const wasFixed = navBarContainer.classList.contains("fixed");

    if (emptyPusher) {
      // Reserve the nav bar's real height so the page does not jump when it becomes fixed.
      if (fixed && !wasFixed) {
        emptyPusher.style.height = navBarContainer.offsetHeight + "px";
      }
      emptyPusher.style.display = fixed ? "block" : "none";
    }

    navBarContainer.classList.toggle("fixed", fixed);
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateFixedNav);
        ticking = true;
      }
    },
    { passive: true }
  );

  updateFixedNav();
}

//---------------------------< pause decorative animations while off-screen >---------------------------//
// The 3D cube (events), the platform (about), the prism (experiences), the floating image (services)
// and the drawn circuit in the footer are infinite CSS animations. Running them while they are not
// visible wastes CPU/GPU and battery, so they are paused until they scroll into view.
(function () {
  const ANIMATED = ".jeef_magic_cube, .paltform-container, .my_animation, .animated, .anime";
  const targets = document.querySelectorAll(ANIMATED);
  if (!targets.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("anim-paused", !entry.isIntersecting);
      });
    },
    { rootMargin: "100px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
})();

//---------------------------< scroll reveal >---------------------------//
// Sections fade/slide in the first time they enter the viewport. Without JS nothing is hidden.
(function () {
  const REVEAL = ".section-wrapper, .card, .bordered, .method-container, .grid-container, .medsection, .flex-container, .flip-card, .slider";
  const items = document.querySelectorAll(REVEAL);
  if (!items.length || !("IntersectionObserver" in window)) return;

  document.documentElement.classList.add("js");
  items.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
})();
