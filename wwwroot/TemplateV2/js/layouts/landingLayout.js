$(document).ready(function () {

	// header
	const headerElem = document.querySelector(".header");
	window.addEventListener("scroll", (e) => {
		if (window.scrollY > 74) {
			headerElem.classList.add("header__fixed");
			headerElem.classList.add("b-shadow-66");
		} else {
			headerElem.classList.remove("header__fixed");
			headerElem.classList.remove("b-shadow-66");
		}
	});

	// faq (common question) logic
	const AllFaqs = document.querySelectorAll(".common-questions-item");
	AllFaqs.forEach((faq) => {
		const headerFaq = faq.querySelector(".common-questions-item__header");
		const bodyFaq = faq.querySelector(".common-questions-item__body");
		faq.addEventListener("click", (e) => {
			headerFaq.classList.toggle("common-questions-item__header--active");
			bodyFaq.classList.toggle("common-questions-item__body--active");
		});
	});

});