//---------------------------< theme switcher >---------------------------//
const THEME_KEY = "jeef-theme";
const sun = "./img/sun.png";
const moon = "./img/moon.png";

const root = document.documentElement;
const body = document.body;
const themeContainer = document.querySelector(".theme-container");
const themeIcon = document.getElementById("theme-icon");

body.style.transition = "background 0.5s";

function applyTheme(theme) {
  if (theme === "light") {
    root.style.setProperty("--bs-dark", "#212529");
    root.style.setProperty("--clr-darker", "#fff");
    root.style.setProperty("--clr-dark", "#eee");
    root.style.setProperty("--clr-light", "#222");
    root.style.setProperty("--clr-white", "#000");
    body.style.setProperty(
      "background",
      "transparent linear-gradient(143deg, #E0E1F2 0%, #ECE9EB 22%, #EDEAEA 76%, #FFE2E2 100%) 0% 0% no-repeat padding-box"
    );
    if (themeIcon) themeIcon.src = moon;
  } else {
    root.style.setProperty("--bs-dark", "#212529");
    root.style.setProperty("--clr-darker", "#1b212c");
    root.style.setProperty("--clr-dark", "#1f2153");
    root.style.setProperty("--clr-light", "#9fa1bc");
    root.style.setProperty("--clr-white", "#ffffff");
    body.style.setProperty(
      "background",
      "transparent linear-gradient(160deg, #1b212c 0%, #1f2153 100%) 0% 0% no-repeat padding-box"
    );
    if (themeIcon) themeIcon.src = sun;
  }

  if (themeContainer) {
    themeContainer.classList.toggle("shadow-light", theme === "light");
    themeContainer.classList.toggle("shadow-dark", theme !== "light");
    themeContainer.setAttribute("aria-pressed", String(theme === "light"));
  }
}

function currentTheme() {
  try {
    return localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
  } catch (e) {
    return "dark";
  }
}

function toggleTheme() {
  const next = currentTheme() === "light" ? "dark" : "light";
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch (e) {
    /* storage unavailable (private mode) – theme just won't persist */
  }

  if (themeIcon) {
    themeIcon.classList.add("change");
    setTimeout(() => themeIcon.classList.remove("change"), 300);
  }
  applyTheme(next);
}

if (themeContainer) {
  themeContainer.setAttribute("role", "button");
  themeContainer.setAttribute("tabindex", "0");
  themeContainer.setAttribute("aria-label", "Changer le thème");
  themeContainer.addEventListener("click", toggleTheme);
  themeContainer.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleTheme();
    }
  });
}

applyTheme(currentTheme());

//---------------------------< image swipers (event page) >---------------------------//
function initSwiper(selector) {
  const swiper = document.querySelector(selector);
  if (!swiper) return;

  const slides = swiper.querySelectorAll(".slide div");
  const bullets = swiper.querySelectorAll(".bollet span");
  const right = swiper.querySelector(".go-right");
  const left = swiper.querySelector(".go-left");
  const track = swiper.querySelector(".slide");
  const count = slides.length;
  if (!count || !right || !left) return;

  let first = 0;
  let second = 1 % count;

  function render() {
    slides.forEach((el) => el.classList.remove("active", "active-secondary"));
    bullets.forEach((el) => el.classList.remove("active"));
    slides[first].classList.add("active");
    if (count > 1) slides[second].classList.add("active-secondary");
    if (bullets[first]) bullets[first].classList.add("active");
    track.style.flexDirection = first > second ? "row-reverse" : "row";
  }

  right.addEventListener("click", () => {
    first = second;
    second = (second + 1) % count;
    render();
  });

  left.addEventListener("click", () => {
    second = first;
    first = (first - 1 + count) % count;
    render();
  });

  bullets.forEach((bullet, index) => {
    bullet.setAttribute("role", "button");
    bullet.setAttribute("aria-label", "Image " + (index + 1));
    bullet.addEventListener("click", () => {
      first = index;
      second = (index + 1) % count;
      render();
    });
  });

  right.setAttribute("aria-label", "Image suivante");
  left.setAttribute("aria-label", "Image précédente");
}

initSwiper(".swipper-one");
initSwiper(".swipper-two");
