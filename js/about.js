//---------------------------< typing effect in the intro title >---------------------------//
consoleText(["sommes-nous ?"], "text");

function consoleText(words, id) {
  const target = document.getElementById(id);
  const cursor = document.getElementById("console");
  if (!target || !words.length) return;

  let letterCount = 1;
  let direction = 1;
  let waiting = false;

  setInterval(function () {
    if (waiting) return;

    if (letterCount === 0) {
      waiting = true;
      target.textContent = "";
      setTimeout(function () {
        words.push(words.shift());
        direction = 1;
        letterCount = 1;
        waiting = false;
      }, 1000);
    } else if (letterCount === words[0].length + 1) {
      waiting = true;
      setTimeout(function () {
        direction = -1;
        letterCount += direction;
        waiting = false;
      }, 1500);
    } else {
      target.textContent = words[0].substring(0, letterCount);
      letterCount += direction;
    }
  }, 120);

  if (cursor) {
    setInterval(function () {
      cursor.classList.toggle("hidden");
    }, 400);
  }
}

//---------------------------< cells: large layout vs flip cards on mobile >---------------------------//
function layoutCells() {
  const cellContainer = document.querySelector(".container-cellule");
  const dispLarge = document.querySelector("#displayLarge");
  const dispMobile = document.querySelector("#displayMobile");
  if (!cellContainer || !dispLarge || !dispMobile) return;

  const large = window.innerWidth > 660;
  cellContainer.style.display = large ? "flex" : "none";
  dispLarge.style.display = large ? "block" : "none";
  dispMobile.style.display = large ? "none" : "flex";
}

layoutCells();
window.addEventListener("resize", layoutCells);

// Flip cards must also work on touch devices, where there is no hover.
document.querySelectorAll("#displayMobile .flip-card").forEach(function (card) {
  card.addEventListener("click", function () {
    card.classList.toggle("flipped");
  });
});
