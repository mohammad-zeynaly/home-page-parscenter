(function($) {
    $.fn.expandable = function (options) {

        var defaults = { max: 40, min: 1, expElem: 'a.exp', prepend: '', rowElem: '.expandable-row' };

        var settings = $.extend({}, defaults, options);

        return this.each(function() {
            settings.root = $(this);
            $(this).sortable({
                handle: '.move-handle',
                stop: function(event, ui) { fixLinks(); }
            });
            fixLinks();
        });

        function onAdd() {
            $(this).parents(settings.rowElem).clone().hide().appendTo(settings.root).slideDown().find('input').attr('value', '');
            fixLinks();
            return false;
        }

        function onRemove() {
            $(this).parents(settings.rowElem).slideUp('normal', function () {
                $(this).remove();
                fixLinks();
            });
            return false;
        }

        function fixLinks() {
            var rows = getRows();
            rows.each(function(index) {
                var expElem = $(this).find(settings.expElem);
                expElem.unbind();
                if (index + 1 === rows.length && rows.length < settings.max) {
                    expElem.html('<span class="glyphicon glyphicon-plus text-muted text-big"></span>');
                    expElem.click(onAdd);
                } else {
                    expElem.html('<span class="glyphicon glyphicon-minus text-muted text-big"></span>');
                    expElem.click(onRemove);
                }
                // fix id and name
                $(this).find("[id],[name],[for]").each(function() {
                    var id = $(this).attr('id');
                    if (id) {
                        $(this).attr('id', id.replace(/(.*_)\d+(_.*)/i, '$1' + index + '$2'));
                    }
                    var name = $(this).attr('name');
                    if (name) {
                        $(this).attr('name', settings.prepend + name.replace(/(.*\[)\d+(\].*)/i, '$1' + index + '$2'));
                    }
                    var fo = $(this).attr('for');
                    if (fo) {
                        $(this).attr('for', settings.prepend + fo.replace(/(.*\[)\d+(\].*)/i, '$1' + index + '$2'));
                    }
                });
            });
        }

        function getRows() {
            return settings.root.children(settings.rowElem);
        }
    };  
})(jQuery);