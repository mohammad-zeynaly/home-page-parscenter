
String.format = function( text ) {
    
    //check if there are two arguments in the arguments list
    if ( arguments.length <= 1 ) {
        //if there are not 2 or more arguments there’s nothing to replace
        //just return the original text
        return text;
    }

    //decrement to move to the second argument in the array
    var tokenCount = arguments.length - 2;
    for( var token = 0; token <= tokenCount; token++ ) {
        //iterate through the tokens and replace their placeholders from the original text in order
        text = text.replace( new RegExp( "\\{" + token + "\\}", "gi" ), arguments[ token + 1 ]);
    }

    return text;
};

var persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
function convertToPersianNumbers(str) {	            
	if (persianNumbers) {
		for (var i = 0; i < persianNumbers.length; i++) {
			str = str.replace(new RegExp(i, 'g'), persianNumbers[i]);
		}
	}
	return str;
}

function numberWithCommas(str) {
    return str.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str) {
        return this.indexOf(str) == 0;
    };
}



function closePopup() {
    $.magnificPopup.close();
}

function openPopup(url, mainClass, reload) {
    $.magnificPopup.open({
        items: {
            type: 'iframe',
            src: url
        },
        mainClass: 'mfp-slide-bottom mfp-iframe-container mfp-iframe-' + mainClass,
        callbacks: {
            close: function() {
                if (reload) window.location.reload();
            }
        },
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300
    });
}

function openInlinePopup(src) {
    $.magnificPopup.open({
        items: {
            type: 'inline',
            src: src
        },
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'mfp-slide-bottom'
    });
}

function openAjaxPopup(src) {
    $.magnificPopup.open({
        items: {
            type: 'ajax',
            src: src
        }
    });
}

function showProgress() {
    $('#ajaxloader').show();
}

function hideProgress() {
    $('#ajaxloader').hide();
}

function autocompleteSearch(source) {
	$(".search-field input").autocomplete({
		source: source,
		select: function (event, ui) {
			$('.search-field input').val(ui.item.value);
			$('.search-field form').submit();
		}
	}).autocomplete("instance")._renderItem = function (ul, item) {
		return $("<li></li>")
			.data("item.autocomplete", item)
			.append("<a>" + item.desc + "</a>")
			.appendTo(ul);
	};
}

function IeRtlFix() {
    if ($.browser.msie && parseInt($.browser.version) == 9 && $(window).width() % 2 != 0) { $('#header, #content').width(961); } 
}

/* with some extra work this can make the site really cool
$(function () {
    var loadPage = function (href) {
        $.get(href, {}, function (data) {
            var $response = $('<div />').html(data);
            $('.sidebar-offcanvas').replaceWith($response.find('.sidebar-offcanvas'));
            $('.content-offcanvas .data-list').replaceWith($response.find('.content-offcanvas .data-list'));
            document.title = $response.match(/<title>(.*?)<\/title>/)[1].trim();
        }, 'html');
    };

    $(window).on("popstate", function (e) {
        if (e.originalEvent.state !== null) {
            loadPage(location.href);
        }
    });

    $(document).on("click", ".sidebar-offcanvas a", function () {
        var href = $(this).attr("href");

        if (href.indexOf(document.domain) > -1
          || href.indexOf(':') === -1) {
            history.pushState({}, '', href);
            loadPage(href);
            return false;
        }
    });
});
*/