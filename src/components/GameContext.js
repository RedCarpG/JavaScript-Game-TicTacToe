import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { STATUS, MARK } from "../constant/common.js";

const GameContext = React.createContext()
const GameUpdateContext = React.createContext()

export function useTurn() {
    return useContext(GameContext).turn
}

export function useGameState() {
    return useContext(GameContext).gameState
}
export function useTurnUpdate() {
    return useContext(GameUpdateContext).switchTurn
}
export function useGameStateUpdate() {
    return useContext(GameUpdateContext).switchGameState
}

export default function GameContextProvider({ children }) {

    const [turn, setTurn] = useState(MARK.O);
    const [gameState, setGameState] = useState(STATUS.WIN);
    
    /** For debug */
    useEffect(() => {
        console.debug(`------ Turn Switch: ${turn}`)
    }, [turn])
    useEffect(() => {
        console.debug(`------ Game State Switched: ${gameState}`)
    }, [gameState])


    const switchTurn = useCallback(() => {
        setTurn(currentTurn => (currentTurn+1)%2)
    }, [])
    const switchGameState = useCallback((newState) => {
        setGameState(currentState => {
            if (currentState !== newState) {
                return newState
            } else {
                console.debug(`Error`)
            }
        })
    }, [])

    return (
        <GameContext.Provider value={
            useMemo(() => {
                return {turn: turn, gameState: gameState}
            }, [turn, gameState])
        }>
            <GameUpdateContext.Provider value={
                useMemo(() => {
                    return {switchGameState:switchGameState, switchTurn:switchTurn}
                }, [switchGameState, switchTurn])
            }>
                {children}
            </GameUpdateContext.Provider>
        </GameContext.Provider>
    )
  
}