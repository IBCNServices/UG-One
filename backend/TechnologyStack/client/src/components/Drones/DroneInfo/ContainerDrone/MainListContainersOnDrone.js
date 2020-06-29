import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { GlobalContext } from '../../../../context/GlobalState'

import { NavbarDrone } from '../../NavbarDrone';
import "../../../../css/table.css"
import "../../../../css/button.css"
import "../../../../css/hyperlink.css"



// component: this component displays all the different containers that are available on the drone. In this component
// the user gets the possibiltiy to start/stop/remove/create/retrieve_info from the drone
export const MainListContainersOnDrone = () => {

    // retrieve the variables/state and actions from globalcontext
    const { idSpecificDrone, getNameAllImages, CleanupCancelContainerAction, getInfoAllContainers, listAllContainersOnDrone, 
        SaveContainerNameToGlobalState, getInfoSpecificContainerOnDrone} = useContext(GlobalContext);


    useEffect(() => {

        CleanupCancelContainerAction(); // cleans up variables in the state: a specific state => default state
        getInfoAllContainers(); // retrieve the info of all the containers from the drone

        // this timer function will retrieve the docker containers from the drone every 5 seconds
        const interval = setInterval(() => {
                getInfoAllContainers();
            
            }, 5000); // in miliseconds (5 seconds) 
        return () => clearInterval(interval);
   
       }, []);


    const InfoContainerButton = async (idContainer, nameContainer) => {

        SaveContainerNameToGlobalState(nameContainer)
        getInfoSpecificContainerOnDrone(idContainer)
    }

    // start or stop a container, pressing this button, a component start or stop will be created.
    const StartStopButton = (infoContainer) => {


        if (infoContainer.statusContainer === "running")        
        {
            return(
                <button type="button" className="buttonStop">
                    <Link className="a" to={'/drones/' + idSpecificDrone + '/containers/stop_container'} onClick={() => SaveContainerNameToGlobalState(infoContainer.nameContainer, infoContainer.idContainer)}>Stop</Link>
                </button>
            )
        }
        else
        {
            return(
                <button type="button" className="buttonStart">
                    <Link className="a" to={'/drones/' + idSpecificDrone + '/containers/start_container'} onClick={() => SaveContainerNameToGlobalState(infoContainer.nameContainer, infoContainer.idContainer)}>Start</Link>
                </button>
            )
        }

    }

    // html structure of how the docker container needs to be displayed on the webpage
    const TableContainers = () => {


        if (listAllContainersOnDrone !== undefined) {


            return (
                //take the only element out of the array that is equal to the drone with the same id. Then select the hardware array and map over it     
                <tbody>
                {(listAllContainersOnDrone
                .map((containerInfo) =>
                    <tr key={containerInfo.idContainer}>
                        <td>{containerInfo.name}</td>
                        <td>{containerInfo.image}</td> 
                        <td>{containerInfo.created}</td>
                        <td>{containerInfo.status}</td>
                        <td>    
                                    
                            <button type="button" className="buttonBlue" >
                                <Link className="a" to={'/drones/' + idSpecificDrone + '/containers/info_container'} onClick={() => InfoContainerButton(containerInfo.idContainer, containerInfo.name)}>Info</Link>
                            </button>
                        </td>
                        <td>
                            <StartStopButton statusContainer={containerInfo.status} nameContainer={containerInfo.name}/>
                        </td>
                        <td>            
                            <button type="button" className="buttonBlue" >
                                <Link className="a" to={'/drones/' + idSpecificDrone + '/containers/remove_container'} onClick={() => SaveContainerNameToGlobalState(containerInfo.name, containerInfo.idContainer)}>Remove</Link>
                            </button>
                        </td>
                    </tr>

                   )
            )}
            </tbody>
            )
        }
        // data not yet retrieved from the drone
        else {
            return(
                <tbody>
                    <tr >
                        <td>Container Data retrieving from the drone</td>

                    </tr>
                </tbody>
            )
        }     
    }

    return (
        <div>
            <NavbarDrone />
            <br/>
            <div>
                <button type="button" className="buttonBlue">
                    <Link className="a" to={'/drones/' + idSpecificDrone + '/containers/add_container'} onClick={() => getNameAllImages()}>Add Container On Drone</Link>
                </button>  
                <button type="button" className="buttonBlue">
                    <Link className="a" to={'/drones/' + idSpecificDrone + '/containers/prune_unused-objects'}>Docker System Prune</Link>
                </button>    
            </div>
            <br/>
            <br/>
            <table className="table">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Image</td>
                        <td>Date UTC Created</td>
                        <td>Status</td>
                        <td>Extra Info</td>
                        <td>Start/Stop</td>
                        <td>Remove</td>
                    </tr>
                </thead>
                <TableContainers />
            </table>



        </div>
    )
}
