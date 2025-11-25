let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let info = document.getElementById("info");

document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    info.innerText = "Watch the pattern carefully!";
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`#${randColor}`);

  gameSeq.push(randColor);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      info.innerText = "Watch the next pattern!";
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to restart.`;
    info.innerText = "Press any key to start again.";

    document.body.style.backgroundColor = "red";
    setTimeout(() => (document.body.style.backgroundColor = "white"), 200);

    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  info.innerText = "Your turn! Repeat the pattern.";

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach((btn) => {
  btn.addEventListener("click", btnPress);
});

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}