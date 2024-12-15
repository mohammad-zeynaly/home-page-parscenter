/**
 * When indexing the pages by Google, if the style and script files are not loaded, this variable is not defined, and in the layout of the site and company with the condition on this variable that if it is not defined, the embedded styles will be added to the "head" tag.
 */
var javascriptFileLoaded = true;

$(document).ready(function () {

	//#region hide header

	let lastScrollTop = 0, delta = 80;
	const headerFunc = () => {
		let currentScrollTop = $(this).scrollTop();

		if (Math.abs(lastScrollTop - currentScrollTop) <= delta)
			return;

		if ((currentScrollTop > lastScrollTop) && (lastScrollTop > 0)) {
			$("#header-site-layout .header-content .header-navbar-bottom").slideUp("fast");
			$("#header-site-layout .dropdown-content").removeClass("dropdown-show");
		} else {
			$("#header-site-layout .header-content .header-navbar-bottom").slideDown("fast");
		}

		lastScrollTop = currentScrollTop;
	}

	let isAnimating = false;
	$(window).on("scroll", function (e) {
		if (!isAnimating) {
			isAnimating = true;
			headerFunc();
			setTimeout(function () {
				isAnimating = false;
			}, 200);
		}
	});

	//#endregion

});
const categoryStack = {
	stack: [],
	_listeners: [],
	push(id, title) {
		this.stack.push({ id, title })
		this._notifyListeners();
	},
	popLast() {
		this.stack.pop()
		this._notifyListeners();
	},
	getBreadcrumb() {
		return this.stack;
	},
	_notifyListeners() {
		for (let li of this._listeners) {
			li.call();
		}
	},
	addStackChangeListener(listener) {
		this._listeners.push(listener)
	}
}

const showBtnLoading = () => {
	$("#btn-text").attr("style", "display: none !important;");
	$("#btn-loading").attr("style", "display: block !important;");
}

const hideBtnLoading = () => {
	$("#btn-text").attr("style", "display: block !important;");
	$("#btn-loading").attr("style", "display: none !important;");
}
//#endregion
