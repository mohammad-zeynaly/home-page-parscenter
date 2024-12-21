/**
 * When indexing the pages by Google, if the style and script files are not loaded, this variable is not defined, and in the layout of the site and company with the condition on this variable that if it is not defined, the embedded styles will be added to the "head" tag.
 */
var javascriptFileLoaded = true;

// #region show message notification

function ShowMessage(title, text, theme) {
	window.createNotification({
		closeOnClick: true,
		displayCloseButton: false,
		positionClass: 'nfc-bottom-right',
		showDuration: 4000,
		theme: theme !== '' ? theme : 'success'
	})({
		title: title !== '' ? title : 'اعلان',
		message: decodeURI(text)
	});
}

// #endregion

// region cropper

const addPcUcItem = (value, srcImagePreview, cropperProperty) => {
	return item = `<div class="col-xs-${cropperProperty.xsCols} col-sm-${cropperProperty.cols} pc-uc-item detail-pc-uc-item">` +
		`<div class="pc-uc-item-inner">` +
		`<input type="hidden" name="${cropperProperty.imageValueInputId}" value="${value}" ${cropperProperty.maxItems < 2 ? `id="${cropperProperty.imageValueInputId}"` : ""}>` +
		`<img src="${srcImagePreview}" alt="" class="img-responsive" style="height: 100% !important;">` +
		`<div class="row">` +
		`<div class="col-xs-8">` +
		`<a class="c-pointer" data-remove-cropper-image-item="#pc-uc-items-${cropperProperty.fileSection}" onclick="removeImageItem(this)">` +
		`حذف` +
		`</a>` +
		`</div>` +
		`<div class="col-xs-4 text-side text-muted">&nbsp;</div>` +
		`</div>` +
		`</div>` +
		`</div>`;
}

const successSubmitUploadImage = (src, dataId, cropperProperty, callbackCloseCroper) => {

	ShowMessage('موفقیت', cropperProperty.successMessage, 'success');

	const srcImagePreview = src.replace("FILEIDIMAGE", dataId);

	const item = addPcUcItem(dataId, srcImagePreview, cropperProperty);

	const idPcItems = $(`#pc-uc-items-${cropperProperty.fileSection}`);

	$(idPcItems).prepend(item);

	const lengthDetailItem = $(idPcItems).find(".detail-pc-uc-item").length;

	if (lengthDetailItem >= cropperProperty.maxItems)
		$(idPcItems).find(".pc-uc-add").addClass("d-none");

	callbackCloseCroper();
}

const successSubmitUploadLogo = (src, dataId, cropperProperty, callbackCloseCroper) => {
	const srcImagePreview = src.replace("FILEIDIMAGE", dataId);

	$.ajax({
		url: '/Manage/Home/ChangeCompanyLogo',
		type: "POST",
		data: { fileId: dataId },
		success: function (data) {
			if (data.success) {
				ShowMessage('موفقیت', data.message, 'success');
				$("#company-logo-header-drawer").attr("src", srcImagePreview);
				callbackCloseCroper();
			}
		},
		error: function (err) {
			if (err.readyState === 4 && err.status === 400 && !err.responseJSON.success) {
				ShowMessage('خطا', err.responseJSON.message, 'error');
			} else if (err.readyState === 4 && err.status === 500) {
				ShowMessage('خطا', 'خطا', 'error');
			}
			callbackCloseCroper();
		}
	})
}

const successSubmitUploadPaymentReceipt = (src, dataId, cropperProperty, callbackCloseCroper) => {

	ShowMessage('موفقیت', cropperProperty.successMessage, 'success');

	$("#PaymentDetailModel_FileId").val(dataId);
	
	const srcImagePreview = src.replace("FILEIDIMAGE", dataId);
	$("#payment-receipt-preview-img-tag").attr('src', srcImagePreview);
	$("#upload-payment-receipt-img").addClass('d-none');
	$("#payment-receipt-preview-img").removeClass('d-none');
	
	callbackCloseCroper();
}

