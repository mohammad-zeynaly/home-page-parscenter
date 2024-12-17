// elements
const htmlElem = document.querySelector("html");
const bodyElem = document.querySelector("body");
const dropdownListsElem = document.querySelector(".dropdown-list");
const dropdownIconElem = document.querySelector(".dropdown__icon");
const dropdownTitleBoxElem = document.querySelector(".dropdown-title-box");
const dropdownTitleElem = document.querySelector(".dropdown__title");

const dropdownItems = ["محصولات", "تامین کننده"];

const renderDropdownLists = () => {
  dropdownItems.map((item) => {
    dropdownListsElem.insertAdjacentHTML(
      "beforeend",
      `<li onclick="selectedDropdownItemHandler('${item}')" class="dropdown-list__item text-body-1 color-neutral-800">${item}</li>`
    );
  });
};
renderDropdownLists();
const handleShowDropdownMenu = (e) => {
  e.stopPropagation();
  dropdownListsElem.classList.toggle("open");
};

const selectedDropdownItemHandler = (item) => {
  console.log("item=> ", item);
  dropdownTitleElem.innerText = item;
};

const handleCloses = () => {
  dropdownListsElem.classList.remove("open");
};

dropdownTitleBoxElem.addEventListener("click", handleShowDropdownMenu);
htmlElem.addEventListener("click", handleCloses);
