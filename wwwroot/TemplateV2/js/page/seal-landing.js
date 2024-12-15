"use strict";

const htmlElem = document.querySelector("html");
const readMoreBtn = document.getElementsByClassName("hero-section-contents__btn");
const allDetailsSealTypesTabItems = document.querySelectorAll(
	".details-seal-types-tabs-item"
);
const detailsSealTypesTabContents = document.querySelector(
	".details-seal-types-contents-lists"
);

readMoreBtn[0].addEventListener("click", () => {
	window.scrollTo({
		top: 800,
		behavior: "smooth"
	})
})

// slider suppliers
const glideSuppliers = new Glide("#suppliersSlider", {
	direction: htmlElem.getAttribute("dir"),
	perView: 3,
	type: "carousel",
	gap: 32,
	// autoplay: 3000,
	breakpoints: {
		1200: {
			perView: 3,
		},
		992: {
			perView: 2.5,
		},
		768: {
			perView: 2.1,
			gap: 16,
		},
		440: {
			perView: 1.2,
			gap: 16,
		},
		370: {
			perView: 1,
			gap: 16,
		},
	},
}).mount();

const removeClassName = (elementsArr, className) => {
	elementsArr.forEach((elem) => {
		elem.classList.remove(className);
	});
};

const sealTypesTabData = {
	tab1: [
		"مواد بدنه: ورق قلع",
		"مواد داخلی: TIN PLATE",
		"علائم قابل درج: لوگو، نام شرکت، شماره سریال",
		"روش درج: تامپو",
		"بسته‌بندی: کارتن 1000 عددی، چیدمان شانه‌ای",
		"رنگ‌ها: سفید، زرد (قابل تغییر)",
		"کاربرد: درب بشکه‌های 220 لیتری",
	],
	tab2: [
		"مواد بدنه: مواد پلیمری",
		"علائم قابل درج: لوگو، نام شرکت، شماره سریال",
		"روش درج: حکاکی لیزری",
		"بسته‌بندی: کارتن 200 عددی، چیدمان شانه‌ای",
		"رنگ‌ها: سفید، زرد (قابل تغییر)",
		"کاربرد: کنتور آب و ...",
	],
	tab3: [
		"مواد بدنه: ABS",
		"مواد داخلی: فولاد ضد زنگ",
		"علائم قابل درج: لوگو، نام شرکت، شماره سریال",
		"روش درج: حکاکی لیزری",
		"بسته‌بندی: کارتن 200 عددی، چیدمان شانه‌ای",
		"رنگ‌ها: سفید، زرد (قابل تغییر)",
		"کاربرد: درب کانتینر، درب انبار، ترانزیت",
		"نام‌های دیگر: بولت سیل، کلیکر",
	],
	tab4: [
		"مواد بدنه: زاماک",
		"مواد داخلی: آلیاژ آلومینیوم",
		"علائم قابل درج: لوگو، نام شرکت، شماره سریال",
		"روش درج: حکاکی لیزری",
		"بسته‌بندی: کارتن 250 عددی، چیدمان شانه‌ای",
		"رنگ‌ها: مشکی، سفید، زرد (قابل تغییر)",
		"کاربرد: درب انبار، ترانزیت",
	],
	tab5: [
		"مواد بدنه: پلی پروپیلن (PP)",
		"مواد داخلی: فولاد ضد زنگ",
		"علائم قابل درج: لوگو، نام شرکت، شماره سریال",
		"روش درج: حکاکی لیزری، هات استمپ",
		"رنگ‌ها: سفید، زرد (قابل تغییر)",
		"کاربرد: درب کانتینر، درب انبار، ترانزیت",
		"نام دیگر: پلمپ تسمه ای پلاستیکی",
	],
};

// faq (common question) logic
allDetailsSealTypesTabItems.forEach((tab) => {
	tab.addEventListener("click", (e) => {
		console.log();
		removeClassName(
			allDetailsSealTypesTabItems,
			"details-seal-types-tabs-item--active"
		);
		e.target.classList.add("details-seal-types-tabs-item--active");
		detailsSealTypesTabContents.innerHTML = "";
		sealTypesTabData[e.target.getAttribute("data-render")].forEach((item) => {
			detailsSealTypesTabContents.insertAdjacentHTML(
				"beforeend",
				`    <li class="details-seal-types-contents-list__item">
                  ${item}
            </li>`
			);
		});
	});
});

