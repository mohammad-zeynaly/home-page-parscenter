$(document).ready(function () {

	$(".drawer-overlay").click(function () {
		$("body").css("overflow", "auto");
		$(".drawer").removeClass("drawer-show");
	});

	$("[drawer-for]").click(function () {
		const drawerId = $(this).attr("drawer-for");

		$("body").css("overflow", "hidden");
		$(`${drawerId}`).addClass("drawer-show");
	});

});