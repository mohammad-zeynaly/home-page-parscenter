$.fn.textList = function (options) {

    function onClick() {
        var a = $(this);
        var tbl = $(this).parents('.textboxlist');
        var lst = tbl.children('div.row');
        var len = lst.length;
        var newRow = lst.last().clone();
        newRow.appendTo(tbl);
        newRow.find('input').attr('value', '');
        newRow.find('a').replaceWith(a);
        if (Number(a.attr('rel')) === len + 1)
            a.remove();
        return false;
    }

    return this.each(function () {
        $(this).find('a').click(onClick);
    });
};