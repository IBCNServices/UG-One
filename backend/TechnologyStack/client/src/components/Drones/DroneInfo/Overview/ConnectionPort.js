import React, { useContext, useEffect } from 'react'

import { GlobalContext } from '../../../../context/GlobalState'

// component: will return a text fragment if the drone is active or not, will also check if the drone is active or not
export const ConnectionPort = () => {
    // retrieve the variables/state and actions from globalcontext
    const { mavlinkPortdrone } = useContext(GlobalContext);

    // different options: trying to connect, not being able to connect and connect with the drone
    const ReturnMAVLinkPort = () => {

        if(mavlinkPortdrone !== null){
            return(
            <h4 style={{fontSize: "16px"}}>MAVLinkPort: {mavlinkPortdrone}</h4>
            )
        }
        else 
        {
            return(
                <h4 style={{fontSize: "16px",color:"red"}}>Drone did not yet ask for a MAVLinkPort from the back-end API</h4>
            )
        }
    }

    return (
        <div>
            <br/>
            <ReturnMAVLinkPort />
        </div>
    )
}
