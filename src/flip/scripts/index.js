/**
 * FLIP
 * First: First State Information
 * Last: Last State Information
 * Invert: Calculate Difference
 * Play: Play Animation
 */

// calculate the position differences
function diff(first, last) {
  return {
    top: first.top - last.top,
    left: first.left - last.left,
  };
}

// get random value in [m, n]
function rand(min, max) {
  const Range = max - min;
  const Rand = Math.random();
  const num = min + Math.round(Rand * Range); //四舍五入
  return num;
}

function parent(elm) {
  if (elm) {
    return elm.parentElement;
  }
}

let insertedNum = 1;
function createCard() {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.num = insertedNum++;
  return card;
}

function cardsFlip(doSomething) {
  const cards = [].slice.call(document.querySelectorAll(".card"));

  // first
  const first = cards.map((card) => card.getBoundingClientRect());

  doSomething(cards);

  // last
  const last = cards.map((card) => card.getBoundingClientRect());

  // invert
  const inverts = cards.map((card, i) => diff(first[i], last[i]));

  // animation configuration and play
  inverts.forEach((invert, i) => {
    const keyframs = [
      {
        transform: `translate(${invert.left}px, ${invert.top}px)`,
      },
      {
        transform: "translate(0, 0)",
      },
    ];

    cards[i].animate(keyframs, {
      duration: 800,
      easing: "cubic-bezier(0.25, 0.8, 0.25, 1)",
    });
  });
}

let prevParent = parent(document.querySelector(".card"));

document.getElementById("randomInsertBtn").addEventListener("click", () => {
  cardsFlip((cards) => {
    const pos = rand(0, cards.length);
    const parentElm = parent(cards[0]) || prevParent;
    const newCard = createCard();

    try {
      parentElm.insertBefore(newCard, cards[pos]);
    } catch {
      parentElm.appendChild(newCard);
    }

    prevParent = parentElm;
  });
});

document.getElementById("randomRemoveBtn").addEventListener("click", () => {
  cardsFlip((cards) => {
    if (!cards.length) return;
    const pos = rand(0, cards.length - 1);
    const parentElm = parent(cards[0]);
    parentElm.removeChild(cards[pos]);
  });
});
