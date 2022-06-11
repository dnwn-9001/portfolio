"use strict";

// 맨 위로 올렸을때 navbar 투명하게 만들기
const navbar = document.querySelector("#navbar");

// 최종적으로 렌더링된 높이 가져오기
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// Navbar 클릭시 원하는 위치로 스크롤링
// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;

  if (link == null) {
    return;
  }

  scrollIntoView(link);
});

// Contact Me 버튼 누르면 Let's talk로 이동
// Handle click on "contact me" button on home
const contactMe = document.querySelector(".home__contact");
contactMe.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// 아래로 스크롤링하면 home의 내용들을 점점 투명하게 만들기
// Make home slowly fade to transparent as the window scrolls down
const homeContainer = document.querySelector(".home__container");
const homeHeight = homeContainer.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  homeContainer.style.opacity = 1 - window.scrollY / homeHeight;
});

//아래로 스크롤링 될때 arrow 버튼이 보여지고, arrow 버튼을 누르면 home으로 이동.
//Show "arrow up" button when scrolling down
const arrow = document.querySelector("#arrow");
const arrowBtn = document.querySelector(".arrow__btn");

document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight * 0.5) {
    arrow.classList.add("visible");
  } else {
    arrow.classList.remove("visible");
  }
});

//Handle click on the "arrow up" button
arrowBtn.addEventListener("click", () => {
  scrollIntoView("#home");
});

// Projects 카테고리 버튼 클릭시, 카테고리에 맞는 프로젝트만 띄우기.
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");

workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;

  if (filter == null) {
    return;
  }
  projectContainer.classList.add("anim-out");

  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible"); // filter와 다른 type은 안보여지게.
      }
    });

    projectContainer.classList.remove("anim-out");
  }, 300);
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}
