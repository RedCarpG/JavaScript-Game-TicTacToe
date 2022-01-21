import React, { useContext, useEffect, useState } from "react";
import { STATUS, MARK } from "../constant/common.js";

const GameContext = React.createContext()
const GameUpdateContext = React.createContext()

export function useTurn() {
    return useContext(GameContext)[0]
}

export function useGameState() {
    return useContext(GameContext)[1]
}
export function useTurnUpdate() {
    return useContext(GameUpdateContext)[0]
}
export function useGameStateUpdate() {
    return useContext(GameUpdateContext)[1]
}

export default function GameContextProvider({ children }) {

    const [turn, setTurn] = useState(MARK.O);
    const [gameState, setGameState] = useState(STATUS.INGAME);
    
    /** For debug */
    useEffect(() => {
        console.debug(`------ Turn Switch: ${turn}`)
    }, [turn])
    useEffect(() => {
        console.debug(`------ Game State Switched: ${gameState}`)
    }, [gameState])


    function switchTurn() {
        setTurn(currentTurn => (currentTurn+1)%2)
    }     
    function switchGameState(newState=STATUS.INGAME) {
        setGameState(currentState => {
            if (currentState !== newState) {
                return newState
            } else {
                console.debug(`Error`)
            }
        })
    } 

    return (
        <GameContext.Provider value={[turn, gameState]}>
            <GameUpdateContext.Provider value={[switchTurn, switchGameState]}>
                {children}
            </GameUpdateContext.Provider>
        </GameContext.Provider>
    )
  
}