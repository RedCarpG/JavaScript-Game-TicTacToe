import React, { useState, useEffect, useMemo } from "react";
import Cell from "./Cell";
import { STATUS, MARK, WIN_CONDITIONS } from "../constant/common.js";
import { useTurn, useGameState, useTurnUpdate, useGameStateUpdate } from "./GameContext";

export default function GameBoard() {
    const turn = useTurn()
    const gameState = useGameState()
    const toggleTurn = useTurnUpdate()
    const toggleGameState = useGameStateUpdate()

    /* Board array to record history */
    const [boardRecord, setBoardRecord] = useState(new Array(9).fill(MARK.NONE))
    function clearBoardRecord() {
        setBoardRecord(currentBoard => {
            return [...currentBoard.fill(MARK.NONE)]
        })
    }
    function recordOnBoard(cellID, markType) {
        setBoardRecord(currentBoard => {
            currentBoard[cellID] = markType
            return [...currentBoard]
        })
    }
    // Clear Board Array every time the Game State changes
    useEffect(clearBoardRecord, [gameState])
    useEffect(() => {
        console.debug(boardRecord)
        if (checkWinning()) {
            toggleGameState(STATUS.WIN)
        } else if (checkDraw()) {
            toggleGameState(STATUS.DRAW)
        }
        toggleTurn()
    }, [boardRecord])

    function checkWinning() {
        return WIN_CONDITIONS.some(sequence => {
            if (sequence.every(index => {return boardRecord[index] === turn})) {
                // sequence.forEach(index => {cellElements[index].classList.add("glow")})
                return true
            } else return false
        })
    }

    function checkDraw() {
        return WIN_CONDITIONS.every(sequence => {
            if (sequence.every(index => {return boardRecord[index] !== MARK.NONE})) {
                return true
            } else return false
        })
    }

    /** Handlers */
    function handleDropMark(cellID) {
        console.debug("--- Record On board")
        recordOnBoard(cellID, turn)
    }

    return ( 
        <div className="board">

            <div className="cells">
                {[...boardRecord].map((_, i) => {
                    return (
                        <Cell key={i} id={i}
                        currentTurn={turn}
                        onClickCell={handleDropMark} />
                    )
                })}
            </div>
            <embed className="board-svg" src="./img/board.svg" type="image/svg+xml" />
        
        </div>
    )
}