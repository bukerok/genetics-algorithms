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
            align: 'left'
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
            pointFormat: '{series.name} <b>{point.y:,.0f}</b><br/> {point.x}'
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