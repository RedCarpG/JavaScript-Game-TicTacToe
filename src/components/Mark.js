import React, { useState } from "react";
import { MARK } from "../constant/common.js";

export default function Mark({ markType, startSpin=false, float=false }) {
    
    const [visible, setVisible] = useState(true)
    const [spin, setSpin] = useState(startSpin)
    
    function getMarkSource() {
        if (markType===MARK.X) return "./img/x.svg"
        else if (markType===MARK.O) return "./img/o.svg" 
        else return null
    }

    return (
        <>
            <embed className={`mark-img ${spin? "spin": ""}`} src={getMarkSource()} type="image/svg+xml" />
        </>
    )
}