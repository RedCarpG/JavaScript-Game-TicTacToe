import React, { useState, useEffect } from "react";
import FloatButton from "./FloatButton";
import Mark from "./Mark";
import { STATUS } from "../constant/common.js";
import { FaGithubSquare, FaLinkedin } from 'react-icons/fa';
import { useTurn, useGameState, useTurnUpdate, useGameStateUpdate } from "./GameContext";
export default function EndPage( {} ) {
    const turn = useTurn()
    const gameState = useGameState()
    const toggleTurn = useTurnUpdate()
    const toggleGameState = useGameStateUpdate()

    const [visible, setVisibility] = useState(false)

    useEffect(() => {
        if (gameState===STATUS.INGAME) {
            setVisibility(false)
        } else {
            setVisibility(true)
        }
    }, [gameState])

    function renderText() {
        if (gameState === STATUS.WIN) {
            return (
                <>
                    <Mark markType={turn} startSpin={true}></Mark> Wins!
                </>
            )
        } else if (gameState === STATUS.DRAW) return <>Draw!</> 
        else return <>Pause</>
    }

    function handleRestart(e) {
        console.debug("--- RESTART")
        toggleTurn()
        toggleGameState(STATUS.INGAME)
    }

    return (
        <>
            <div className={`cover-page ${visible? null : "hidden" }`}>
                <div className="tw-flex tw-flex-row tw-justify-center tw-items-center tw-text-8xl tw-gap-5"> 
                    {renderText()}
                </div>
                <FloatButton text={"RESTART"} 
                    onClick={handleRestart}>
                </FloatButton>

                <div className="tw-flex tw-flex-row tw-gap-5 tw-text-4xl">
                    <a href="https://github.com/RedCarpG" target="_blank" rel="noreferrer">
                        <FaGithubSquare />
                    </a>
                    <a href="https://www.linkedin.com/in/peng-gao-fr/" target="_blank" rel="noreferrer">
                        <FaLinkedin />
                    </a>
                </div>
            </div>
        </>
    );
}