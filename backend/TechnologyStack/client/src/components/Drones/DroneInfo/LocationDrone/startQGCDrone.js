import React, {useState, useContext} from 'react';
import { GlobalContext } from '../../../../context/GlobalState';

import "../../../../css/button.css"

// component: start button to begin forwarding udp messages from the drone to QGroundControl
export const StartQGCDrone = () => {
    //state
    const [ipUser, setIPUser] = useState('')
    
    // retrieve the variables/state and actions from globalcontext
    const { startConnectionQGCDroneClient } = useContext(GlobalContext)



    const StartQGC = e =>{
        e.preventDefault();


        startConnectionQGCDroneClient(ipUser) // check if this works, async and await or not!!!!!!!!!!!

        setIPUser('')
    }

    return (
        <>
        <table>
            <thead>
                <tr>
                    <td>
                        <div onClick={StartQGC}>
                            <button className="buttonBlue">
                                Start QGround Control
                            </button>
                        </div>
                    </td>
                    <td>
                        <input type="text" value={ipUser} onChange={(e) => setIPUser(e.target.value)} placeholder="Enter your IP-Address here" required/>
                    </td>
                </tr>
            </thead>
        </table>


        </>
    )
}
