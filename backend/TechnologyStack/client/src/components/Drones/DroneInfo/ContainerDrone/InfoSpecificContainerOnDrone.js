import React, { useContext} from 'react';
import { GlobalContext } from '../../../../context/GlobalState';
import { Link } from 'react-router-dom';

import { NavbarDrone } from '../../NavbarDrone';



// component: component which shows all the important info of the container.
export const InfoSpecificContainerOnDrone = () => {

    // retrieve the variables/state and actions from globalcontext
    const { infoObjectSpecificContainerOnDrone, idSpecificDrone, nameSpecificContainer } = useContext(GlobalContext)

    // function which sets the info of the container in the right html structure
    const InfoContainer = () => {

        // data retrieved
        if (infoObjectSpecificContainerOnDrone !== undefined) {


            return (
                <div>
                <table className="table">

                <thead >
                        <tr>
                            <td colspan="2"><h4>General Information</h4></td>
                        </tr>
                    </thead>
                <tbody>
                

                    <tr>
                        <td><label>Name Container:</label></td>
                        <td>{infoObjectSpecificContainerOnDrone.names[0]}</td>
                    </tr>
                    <tr>
                        <td><label>ID Container:</label></td>
                        <td>{infoObjectSpecificContainerOnDrone.container_id}</td> 
                    </tr>
                    <tr>
                        <td><label>Name Image:</label></td>
                        <td>{infoObjectSpecificContainerOnDrone.image}</td>
                    </tr>
                    <tr>
                        <td><label>ID Image:</label></td>
                        <td>{infoObjectSpecificContainerOnDrone.image_id}</td>
                    </tr>
                    <tr>
                        <td><label>Date Container Created:</label></td>
                        <td>{infoObjectSpecificContainerOnDrone.created}</td>
                    </tr>
                    <tr>
                        <td><label>CPU shares:</label></td>
                        <td>{infoObjectSpecificContainerOnDrone.cpu_shares}</td>
                    </tr>
                    <tr>
                        <td><label>Memory Limit:</label></td>
                        <td>{infoObjectSpecificContainerOnDrone.memory_limit} MB</td>
                    </tr>
                    <tr>
                        <td><label>Status Container:</label></td>
                        <td>{infoObjectSpecificContainerOnDrone.status}</td>
                    </tr>
                    <tr>
                        <br/>
                    </tr>

                </tbody>
                </table>
                

                <table className="table">
                    <thead >
                        <tr>
                            <td colspan="2"><h4>Network information</h4></td>
                        </tr>
                    </thead>
                {(infoObjectSpecificContainerOnDrone.ports
                        .map((containerPortInfo) =>
                        <tbody>
                        <tr>
                            <td><label>IP:</label></td>
                            <td>{containerPortInfo.IP}</td>
                        </tr>
                        <tr>
                            <td><label>PrivatePort:</label></td>
                            <td>{containerPortInfo.PrivatePort}</td> 
                        </tr>
                        <tr>
                            <td><label>PublicPort:</label></td>
                            <td>{containerPortInfo.PublicPort}</td> 
                        </tr>
                        <tr>
                            <td><label>Type Connection:</label></td>
                            <td>{containerPortInfo.Type}</td> 
                        </tr>
                        </tbody>
                   )
            )}
                </table>
                </div>

            )
        }
        // data not yet retrieved
        else {
            return(
                <tbody>
                    <tr >
                        <td>Data from Container {nameSpecificContainer} retrieving from the drone, hold on...</td>
                    </tr>
                </tbody>
)
        }     
    }




    return (
        <div>
            <NavbarDrone />
            <br/>
            <br/>
            <h3>Information Container {nameSpecificContainer} on Drone.</h3>

            <div >
                <button className="buttonBlue" type="button" >
                    <Link className="a" to={'/drones/' + idSpecificDrone + '/containers'}>Back</Link>
                </button>        
            </div>
        <br/>


            <InfoContainer />



    </div>
    )
}
