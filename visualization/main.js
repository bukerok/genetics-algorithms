var ready = function () {
    var request = new XMLHttpRequest();
    request.open("GET", "/data", true);
    request.onload = function () {
        var data = JSON.parse(request.responseText);

        var seriesTemp = [
            new Series(data[0].best.expression, data[0].best.data),
            new Series(data[0].worst.expression, data[0].worst.data),
            new Series(data[1].best.expression, data[1].best.data),
            new Series(data[1].worst.expression, data[1].worst.data)
        ];

        var seriesFinal = [
            new Series(data[2].best.expression, data[2].best.data),
            new Series(data[2].worst.expression, data[2].worst.data)
        ];

        var chart = new Chart('temp-solution-container', 'Text 1', seriesTemp);
        var chartFinal = new Chart('final-solution-container', 'Text 1', seriesFinal);
        chart.build();
        chartFinal.build();
    };
    request.send();
}

document.addEventListener("DOMContentLoaded", ready);