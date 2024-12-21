$.fn.categorySelector = function(options) {

    var opts = $.extend({}, $.fn.categorySelector.defaults, options);

    return this.each(function() {
        $('.category-name').click(function() {
            if ($('.category-list').is(':visible') == false) {
                if (opts.categories == null) {
                    loadCategories();
                    $('.category-list-head input')
                        .delay(500)
                        .addClass("category-search-box-highlight", 700)
                        .removeClass("category-search-box-highlight", 500)
                        .addClass("category-search-box-highlight", 700)
                        .removeClass("category-search-box-highlight", 500);
                }
                $('.category-list').show();
                opts.selectedPath = $('.category-name').html();
            } else {
                hideCategoryList();
            }
        });

        $('body').click(function() {
            hideCategoryList();
        });
        $('.category-selector').click(function(event) {
            event.stopPropagation();
        });

        $('.category-list-head input').watermark(opts.searchPlaceholder);

        $('.category-select input').click(function() {
            $('.category-select-val').val($('.category-list-select select').last().val()).trigger('change');
            opts.selectedPath = $('.category-name').html();
            hideCategoryList();
        });
    });

    function loadCategories() {
        $.ajax({
			url: opts.loadUrl,
			type: "GET",
            cache: false,
            success: function(data) {
                opts.categories = opts.allCategories = data;
                bindCategories();
                $('.category-list-head input').bind('keyup', function () {
                    opts.categories = $.extend(true, [], opts.allCategories);
                    var val = $(this).val();
                    if (val !== '')
                        searchCategories(opts.categories, val.toLowerCase());
                    bindCategories();
                });
                $('.category-list-progress').hide();
            }
        });
    }

    function hideCategoryList() {
        $('.category-name').html(opts.selectedPath);
        $('.category-list').hide();
    }

    function bindCategories() {
        $('.category-list-select > div').remove();
        addCategoryList(opts.categories);
        var catId = $('.category-select-val').val();
        if (catId === '') {
            if (opts.categories.length > 0)
                selectListItem(0, opts.categories[0].Id);
        } else {
            selectCategory(Number(catId));
        }
    }

    function selectCategory(categoryId) {
        opts.selection = [];
        findCategory(opts.categories, categoryId, 0);
        for (var i = 0; i < opts.selection.length; ++i) {
            selectListItem(i, opts.selection[i]);
        }
    }

    function findCategory(categories, categoryId, index) {
        if (categories == null)
            return false;

        for (var i = 0; i < categories.length; ++i) {
            if (categories[i].Id === categoryId || findCategory(categories[i].SubCategories, categoryId, index + 1)) {
                opts.selection[index] = categories[i].Id;
                return true;
            }
        }
        return false;
    }

    function searchCategories(categories, keyword) {
        if (categories == null)
            return false;

        var index = 0;
        var cat = null;
        while ((cat = categories[index]) != null) {
            if (cat.Name.toLowerCase().indexOf(keyword) !== -1 || searchCategories(cat.SubCategories, keyword)) {
                index++;
            } else {
                categories.remove(index);
            }
        }
        return (index > 0);
    }

    function addCategoryList(categories) {

        var col = $('<div class="margin-bottom-sm"><select size="10" class="form-control"></select></div>');
        $('.category-list-select').append(col);
        var sel = col.children('select');
        for (var i = 0; i < categories.length; ++i) {
            sel.append('<option value=' + categories[i].Id + '>' + categories[i].Name + '</option>');
        }

        var cols = $('.category-list-select > div');
        cols.removeClass('col-sm-3 col-sm-4').addClass(cols.length === 4 ? 'col-sm-3' : 'col-sm-4');

        sel.change(selectionChanged);
    }

    function selectionChanged() {
        var index = $('.category-list-select select').index($(this));
        selectListItem(index);
    }

    function selectListItem(index, val) {
        var sel = $('.category-list-select > div').eq(index);
        if (val != null) {
            sel.find("option[selected]").removeAttr("selected");
            sel.find("option[value='" + val + "']").attr("selected", "selected");
        }
        var path = '';
        var parent = opts.categories;
        for (var i = 0; i <= index; ++i) {
            var x = $('.category-list-select > div').eq(i).find('select')[0].selectedIndex;
            path += ((path === '') ? '' : ' >> ') + parent[x].Name;
            parent = parent[x].SubCategories;
        }
        $('.category-name').html(path);
        $('.category-list-select div:gt(' + index + ')').remove();
        if (parent != null && parent.length > 0) {
            addCategoryList(parent);
            $('.category-select').slideUp('fast');
        } else {
            $('.category-select').slideDown('fast');
        }
    }
};

$.fn.categorySelector.defaults = { animate: false };