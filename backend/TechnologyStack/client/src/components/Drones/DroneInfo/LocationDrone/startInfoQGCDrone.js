import React, { useContext } from 'react';
import { GlobalContext } from '../../../../context/GlobalState';

// component: gives the user information to which port he needs to connect
export const StartInfoQGCDrone = () => {
    // retrieve the variables/state and actions from globalcontext
    const { portQGCToConnect, errorMessageOpenConnectionQGC } = useContext(GlobalContext)


    const textdisplay = (portUser, errorMessage) =>  {

        if (portUser !== undefined && errorMessage === undefined)
            return "Let QGround Control listen to port " + portUser

        else if(portUser === undefined && errorMessage !== undefined)
            return errorMessage

        else
            return ""

    }

    return (
        <>
            <label>{textdisplay(portQGCToConnect, errorMessageOpenConnectionQGC)}</label>
            
        </>
    )
}
