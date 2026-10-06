/* =========================================================
   GOOGLE SHEETS WEB APP
========================================================= */

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwaT7hckl0gb4V43jTxKcHdNZwgapF236hxDj3RdzbYnxMvp6iRAfAh8_t5kKlLnnc5/exec";


/* =========================================================
   GIFT DATA
========================================================= */

const gifts = {

  1: {
    title: "A Cozy Day Away",

    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=3840&q=95",

    description:
      "A relaxed day at a premium Airbnb, with time set aside for cooking a fun meal together, trying a new recipe, and enjoying an easygoing day away from the usual routine."
  },


  2: {
    title: "Jump Day",

    image:
      "https://images.pexels.com/photos/6571947/pexels-photo-6571947.jpeg?auto=compress&cs=tinysrgb&w=3840",

    description:
      "A fun day at a trampoline park — jumping around, trying different activities, laughing at the silly moments, and making the day as energetic as possible."
  },


  3: {
    title: "Movie Escape",

    image:
      "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=3840",

    description:
      "Pick a movie, grab your favourite snacks, settle in, and turn an ordinary cinema trip into a proper birthday outing."
  },


  4: {
    title: "Grand Venice Mall",

    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Grand_Venice_Mall_inertia.jpg",

    description:
      "Take a cab to The Grand Venice Mall in Greater Noida, explore its Venetian-style architecture, walk around the themed spaces, stop for food, and enjoy the day together."
  },


  5: {
    title: "Escape / Mystery Room",

    image:
      "https://images.pexels.com/photos/29483111/pexels-photo-29483111.jpeg?auto=compress&cs=tinysrgb&w=3840",

    description:
      "A mystery-filled escape room adventure — solve clues, discover hidden puzzles, work together, and see if you can escape before time runs out."
  }

};


/* =========================================================
   STATE
========================================================= */

let selectedGifts = [];

let currentGift = null;


/* =========================================================
   SCREEN NAVIGATION
========================================================= */

function showScreen(id) {

  document
    .querySelectorAll(".screen")
    .forEach(screen => {
      screen.classList.remove("active");
    });


  const target =
    document.getElementById(id);


  if (!target) {
    return;
  }


  target.classList.add("active");


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================================
   BALLOON
========================================================= */

function popBalloon() {

  const button =
    document.getElementById("balloonBtn");

  const balloon =
    button
      ? button.querySelector(".balloon")
      : null;

  const message =
    document.getElementById("popMessage");


  if (!button || button.disabled) {
    return;
  }


  button.disabled = true;


  if (balloon) {
    balloon.classList.add("burst");
  }


  if (message) {
    message.textContent =
      "✦ Surprise unlocked!";
  }


  burstParticles();


  setTimeout(() => {

    showScreen("wish");

  }, 850);

}


/* =========================================================
   BALLOON BURST PARTICLES
========================================================= */

function burstParticles() {

  const symbols = [
    "♥",
    "✦",
    "♡",
    "✧"
  ];


  for (let i = 0; i < 24; i++) {

    const particle =
      document.createElement("div");


    particle.className =
      "burst-particle";


    particle.textContent =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];


    particle.style.left =
      "50%";

    particle.style.top =
      "48%";


    particle.style.fontSize =
      `${12 + Math.random() * 20}px`;


    particle.style.setProperty(
      "--x",
      `${(Math.random() - 0.5) * 500}px`
    );


    particle.style.setProperty(
      "--y",
      `${(Math.random() - 0.5) * 500}px`
    );


    document.body.appendChild(
      particle
    );


    setTimeout(() => {
      particle.remove();
    }, 950);

  }

}


/* =========================================================
   OPEN GIFT MODAL
========================================================= */

