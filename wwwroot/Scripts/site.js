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

/**
 * When indexing the pages by Google, if the style and script files are not loaded, this variable is not defined, and in the layout of the site and company with the condition on this variable that if it is not defined, the embedded styles will be added to the "head" tag.
 */
var javascriptFileLoaded = true;

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

var persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

function convertToPersianNumbers(str) {
    if (persianNumbers) {
        for (var i = 0; i < persianNumbers.length; i++) {
            str = str.replace(new RegExp(i, 'g'), persianNumbers[i]);
        }
    }
    return str;
}

Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str) {
        return this.indexOf(str) == 0;
    };
}

$(function () {

    $(".contact-button").click(function (event) {
        event.preventDefault();
        openPopup($(this).attr('href'), 'contact');
    });

    // Switch Box
    $('.switch-box ul.tabs li').hover(function () {
        $('.switch-box ul.tabs li').removeClass('active').eq($(this).index()).addClass('active');
        $('.switch-box .content').removeClass('content-active').eq($(this).index()).addClass('content-active');
    });

    var switchBoxScroll = function () {
        var elems = $('.switch-box .content-active > div.row');
        var active = elems.filter('.active');
        var newIndex = elems.index(active) + 1;
        newIndex = (newIndex == elems.length) ? 0 : newIndex;
        active.removeClass('active');
        elems.eq(newIndex).addClass('active');
    };

    var switchBoxScrollTimer = null;
    var startSwitchBoxScroll = function () {
        switchBoxScrollTimer = setInterval(function () {
            switchBoxScroll();
        }, 5000);
    };

    $('.switch-box .content').hover(function () {
        if (switchBoxScrollTimer != null)
            clearInterval(switchBoxScrollTimer);
    }, function () {
        startSwitchBoxScroll();
    });

    if ($('.switch-box').length > 0) {
        startSwitchBoxScroll();
    }

    /*
    *
    * Intro Banner at home page
    *
    */
    var switchBannerTab = function (index) {
        var panes = $('.banner li');
        var tabs = $('.banner div');
        var activePane = panes.filter('.active');
        var activeTab = tabs.filter('.active');
        if (index == null) {
            index = activePane.index() + 1;
            index = (index == panes.length) ? 0 : index;
        }
        activePane.removeClass('active');
        panes.eq(index).addClass('active');
        tabs.eq(index).fadeIn('slow', function () {
            $(this).addClass('active');
        });
        activeTab.fadeOut('slow', function () {
            $(this).removeClass('active');
        });
    };

    var bannerSwitchTimer = null;
    var startBannerSwitch = function () {
        bannerSwitchTimer = setInterval(function () {
            switchBannerTab();
        }, 6000);
    };

    $('.banner li').hover(function () {
        if (bannerSwitchTimer != null)
            clearInterval(bannerSwitchTimer);
        switchBannerTab($(this).index());
    }, function () {
        startBannerSwitch();
    });

    //startBannerSwitch();

    // $(".frm input[title != '']").tooltip({
    $(".showtip[title != '']").tooltip({
        // place tooltip on the right edge
        position: "top right",

        // a little tweaking of the position
        offset: [5, -150],

        // use the built-in fadeIn/fadeOut effect
        effect: "slide",

        // custom opacity setting
        opacity: 0.8
    });

    $(".showbigtip[title != '']").tooltip({
        position: "bottom left",
        offset: [-22, 2],
        effect: "fade",
        tipClass: 'bigtip'
    });

    $(".showtip-simple[title != '']").tooltip({
        position: "top center",
        offset: [0, 0],
        tipClass: 'simpletip'

    });

    $('.home-menu li li:last-child').addClass('home-menu-last');

    $('#slide-message').delay(10000).slideUp();

    $('#groups li.grouped > a').click(function () {
        $(this).parents('li').toggleClass('grouped-expand');
        return false;
    });

    $('form button[type=submit]').each(function () {
        $(this).removeAttr('disabled');
    });

    $('form button[type=submit]').click(function (evt) {
        evt.preventDefault();
        var self = $(this);
        var frm = self.closest('form');
        // ASP.NET MVC 3 unobtrusive validation, submit and TinyMCE
        if (typeof tinyMCE != "undefined") tinyMCE.triggerSave();
        frm.validate();
        if (frm.valid()) {
            frm.submit();
            self.attr('disabled', 'disabled');
            self.addClass('button-submitting');
        }
    });

    $('.field-validation-error').each(function () {
        $(this).html($('<span>').text($(this).text()));
    });

    $('.pager-direct button').click(function () {
        var btn = $(this);
        var pg = btn.prev().val();
        var total = btn.data('total');
        if (isNaN(pg) || pg > total || pg < 1) {
            return;
        }
        window.location = String.format(btn.data('url'), pg);
    });

    $(document).on('click', '.popup-modal', function (e) {
        e.preventDefault();
        openInlinePopup($(this).attr('href'));
    });

    $(document).on('click', '.popup-ajax', function (e) {
        e.preventDefault();
        openAjaxPopup($(this).attr('href'));
    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });

    $(document).on('click', '.popup-iframe', function (e) {
        e.preventDefault();
        openPopup($(this).attr('href'), $(this).data('popup-class'), $(this).data('popup-reload'));
    });

    $('[data-toggle="offcanvas"]').click(function () {
        $(this).toggleClass('toggle-offcanvas-open');
        $('.row-offcanvas').toggleClass('active');
        var sidebarHeight = $('.sidebar-offcanvas').height();
        var contentHeight = $('.content-offcanvas').height();
        if (sidebarHeight > contentHeight) {
            $('.content-offcanvas').height(sidebarHeight);
        }
        return false;
    });

    $('.product-display-page .editor-shared table').addClass('table').wrap('<div class="table-responsive"></div>');

    $('.data-list-product-search-related-more').click(function () {
        $(this).parents('.data-list-product-search-related').find('.data-list-product-search-related-item').toggleClass('data-list-product-search-related-item-visible');
        $(this).find('.glyphicon').toggleClass('glyphicon-menu-down glyphicon-menu-up');
        return false;
    });

    // asp.net mvc 5 decimal validation issue
    // http://blog.tutorem.com/post/2014/06/20/ASPNet-MVC-5-Issue-Validating-Numbers-%28Decimal%29-when-Number-Contains-Commas1.aspx
    $.validator.methods.range = function (value, element, param) {
        var globalizedValue = value.replace(",", ".");
        return this.optional(element) || (globalizedValue >= param[0] && globalizedValue <= param[1]);
    }
    $.validator.methods.number = function (value, element) {
        return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:[\s\.,]\d{3})+)(?:[\.,]\d+)?$/.test(value);
    };
});

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
            close: function () {
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
    $(".nav-search input").autocomplete({
        source: source,
        select: function (event, ui) {
            $('.nav-search input').val(ui.item.value);
            $('.nav-search form').submit();
        }
    }).autocomplete("instance")._renderItem = function (ul, item) {
        return $("<li></li>")
            .data("item.autocomplete", item)
            .append("<a>" + item.desc + "</a>")
            .appendTo(ul);
    };
}


function autocompleteHeaderSearchInput(formId, source) {
    $("#" + formId + " input").autocomplete({
        source: source,
        position: {
            my: "left+0 top+16",
        },
        select: function (event, ui) {
            $("#" + formId + " #query").val(ui.item.value);
            ($("#" + formId))[0].submit();
        }
    }).autocomplete("instance")._renderItem = function (ul, item) {
        return $("<li></li>")
            .data("item.autocomplete", item)
            .append("<a>" + item.desc + "</a>")
            .appendTo(ul);
    }
}

function IeRtlFix() {
    if ($.browser.msie && parseInt($.browser.version) == 9 && $(window).width() % 2 != 0) {
        $('#header, #content').width(961);
    }
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