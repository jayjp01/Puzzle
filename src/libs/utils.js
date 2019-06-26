export const centerSprites = (sprites) => {
    sprites.forEach(function (sprite) {
        sprite.anchor.setTo(0.5, 0.5);
    })

};

export const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
};
export const getMisplaced = (set) => {
    let misplaced = 0;
    let i = 0;
    while (i < set.length) {
        if (set[i] !== "x" && set[i] !== (i + 1) && set[i] !== set.length) misplaced++;
        i++;
    }

    return misplaced;

};

export function makeIndex(gridSize) {
    var arr = [];
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            arr.push(`${i},${j}`)
        }
    }
    return arr;
}

