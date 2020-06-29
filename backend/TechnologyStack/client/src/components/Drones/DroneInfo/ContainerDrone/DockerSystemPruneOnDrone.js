import React, { useContext} from 'react';
import { GlobalContext } from '../../../../context/GlobalState';
import { Link } from 'react-router-dom';

import { NavbarDrone } from '../../NavbarDrone';

import "../../../../css/button.css"
import "../../../../css/hyperlink.css"

// component: form to perform a docker system prune on the drone, 
export const DockerSystemPruneOnDrone = () => {

    // retrieve the variables/state and actions from globalcontext
    const { DockerSystemPruneOnDrone, idSpecificDrone } = useContext(GlobalContext)



    return (
        <>
        <NavbarDrone />
        <br/>
        <h4>Are you sure you want to run "docker system prune" on the drone?</h4>
        <form> 
        <table>
            <tbody>
            <tr>
                <td>
                <button className="buttonStart" type="button" >
                        <Link className="a" to={'/drones/' + idSpecificDrone + '/containers'} onClick={ async () => await DockerSystemPruneOnDrone()}>Confirm</Link>
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


    </>
    )
}





