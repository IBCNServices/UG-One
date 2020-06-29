import React, { useContext} from 'react';
import { GlobalContext } from '../../../context/GlobalState';

// component: checks if the drone already exists in the system, not two drone with the same name can be created
export const TextIfDroneExists = () => {

    // retrieve the variables/state and actions from globalcontext
    const { droneNameExists } = useContext(GlobalContext);

    // if droneNameExists is true, then give a message that the name is already in use
    const textdisplay = (exists) =>  {


        if (exists === true)
            return <strong className="color: red">Name is already in use, choose another one</strong>

        else
            return "Name is available"



    }

    return (
        <>
            <label>{textdisplay(droneNameExists)}</label>
            
        </>
    )
}
