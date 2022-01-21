import React, { useState, useEffect } from "react";
import Mark from "./Mark";
import { MARK } from "../constant/common.js";
import { useTurn, useGameState } from "./GameContext";


export default function Cell( { id, onClickCell } ) {
    const turn = useTurn()
    const gameState = useGameState()

    const [markType, setMarkType] = useState(MARK.NONE)

    function putMark() {
        setMarkType(turn)
    }
    function removeMark() {
        setMarkType(MARK.NONE)
    }

    useEffect(removeMark, [gameState])

    return (
        <div className="cell" data-cell onClick={(e) => {
            if (markType!==MARK.NONE) return
            putMark()
            onClickCell(id)
        }}>
            {markType===MARK.NONE ? null : <Mark markType={markType}></Mark> }
        </div>
    )
}