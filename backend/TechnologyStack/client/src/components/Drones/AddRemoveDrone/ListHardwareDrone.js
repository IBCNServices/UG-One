import React, { useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalState';


// component: list all the hardware components of the drone that the user adds to the platform
export const ListHardware = () => {
    
    // retrieve the variables/state and actions from globalcontext
    const { hardwareNewDrone, deleteNewDroneHardware } = useContext(GlobalContext);



    return (
        <div>
            <ul className="vertical-menu">
                {hardwareNewDrone.map(hardware => (
                    
                    <li key={hardware._id}> 
                        <button  className="deleteButton" onClick={() => deleteNewDroneHardware(hardware._id)}>x</button>
                        {hardware.nameHardware}  {hardware.descriptionHardware.substring(0,20)} {hardware.imageNameHardware}
                    </li>
                ))

                }
            </ul>
        </div>
    )
}
