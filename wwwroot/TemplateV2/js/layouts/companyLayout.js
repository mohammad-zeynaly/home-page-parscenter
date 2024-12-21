$(document).ready(function () {

	// #region  header tab

	let headerMenuItems = [];
	let showDropdownMenu = false;
	let lastBreakpoint;
	$(window).on("resize load", function () {

		const offSetWidthHeaderMenu = $(".header-company-mobile-menu .header-menu")[0].offsetWidth;
		const scrollWidthHeaderMenu = $(".header-company-mobile-menu .header-menu")[0].scrollWidth;


		if (offSetWidthHeaderMenu >= scrollWidthHeaderMenu && showDropdownMenu === true) {
			showDropdownMenu = false;
			$(".header-company-mobile-menu .dropdown-menu").hide();
			$(".header-company-mobile-menu .header-menu > li").css("visibility", "visible");
		} else if (offSetWidthHeaderMenu < scrollWidthHeaderMenu && showDropdownMenu === false) {
			showDropdownMenu = true;
			$(".header-company-mobile-menu .dropdown-menu").show();
		}

		if ($(this).innerWidth() < 992 && headerMenuItems.length === 0) {
			$(".header-company-mobile-menu .header-menu > li").each(function (i, element) {
				const headerMenuItemWidth = $(element).width();
				const item = {
					width: headerMenuItemWidth,
					breakpoint: (headerMenuItems.reduce((sumWidth, item) => sumWidth + item.width, 0) + headerMenuItemWidth),
					prevItems: $(element).prevAll(),
					nextItems: $(element).nextAll().add(element),
					currentItem: $(element)
				}
				headerMenuItems.push(item);
			});
		}

		if (showDropdownMenu === true) {
			const headerMenuWidth = lastBreakpoint === undefined ?
				offSetWidthHeaderMenu - $(".header-company-mobile-menu .dropdown-menu").width() : offSetWidthHeaderMenu;

			const headerMenu = headerMenuItems.find((({ breakpoint }) => breakpoint > headerMenuWidth));
			if (headerMenu.breakpoint != lastBreakpoint) {
				$(headerMenu.prevItems).css("visibility", "visible");
				$(headerMenu.nextItems).css("visibility", "hidden");

				$(".header-company-mobile-menu .header-dropdown-menu > li").show();
				$($(".header-company-mobile-menu .header-dropdown-menu > li")[headerMenuItems.indexOf(headerMenu)]).prevAll().hide();
			}

			lastBreakpoint = headerMenu.breakpoint;
		}

	})

	// #endregion

	//#region header

	let headerTop = ($('.header-company-container').offset().top - 1) + $('.header-company-desktop-menu')[0].offsetTop;

	$("#header-site-layout").removeAttr("id");
	let showHeaderTop = true;
	let bottomLogoIsVisible = false;
	$(window).on("scroll resize load", function (e) {

		if ($(this).innerWidth() < 992)
			return;

		let scrollTop = $(window).scrollTop();		
		let reachedTopOfHeader = headerTop <= scrollTop;

		/*alert(`scrollTop: ${scrollTop}, headerTop: ${headerTop}, reachedTopOfHeader: ${reachedTopOfHeader}`);*/

		// just an indicator for checking scroll position towards header top.
		const headerTopIndicator = $("#header-top-indicator").offset().top;

		if (reachedTopOfHeader) {
			// adding shadow and radius
			if (showHeaderTop) {
				$(".header-company").addClass("header-company-top-fixed");
			}
			showHeaderTop = false;

			// scrolling top header out of screen by setting -top.
			// there is no flag check for optimization, cause if user fast scrolls,
			// we cannot calculate the scrolled part and a portion of top header may be visible. 
			let headerHiddenSize = scrollTop - headerTopIndicator;
			$(".header-company-top-fixed").css({
				top: -(headerHiddenSize > 90 ? 90 : headerHiddenSize)
			})


			// showing bottom logo
			if (!bottomLogoIsVisible) {
				$(".header-company-menu-logo").show("fast", function () {
					bottomLogoIsVisible = true;
					$(".header-company-menu-logo-img").addClass("header-company-menu-logo-img-show");
				});
			}

		} else if (!reachedTopOfHeader && showHeaderTop === false) {
			showHeaderTop = true;
			// removing shadow and radius
			$(".header-company").removeClass("header-company-top-fixed");
			// hiding bottom logo
			if (bottomLogoIsVisible) {
				$(".header-company-menu-logo").hide("fast", function () {
					$(".header-company-menu-logo-img").removeClass("header-company-menu-logo-img-show");
					bottomLogoIsVisible = false;
				})
			}
		}
	});

                //#endregion

	// #region announcements

	const storkeDrawAnimate = (e) => {
		const announcementBorder = e.currentTarget.querySelector(".announcement-border");
		announcementBorder.classList.add('stroke-draw');
		announcementBorder.addEventListener('animationend', function () {
			announcementBorder.classList.remove('stroke-draw');
		});
	}

	const elements = document.getElementsByClassName("announcement-item");
	for (var i = 0; i < elements.length; i++) {
		elements[i].addEventListener('click', storkeDrawAnimate);
	}

	const announcements = document.getElementById("announcements");

	announcements?.addEventListener("wheel", function (e) {
		if (e.deltaY > 0) {
			announcements.scrollLeft += 100;
		}
		else {
			announcements.scrollLeft -= 100;
		}
		e.preventDefault();
	});

	let announcementsIsDown = false;
	let announcementsStartX;
	let announcementsScrollLeft;

	try {
		announcements.addEventListener('mousedown', (e) => {
			announcementsIsDown = true;
			announcements.classList.add('active');
			announcementsStartX = e.pageX - announcements.offsetLeft;
			announcementsScrollLeft = announcements.scrollLeft;
		});
		announcements.addEventListener('mouseleave', () => {
			announcementsIsDown = false;
			announcements.classList.remove('active');
		});
		announcements.addEventListener('mouseup', () => {
			announcementsIsDown = false;
			announcements.classList.remove('active');
		});
		announcements.addEventListener('mousemove', (e) => {
			if (!announcementsIsDown) return;
			e.preventDefault();
			const x = e.pageX - announcements.offsetLeft;
			const walk = (x - announcementsStartX) * 2; //scroll-fast
			announcements.scrollLeft = announcementsScrollLeft - walk;
		});
	} catch (e) {

	}

	// #endregion

});