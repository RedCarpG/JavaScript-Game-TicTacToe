import React, { useState, useEffect, useCallback } from "react";
import EndPage from "./EndPage";
import { STATUS, MARK, WIN_CONDITIONS } from "../constant/common.js";
import { useTurn, useGameState, useTurnUpdate, useGameStateUpdate } from "./GameContext";
import { CSSTransition } from "react-transition-group";

function Cell( { cellId, cbOnClick } ) {
    const turn = useTurn()
    const gameState = useGameState()

    const [markType, setMarkType] = useState(MARK.NONE)
    const [isMarkPut, setIsMarkPut] = useState(false)

    const renderMarkImg = useCallback((mark) => {
        if (mark === MARK.O) return <embed className={"mark-img"}src="./img/o.svg" type="image/svg+xml"/>
        else if (mark === MARK.X) return <embed className={"mark-img"}src="./img/x.svg" type="image/svg+xml"/>
        else return <></>
    }, [])

    useEffect(() => {
        if (gameState === STATUS.RESTART) removeMark()
    }, [gameState])

    useEffect(() => {
        
        console.debug(`UseEffect`)
    }, [markType])
    useEffect(() => {
        
        console.debug(`UseEffect`)
    }, [isMarkPut])
    console.debug(`Render Cell ${cellId}`)
    /** Functions */
    function putMark() {
        setIsMarkPut(true)
        setMarkType(turn)
        console.debug(`Is Mark Put ${isMarkPut}`)
        console.debug(`Render Mark Image ${renderMarkImg(turn)}`)
        cbOnClick(cellId)
    }

    function removeMark() {
        if (!isMarkPut) return
        setIsMarkPut(false)
    }
    
    /** Handlers */
    function handleClickCell(e) {
        if (isMarkPut) return
        putMark()
    }
    function handleMouseHover(e) {
        if (isMarkPut) return
        setMarkType(turn)
    }
    function handleMouseLeave(e) {
        if (isMarkPut) return 
        setMarkType(MARK.NONE)
    }
    const handleOnExited = useCallback((e) => {
        setMarkType(MARK.NONE)
    }, [])

    return (
        <CSSTransition in={isMarkPut} 
                       classNames={"cell"} 
                       timeout={1000}
                       onExited={handleOnExited}>
            <div className={"cell"} 
                 onClick={handleClickCell} 
                 onMouseMove={handleMouseHover}
                 onMouseLeave={handleMouseLeave}>
                {renderMarkImg(markType)}
            </div>
        </CSSTransition>
    )
}

export default function GameBoard() {

    console.debug(`GameBoard`)
    const turn = useTurn()
    const gameState = useGameState()
    const toggleTurn = useTurnUpdate()
    const toggleGameState = useGameStateUpdate()

    const [boardRecord, setBoardRecord] = useState([-1, -1, -1,
                                                    -1, -1, -1,
                                                    -1, -1, -1])

    const clearBoardRecord = useCallback(() => {
        console.debug("Cleaned")
        setBoardRecord(currentBoard => {
            return [...currentBoard.fill(-1)]
        })
    }, [])

    function recordOnBoard(cellID, markType) {
        setBoardRecord(currentBoard => {
            currentBoard[cellID] = markType
            return [...currentBoard]
        })
    }

    useEffect(() => {
        if (checkWinning()) {
            toggleGameState(STATUS.WIN)
        } else if (checkDraw()) {
            toggleGameState(STATUS.DRAW)
        } else {
            toggleTurn()
        }
        console.log(boardRecord)
    }, [boardRecord])

    useEffect(() => {
        if (gameState === STATUS.RESTART) {
            clearBoardRecord()
            toggleTurn()
            toggleGameState(STATUS.INGAME)
        }
    }, [gameState])

    /** Some Game Logic functions */
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
        recordOnBoard(cellID, turn)
    }

    return ( 
        <>
            <div className="board">
                <div className="cells">
                    <Cell cellId={0} cbOnClick={handleDropMark}/>
                    <Cell cellId={1} cbOnClick={handleDropMark}/>
                    <Cell cellId={2} cbOnClick={handleDropMark}/>
                    <Cell cellId={3} cbOnClick={handleDropMark}/>
                    <Cell cellId={4} cbOnClick={handleDropMark}/>
                    <Cell cellId={5} cbOnClick={handleDropMark}/>
                    <Cell cellId={6} cbOnClick={handleDropMark}/>
                    <Cell cellId={7} cbOnClick={handleDropMark}/>
                    <Cell cellId={8} cbOnClick={handleDropMark}/>
                </div>
                <embed className="board-svg" src="./img/board.svg" type="image/svg+xml" />
            </div>
        </>
    )
}
