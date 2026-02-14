/* =========================
   SCENE CONTROLLER
========================= */

const scenes = document.querySelectorAll(".scene");
const nextButtons = document.querySelectorAll(".next");

function showSceneByClass(className) {
  scenes.forEach((scene) => scene.classList.remove("active"));
  const target = document.querySelector("." + className);
  if (target) target.classList.add("active");
}

function showNextScene(currentScene) {
  const next = currentScene.nextElementSibling;
  if (next && next.classList.contains("scene")) {
    scenes.forEach((s) => s.classList.remove("active"));
    next.classList.add("active");
  }
}

/* Next button logic */
nextButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentScene = btn.closest(".scene");
    showNextScene(currentScene);
  });
});

/* =========================
   QUEST LOGIC
========================= */

let correctAnswers = 0;
const choices = document.querySelectorAll(".choice");
const unlockBtn = document.getElementById("unlockBtn");

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    if (choice.dataset.correct) {
      choice.style.background = "#4caf50";
      correctAnswers++;
    } else {
      choice.style.background = "#777";
    }

    choice.disabled = true;

    if (correctAnswers === 3) {
      unlockBtn.disabled = false;
    }
  });
});

/* When quest completed → show envelope */
unlockBtn?.addEventListener("click", () => {
  showSceneByClass("envelope-scene");
});

/* =========================
   ENVELOPE LOGIC
========================= */

const envelope = document.getElementById("envelope");

envelope?.addEventListener("click", () => {
  const flap = envelope.querySelector(".flap");
  flap.style.transform = "rotateX(180deg)";

  setTimeout(() => {
    showSceneByClass("letter");
    typeLetter();
  }, 800);
});

/* =========================
   TYPEWRITER LETTER
========================= */

function typeLetter() {
  const text = `My baby, My love, My wifey,

From the moment you entered my world, everything felt different. It feels so amazing with you, everytime I look into your eyes I get butterflies.I love staring at you, admire your pretty face, feel your love for me through your eyes.

I never thought I could love someone this much before, I love our companionship, how compatiblewe are, how comfy we feel around each other. I can't wait till I have you in my arms, to feel your skin, to feel inside you.

I'm so lucky baby and so grateful for you .You make me feel safe, seen, and loved so much. You always put me first, you care how I feel.You treat me like a princess, show me how real love feels like. You're absolutely perfect.

Baby I promise you, I will always love you and care for you till the end of our lives, Two months feels small on the calendar, but huge in my heart as I already know you're the one I want to spend th rest of my life with. 

Baby, you're my favorite person, my favorite place. You're my home and I love you with my soul baby ❤️`;

  const box = document.getElementById("letterText");

  if (!box) return;

  box.innerHTML = ""; // reset
  box.style.whiteSpace = "pre-wrap";

  let i = 0;

  function typing() {
    if (i < text.length) {
      box.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, 35);
    } else {
      setTimeout(() => {
        showSceneByClass("sunset");
        generateRoses();
      }, 1200);
    }
  }

  typing();
}

/* =========================
   ROSE ANIMATION
========================= */

function generateRoses() {
  const container = document.querySelector(".rose-container");
  if (!container) return;

  container.innerHTML = "";

  for (let i = 0; i < 15; i++) {
    const rose = document.createElement("img");
    rose.src = "rose.svg";
    rose.classList.add("rose");

    rose.style.left = Math.random() * 100 + "vw";
    rose.style.animationDuration = 4 + Math.random() * 3 + "s";
    rose.style.animationDelay = Math.random() * 3 + "s";

    container.appendChild(rose);
  }
}

/* =========================
   PLAY AGAIN
========================= */

const restartBtn = document.getElementById("restart");

restartBtn?.addEventListener("click", () => {
  location.reload();
});