let cropperImages = {
	SiteBanner: {
		aspectRatioWidth: 1200,
		aspectRatioHeight: 220,
		width: 1200,
		height: 220,
		cropperUploadedImageType: 'image/jpeg',
		image: document.getElementById('cropper-SiteBanner-img'),
		result: document.getElementById('result-cropper-SiteBanner'),
		successMessage: 'بنر با موفقیت ذخیره شد',
		maxItems: 1,
		imageValueInputId: 'BannerImageId',
		xsCols: 12,
		cols: 12,
		fileSection: 'SiteBanner',
		aspectRatioFree: false,
		callbackSuccessUpload: successSubmitUploadImage
	},
	CompanyLogo: {
		aspectRatioWidth: 4,
		aspectRatioHeight: 3,
		width: 150,
		height: 112,
		cropperUploadedImageType: 'image/jpeg',
		image: document.getElementById('cropper-CompanyLogo-img'),
		result: document.getElementById('result-cropper-CompanyLogo'),
		successMessage: 'لوگو با موفقیت ذخیره شد',
		maxItems: 1,
		imageValueInputId: 'Logo',
		xsCols: 6,
		cols: 3,
		fileSection: 'CompanyLogo',
		aspectRatioFree: true,
		callbackSuccessUpload: successSubmitUploadImage
	},
	CompanyLogoLayout: {
		aspectRatioWidth: 4,
		aspectRatioHeight: 3,
		width: 150,
		height: 112,
		cropperUploadedImageType: 'image/jpeg',
		image: document.getElementById(`cropper-CompanyLogo-img`),
		result: document.getElementById('result-cropper-CompanyLogo'),
		successMessage: 'لوگو با موفقیت ذخیره شد',
		maxItems: 1,
		fileSection: 'CompanyLogo',
		aspectRatioFree: true,
		callbackSuccessUpload: successSubmitUploadLogo
	},
	CompanyImage: {
		aspectRatioWidth: 4,
		aspectRatioHeight: 3,
		width: 1200,
		height: 800,
		cropperUploadedImageType: 'image/jpeg',
		image: document.getElementById('cropper-CompanyImage-img'),
		result: document.getElementById('result-cropper-CompanyImage'),
		successMessage: 'تصویر با موفقیت ذخیره شد',
		maxItems: 3,
		imageValueInputId: 'Images',
		xsCols: 6,
		cols: 3,
		fileSection: 'CompanyImage',
		aspectRatioFree: true,
		callbackSuccessUpload: successSubmitUploadImage
	},
	ProductImage: {
		aspectRatioWidth: 4,
		aspectRatioHeight: 3,
		width: 1200,
		height: 800,
		cropperUploadedImageType: 'image/jpeg',
		image: document.getElementById('cropper-ProductImage-img'),
		result: document.getElementById('result-cropper-ProductImage'),
		successMessage: 'تصویر با موفقیت ذخیره شد',
		maxItems: 3,
		imageValueInputId: 'Images',
		xsCols: 6,
		cols: 3,
		fileSection: 'ProductImage',
		aspectRatioFree: true,
		callbackSuccessUpload: successSubmitUploadImage
	},
	ProductGroupImage: {
		aspectRatioWidth: 1,
		aspectRatioHeight: 1,
		width: 800,
		height: 600,
		cropperUploadedImageType: 'image/jpeg',
		image: document.getElementById('cropper-ProductGroupImage-img'),
		result: document.getElementById('result-cropper-ProductGroupImage'),
		successMessage: 'تصویر گروه با موفقیت ذخیره شد',
		maxItems: 1,
		imageValueInputId: 'ImageId',
		xsCols: 6,
		cols: 3,
		fileSection: 'ProductGroupImage',
		aspectRatioFree: true,
		callbackSuccessUpload: successSubmitUploadImage
	},
	CustomListImage: {
		aspectRatioWidth: 4,
		aspectRatioHeight: 3,
		width: 1200,
		height: 800,
		cropperUploadedImageType: 'image/jpeg',
		image: document.getElementById('cropper-CustomListImage-img'),
		result: document.getElementById('result-cropper-CustomListImage'),
		successMessage: 'تصویر با موفقیت ذخیره شد',
		maxItems: 3,
		imageValueInputId: 'Images',
		xsCols: 6,
		cols: 3,
		fileSection: 'CustomListImage',
		aspectRatioFree: true,
		callbackSuccessUpload: successSubmitUploadImage
	},
	PaymentReceipt: {
		aspectRatioWidth: 4,
		aspectRatioHeight: 3,
		width: 1200,
		height: 800,
		cropperUploadedImageType: 'image/jpeg',
		image: document.getElementById('cropper-PaymentReceipt-img'),
		result: document.getElementById('result-cropper-PaymentReceipt'),
		successMessage: 'رسید پرداخت با موفقیت آپلود شد',
		maxItems: 1,
		imageValueInputId: 'Images',
		xsCols: 6,
		cols: 3,
		fileSection: 'PaymentReceipt',
		aspectRatioFree: true,
		callbackSuccessUpload: successSubmitUploadPaymentReceipt
	},
}

const removeImageItem = (e) => {
	const idPcItems = $(e).data("remove-cropper-image-item");
	$(e).parents(".detail-pc-uc-item").remove();
	const lengthDetailItem = $(idPcItems).find(".detail-pc-uc-item").length;
	const maxItems = cropperImages[idPcItems.split("items-")[1]].maxItems;

	if (lengthDetailItem < maxItems)
		$(idPcItems).find(".pc-uc-add").removeClass("d-none");
}

// endregion

$(document).ready(function () {

	//#region copy to clipbord

	$("#sharing-url-copy").click(function (e) {
		const btnValue = $(this).html();
		const copyUrlValue = $("#sharing-url-value").val();

		const result = copyToClipboard(copyUrlValue);
		if (result) {
			$(this).html($(this).data("copied"));

			setTimeout(() => {
				$(this).html(btnValue);
			}, "1000");
		}
	});

	/**
	 * Copies the text passed as param to the system clipboard
	 * Check if using HTTPS and navigator.clipboard is available
	 * Then uses standard clipboard API, otherwise uses fallback
	*/
	const copyToClipboard = (text) => {
		if (window.isSecureContext && navigator.clipboard) {
			navigator.clipboard.writeText(text);
			return true;
		} else {
			return unsecuredCopyToClipboard(text);
		}
	};

	const unsecuredCopyToClipboard = (text) => {
		const textArea = document.createElement("textarea");
		textArea.value = text;
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		try {
			document.execCommand('copy')
		} catch (err) {
			return false;
		}
		document.body.removeChild(textArea);
		return true;
	};

	//#endregion

});

String.format = function (text) {

	//check if there are two arguments in the arguments list
	if (arguments.length <= 1) {
		//if there are not 2 or more arguments there’s nothing to replace
		//just return the original text
		return text;
	}

	//decrement to move to the second argument in the array
	var tokenCount = arguments.length - 2;
	for (var token = 0; token <= tokenCount; token++) {
		//iterate through the tokens and replace their placeholders from the original text in order
		text = text.replace(new RegExp("\\{" + token + "\\}", "gi"), arguments[token + 1]);
	}

	return text;
};