//-- overall SLIDER --
const pageSlider = document.querySelector(".page-container");
const pages = Array.from(document.querySelectorAll(".page"));
const modal = document.querySelector(".modal");

const moveSlide2 = document.querySelector(".movable-parts-slide2");

let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID = 0,
  currentIndex = 0;

pages.forEach((page, index) => {
  page.addEventListener("touchstart", touchStart(index));
  page.addEventListener("touchend", touchEnd);
  page.addEventListener("touchmove", touchMove);
});

//-- disable mouse rightclick --
// window.oncontextmenu = function (event) {
//   event.preventDefault();
//   event.stopPropagation();
//   return false;
// };
//-- / disable mouse rightclick --

function touchStart(index) {
  return function (event) {
    currentIndex = index;
    startPos = event.touches[0].clientX;
    isDragging = true;

    animationID = requestAnimationFrame(animation);
  };
}
function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);
  let movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < pages.length - 1) currentIndex += 1;

  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

  setPositionByIndex();

  moveClassSlide2();
}
function touchMove(event) {
  if (modal.classList.contains("modal--active")) {
    isDragging = false;
  }
  if (isDragging) {
    const currentPosition = event.touches[0].clientX;
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth;
  prevTranslate = currentTranslate;
}

function animation() {
  pageSlider.style.transform = `translateX(${currentTranslate}px)`;
  if (isDragging) requestAnimationFrame(animation);
}
//-- / overall SLIDER --

//-- first slide button --
const whatIsNextButton = document.querySelector(".btn_else");
whatIsNextButton.onclick = function () {
  movedBy = -101;
  if (movedBy < -100 && currentIndex < pages.length - 1) currentIndex += 1;
  setPositionByIndex();

  moveClassSlide2();
};
//-- / first slide button --

//-- home button --
const homeButton = document.querySelectorAll(".home");
homeButton.forEach((home) => {
  home.onclick = function () {
    currentIndex = 0;
    setPositionByIndex();
    moveClassSlide2();
    console.log(currentTranslate);
  };
});
//-- / home button --

//-- second slide SCROLL --
var scroll = document.getElementById("scroll-range");

scroll.oninput = function () {
  isDragging = false;
  var panel = document.getElementById("scrolling-container");

  var total = panel.scrollHeight - panel.offsetHeight;
  var percentage = total * (this.value / 100);
  panel.scrollTop = percentage;
};
//-- / second slide SCROLL --

//-- third slide MODAL --
const openButton = document.querySelector(".js-modal-open");
const closeButton = document.querySelector(".js-modal-close");

openButton.addEventListener("click", (event) => {
  modal.classList.toggle("modal--active");
});
closeButton.addEventListener("click", (event) => {
  modal.classList.toggle("modal--active");
});
//-- / third slide MODAL --

//--  third slide SLIDER --
const slides = document.querySelectorAll(".slide");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");

const circles = document.querySelectorAll(".circle");

const nextSlide = () => {
  const current = document.querySelector(".slide--current");
  const circle = document.querySelector(".circle--active");
  if (current.nextElementSibling) {
    current.classList.remove("slide--current");
    setTimeout(() => {
      circle.classList.remove("circle--active");
      current.nextElementSibling.classList.add("slide--current");
      circle.nextElementSibling.classList.add("circle--active");
    }, 300);
  } else {
    return;
  }
};

const prevSlide = () => {
  const current = document.querySelector(".slide--current");
  const circle = document.querySelector(".circle--active");
  if (current.previousElementSibling) {
    current.classList.remove("slide--current");
    setTimeout(() => {
      circle.classList.remove("circle--active");
      current.previousElementSibling.classList.add("slide--current");
      circle.previousElementSibling.classList.add("circle--active");
    }, 300);
  } else {
    return;
  }
};

nextButton.addEventListener("click", (event) => {
  nextSlide();
});

prevButton.addEventListener("click", (event) => {
  prevSlide();
});
//-- / third slide SLIDER --

//-- first slide moving parts --
const slide1MovePart1 = document.querySelector(".slide1-left-movable");
const slide1MovePart2 = document.querySelector(".slide1-right-center-movable");
const slide1MovePart3 = document.querySelector(".slide1-right-down-movable");
const slide1MovePart4 = document.querySelector(".slide1-right-up-movable");

setInterval(slide1Move1, 3000);
setInterval(slide1Move2, 3000);
setInterval(slide1Move3, 4000);
setInterval(slide1Move4, 2000);

function slide1Move1() {
  slide1MovePart1.style.left = Math.random() * (50 - 0 + 1) + 0 + "px";
  slide1MovePart1.style.bottom = Math.random() * (222 - 162 + 1) + 162 + "px";
}
function slide1Move2() {
  slide1MovePart2.style.left = Math.random() * (885 - 825 + 1) + 825 + "px";
  slide1MovePart2.style.bottom = Math.random() * (485 - 425 + 1) + 425 + "px";
}
function slide1Move3() {
  slide1MovePart3.style.left = Math.random() * (565 - 545 + 1) + 545 + "px";
  slide1MovePart3.style.bottom =
    Math.random() * (-110 - -130 + 1) + -130 + "px";
  let randomScale = Math.random() * (1 - 0.7 + 1) + 0.7;
  slide1MovePart3.style.transform = `scale(${randomScale},${randomScale})`;
}
function slide1Move4() {
  slide1MovePart4.style.left = Math.random() * (776 - 716 + 1) + 716 + "px";
  slide1MovePart4.style.bottom = Math.random() * (680 - 620 + 1) + 620 + "px";
}

//-- / first slide moving parts --

//-- second slide moving parts --
const moveClassSlide2 = () => {
  if (currentTranslate === -0) {
    setTimeout(() => {
      moveSlide2.classList.remove("movable-parts-slide2--active");
    }, 100);
  } else if (currentTranslate === -1024) {
    setTimeout(() => {
      moveSlide2.classList.add("movable-parts-slide2--active");
    }, 300);
  }
};
//-- / second slide moving parts --

//-- third slide moving parts --
const slide3MovePart1 = document.querySelector(".slide3-bubble1-back");
const slide3MovePart2 = document.querySelector(".slide3-bubble2-for");
const slide3MovePart3 = document.querySelector(".slide3-bubble3-back");
const slide3MovePart4 = document.querySelector(".slide3-bubble4-back");
const slide3MovePart5 = document.querySelector(".slide3-bubble5-for");
const slide3MovePart6 = document.querySelector(".slide3-bubble6-for");
const slide3MovePart7 = document.querySelector(".slide3-bubble7-back");
const slide3MovePart8 = document.querySelector(".slide3-bubble8-for");

setInterval(slide3Move1, 2000);
setInterval(slide3Move2, 3000);
setInterval(slide3Move3, 1000);
setInterval(slide3Move4, 3000);
setInterval(slide3Move5, 4000);
setInterval(slide3Move6, 3000);
setInterval(slide3Move7, 1000);
setInterval(slide3Move8, 3000);

function slide3Move1() {
  slide3MovePart1.style.left = Math.random() * (230 - 170 + 1) + 170 + "px";
  slide3MovePart1.style.bottom = Math.random() * (695 - 635 + 1) + 635 + "px";
}
function slide3Move2() {
  slide3MovePart2.style.left = Math.random() * (215 - 155 + 1) + 155 + "px";
  slide3MovePart2.style.bottom = Math.random() * (575 - 515 + 1) + 515 + "px";
}
function slide3Move3() {
  slide3MovePart3.style.left = Math.random() * (105 - 35 + 1) + 35 + "px";
  slide3MovePart3.style.bottom = Math.random() * (550 - 490 + 1) + 490 + "px";
}
function slide3Move4() {
  slide3MovePart4.style.left = Math.random() * (215 - 155 + 1) + 155 + "px";
  slide3MovePart4.style.bottom = Math.random() * (370 - 310 + 1) + 310 + "px";
}
function slide3Move5() {
  slide3MovePart5.style.left = Math.random() * (40 - -20 + 1) + -20 + "px";
  slide3MovePart5.style.bottom = Math.random() * (310 - 250 + 1) + 250 + "px";
}
function slide3Move6() {
  slide3MovePart6.style.left = Math.random() * (50 - -10 + 1) + -10 + "px";
  slide3MovePart6.style.bottom = Math.random() * (170 - 110 + 1) + 110 + "px";
}
function slide3Move7() {
  slide3MovePart7.style.left = Math.random() * (270 - 210 + 1) + 210 + "px";
  slide3MovePart7.style.bottom = Math.random() * (150 - 90 + 1) + 90 + "px";
}
function slide3Move8() {
  slide3MovePart8.style.left = Math.random() * (215 - 155 + 1) + 155 + "px";
  slide3MovePart8.style.bottom = Math.random() * (-50 - -110 + 1) + -110 + "px";
  let randomScale = Math.random() * (1.2 - 0.8 + 1) + 0.2;
  slide3MovePart8.style.transform = `scale(${randomScale},${randomScale})`;
}
//-- / third slide moving parts --