function openGift(id) {

  const gift = gifts[id];


  if (!gift) {
    return;
  }


  currentGift = id;


  const modal =
    document.getElementById("giftModal");

  const image =
    document.getElementById("modalImage");

  const number =
    document.getElementById("modalNo");

  const title =
    document.getElementById("modalTitle");

  const description =
    document.getElementById("modalDescription");

  const selectButton =
    document.getElementById("selectGiftBtn");


  if (image) {

    image.style.backgroundImage =
      `url("${gift.image}")`;

  }


  if (number) {

    number.textContent =
      "GIFT " +
      String(id).padStart(2, "0");

  }


  if (title) {

    title.textContent =
      gift.title;

  }


  if (description) {

    description.textContent =
      gift.description;

  }


  if (selectButton) {

    if (
      selectedGifts.includes(id)
    ) {

      selectButton.textContent =
        "✓ Selected";

    } else {

      selectButton.textContent =
        "Select this gift";

    }

  }


  if (modal) {

    modal.classList.add("open");

    document.body.style.overflow =
      "hidden";

  }

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeGift() {

  const modal =
    document.getElementById("giftModal");


  if (modal) {

    modal.classList.remove("open");

  }


  document.body.style.overflow =
    "";

}


/* =========================================================
   SELECT FROM MODAL
========================================================= */

function selectCurrentGift() {

  if (!currentGift) {
    return;
  }


  toggleGift(currentGift);


  const button =
    document.getElementById("selectGiftBtn");


  if (button) {

    button.textContent =
      selectedGifts.includes(currentGift)
        ? "✓ Selected"
        : "Select this gift";

  }

}


/* =========================================================
   TOGGLE GIFT
========================================================= */

function toggleGift(id) {

  if (
    selectedGifts.includes(id)
  ) {

    selectedGifts =
      selectedGifts.filter(
        item => item !== id
      );

  } else {

    if (
      selectedGifts.length >= 2
    ) {

      alert(
        "You can choose exactly 2 gifts. Remove one of your current choices if you want to change it."
      );

      return;
    }


    selectedGifts.push(id);

  }


  updateGiftDisplay();

}


/* =========================================================
   UPDATE GIFT UI
========================================================= */

function updateGiftDisplay() {

  const count =
    document.getElementById("count");

  const submit =
    document.getElementById("submitBtn");


  if (count) {

    count.textContent =
      selectedGifts.length;

  }


  if (submit) {

    submit.disabled =
      selectedGifts.length !== 2;

  }


  document
    .querySelectorAll(".gift-card")
    .forEach(card => {

      const id =
        Number(card.dataset.id);


      card.classList.toggle(
        "selected",
        selectedGifts.includes(id)
      );

    });


  const hint =
    document.querySelector(
      ".selection-hint"
    );


  if (hint) {

    if (
      selectedGifts.length === 0
    ) {

      hint.textContent =
        "Select exactly two gifts";

    } else if (
      selectedGifts.length === 1
    ) {

      hint.textContent =
        "Choose one more gift";

    } else {

      hint.textContent =
        "Perfect — two gifts selected ✦";

    }

  }

}


/* =========================================================
   SUBMIT GIFTS TO GOOGLE SHEETS
========================================================= */

async function submitGifts() {

  if (
    selectedGifts.length !== 2
  ) {

    alert(
      "Please select exactly 2 gifts."
    );

    return;
  }


  const submit =
    document.getElementById("submitBtn");


  const gift1 =
    gifts[
      selectedGifts[0]
    ].title;


  const gift2 =
    gifts[
      selectedGifts[1]
    ].title;


  if (submit) {

    submit.disabled = true;

    submit.textContent =
      "Saving your choices...";

  }


  try {

    await fetch(
      GOOGLE_SCRIPT_URL,
      {
        method: "POST",

        mode: "no-cors",

        headers: {
          "Content-Type":
            "text/plain;charset=utf-8"
        },

        body: JSON.stringify({

          gift1: gift1,

          gift2: gift2

        })

      }
    );


    const chosenText =
      document.getElementById(
        "chosenText"
      );


    if (chosenText) {

      chosenText.innerHTML =
        `You chose <strong>${gift1}</strong> and <strong>${gift2}</strong>. 💗`;

    }


    closeGift();


    showScreen("done");


    createCelebration();


  } catch (error) {

    console.error(
      "Google Sheets error:",
      error
    );


    alert(
      "There was a problem saving your choices. Please try again."
    );


    if (submit) {

      submit.disabled = false;

      submit.textContent =
        "Confirm my two choices ✦";

    }

  }

}


/* =========================================================
   RESET EXPERIENCE
========================================================= */

function resetExperience() {

  selectedGifts = [];

  currentGift = null;


  document
    .querySelectorAll(".gift-card")
    .forEach(card => {

      card.classList.remove(
        "selected"
      );

    });


  const count =
    document.getElementById("count");


  if (count) {

    count.textContent =
      "0";

  }


  const submit =
    document.getElementById("submitBtn");


  if (submit) {

    submit.disabled = true;

    submit.textContent =
      "Confirm my two choices ✦";

  }


  const balloon =
    document.querySelector(
      "#balloonBtn .balloon"
    );


  if (balloon) {

    balloon.classList.remove(
      "burst"
    );

  }


  const balloonButton =
    document.getElementById(
      "balloonBtn"
    );


  if (balloonButton) {

    balloonButton.disabled =
      false;

  }


  const message =
    document.getElementById(
      "popMessage"
    );


  if (message) {

    message.textContent =
      "tap the balloon";

  }


  showScreen("welcome");

}


/* =========================================================
   FLOATING HEARTS / BALLOONS
========================================================= */

const floatSymbols = [

  "♥",
  "♥",
  "♡",
  "💗",
  "💕",
  "🎈",
  "🎈",
  "✦",
  "♥"

];


function createFloater() {

  const floater =
    document.createElement("div");


  floater.className =
    "floater";


  floater.textContent =
    floatSymbols[
      Math.floor(
        Math.random() *
        floatSymbols.length
      )
    ];


  floater.style.left =
    `${Math.random() * 100}%`;


  floater.style.fontSize =
    `${32 + Math.random() * 52}px`;


  floater.style.animationDuration =
    `${4.5 + Math.random() * 5.5}s`;


  floater.style.animationDelay =
    `${Math.random() * 1.5}s`;


  floater.style.opacity =
    0.45 +
    Math.random() * 0.4;


  document
    .getElementById("floaters")
    .appendChild(floater);


  setTimeout(() => {

    floater.remove();

  }, 12000);

}


/* Initial burst */

for (
  let i = 0;
  i < 22;
  i++
) {

  setTimeout(
    createFloater,
    i * 120
  );

}


/* Continue creating them */

setInterval(
  createFloater,
  330
);


/* =========================================================
   FINAL CELEBRATION
========================================================= */

function createCelebration() {

  const symbols = [
    "♥",
    "♡",
    "✦",
    "✧",
    "💗"
  ];


  for (
    let i = 0;
    i < 35;
    i++
  ) {

    const particle =
      document.createElement("div");


    particle.className =
      "celebration-particle";


    particle.textContent =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];


    particle.style.left =
      `${Math.random() * 100}%`;


    particle.style.fontSize =
      `${15 + Math.random() * 28}px`;


    particle.style.setProperty(
      "--duration",
      `${3 + Math.random() * 4}s`
    );


    particle.style.animationDelay =
      `${Math.random() * 1.5}s`;


    document.body.appendChild(
      particle
    );


    setTimeout(() => {

      particle.remove();

    }, 8500);

  }

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeGift();

    }

  }
);


/* =========================================================
   INITIALIZE
========================================================= */

updateGiftDisplay();