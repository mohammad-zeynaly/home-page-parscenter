const htmlElem = document.querySelector("html");

const glideAuthenticationSlider = new Glide("#authenticationSlider", {
    direction: htmlElem.getAttribute("dir"),
    perView: 1,
    type: "carousel",
    autoplay: 3000,
}).mount();