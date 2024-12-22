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
const headerCategoryWrapper = document.querySelector(
  ".header-category-wrapper"
);
const headerCategoryItems = document.querySelector(".header-category-items");
const topHeaderElem = document.querySelector(".top-header");
const selectedDropdownItemHandler = (item) => {
  dropdownTitleElem.innerText = item;
  dropdownListsElem.classList.remove("dropdown-show");
};
const mouseHoverCategoryItemHandler = (e) => {
  heroSectionCategories.style.zIndex = "99";
  overlayElem.classList.add("overlay");
  overlayElem.classList.add("overlay--light");
};

const handleCloses = () => {
  overlayElem.classList.remove("overlay");
  overlayElem.classList.remove("overlay--light");
  heroSectionCategories.style.zIndex = "0";
  headerCategoryItems.classList.remove("d-flex");
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

window.addEventListener("scroll", function () {
  const headerBottom = headerElement.getBoundingClientRect().bottom;
  const mainTop = mainElement.getBoundingClientRect().top;

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
  if (window.scrollY > 70) {
    topHeaderElem.classList.add("opacity-0");
    topHeaderElem.classList.add("d-none");
    console.log("window.scrollY > 50", window.scrollY);
  } else if (
    window.scrollY < 70
    // topHeaderElem.className.includes("d-none")
  ) {
    console.log("window.scrollY < 50", window.scrollY);
    topHeaderElem.classList.remove("opacity-0");
    topHeaderElem.classList.remove("d-none");
  }
});

headerCategoryWrapper.addEventListener("mouseover", () => {
  headerCategoryItems.classList.add("d-flex");
  overlayElem.classList.add("overlay");
  overlayElem.classList.add("overlay--light");
});
