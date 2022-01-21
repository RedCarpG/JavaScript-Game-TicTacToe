
const STATUS = {
    INGAME: 0,
    WIN: 1,
    DRAW: 2,
    PAUSE: 3
}

const MARK = {
    X: 0,
    O: 1,
    NONE: -1
}

const ROWS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
]

const COLS = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]

const DIAGS = [
    [0, 4, 8],
    [2, 4, 6]
]

const WIN_CONDITIONS = [
    ...ROWS, ...COLS, ...DIAGS
]

export { STATUS, MARK, WIN_CONDITIONS }
