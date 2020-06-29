import React, {  useContext, useEffect} from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { Link } from 'react-router-dom'

import "../../css/button.css"
import "../../css/hyperlink.css"
import "../../css/listOfItems.css"

// component: list all the drones that are registered on the drone
export const ListAllDrones = () => {
   //state

    // retrieve the variables/state and actions from globalcontext
    const { nameAllDrones, getNameAllDrones, updateIdNameIpDrone, getDroneMAVLinkPort, CheckIfDroneExists} = useContext(GlobalContext);

    useEffect(() => {
        getNameAllDrones();
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);

    // save the id to the app level state
    const saveIdToGlobalState = (idDrone, nameDrone, ipDrone) =>{
        const idNameIpDrone={
            idDrone,
            nameDrone,
            ipDrone
        }
        updateIdNameIpDrone(idNameIpDrone)
        getDroneMAVLinkPort(idDrone);
        CheckIfDroneExists(idDrone)

    }


    return (
        <>
            <h4>List of available Drones:</h4>
            <div className="vertical-menu">

                {nameAllDrones.map(drone => (
                    
                    <Link className="a" to ={'/drones/'+ drone._id + '/overview'} onClick={() => saveIdToGlobalState(drone._id, drone.nameDrone, drone.ipDrone)}>{drone.nameDrone}</Link>

                ))

                }

            </div>

        </>
      );
}

