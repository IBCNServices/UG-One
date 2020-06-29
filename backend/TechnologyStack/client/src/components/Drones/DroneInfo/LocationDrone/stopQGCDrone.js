import React, { useContext} from 'react';
import { GlobalContext } from '../../../../context/GlobalState';

import "../../../../css/button.css"

// component: button to stop forwarding the MAVLink messages to QGroundControl
export const StopQGCDrone = () => {
    // retrieve the variables/state and actions from globalcontext
    const { stopConnectionQGCDroneClient } = useContext(GlobalContext)


    const StopQGC = e =>{
        e.preventDefault();
        stopConnectionQGCDroneClient()
    }

    return (
        <>
        <div onClick={StopQGC}>
             <button className="buttonBlue">
                Stop QGround Control
            </button>
        </div>
        </>
    )
}
