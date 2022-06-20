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
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
  selectNavItem(target);
});

//navbar toggle 버튼 클릭시 navbar 메뉴 보여지게 하기.
//Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", (e) => {
  navbarMenu.classList.toggle("open");
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

  // My Work에서 프로젝트 버튼 클릭시 기존 버튼 선택을 취소하고 선택한 버튼 색 활성화
  // Remove selection from the previous item and select the new one.
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("selected");

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

//Skills영역 이미지 눌렀을때 해당 이미지에 맞는 명칭 뜨게
const skillBtn = document.querySelector(".skills");
const skillDtls = document.querySelectorAll(".skills__description__dtl");
skillBtn.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter;
  console.log(e.target);
  console.log(filter);

  if (filter == null) {
    return;
  }

  skillDtls.forEach((skillDtl) => {
    if (filter === skillDtl.dataset.type) {
      skillDtl.classList.add("selected");
    } else {
      skillDtl.classList.remove("selected");
    }
  });
});

// navbar 메뉴 버튼 클릭시 테두리 활성화
// 1. 모든 섹션 요소들과 메뉴아이템들을 가지고 온다
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.
const sectionIds = ["#home", "#about", "#skills", "#work", "#contact"];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener("wheel", () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    window.scrollY + window.innerHeight ===
    document.body.clientHeight
  ) {
    console.log("맨아래");
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});
