import React, { useCallback, useEffect, useState } from "react";
import FloatButton from "./FloatButton";
import { MARK, STATUS } from "../constant/common.js";
import { FaGithubSquare, FaLinkedin } from 'react-icons/fa';
import { useTurn, useGameState, useTurnUpdate, useGameStateUpdate } from "./GameContext";
import { CSSTransition } from "react-transition-group";

function EndPageMessage({ text }) {
    return (
        <div className="tw-flex tw-flex-row tw-justify-center tw-items-center tw-text-8xl tw-gap-5"> 
            {text}
        </div>
    )
}

function EndPageIcons() {
    return (
        <div className="tw-flex tw-flex-row tw-gap-5 tw-text-4xl">
            <a href="https://github.com/RedCarpG" target="_blank" rel="noreferrer">
                <FaGithubSquare />
            </a>
            <a href="https://www.linkedin.com/in/peng-gao-fr/" target="_blank" rel="noreferrer">
                <FaLinkedin />
            </a>
        </div>
    )
}

export default function EndPage() {
    const turn = useTurn()
    const gameState = useGameState()
    const toggleTurn = useTurnUpdate()
    const toggleGameState = useGameStateUpdate()

    const [message, setMessage] = useState(<></>)

    useEffect(() => {
        if (gameState === STATUS.WIN) setMessage(<> <embed className={"mark-img spin"} src={turn===MARK.X?"./img/x.svg":"./img/o.svg"} type="image/svg+xml" /> Wins!</>)     
        else if (gameState === STATUS.DRAW) setMessage(<>Draw!</>)
    }, [gameState, turn])

    const handleRestart = useCallback(() => {
        console.debug("--- RESTART")
        toggleTurn()
        toggleGameState(STATUS.RESTART);
    }, [])

    return (
        <CSSTransition in={gameState !== STATUS.INGAME} unmountOnExit timeout={700} classNames='end-page'>
            <div className={`cover-page end-page`}>
                <EndPageMessage text={message} />
                <FloatButton text={"RESTART"} onClick={handleRestart} />
                <EndPageIcons/>
            </div>
        </CSSTransition>
    );
}