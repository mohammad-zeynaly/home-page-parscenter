$(document).ready(function () {

	const htmlElem = document.querySelector("html");

	// slider categories
	const glideBuyRequests = new Glide("#buyRequestsSlider", {
		direction: htmlElem.getAttribute("dir"),
		perView: 4,
		type: "carousel",
		gap: 32,
		autoplay: 3000,
		breakpoints: {
			1200: {
				perView: 3.5,
			},
			992: {
				perView: 2.5,
			},
			768: {
				perView: 2,
				gap: 16,
			},
			576: {
				perView: 1.7,
				gap: 16,
			},
			476: {
				perView: 1.4,
				gap: 16,
			},
			390: {
				perView: 1.1,
				gap: 16,
			},
		},
	}).mount();

	// slider categories
	const glideLastCompanies = new Glide("#lastCompaniesSlider", {
		direction: htmlElem.getAttribute("dir"),
		perView: 4,
		type: "carousel",
		gap: 32,
		autoplay: 3000,

		breakpoints: {
			1200: {
				perView: 3.5,
			},
			992: {
				perView: 2.5,
			},
			768: {
				perView: 2,
				gap: 16,
			},
			576: {
				perView: 1.7,
				gap: 16,
			},
			476: {
				perView: 1.4,
				gap: 16,
			},
			390: {
				perView: 1.1,
				gap: 16,
			},
		},
	}).mount();

});