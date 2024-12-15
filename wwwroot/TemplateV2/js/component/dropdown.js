$(document).ready(function () {

	//#region dropdown

	$("[data-dropdown-target]").click(function (e) {
		e.preventDefault();
		const dropdownTarget = $($(this).data("dropdown-target"));
		dropdownTarget.toggleClass("dropdown-show");
	});

	$(window).click(function (e) {
		if (!e.target.matches('[data-dropdown-target]') &&
			typeof $(e.target).parent().data("dropdown-target") === "undefined" &&
			!$(e.target).offsetParent().hasClass("dropdown"))
			$.each($(".dropdown-content"), function (indexInArray, valueOfElement) {
				$(valueOfElement).hasClass("dropdown-show") && $(valueOfElement).removeClass("dropdown-show");
			});
	});

	//#endregion

	// #region category dropdown

	const toggleCategoryDropdown = (categoryDropdownTitle, categoryDropdown) => {
		$(categoryDropdownTitle).toggleClass('active');
		$(categoryDropdown).find('.category-dropdown-content').slideToggle('medium');
	}

	const slideUpCategoryDropdown = () => {
		$(".category-dropdown-title").removeClass('active');
		$('.category-dropdown-content').slideUp('medium');
	}

	$(".category-dropdown-title").on("click", function () {

		const activeDropdown = $(this).hasClass('active');
		const parent = $(this).parents(".category-dropdown")[0];

		if (activeDropdown)
			toggleCategoryDropdown(this, parent);
		else {
			slideUpCategoryDropdown();

			toggleCategoryDropdown(this, parent);
		}
	});

	$(window).click(function (e) {
		if (!e.target.matches('.category-dropdown-title') &&
			!e.target.matches('.category-dropdown-title-span')) {
			slideUpCategoryDropdown();
		}
	});

	// #endregion

});