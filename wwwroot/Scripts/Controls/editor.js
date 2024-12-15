$.fn.editor = function (options) {

    var opts = $.extend({}, $.fn.toggler.defaults, options);

    return this.each(function() {
        if (opts.admin) {
            $(this)
                .trumbowyg({
                    svgPath: opts.svgPath,
                    removeformatPasted: true,
                    btnsDef: {
                        image: {
                            dropdown: ['insertImage', 'upload'],
                            ico: 'insertImage'
                        }
                    },
                    btns: [
                        ['viewHTML'],
                        ['undo', 'redo'],
                        ['p', 'h3', 'h4'],
                        ['bold', 'italic'],
                        'link', 'image',
                        'btnGrp-lists',
                        ['direction-ltr', 'direction-rtl'],
                        ['fullscreen']
                    ],
                    plugins: {
                        upload: {
                            serverPath: opts.uploadPath
                        }
                    }
                });
        } else {
            $(this)
                .trumbowyg({
                    svgPath: opts.svgPath,
                    removeformatPasted: true,
                    btns: [
                        ['undo', 'redo'],
                        ['p', 'h3', 'h4'],
                        ['bold', 'italic'],
                        'btnGrp-lists',
                        ['direction-ltr', 'direction-rtl'],
                        ['fullscreen']
                    ]
                });
        }
    });
};

$.fn.editor.defaults = { admin: false };