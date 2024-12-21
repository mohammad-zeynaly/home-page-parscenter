$(document).ready(function () {

	// region cart

	let cart = {};

	const minimumOrderQuantity = parseInt($("#MinimumOrderQuantity").val());
	const companyId = parseInt($("#CompanyId").val());
	const productId = parseInt($("#ProductId").val());
	const quantityBox = $(".quantity-box");
	const btnAddToCart = $("#btn-add-to-cart");
	const btnAddToCartText = $("#btn-add-to-cart-text");
	const btnAddToCartIcon = $("#btn-add-to-cart-icon");
	const btnRemoveProductQuantityElement = $("#btn-remove-from-product-quantity");
	const iconRemoveProductQuantityElement = btnRemoveProductQuantityElement.find("span");
	const productQuantityElement = $("#product-quantity");
	const productQuantitySpanElement = $("#product-quantity-span");
	const productPriceCalculationElement = $(".product-price-calculation");
	const shoppingCartHeaderBadgeElement = $(".shopping-cart-header-badge");
	const onlineSalesLoading = $(".online-sales-loading");
	let productQuantity = parseInt($("#CartQuantity").val());

	const cartText = "سبد خرید";
	const addToCartText = "افزودن به سبد خرید";
	const cartIcon = "shopping_basket";
	const addToCartIcon = "add_shopping_cart";
	const deleteIcon = "delete";
	const removeIcon = "remove";

	const setIconRemoveQuantity = () => {
		const currentIcon = iconRemoveProductQuantityElement.html();
		if (productQuantity === minimumOrderQuantity && currentIcon != deleteIcon) {
			iconRemoveProductQuantityElement.html(deleteIcon);
		} else if (productQuantity > minimumOrderQuantity && currentIcon != removeIcon) {
			iconRemoveProductQuantityElement.html(removeIcon);
		}
	}

	const setProductQuantity = (quantity) => {
		const productQuantityElementValue = parseInt(productQuantityElement.html()?.trim());
		if (productQuantityElementValue !== quantity || productQuantity !== quantity) {
			productQuantityElement.html(quantity);
			productQuantitySpanElement.html(quantity);
			productQuantity = quantity;
			setIconRemoveQuantity();
		}
	}

	const showQuantityBox = () => {
		const attr = btnAddToCart.attr("href");
		const btnText = btnAddToCartText.html().trim();

		if (typeof attr === 'undefined' || btnText !== cartText || quantityBox.hasClass("d-none") === true) {
			manageNumberProductsInShoppingCartBadge();
			const href = $(btnAddToCart).data("link-href");
			btnAddToCart.attr("href", href);
			btnAddToCartText.html(cartText);
			btnAddToCartIcon.html(cartIcon);
			quantityBox.removeClass("d-none");
			productPriceCalculationElement.removeClass("d-none");
		}
	}

	const hideQuantityBox = () => {
		const attr = btnAddToCart.attr("href");
		const btnText = btnAddToCartText.html()?.trim();

		if (typeof attr != 'undefined' || btnText != addToCartText || quantityBox.hasClass("d-none") === false) {
			manageNumberProductsInShoppingCartBadge();
			btnAddToCart.removeAttr("href");
			btnAddToCartText.html(addToCartText);
			btnAddToCartIcon.html(addToCartIcon);
			quantityBox.addClass("d-none");
			productPriceCalculationElement.addClass("d-none");
		}
	}

	const manageNumberProductsInShoppingCartBadge = () => {
		const numberProductsInShoppingCart = Object.values(cart).filter(product => product["CompanyId"] === companyId).length;
		shoppingCartHeaderBadgeElement.html(numberProductsInShoppingCart);
		if (numberProductsInShoppingCart > 0) {
			shoppingCartHeaderBadgeElement.removeClass("d-none");
		} else {
			shoppingCartHeaderBadgeElement.addClass("d-none");
		}
			
	}

	const getCartFromSession = () => {
		$.ajax({
			url: '/Products/GetCartSession',
			type: "GET",
			success: function (data) {
				if (data.success === true && data.cartSessionn !== "") {
					cart = JSON.parse(data.cartSessionn);
					const cartCurrentProduct = cart[productId];
					if (cartCurrentProduct !== undefined) {
						const productQuantity = cartCurrentProduct["Quantity"];
						setProductQuantity(productQuantity);
						showQuantityBox();
					}
					else {
						setProductQuantity(minimumOrderQuantity);
						hideQuantityBox();
					}
				} else {
					setProductQuantity(minimumOrderQuantity);
					hideQuantityBox();
				}
			},
			error: function (err) {
				if (err.readyState === 4 && err.status === 500) {
					ShowMessage("خطا", "مشکلی پیش آمده است لطفا چند دقیقه دیگر تلاش بفرمایید", "error");
				}
			}
		})
	}

	getCartFromSession();

	const addCartItemToSession = (productId, companyId, quantity) => {
		onlineSalesLoading.removeClass("d-none");
		$.ajax({
			url: '/Products/SetSessionCart',
			type: "POST",
			data: {
				productId: productId,
				quantity: quantity
			},
			success: function (data) {
				if (data.success === true) {
					ShowMessage("موفقیت", data.message, "success");
				} else {
					ShowMessage("خطا", data.message, "error");
				}
				getCartFromSession();
				onlineSalesLoading.addClass("d-none");
			},
			error: function (err) {
				if (err.readyState === 4 && err.status === 500) {
					ShowMessage("خطا", "مشکلی پیش آمده است لطفا چند دقیقه دیگر تلاش بفرمایید", "error");
				}
				onlineSalesLoading.addClass("d-none");
			}
		})
	}

	const removeCartItemFromCartSession = () => {
		onlineSalesLoading.removeClass("d-none");
		$.ajax({
			url: '/Products/DeleteItemCartFromSession',
			type: "POST",
			data: {
				productId: productId
			},
			success: function (data) {
				if (data.success === true) {
					ShowMessage("موفقیت", data.message , "success");
				} else {
					ShowMessage("خطا", data.message, "error");
				}
				getCartFromSession();
				onlineSalesLoading.addClass("d-none");
			},
			error: function (err) {
				if (err.readyState === 4 && err.status === 500) {
					ShowMessage("خطا", "مشکلی پیش آمده است لطفا چند دقیقه دیگر تلاش بفرمایید", "error");
				}
				onlineSalesLoading.addClass("d-none");
			}
		})
	}

	btnAddToCart.click(function (e) {
		const attr = $(this).attr("href");
		if (typeof attr === 'undefined') {
			e.preventDefault();
			addCartItemToSession(productId, companyId, productQuantity);
		} else {
		}
	});

	let timerDebounce;
	const addCartDebounce = (func, timeout = 500) => {
		return (...args) => {
			clearTimeout(timerDebounce);
			timerDebounce = setTimeout(() => { func.apply(this, args); }, timeout);
		};
	}

	const updateQuantity = addCartDebounce(() => addCartItemToSession(productId, companyId, productQuantity));

	$("#btn-add-to-product-quantity").click(function () {
		productQuantity += 1;
		setProductQuantity(productQuantity);
		updateQuantity();
	});

	btnRemoveProductQuantityElement.click(function () {
		if (productQuantity <= minimumOrderQuantity) {
			delete cart[`${productId}`];
			hideQuantityBox();
			removeCartItemFromCartSession();
			clearTimeout(timerDebounce);
		} else {
			productQuantity -= 1;
			setProductQuantity(productQuantity);
			updateQuantity();
		}
	});

	// endregion cart

});