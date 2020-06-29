import React, {useState, useContext} from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import { v4 as uuid4 } from 'uuid';

import "../../../css/button.css"

// component: from to add the hardware of the drone
export const AddHardwareNewDrone = () => {
    // state
    const [nameHardware, setNameHardware] = useState('')
    const [descriptionHardware, setDescriptionHardware] = useState('')
    const [imageNameHardware, setImageNameHardware] = useState('NA')

    // retrieve the variables/state and actions from globalcontext
    const { addNewDroneHardware } = useContext(GlobalContext)


    const onSubmit = e =>{
        e.preventDefault();


        const pieceOfHardware = {
            _id: uuid4(),
            nameHardware,
            descriptionHardware,
            imageNameHardware
        }

        // add the hardware in the hardware list of the drone that wants to be added.
        addNewDroneHardware(pieceOfHardware);

        // bring the state back to empty
        setNameHardware('');
        setDescriptionHardware('');
        setImageNameHardware('NA');

    }





    return (
        <>
            <form onSubmit={onSubmit}> 
                <table className="table">
                    <thead>
                    <tr>
                        <td><label>Name Hardware</label></td>
                        <td><label>Description Hardware</label></td>
                        <td><label>Image</label></td>
                    </tr>
                    </thead>
                    <tbody>

                    <tr>
                        <td>
                            <input type="text" value={nameHardware} onChange={(e) => setNameHardware(e.target.value)} placeholder="Enter name of the hardware" required/>
                        </td>
                        <td>
                            <textarea type="text"  value={descriptionHardware} onChange={(e) => setDescriptionHardware(e.target.value)}
                             placeholder="Enter Description hardware" rows="5" cols="50"/>
                        </td>
                        <td>
                            <select value={imageNameHardware} onChange={(e) => setImageNameHardware(e.target.value)} required >
                                <option value="NA" defaultValue="NA">No Image available</option>
                                <option value="rpi4">Raspberry pi 4</option>
                                <option value="px4">Pixhawk 4</option>
                                <option value="sensehat">Sense HAT</option>
                                <option value="webcamLoC920ProHD">webcam logitech C920 Pro HD</option>
                            </select>
                        </td>
                    </tr>

                    </tbody>
                </table>
                <button className="buttonBlue">Add Hardware Component</button>

            </form>
        </>
    )
}
