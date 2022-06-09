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
