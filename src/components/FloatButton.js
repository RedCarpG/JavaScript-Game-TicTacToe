import React from "react";

export default function FloatButton({text, onClick, children}) {

    
    function handleMouseMove(e) {

        const boundingClientRect = e.target.getBoundingClientRect()

        const x = e.clientX - boundingClientRect.left
        const y = e.clientY - boundingClientRect.top
        const xc = boundingClientRect.width/2
        const yc = boundingClientRect.height/2
        
        const dx = x - xc
        const dy = y - yc

        e.target.style.setProperty('--bt_rx', `${ dy/-5 }deg`)
        e.target.style.setProperty('--bt_ry', `${ dx/10 }deg`)
    }

    function handleMouseLeave(e) {
        const style = e.target.style
        style.setProperty('--bt_ty', '0')
        style.setProperty('--bt_rx', '0')
        style.setProperty('--bt_ry', '0')
        
    }

    function handleMouseDown(e) {
        e.target.style.setProperty('--bt_tz', '-5rem')
    }

    function handleMouseUp(e) {
        e.target.style.setProperty('--bt_tz', '-12px')
        
    }

    return (
        <>
            <button className="float-button" data-title={text} 
                onClick={onClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseDown={handleMouseDown}
            >
            </button>
        </>
    )
}