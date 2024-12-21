$(document).ready(function () {

	// #region collapse

	$("[data-collapse-target]").click(function (e) {
		const boxCollapse = $($(this).data("collapse-target"))[0];
		if ($(boxCollapse).hasClass("collapsed")) {
			$(boxCollapse).removeClass("collapsed");
			$(boxCollapse).attr("style", `height: ${$(boxCollapse).data("collapse-box")}px`);
		}
		else {
			$(boxCollapse).addClass("collapsed");
			$(boxCollapse).attr("style", `height: ${boxCollapse.scrollHeight + 90}px;`);
		}
	});

	$.each($("[data-collapse-target]"), function (indexInArray, valueOfElement) {
		const boxCollapse = $($(valueOfElement).data("collapse-target"))[0];
		const collapseBoxHeight = $(boxCollapse).data("collapse-box");
		if (collapseBoxHeight + 30 > boxCollapse.scrollHeight)
			$(valueOfElement).parent().attr("style", "display: none !important;");
		else
			$(boxCollapse).attr("style", `height: ${collapseBoxHeight}px`);
	});

	// #endregion

	// #region sub toggle

	$('[data-toggle-sub-item]').click(function (e) {
		e.preventDefault();
		$(this).attr('data-toggle-sub-item', (_, attr) => attr.trim().toLowerCase() == "true" ? "false" : "true");
		var parent = $(this).parents("li")[0];
		$(parent).find('>ul').animate({
			height: "toggle"
		}, 'fast');
	});

	// #endregion


});