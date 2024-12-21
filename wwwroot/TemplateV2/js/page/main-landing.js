"use strict";

const htmlElem = document.querySelector("html");
// elements user type
const allTabsUserType = document.querySelectorAll(".user-type-header__item");
const userTypeContents = document.querySelectorAll(".user-type__tab-content");

const videoPlayButton = document.querySelector(".video-banner__play-button");
const videoElem = document.querySelector(".video-banner__video");

// slider section trusting us items
const glideTrustingUs = new Glide("#trustingUsSlider", {
  direction: htmlElem.getAttribute("dir"),
  perView: 4,
  type: "carousel",
  gap: 24,
  autoplay: 3000,
  breakpoints: {
    1200: {
      gap: 16,
    },
    992: {
      perView: 3,
      gap: 8,
    },
    768: {
      perView: 2,
      gap: 16,
    },
    400: {
      perView: 2,
      gap: 8,
    },
    380: {
      perView: 2,
      gap: 4,
    },
  },
}).mount();

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

// slider content user type
const glideUserType = new Glide("#userTypeSlider", {
  direction: htmlElem.getAttribute("dir"),
  perView: 1,
  type: "carousel",
  autoplay: 3000,
}).mount();

// slider suppliers
const glideSuppliers = new Glide("#suppliersSlider", {
	direction: htmlElem.getAttribute("dir"),
	perView: 4,
	type: "carousel",
	gap: 32,
	autoplay: 3000,
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
			perView: 1.7,
			gap: 16,
		},
		370: {
			perView: 1,
			gap: 16,
		},
	},
}).mount();

// slider products
const glideProducts = new Glide("#productsSlider", {
	direction: htmlElem.getAttribute("dir"),
	perView: 4,
	type: "carousel",
	gap: 32,
	autoplay: 3000,
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
			perView: 1.7,
			gap: 16,
		},
		370: {
			perView: 1,
			gap: 16,
		},
	},
}).mount();

// slider content user type
const glideTestimonial = new Glide("#testimonialSlider", {
	direction: htmlElem.getAttribute("dir"),
	perView: 2,
	type: "carousel",
	gap: 4,
	breakpoints: {
		992: {
			gap: 4,
		},
		768: {
			perView: 1,
			gap: 4,
		},
	},
	autoplay: 3000,
}).mount();

// slider categories
const glideCategories = new Glide("#categoriesSlider", {
  direction: htmlElem.getAttribute("dir"),
  perView: 6,
  type: "carousel",
  gap: 32,
  autoplay: 3000,
  breakpoints: {
    1200: {
      perView: 4,
    },
    992: {
      perView: 3,
    },
    768: {
      perView: 2.5,
      gap: 16,
    },
    440: {
      perView: 2.1,
      gap: 16,
    },
    370: {
      perView: 1.7,
      gap: 16,
    },
  },
}).mount();

// user type tab logic
allTabsUserType.forEach((tab) => {
  tab.addEventListener("click", () => {
    const activeTab = document.querySelector(".user-type-header__item--active");
    activeTab.classList.remove("user-type-header__item--active");
    tab.classList.add("user-type-header__item--active");
  });
});

$(function() {
	$("#more-info").click(function () {
		let $video = $(".video-banner")[0];
		window.scrollTo({
			top: $video.getBoundingClientRect().top + window.scrollY - 50,
			behavior: 'smooth',
		});
	});
	
	$("[data-modal-dialog-parent='#map-open-modal']").click(function (e) {
		$("#landing-intro-video").trigger('play');
	});
	
	$(".modal-dialog-overlay").click(function (e) {
		$("#landing-intro-video").trigger('pause');
	});

	$(".modal-dialog-close , button[id='btn-cancel-modal-footer']").click(function (e) {
		$("#landing-intro-video").trigger('pause');
	});
})