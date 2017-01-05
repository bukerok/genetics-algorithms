var Chart = function (container, title, series) {
    this.container = container;
    this.title = title;
    this.series = series;
};

Chart.prototype.build = function () {
    var realSolutionChart = Highcharts.chart(this.container, {
        chart: {
            type: 'line',
            zoomType: 'y'
        },
        title: {
            text: this.title
        },
        legend: {
            floating: false,
            layout: 'vertical'
        },
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            }
        },
        yAxis: {
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        tooltip: {
            pointFormat: '<b>{point.y:,.3f}</b>'
        },
        plotOptions: {
            area: {
                pointStart: 0,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: this.series
    })
};