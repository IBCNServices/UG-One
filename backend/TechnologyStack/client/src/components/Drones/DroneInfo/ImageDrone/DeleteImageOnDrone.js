import React, { useContext} from 'react';
import { GlobalContext } from '../../../../context/GlobalState';
import { Link } from 'react-router-dom';

import { NavbarDrone } from '../../NavbarDrone';

import { AddExtraDockerArguments } from '../ContainerDrone/AddExtraDockerArguments'
import { ListExtraDockerArguments } from '../ContainerDrone/ListExtraDockerArguments'

// component: form to let the user delete a Docker image on the drone
export const DeleteImageOnDrone = () => {
    
    // retrieve the variables/state and actions from globalcontext
    const { RemoveImageOnDrone, idSpecificDrone, idSpecificImageOnDrone } = useContext(GlobalContext)



    return (
        <>
        <NavbarDrone />

        <form> 
        <table>
            <tbody>
            <tr>
                <td>
                <button className="buttonBlue" type="button" >
                        <Link className="a" to={'/drones/' + idSpecificDrone + '/images'} onClick={ async () => await RemoveImageOnDrone(idSpecificImageOnDrone)}>Remove</Link>
                </button>
                </td>
                <td></td>
                <td>
                    <div>
                            <button className="buttonBlue" type="button" >
                                <Link className="a" to={'/drones/' + idSpecificDrone + '/images'}>Back</Link>
                            </button>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </form>
    <br/>
    <br/>

    <AddExtraDockerArguments />

    <ListExtraDockerArguments />


    </>
    )
}


