import React, {useState, useContext} from 'react';
import { GlobalContext } from '../../../context/GlobalState';

import { ListHardware } from './ListHardwareDrone';
import { AddHardwareNewDrone } from './AddHardwareNewDrone';
import { TextIfDroneExists } from './TextIfDroneExists';

import "../../../css/button.css"

// component: form to add the name of the drone as to add the hardware of the drone
export const MainAddDrone = () => {
    //state
    const [nameDrone, setNameDrone] = useState('');

    // retrieve the variables/state and actions from globalcontext
    const { hardwareNewDrone, addNewDroneToDatabase } = useContext(GlobalContext);


    const onSubmit = async e =>  {
        e.preventDefault();

        
        const TheNewDrone= {
            nameDrone,
            ipDrone: "",
            hardwareDrone: hardwareNewDrone
        };
        
        await addNewDroneToDatabase(TheNewDrone);
 
        setNameDrone('');


    }



    return (
        <>
            <h2>Fill in the form to Add your drone to the system.</h2>
            <form onSubmit={onSubmit}>
                <table>
                    <tbody>
                        <tr>                       
                            <td>
                                <button className="buttonBlue">    
                                    Submit Drone
                                </button>
                            </td>
                        </tr>
                        <tr></tr>
                        <tr></tr>
                        <tr>
                            <td>
                                <label> Name Drone </label>
                            </td>
                            <td>
                                <input type="text" required value={nameDrone} onChange={(e) => setNameDrone(e.target.value)} placeholder="Enter Name Drone"/>
                            </td>
                            <td>
                                <TextIfDroneExists />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>



        <h4>Hardware</h4>
            
            <AddHardwareNewDrone/>
            
            <ListHardware/>
        
        
        </>
    )
}

