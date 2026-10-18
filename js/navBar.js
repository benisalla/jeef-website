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
