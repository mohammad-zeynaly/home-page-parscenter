(function ($) {
    'use strict';
	
    var defaultOptions = {
        editorDirection: 'ltr'
    };	
	
    function directionTagHandler(element, trumbowyg) {
        var tags = [];
        if (element.style.direction !== null) {
            tags.push('direction-' + element.style.direction);
        }
        return tags;
    }	
	
	function setDirection(trumbowyg, dir) {
		trumbowyg.semanticCode(false, true);
		var node = trumbowyg.doc.getSelection().focusNode;
		while (['P', 'DIV'].indexOf(node.nodeName) < 0) {
			node = node.parentNode;
		}
		if (node && node.nodeName === 'P') {
			if(node.style.direction === dir) {
				node.style.direction = null;
			} else if (dir !== trumbowyg.o.plugins.direction) {
				node.style.direction = dir;
			}
		}		
	}

    $.extend(true, $.trumbowyg, {
        langs: {
            en: {
                direction: 'direction'
            }
        },

        plugins: {
            direction: {
                init: function (trumbowyg) {
					trumbowyg.o.plugins.direction = $.extend(true, {}, defaultOptions, trumbowyg.o.plugins.direction || {});
					
                    var ltrBtnDef = {
                        fn: function () {
							setDirection(trumbowyg, 'ltr');
                        }
                    };
					trumbowyg.addBtnDef('direction-ltr', ltrBtnDef);
					
                    var rtlBtnDef = {
                        fn: function () {
							setDirection(trumbowyg, 'rtl');
                        }
                    };
                    trumbowyg.addBtnDef('direction-rtl', rtlBtnDef);
                },
				tagHandler: directionTagHandler
            }
        }
    });
})(jQuery);
