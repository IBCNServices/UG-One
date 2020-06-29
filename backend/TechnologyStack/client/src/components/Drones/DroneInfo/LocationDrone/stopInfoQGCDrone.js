import React, { useContext } from 'react';
import { GlobalContext } from '../../../../context/GlobalState';

// component: information if the forwarding is stopped
export const StopInfoQGCDrone = () => {
    // retrieve the variables/state and actions from globalcontext
    const { closedUDPPort, errorMessageCloseConnectionQGC } = useContext(GlobalContext)

    const textdisplay = (portClosedBoolean, errorMessage) =>  {




        if (portClosedBoolean !== undefined && errorMessage === undefined)
            return "UDP Socket closed."

        else if(portClosedBoolean === undefined && errorMessage !== undefined)
            return errorMessage

        else
            return ""

    }

    return (
        <>
            <label>{textdisplay(closedUDPPort, errorMessageCloseConnectionQGC)}</label>
            
        </>
    )
}
