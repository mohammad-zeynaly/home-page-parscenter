$(document).ready(function () {

	// #region cart

	const companyId = parseInt($("#CompanyId").val());

	let cart = {};
	let productId = 0;
	let productQuantity = 0;

	String.prototype.toPersianDigits = function () {
		var id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
		return this.replace(/[0-9]/g, function (w) {
			return id[+w]
		});
	}

	const setProductQuantity = () => {
		if (productId > 0 && productQuantity > 0) {
			$(`.product-quantity[data-product-id="${productId}"]`).html(productQuantity);
		}
	}

	const getSumProductPrice = () => {
		if (productId > 0 && productQuantity > 0) {
			const price = cart[productId] && cart[productId]["Price"];
			const quantity = cart[productId] && cart[productId]["Quantity"];

			if (price !== undefined && quantity !== undefined) {
				const sumPrice = price * quantity;
				$(`.sum-price-product[data-product-id="${productId}"]`).html(sumPrice.toLocaleString().toString().toPersianDigits());
			}
		}
	}

	const getFinalPrice = () => {
		let total = 0;
		let totalPriceProductsTaxes = 0;
		for (const key in cart) {
			const price = cart[key] && cart[key]["Price"];
			const quantity = cart[key] && cart[key]["Quantity"];
			const taxFree = cart[key] && cart[key]["TaxFree"];
			if (price !== undefined && quantity !== undefined) {
				total += price * quantity;
				if (taxFree === false){
					totalPriceProductsTaxes += price * quantity;
				}
			}
		}
		const tax = totalPriceProductsTaxes / 10;
		const totalWithTax = total + tax;
		
		$("#final-price").html(total.toLocaleString().toString().toPersianDigits());
		$("#final-price-with-tax").html(totalWithTax.toLocaleString().toString().toPersianDigits());
		$("#tax").html(tax.toLocaleString().toString().toPersianDigits());
	}

	const checkCart = () => {
		const cartItemCount = Object.keys(cart).length;
		if (cartItemCount < 1) {
			$("#box-factor").remove();
			$("#btn-checkout").remove();

			const emptyCart = `<div class="d-flex flex-column align-items-center justify-content-center">
                    <img src="/images/cart-empty.png" alt="CartEmpty" class="cart-empty-img">
                    <p class="text-body-1">
                        سبد خرید شما خالی میباشد
                    </p>
                </div>`;

			$(".custom-table-body").html(emptyCart);
			$(".shopping-cart-header-badge").remove();
		} else
		{
			$(".shopping-cart-header-badge").html(cartItemCount)	
		}
	}

	const getCartFromSession = (callbackFunction) => {
		$.ajax({
			url: '/Products/GetCartSession',
			type: "GET",
			success: function (data) {
				if (data.success === true && data.cartSessionn !== "") {
					cart = JSON.parse(data.cartSessionn);
					cart = Object.keys(cart)
						.filter(key => cart[key].CompanyId === companyId)
						.reduce((obj, key) => {
							obj[key] = cart[key];
							return obj;
						}, {});
					
					if (typeof cart[productId] !== 'undefined') {
						productQuantity = cart[productId]["Quantity"];
					}

					if (callbackFunction !== undefined && typeof callbackFunction === "function")
						callbackFunction();
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

	const addCartItemToSession = () => {
		if (productId > 0 && productQuantity > 0) {

			$.ajax({
				url: '/Products/SetSessionCart',
				type: "POST",
				data: {
					productId: productId,
					quantity: productQuantity
				},
				success: function (data) {
					if (data.success === true) {
						ShowMessage("موفقیت", data.message, "success");
					} else {
						ShowMessage("خطا", data.message, "error");
					}

					getCartFromSession(() => {
						getSumProductPrice();
						getFinalPrice();
						setProductQuantity();
					});
				},
				error: function (err) {
					if (err.readyState === 4 && err.status === 500) {
						ShowMessage("خطا", "مشکلی پیش آمده است لطفا چند دقیقه دیگر تلاش بفرمایید", "error");
					}
				}
			})

		}
	}

	const removeCartItemFromCartSession = () => {
		$.ajax({
			url: '/Products/DeleteItemCartFromSession',
			type: "POST",
			data: {
				productId: productId.toString()
			},
			success: function (data) {
				if (data.success === true) {
					ShowMessage("موفقیت", data.message, "success");
					$(`#box-product-${productId}`).remove();
					getCartFromSession(() => {
						getFinalPrice();
						checkCart();
					});
				} else {
					ShowMessage("خطا", data.message, "error");
				}
			},
			error: function (err) {
				if (err.readyState === 4 && err.status === 500) {
					ShowMessage("خطا", "مشکلی پیش آمده است لطفا چند دقیقه دیگر تلاش بفرمایید", "error");
				}
			}
		})
	}

	let timerDebounce;
	const addCartDebounce = (func, timeout = 1000) => {
		return (...args) => {
			clearTimeout(timerDebounce);
			timerDebounce = setTimeout(() => { func.apply(this, args); }, timeout);
		};
	}

	const changeProductQuantity = addCartDebounce(() => addCartItemToSession());

	$(".btn-add-to-product-quantity[data-product-id]").click(function () {
		const dataProductId = $(this).data("product-id");
		if (dataProductId !== undefined) {
			productId = dataProductId;
			let quantity = cart[productId] && cart[productId]["Quantity"];
			if (quantity !== undefined) {
				cart[productId]["Quantity"] = ++quantity;
				productQuantity = quantity;
				setProductQuantity();
				changeProductQuantity();
				setIconRemoveProductQuantity();
			} else {
				productId = 0;
				productQuantity = 0;
			}
		} else {
			productId = 0;
		}
	});

	$(".btn-reduce-quantity-products[data-product-id]").click(function () {
		const dataProductId = $(this).data("product-id");
		if (dataProductId !== undefined) {
			productId = dataProductId;
			let quantity = cart[productId] && cart[productId]["Quantity"];
			if (quantity !== undefined) {
				const minimumOrderQuantity = cart[productId]["MinimumOrderQuantity"];
				if (minimumOrderQuantity !== undefined && quantity > minimumOrderQuantity) {
					cart[productId]["Quantity"] = --quantity;
					productQuantity = quantity;
					setProductQuantity();
					changeProductQuantity();
				} else {
					deleteProductFromCart(dataProductId);
				}
				setIconRemoveProductQuantity();
			} else {
				productId = 0;
				productQuantity = 0;
			}
		} else {
			productId = 0;
		}
	});
	
	const setIconRemoveProductQuantity = () => {
		const quantity = cart[productId] && cart[productId]["Quantity"];
		if (quantity !== undefined){
			const minimumOrderQuantity = cart[productId]["MinimumOrderQuantity"];
			if (minimumOrderQuantity !== undefined){
				const spanRemoveProduct = $(`.btn-reduce-quantity-products[data-product-id='${productId}']`).find("span");
				if (quantity > minimumOrderQuantity && spanRemoveProduct.html() !== "remove"){
					spanRemoveProduct.html("remove")
				} else if (quantity <= minimumOrderQuantity){
					spanRemoveProduct.html("delete")
				}
			}
		}
	}

	const showDelteProductModal = () => {
		$("div#delete-product-modal").addClass("modal-dialog-show");
		$("body").css("overflow", "hidden");
	};

	const hideDelteProductModal = () => {
		$("div#delete-product-modal").removeClass("modal-dialog-show");
		$("body").css("overflow", "auto");
	};

	$("#close-delete-product-modal").click(function () {
		hideDelteProductModal();
	});

	$("#confirm-delete-product").click(function () {
		removeCartItemFromCartSession();
		hideDelteProductModal();
	});
	
	const deleteProductFromCart = (dataProductId) => {
		if (dataProductId !== undefined) {
			productId = dataProductId;
			const product = cart[productId];
			if (product !== undefined) {
				$("#product-name").html(`"${product["ProductName"]}"`);
				showDelteProductModal();
			}
		} else {
			productId = 0;
		}
	}

	// #endregion

});