$.fn.sortableGrid = function(options) {

    var opts = $.extend({}, $.fn.sortableGrid.defaults, options);

    return this.each(function() {
        $(this).find("tbody").sortable({
            placeholder: opts.placeHolderClass,
            handle: opts.handle,
            items: opts.items,
            update: function(event, ui) {
                showProgress();
                $.ajax({
                    type: 'POST',
                    url: opts.postUrl,
                    data: $(opts.postData).serialize(),
                    success: function(r) {
                        hideProgress();
                        if (!r.status) {
                            alert(r.message);
                        }
                    }
                }); // end of ajax call

            }
        }).disableSelection();
    });
};

$.fn.sortableGrid.defaults = { postData: '.order-handle input', handle: '.order-handle', placeHolderClass: 'mgrd-placeholder-small', items: 'tr' };