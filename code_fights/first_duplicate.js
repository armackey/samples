var current;
var b = [];


/**
 * Goal is to find first duplicate in an array.
 * 
 * firstDuplicate([2, 3, 3, 1, 5, 2]) -> 3
 */
function firstDuplicate(a) {
    if (a.length === 0) return b.length < 1 ? -1 : helper(b);
    current = a[0];
    for (var index = 1; index <= a.length - 1; index++) {
        if (a[index] === undefined) break;
        if (a[index] === current) {
            b.push({
                [index]: current
            });
            break;
        }
    }
    a.splice(0, 1);
    return firstDuplicate(a);
}

function helper(b) {
    var lowest;
    var index;
    Object.keys(b).map((i) => {
        var temp = Object.keys(b[i])[0];
        if (!lowest || lowest > temp) {
            lowest = temp;
            index = i;
        }
    });

    return Object.values(b[index])[0];
}
