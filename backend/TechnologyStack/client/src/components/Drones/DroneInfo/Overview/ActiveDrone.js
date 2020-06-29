import React, { useContext, useEffect } from 'react'

import { GlobalContext } from '../../../../context/GlobalState'

// component: will return a text fragment if the drone is active or not, will also check if the drone is active or not
export const ActiveDrone = () => {
    // retrieve the variables/state and actions from globalcontext
    const { droneActive } = useContext(GlobalContext);

    // different options: trying to connect, not being able to connect and connect with the drone
    const ReturnActiveOrNot = () => {

        if(droneActive === undefined){
            return(
                <h4 style={{fontSize: "16px"}}>Trying to check if the drone is active or not.</h4>
            )
        }
        else if(droneActive === false)
        {
            return(
                <h4 style={{fontSize: "16px",color:"red"}}>Server could not establish a connection with the drone.</h4>
            )
        }
        else if(droneActive === true)
        {
            return(
                <h4  style={{fontSize: "16px",color:"green"}}>Server established a connection with the drone.</h4>
            )
        }
    }


    return (
        <div>
            <br/>
            <ReturnActiveOrNot />
        </div>
    )
}
