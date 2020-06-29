import React, {useState, useContext} from 'react';
import { GlobalContext } from '../../../../context/GlobalState';
import { Link } from 'react-router-dom';

import { AddExtraDockerArguments } from './AddExtraDockerArguments'
import { ListExtraDockerArguments } from './ListExtraDockerArguments'
import { NavbarDrone } from '../../NavbarDrone';

// component: form to help the user to restart a container on the drone
export const RestartContainer = () => {
    // state
    const [timeOut, setTimeOut] = useState(10)

    // retrieve the variables/state and actions from globalcontext
    const { idSpecificDrone, RestartContainerOnDrone } = useContext(GlobalContext)

    // when the button is pressed, a request will be send to the drone to restart a container on the drone.
    const RestartAContainer = async e => {
        

        const infoStopContainerData = {
            timeOut,
        }


        await RestartContainerOnDrone(infoStopContainerData)
            .then(function(message){
                console.log("container restarted")
            })
            .catch(function(error){
                console.log("container restared failed")
            })
        

    }


    return (
        <>
        <NavbarDrone />
        <br/>
        <br/>
        <form> 
        <table>
            <tbody>
            <tr>
                <td>
                    <div  onClick={RestartAContainer}>
                            <button className="buttonStart" type="button" >
                                <Link className="a" to={'/drones/' + idSpecificDrone + '/containers'} >Start Container</Link>
                            </button>
                    </div>
                </td>
                <td></td>
                <td>
                    <div >
                            <button className="buttonStop" type="button" >
                                <Link className="a" to={'/drones/' + idSpecificDrone + '/containers'}>Back</Link>
                            </button>
                    </div>
                </td>
            </tr>
            <tr></tr>
            <tr>
                <td><label>Time out: </label></td>
                <td>
                    <input type="number" value={timeOut} onChange={(e) => setTimeOut(e.target.value)} placeholder="10" min="0" max="60"/>
                </td>
            </tr>
    


            </tbody>
        </table>
    </form>

    <AddExtraDockerArguments />

    <ListExtraDockerArguments />



    </>
    )
}
