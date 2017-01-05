document.addEventListener("DOMContentLoaded", () => {
    let request = new XMLHttpRequest();
    request.open("GET", "/data", true);
    request.onload = () => {
        let data = JSON.parse(request.responseText);
        let [target, final, ...iterations] = data.reverse();
        iterations = iterations.reverse();
        let seriesIterations = [];
        for (let i = 1; i <= iterations.length; i++) {
            let currentItem = iterations[i-1];
            seriesIterations.push(new Series(`# ${i} ${currentItem.best.expression}`, currentItem.best.data));
            seriesIterations.push(new Series(`# ${i} ${currentItem.worst.expression}`, currentItem.worst.data));
        }
        let seriesFinal = [
            new Series(final.best.expression, final.best.data),
            new Series(final.worst.expression, final.worst.data)
        ];

        let seriesTarget = [new Series(target.best.expression, target.best.data)];

        new Chart('iterations-solution-container', 'Итерации', seriesIterations).build();
        new Chart('final-solution-container', 'Итоговая', seriesFinal).build();
        new Chart('target-solution-container', 'Целевая', seriesTarget).build();
    };
    request.send();
});
