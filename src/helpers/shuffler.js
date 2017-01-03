exports.getShuffle = function (pairs) {
    var sh = shuffle(pairs);

    while (!isAcceptableShuffle(sh)) {
        sh = shuffle(pairs);
    }

    return sh;
};

var shuffle = function (array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

var isAcceptableShuffle = function (sh) {
    var i;

    for (i = 0; i < sh.length; i++) {
        if (sh[i] === i) {
            return false;
        }
    }

    return true;
};
