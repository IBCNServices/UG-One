import React, { useContext, useEffect } from 'react'

import { GlobalContext } from '../../../../context/GlobalState'
import { NavbarDrone } from '../../NavbarDrone';
import { ActiveDrone } from './ActiveDrone'
import { ConnectionPort } from './ConnectionPort';

// component: will dispaly the important basic information of the drone. for example, ip, connect, id, name
export const OverviewDrone = () => {
    // retrieve the variables/state and actions from globalcontext
   const { idSpecificDrone, nameSpecificDrone, ipSpecificDrone, CheckIfDroneExists, droneActive } = useContext(GlobalContext);


    useEffect(() => {

    // every 5 seconds there will be checked if the drone is active or not
    const interval = setInterval(() => {

    console.log(idSpecificDrone)
    CheckIfDroneExists(idSpecificDrone);

    
    }, 5000); // in miliseconds (5 seconds) 

    return () => clearInterval(interval);

    }, []);

    

    return (

        <div>
            <NavbarDrone />
            <br/>
            <div>
                <h3>ID of the drone: </h3> <p>{idSpecificDrone}</p>
            </div>
            <div>
                <h3>Name of the drone: </h3> <p>{nameSpecificDrone}</p> 
            </div>
            <div>
                <h3>IP of the drone: </h3> <p>{ipSpecificDrone}</p>
            </div>

        
            <ConnectionPort/>

            <ActiveDrone  />

              
        </div>
    )
}
