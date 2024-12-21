$.fn.toggler = function(options) {

    var opts = $.extend({}, $.fn.toggler.defaults, options);

    return this.each(function() {
        this.togglee = $($(this).attr('href')).hide();
        $(this).click(onClick);
    });

    function onClick() {
        this.togglee[opts.animate ? 'slideToggle' : 'toggle']();
        return false;
    }
};

$.fn.toggler.defaults = { animate: true };