$.fn.editableSelect = function() {
    return this.each(function() {
        var handle = $(this).find('.editable-select-handle');
        var list = $(this).find('.editable-select-list');
        handle.click(function (event) {
            event.stopPropagation();
            if (list.is(':visible'))
                list.hide();
            else
                list.show();
        });
        var input = $(this).find('input');
        list.find('li').hover(function() {
            $(this).addClass('hover');
        }, function() {
            $(this).removeClass('hover');
        }).click(function() {
            input.val($(this).html());
            list.hide();
        });
        $('body').click(function() {
            list.hide();
        });
    });
};