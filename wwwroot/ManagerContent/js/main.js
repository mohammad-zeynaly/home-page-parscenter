// Set button to click.
var button = document.getElementById( 'menu-toggle' );

// Click the button.
if (button) {


button.onclick = function() {

  // Toggle class "opened". Set also aria-expanded to true or false.
  if ( -1 !== button.className.indexOf( 'opened' ) ) {
    button.className = button.className.replace( ' opened', '' );
    button.setAttribute( 'aria-expanded', 'false' );
  } else {
     button.className += ' opened';
    button.setAttribute( 'aria-expanded', 'true' );
   }

 }

}



$('.products-slide').slick({
  dots: true,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 770,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 520,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

$('.profile-slider').slick({
  rtl: true,
  arrows: false,
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000
});


var tl = new TimelineMax({repeat: -1,  repeatDelay:1});

tl.fromTo('.text1', 1, {top:150, opacity:0}, {top:180, opacity:1});
tl.fromTo('.text2', 1, {top:220, opacity:0}, {top:250, opacity:1});
tl.to('.text1', .5,  {top:150, opacity: 0, delay: 2});
tl.to('.text2', 1,  {top:220, opacity: 0});
tl.to('.animated-slider', .2, {backgroundColor: '#C3DBB3'});
tl.to('.registration', .3, {display: 'block'});
tl.staggerFromTo(['.item1', '.item2', '.item3', '.item4', '.item5'], 1, {bottom: -30, opacity:0}, {bottom:0, opacity:1}, .5);
tl.to(['.item1'], .5, {color: "red"}, "register");
tl.fromTo(['.registeration-link'], 2, {top:210, opacity:0},  {top:250, opacity:1});
tl.fromTo(['.registeration-def'], 2,  {top:350, opacity:0},  {top:370, opacity:1}, "-=3");
tl.to(['.registeration-link'], 1, {opacity:0});
tl.to(['.registeration-def'], 1, {opacity:0});
tl.to('.animated-slider', .2, {backgroundColor: '#BAD6EF'});
tl.to(['.item1'], .1, {color: "black"});
tl.to(['.item3'], .5, {color: "red"}, "announcement");
tl.staggerFromTo(['.item6', '.item7', '.item8'], 1, {bottom: -30, opacity:0}, {bottom:0, opacity:1}, .5);
tl.fromTo(['.announcement-def'], 1,  {top:190, opacity:0},  {top:150, opacity:1}, "-=1");
tl.to(['.item6', '.item7', '.item8'], 1, {opacity:0, delay: 2});
tl.to(['.announcement-def'], 1, {opacity:0}, "-=1");
tl.to('.animated-slider', .2, {backgroundColor: '#FFF1CB'});
tl.to(['.item1', '.item3'], .1, {color: "black"});
tl.to('.item5', .5, {color: "red"}, "product-announce");
tl.to('.megaphone', .5, {opacity: 1});
tl.to('.wave1', 1, {opacity: 1, repeat: 4});
tl.to('.wave2', 1, {opacity: 1, repeat: 4}, "=-4");
tl.to('.megaphone-circle', .3, {opacity: 1}, "=-4");
tl.to(['.line2', '.people2-circle', '.people2'], .5, {opacity: 1});
tl.to(['.line3', '.people1-circle', '.people1'], .5, {opacity: 1});
tl.to(['.line1', '.circle1'], .5, {opacity: 1});
tl.to(['.line4', '.circle2'], .5, {opacity: 1});
tl.fromTo(['.product-announcement-def'], 2,  {bottom:-30, opacity:0},  {bottom: -20, opacity:1}, "-=2");

$('.item1').on('mouseover', function() {
  tl.seek("register");
})

$('.item3').on('mouseover', function() {
  tl.seek("announcement");
})

$('.item5').on('mouseover', function() {
  tl.seek("product-announce");
})



$('.search-icon').on('click', function(event) {
  var target = $(event.target);
  if ( target.is( '.search-icon, svg' ) ) {
    $(this).toggleClass('search-reveal');
  }
  return false;
});

$('.has-child').on('click', function() {
  $(this).toggleClass('expand');
  $(this).find('ul.children').toggleClass('hide');
  return true;
})


$('.alertbox-closem, .alertbox-close svg').on('click', function() {
  $(this).parents('.alertbox').fadeOut();
})

$('.searchbox-trigger').on('click', function() {
  $('.mobile-searchbox').toggleClass('reveal');
  return false;
});


// Set button to click.
var companyButton = document.getElementById('company-menu-toggle');
// Click the button.
if (companyButton) {
	companyButton.onclick = function() {
		// Toggle class "opened". Set also aria-expanded to true or false.
		if ( -1 !== companyButton.className.indexOf( 'opened' ) ) {
			companyButton.className = companyButton.className.replace( ' opened', '' );
			companyButton.setAttribute( 'aria-expanded', 'false' );
		} else {
			companyButton.className += ' opened';
			companyButton.setAttribute( 'aria-expanded', 'true' );
		}
	}
}

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
}

const removeImageItem = (e) => {
	const idPcItems = $(e).data("remove-cropper-image-item");
	$(e).parents(".detail-pc-uc-item").remove();
	const lengthDetailItem = $(idPcItems).find(".detail-pc-uc-item").length;
	const maxItems = cropperImages[idPcItems.split("items-")[1]].maxItems;

	if (lengthDetailItem < maxItems)
		$(idPcItems).find(".pc-uc-add").removeClass("d-none");
}