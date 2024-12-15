$.fn.smsInput = function(options) {

    var opts = $.extend({}, $.fn.smsInput.defaults, options);

    return this.each(function() {
        var ctl = this.input = $(this);
        //if (opts.tip) {
        //    ctl = $('<span class="sms-text-note small quiet">' + opts.tip + '</span>').insertAfter(this.input);
        //}
        var stat = $('<div class="sms-text-count"></div>').insertAfter(ctl);
        this.availableChars = $('<span class="available">65</span>').appendTo(stat);
        stat.append('/');
        this.maxChars = $('<span class="max">70</span>').appendTo(stat);
        stat.append(' (');
        this.countChars = $('<span class="count">1</span>').appendTo(stat);
        stat.append(')');
        $(this).keyup(calcText);
        calcText.call(this);
    });

    function calcText() {
        var txt = this.input.val();
        var uni = isUnicode(txt);
        var len = txt.length;
        var unitLen = uni ? 70 : 160;
        var available = 0, max = 0, count = 0;
        if (len > unitLen) {
            unitLen -= uni ? 3 : 7;
        }
        count = Math.max(Math.ceil(len / unitLen), 1);
        available = (unitLen * count - len);
        this.availableChars.text(available);
        this.maxChars.text(unitLen);
        this.countChars.text(count);
    }

    function isUnicode(str) {
        for (var i = 0; i < str.length; ++i) {
            if (str.charCodeAt(i) > 255) {
                return true;
            }
        }
        return false;
    }
};