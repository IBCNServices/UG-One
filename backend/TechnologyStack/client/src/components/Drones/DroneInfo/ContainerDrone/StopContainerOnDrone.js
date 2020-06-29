import React, {useState, useContext} from 'react';
import { GlobalContext } from '../../../../context/GlobalState';
import { Link } from 'react-router-dom'

import { AddExtraDockerArguments } from './AddExtraDockerArguments'
import { ListExtraDockerArguments } from './ListExtraDockerArguments'
import { NavbarDrone } from '../../NavbarDrone';

// component: form to let the user stop a container on the drone
export const StopContainerOnDrone = () => {
    // state
    const [timeOut, setTimeOut] = useState(10)

    // retrieve the variables/state and actions from globalcontext
    const { idSpecificDrone, StopContainerOnDrone, RestartContainerOnDrone } = useContext(GlobalContext)


    // function to stop the container 
    const StopContainer = async e => {
        

        const infoStopContainerData = {
            timeOut,
        }



        await StopContainerOnDrone(infoStopContainerData)
            .then(function(message){
                console.log("container stopped")
                console.log(message.data)
            })
            .catch(function(error){
                console.log("error stopping a container")
                console.log(error.data)
            })

    }

    // function to stop and then immediately restart the container 
    const StopAndRestartContainer = async e => {
        console.log('submit stop and restart container drone')
        

        const infoStopContainerData = {
            timeOut,
        }


        await RestartContainerOnDrone(infoStopContainerData)

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
                    <div  onClick={StopContainer}>
                        <button className="buttonStart" type="button" >
                            <Link className="a" to={'/drones/' + idSpecificDrone + '/containers'} >Stop Container</Link>
                        </button>
                    </div>
                </td>
                <td></td>
                <td>
                    <div  onClick={StopAndRestartContainer}>
                            <button className="buttonStart" type="button" >
                                <Link className="a" to={'/drones/' + idSpecificDrone + '/containers'} >Stop and Restart Container</Link>
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





