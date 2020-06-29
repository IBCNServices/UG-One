import React, { useContext} from 'react';
import { GlobalContext } from '../../../../context/GlobalState';
import { Link } from 'react-router-dom';

import { NavbarDrone } from '../../NavbarDrone';
import { AddExtraDockerArguments } from './AddExtraDockerArguments'
import { ListExtraDockerArguments } from './ListExtraDockerArguments'

// component: form to choose which container needs to be deleted on the drone
export const DeleteContainerOnDrone = () => {
    
    // retrieve the variables/state and actions from globalcontext
    const { RemoveContainerOnDrone, idSpecificDrone } = useContext(GlobalContext)



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

                <button className="buttonStart" type="button" >
                        <Link className="a" to={'/drones/' + idSpecificDrone + '/containers'} onClick={ async () => await RemoveContainerOnDrone()}>Remove</Link>
                </button>

                </td>
                <td>
                    <div >
                            <button className="buttonStop" type="button" >
                                <Link className="a" to={'/drones/' + idSpecificDrone + '/containers'}>Back</Link>
                            </button>
                    </div>
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
