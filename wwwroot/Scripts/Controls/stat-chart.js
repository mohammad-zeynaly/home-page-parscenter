$.fn.statChart = function (options) {

    var opts = $.extend({}, $.fn.statChart.defaults, options);

    return this.each(function () {
        var container = $(this).css('position', 'relative');

        var detailContainer = $('<div id="detail-container">')
            .appendTo(container);

        var masterContainer = $('<div id="master-container">')
            .css({ position: 'absolute', top: 310, height: 80, width: '100%' })
            .appendTo(container);

        // create master and in its callback, create the detail chart
        createMaster();
    });

    // create the master chart
    function createMaster() {
        opts.masterChart = new Highcharts.Chart({
            chart: {
                renderTo: 'master-container',
                reflow: false,
                borderWidth: 0,
                backgroundColor: null,
                marginLeft: 50,
                marginRight: 20,
                zoomType: 'x',
                events: {
                    // listen to the selection event on the master chart to update the 
                    // extremes of the detail chart
                    selection: function (event) {
                        var extremesObject = event.xAxis[0],
                            min = extremesObject.min,
                            max = extremesObject.max,
                            detailData = [],
                            xAxis = this.xAxis[0];

                        // reverse engineer the last part of the data
                        jQuery.each(this.series[0].data, function (i, point) {
                            if (point.x > min && point.x < max) {
                                detailData.push({
                                    x: point.x,
                                    y: point.y
                                });
                            }
                        });

                        // move the plot bands to reflect the new detail span
                        xAxis.removePlotBand('mask-before');
                        xAxis.addPlotBand({
                            id: 'mask-before',
                            from: Date.UTC(opts.minDate.getFullYear(), opts.minDate.getMonth() - 1, opts.minDate.getDate()),
                            to: min,
                            color: 'rgba(0, 0, 0, 0.2)'
                        });

                        xAxis.removePlotBand('mask-after');
                        xAxis.addPlotBand({
                            id: 'mask-after',
                            from: max,
                            to: Date.UTC(opts.maxDate.getFullYear(), opts.maxDate.getMonth() - 1, opts.maxDate.getDate()),
                            color: 'rgba(0, 0, 0, 0.2)'
                        });

                        detailChart.series[0].setData(detailData);

                        return false;
                    }
                }
            },
            title: {
                text: null
            },
            xAxis: {
                type: 'datetime',
                showLastTickLabel: false,
                maxZoom: 1600 * 24 * 3600000, // fourteen 
                plotBands: [{
                    id: 'mask-before',
                    from: Date.UTC(opts.minDate.getFullYear(), opts.minDate.getMonth() - 1, opts.minDate.getDate()),
                    to: Date.UTC(opts.detailStart.getFullYear(), opts.detailStart.getMonth() - 1, opts.detailStart.getDate()),
                    color: 'rgba(0, 0, 0, 0.2)'
                }],
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return getPersianDate(this.value, true);
                    },
                    step: 2,
                    style: {
                        direction: 'rtl',
                        fontFamily: 'Vazirmatn'
                    }
                }
            },
            yAxis: {
                gridLineWidth: 0,
                labels: {
                    enabled: false
                },
                title: {
                    text: null
                },
                min: 0,
                showFirstLabel: false
            },
            tooltip: {
                formatter: function () {
                    return false;
                }
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    fillColor: {
                        linearGradient: [0, 0, 0, 70],
                        stops: [
                            [0, '#4572A7'],
                            [1, 'rgba(0,0,0,0)']
                        ]
                    },
                    lineWidth: 1,
                    marker: {
                        enabled: false
                    },
                    shadow: false,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    enableMouseTracking: false
                }
            },

            series: [{
                type: 'area',
                name: 'بازدیدها',
                pointInterval: 24 * 3600 * 1000,
                pointStart: Date.UTC(opts.minDate.getFullYear(), opts.minDate.getMonth() - 1, opts.minDate.getDate()),
                data: opts.data
            }],

            exporting: {
                enabled: false
            }

        }, function (masterChart) {
            createDetail(masterChart)
        });
    }

    // create the detail chart
    function createDetail(masterChart) {

        // prepare the detail chart
        var detailData = [],
            detailStart = Date.UTC(opts.detailStart.getFullYear(), opts.detailStart.getMonth() - 1, opts.detailStart.getDate());

        jQuery.each(masterChart.series[0].data, function (i, point) {
            if (point.x >= detailStart) {
                detailData.push(point.y);
            }
        });

        // create a detail chart referenced by a global variable
        detailChart = new Highcharts.Chart({
            chart: {
                marginBottom: 120,
                renderTo: 'detail-container',
                reflow: false,
                marginLeft: 50,
                marginRight: 20,
                spacingTop: -15,
                style: {
                    position: 'absolute'
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: null
            },
            subtitle: {
                text: 'یک بازه زمانی را با کشیدن بر روی چارت پایین انتخاب کنید',
                style: {
                    fontFamily: 'Vazirmatn',
                    fontSize: '10px'
                }
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    formatter: function () {
                        return getPersianDate(this.value);
                    },
                    style: {
                        direction: 'rtl',
                        fontFamily: 'Vazirmatn'
                    }
                }
            },
            yAxis: {
                title: null,
                maxZoom: 0.1
            },
            tooltip: {
                formatter: function () {
                    var point = this.points[0];
                    return ' ' + convertToPersianNumbers(point.y.toString()) + ' بازدید در ' + getPersianDate(this.x, true) + ' ';
                },
                style: {
                    fontFamily: 'Vazirmatn',
                    fontSize: '11px',
                    direction: 'rtl'
                },
                shared: true
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: true,
                                radius: 3
                            }
                        }
                    }
                }
            },
            series: [{
                name: 'بازدیدها',
                pointStart: detailStart,
                pointInterval: 24 * 3600 * 1000,
                data: detailData
            }],

            exporting: {
                enabled: false
            }

        });
    }

    function getPersianDate(d, includeYear) {
        d = new Date(d);
        var j = JalaliDate.gregorianToJalali(d.getFullYear(), d.getMonth() + 1, d.getDate());
        return convertToPersianNumbers((includeYear ? (j[0] - 1300) + "/" : "") + j[1] + "/" + j[2]);
    }
};