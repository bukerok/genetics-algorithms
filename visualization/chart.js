var Chart = function (title, subtitle, xAxisTitle, yAxisTitle, series) {
    this.title = title;
    this.subtitle = subtitle;
    this.xAxisTitle = xAxisTitle;
    this.yAxisTitle = yAxisTitle;
    this.series = series;
};
Chart.prototype.getChart = function () {
    var realSolutionChart = Highcharts.chart('real-solution-container', {
        chart: {
            type: 'area'
        },
        title: {
            text: this.title
        },
        subtitle: {
            text: this.subtitle
        },
        xAxis: {
            allowDecimals: false,
            title: {
                text: this.xAxisTitle
            },
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            }
        },
        yAxis: {
            title: {
                text: this.yAxisTitle
            },
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