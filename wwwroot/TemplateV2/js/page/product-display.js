//#region show call buttons in mobile mode

let element = $("#mobile-contact-info-parent")[0];
let isContactInfoVisible = false
$(window).on("scroll resize load", function (event) {
	if (isContactInfoVisible) return;
	const rect = element.getBoundingClientRect();
	const isWindowScrollEqualPositionContactInfoSection = (rect.top) >= this.scrollY;
	if (!isWindowScrollEqualPositionContactInfoSection) {
		isContactInfoVisible = true;
		$(".mobile-contact-info-container").css({
			bottom: 0
		});
	}
});

//#endregion

$(document).ready(function () {
	
	//#region product gallery

	$("[data-change-main-image-product]").click(function (e) {
		$("[data-change-main-image-product]").removeClass("active");
		$(this).addClass("active");

		const image = $(this).data("change-main-image-product");
		const imageIndex = $(this).data("thumb-image-index");
		const [resDomain] = $("#main-image").attr("src").split("/Images");
		$("#main-image").attr("src", `${resDomain}/Images/${image}/280/210/image.jpg`);
		$("#main-image").attr("data-main-image-index", imageIndex);
	});

	const glideGalleryMain = new Glide('.glide-gallery-main', {
		direction: $("html").attr("dir"),
		perView: 1,
		focusAt: 0
	}).mount();

	$("[data-glide-thumbs]").click(function (e) {
		$("[data-glide-thumbs]").removeClass("active");
		$(this).addClass("active");
		const index = $(this).data("glide-thumbs");
		glideGalleryMain.go('=' + index);
	});

	$(".glide__arrow").click(function (e) {
		const indexGlideGalleryMainActive = glideGalleryMain._i;
		$("[data-glide-thumbs]").removeClass("active");
		$(`[data-glide-thumbs="${indexGlideGalleryMainActive}"]`).addClass("active");
	});

	$("#main-image").click(function (e) {
		let imageIndex = $(this).attr("data-main-image-index");
		$("#product-gallery-modal").addClass("modal-dialog-show");

		glideGalleryMain.go('=' + imageIndex);
		$("[data-glide-thumbs]").removeClass("active");
		$(`[data-glide-thumbs="${imageIndex}"]`).addClass("active");
		$("body").attr("style", "overflow: hidden;");
	});

	$("#show-gallery-product").click(function (e) {
		$("#product-gallery-modal").addClass("modal-dialog-show");
		$("body").attr("style", "overflow: hidden;");
	});

	//#endregion

	// #region lazy load

	//const callback_enter = function (element) {

	//};
	//const callback_exit = function (element) {

	//};
	//const callback_loading = function (element) {

	//};
	//const callback_loaded = function (element) {

	//};
	//const callback_error = function (element) {

	//};
	//const callback_cancel = function (element) {

	//};
	//const callback_finish = function () {

	//};

	let lazyLoad = new LazyLoad();

	// #endregion

});