$.fn.selectMenu = function() {
    return this.each(function() {
        var select = $(this).hide(),
            selected = select.children(":selected"),
            value = selected.val() ? selected.text() : "";
        var ul = $("<ul></ul>")
        var div = $("<div class='select-menu'></div>")
            .insertAfter(select)
            .append("<span>" + value + "</span>")
            .disableSelection()
            .append(ul)
            .click(function() {
                ul.fadeToggle(100);
                return false;
            });
        select.children("option").each(function(index) {
            $("<li></li>")
                .data("value", this.value)
                .append($(this).text())
                .appendTo(ul);
        });
        ul.children("li").click(function() {
            var item = $(this);
            select.children("option").each(function() {
                if (this.value == item.data("value")) {
                    this.selected = true;
                    div.children("span").text(item.text());
                    return false;
                }
            });
        });
        $('body').click(function() {
            ul.hide();
        });
    });
};