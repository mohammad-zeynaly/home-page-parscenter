$.fn.uploader = function (method) {
    if ($.fn.uploader.methods[method]) {
        return $.fn.uploader.methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
        return $.fn.uploader.methods.init.apply(this, arguments);
    } else {
        $.error('Method ' + method + ' does not exist on uploader');
    }
};

$.fn.uploader.methods = {
    init: function (options) {
        var opts = $.extend(options, $.fn.uploader.options);
        var $this = $(this);
        opts.uploadUrl += "?uc=" + this.attr('id');

        if ($('#pc-uc-popup').length === 0)
            this.prepend('<div class="white-popup-block white-popup-block-medium mfp-hide" id="pc-uc-popup"></div>');
        
        $this.find(".pc-uc-add a").click(function () {
            $(this).parents('.pc-uc').uploader('createControl');
            $.magnificPopup.open({items: { type: 'inline', src: "#pc-uc-popup" }});
            return false;
        });

        if (opts.max > 1) {
            $this.find(".pc-uc-items")
                .sortable({
                    items: '.pc-uc-item',
                    //axis: "x",
                    stop: function(event, ui) { $(this).parents('.pc-uc').uploader('fixNames'); }
                });
        }
        $this.data('options', opts);

        this.uploader('enableImageRemoveLink');
        this.uploader('toggleImageAddLink');
    },

    createControl: function () {
        var options = $(this).data('options');
        var uploadFrame = '<div class="pc-uc-frame"><iframe src="' + options.uploadUrl + '&mode=normal" style="width:100%;height:100%;background-color:transparent;" scrolling="auto" frameborder="0" allowtransparency="true" id="popupFrame" name="popupFrame" width="100%" height="100%"></iframe></div>';

        var popup = $('#pc-uc-popup');
        popup.html("");

        popup.append(String.format('<div id="pc-uc-simple">' +
                                    '<div class="pc-uc-help"><h3>' + options.title + '</h3><p>' + options.help + '</p></div>' +
                                    uploadFrame + '<div class="pc-uc-note">' + options.tip + '</div></div>', options.width));
    },

    toggleImageAddLink: function () {
        var options = $(this).data('options');
        var cnt = this.find(".pc-uc-items > div").length - 1;
        this.find('.pc-uc-add').css('display', (cnt === options.max) ? 'none' : 'block');
    },

    enableImageRemoveLink: function () {
        this.find('.pc-uc-item a').unbind().click(function () {
            $(this).parents('.pc-uc-item').fadeOut('slow', function () {
                var upc = $(this).parents('.pc-uc');
                $(this).remove();
                upc.uploader('toggleImageAddLink');
                upc.uploader('fixNames');
            });
            return false;
        });
    },

    fixNames: function () {
        this.find('.pc-uc-items > div:not(.pc-uc-add)').each(function (index) {
            $(this).find('input').each(function () {
                var name = $(this).attr('name');
                if (name) {
                    $(this).attr('name', name.replace(/(.*\[)\d(\].*)/i, '$1' + index + '$2'));
                }
            });
        });
    },

    uploadComplete: function (result) {
        var options = $(this).data('options');
        var rows = this.find(".pc-uc-items > div");
        var rowTemplate = options.rowTemplate;
        rowTemplate = rowTemplate.replace(/\(FileID\)/gi, result.id);
        rowTemplate = rowTemplate.replace(/\(FileName\)/gi, result.name);
        rowTemplate = rowTemplate.replace(/\(Title\)/gi, result.name.substr(0, result.name.lastIndexOf('.')));
        rowTemplate = rowTemplate.replace(/\(Icon\)/gi, result.icon);
        rowTemplate = rowTemplate.replace(/\(Index\)/gi, rows.length - 1);
        rows.last().before(rowTemplate);
        this.find('input[type="text"]').watermark('عنوان فایل را وارد کنید');
        this.uploader('enableImageRemoveLink');
        this.uploader('toggleImageAddLink');
    }
};

$.fn.uploader.uploadComplete = function (val) {
    $.magnificPopup.close();
    var result = eval('(' + val + ')');
    if (result.success) {
        $("#" + result.uc).uploader('uploadComplete', result);
    } else {
        alert(result.message);
    }
};

$.fn.uploader.options = { width: 420, height: 430 };