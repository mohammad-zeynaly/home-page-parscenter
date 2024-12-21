const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
	addAnimation();
}

function addAnimation() {
	scrollers.forEach((scroller) => {
		// add data-animated="true" to every `.scroller` on the page
		scroller.setAttribute("data-animated", true);

		// Make an array from the elements within `.scroller-inner`
		const scrollerInner = scroller.querySelector(".scroller__inner");
		const scrollerContent = Array.from(scrollerInner.children);

		// For each item in the array, clone it
		// add aria-hidden to it
		// add it into the `.scroller-inner`
		scrollerContent.forEach((item) => {
			const duplicatedItem = item.cloneNode(true);
			duplicatedItem.setAttribute("aria-hidden", true);
			scrollerInner.appendChild(duplicatedItem);
		});
	});
}


const lastAnimation = new Date().getTime();
let nextEvent = 10000;
const interval = setInterval(async function () {
	const now = new Date().getTime(),
		distance = now - lastAnimation;
	if (distance > nextEvent) {
		nextEvent += 10000;
		let typed = $(".typed");
		let typedContainer = $(".typed-container");
		typed.removeClass("typed");
		typedContainer.removeClass("typed-container");
		await new Promise(resolve => setTimeout(() => {
			typed.addClass("typed");
			typedContainer.addClass("typed-container");
			resolve()
		}, 50));
	}
}, 1000);


// countdown
let exhibitionDetails = [
	{
		birthday: new Date(2024, 10, 13, 8, 0, 0, 0),
		text: "چیزی تا آغاز نمایشگاه نمانده..."
	},
	{
		birthday: new Date(2024, 10, 16, 15, 0, 0, 0),
		text: "تا پایان فرصت باقی مانده..."
	}
];

const setDate = () => {

	const toDay = new Date();

	const result = exhibitionDetails.find(({ birthday }) => birthday > toDay);

	if (result === undefined)
		return { distance: 0, text: "فرصت حضور در نمایشگاه به اتمام رسید." };
	
	const countDown = result.birthday.getTime(),
		now = new Date().getTime();

	return { distance: countDown - now, text: result.text };
}

(function () {
	const headLine = document.getElementById("headline");
	const second = 1000,
		minute = second * 60,
		hour = minute * 60,
		day = hour * 24;

	const result = setDate();
	headLine.innerHTML = result.text;

	if (result.distance != 0) {
		let distance = result.distance;

		const x = setInterval(function () {

			distance -= 1000;

			document.getElementById("days").innerText = convertToPersianNumbers(Math.floor(distance / (day))),
				document.getElementById("hours").innerText = convertToPersianNumbers(Math.floor((distance % (day)) / (hour))),
				document.getElementById("minutes").innerText = convertToPersianNumbers(Math.floor((distance % (hour)) / (minute))),
				document.getElementById("seconds").innerText = convertToPersianNumbers(Math.floor((distance % (minute)) / second));

			if (distance <= 0) {

				const resultSetDate = setDate();
				headLine.innerHTML = resultSetDate.text;

				if (resultSetDate.distance <= 0) {
					clearInterval(x);
				} else {
					distance = resultSetDate.distance;
				}
			}

		}, 1000);
	} else {
        document.getElementById("days").innerText = "-";
        document.getElementById("hours").innerText = "-";
        document.getElementById("minutes").innerText = "-";
        document.getElementById("seconds").innerText = "-";
    }
    
}());


// Get the modal
var modal = document.getElementById('imageGalleryModal');
var modalImg = document.getElementById("modalImage");
docReady(function () {
	$(".exhi-gallery-img").click(function () {
		modal.style.display = "block";
		modalImg.src = this.src;
	})

	modal.onclick = function () {
		modal.style.display = "none";
	}
})
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
	modal.style.display = "none";
}