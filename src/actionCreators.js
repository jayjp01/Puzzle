import * as types from './actions';
import GridModel from './libs/GridModel';
let model = new GridModel();

export const startNewPuzzle = (gridSize) => ({

    type: types.START_NEW_PUZZLE,
    tiles: model.buildNew(gridSize)
});


export const changeGridSize = (gridSize) => ({

    type: types.CHANGE_GRID_SIZE,
    gridSize,
    tiles: model.buildNew(gridSize)
})


export const grabTile = (dragIndex, dragStart, dragArea) => {

    if (model.grabTile(dragIndex) === dragIndex) {

        return {
            type: types.GRAB_TILE,
            dragIndex,
            dragStart,
            dragArea
        }
    } else {

        return {

            type: types.GRAB_TILE,
            dragIndex: null,
            dragStart: null,
            dragArea: null

        }
    }
}

export const dragTile = (dragOffset) => ({

    type: types.DRAG_TILE,
    dragOffset
})

export const dropTile = (dragIndex) => {

    let tiles = model.getTiles();
    let dropIndex = tiles.indexOf(tiles.length);
    if (dragIndex !== null) {

        tiles = model.moveTile(dragIndex).slice();
    }
    return {

        type: types.DROP_TILE,
        dropIndex: dropIndex,
        dragIndex: dragIndex,
        dragStart: null,
        dragOffset: null,
        dragArea: null,
        tiles: tiles
    }
}

export const startSolutionMove = (move, remainingmoves) => {

    let tiles = model.moveTile(move).slice();

    return {
        type: types.START_SOLUTION_MOVE,
        solution: remainingmoves,
        tiles: tiles
    }
}

export const endSolutionMove = () => {

    return {
        type: types.END_SOLUTION_MOVE,
        showNext: true
    }
}

//is solving true
export const requestSolution = () => ({

    type: types.REQUEST_SOLUTION,
    isSolving: true
})


const receiveSolution = (solution) => ({

    type: types.RECEIVE_SOLUTION,
    solution
})

export const getSolution = () => {

    return (dispatch) => {

        dispatch(requestSolution());

        callModelSolution().then(solution => {

            return dispatch(receiveSolution(solution))
        });
    }
}

function callModelSolution() {

    return new Promise((resolve, reject) => {

        model.getSolution(resolve);
    });
}

export const solutionComplete = () => ({

    type: types.SOLUTION_COMPLETE

})

