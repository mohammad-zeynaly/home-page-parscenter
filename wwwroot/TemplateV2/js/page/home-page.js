// elements
const htmlElement = document.querySelector("html");
const overlayElem = document.getElementById("overlay");
const dropdownListsElem = document.querySelector(".dropdown-list");
const dropdownTitleElem = document.querySelector(".dropdown__title");
const heroSectionCategories = document.querySelector(
  ".hero-section-categories"
);
const headerLeftElement = document.querySelector(".header-left-element");
const headerElement = document.querySelector("header");
const mainElement = document.querySelector("main");
const headerCategoryBtn = document.querySelector(".header-category-btn");

const selectedDropdownItemHandler = (item) => {
  dropdownTitleElem.innerText = item;
  dropdownListsElem.classList.remove("dropdown-show");
};
const mouseHoverCategoryItemHandler = (e) => {
  heroSectionCategories.style.zIndex = "200";
  overlayElem.classList.add("overlay");
  overlayElem.classList.add("overlay--light");
};

const handleCloses = () => {
  overlayElem.classList.remove("overlay");
  overlayElem.classList.remove("overlay--light");
  heroSectionCategories.style.zIndex = "0";
};

const glideCategories2 = new Glide("#heroSectionBannerSlider", {
  direction: htmlElement.getAttribute("dir"),
  perView: 1,
  type: "carousel",
  gap: 32,
  autoplay: 3000,
}).mount();

htmlElement.addEventListener("click", handleCloses);
overlayElem.addEventListener("mouseover", handleCloses);
document.querySelectorAll(".hero-section-categories-item").forEach((item) => {
  item.addEventListener("mouseout", handleCloses);
});

document.querySelectorAll(".categories-render-popup").forEach((item) => {
  item.addEventListener("mouseout", handleCloses);
});

// window.addEventListener("scroll", function () {
//   const mainElement = document.querySelector("main");
//   const mainPosition = mainElement.getBoundingClientRect();
//   console.log("scroll=> ");

//   // بررسی اینکه آیا عنصر main در نمای کاربر است یا خیر
//   if (mainPosition.top <= window.innerHeight && mainPosition.bottom >= 0) {
//     console.log("شما به عنصر main رسیده‌اید!");
//   } else {
//   }
// });

window.addEventListener("scroll", function () {
  const headerBottom = headerElement.getBoundingClientRect().bottom; // پایین header
  const mainTop = mainElement.getBoundingClientRect().top; // بالای main

  // بررسی اینکه آیا پایین header به بالای main رسیده است
  if (
    headerBottom >= mainTop &&
    headerBottom <= mainTop + mainElement.offsetHeight
  ) {
    console.log("هدر در حال عبور از عنصر main است!");
    headerLeftElement.classList.add("d-none");
    headerCategoryBtn.classList.remove("d-none");
  } else {
    headerLeftElement.classList.remove("d-none");
    headerCategoryBtn.classList.add("d-none");
  }
});
