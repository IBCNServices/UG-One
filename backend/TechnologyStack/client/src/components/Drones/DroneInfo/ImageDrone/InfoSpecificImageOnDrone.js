import React, { useContext} from 'react';
import { GlobalContext } from '../../../../context/GlobalState';
import { Link } from 'react-router-dom';

import { BytesToRightFormat } from '../../../../utils/BytesToRightFormat'
import { NavbarDrone } from '../../NavbarDrone';

// component: html structure to display the specific info of an image on the drone
export const InfoSpecificImageOnDrone = () => {

    // retrieve the variables/state and actions from globalcontext
    const { infoObjectSpecificImageOnDrone, idSpecificDrone, nameSpecificImage } = useContext(GlobalContext)

    // function which will retrieve the html structure of the information of the image 
    const InfoImage = () => {

        // image info retrieved
        if (infoObjectSpecificImageOnDrone !== undefined) {



            return (
                //take the only element out of the array that is equal to the drone with the same id. Then select the hardware array and map over it     
                <tbody>
                
                    <tr>
                        <td><h4>General Info</h4></td>
                    </tr>
                    <tr>
                        <td><label>Name Image:</label></td>
                        <td>{infoObjectSpecificImageOnDrone.name}</td>
                    </tr>
                    <tr>
                        <td><label>ID Image:</label></td>
                        <td>{infoObjectSpecificImageOnDrone.image_id}</td> 
                    </tr>
                    <tr>
                        <td><label>Date Image Created:</label></td>
                        <td>{infoObjectSpecificImageOnDrone.created}</td>
                    </tr>
                    <tr>
                        <td><label>Size:</label></td>
                        <td>{BytesToRightFormat(infoObjectSpecificImageOnDrone.size)} Bytes</td>
                    </tr>

                    <tr>
                        <td><h4>Tags Image</h4></td>
                    </tr>

                    {(infoObjectSpecificImageOnDrone.tags
                        .map((imageTag) =>
                        <tr key={imageTag}>
                            <td>{imageTag}</td>
                        </tr>

                   )
            )}
            </tbody>
            )
        }
        else {
            // image data not yet retrieved
            return(
                <tbody>
                    <tr >
                        <td>Data from Image {nameSpecificImage} retrieving from the drone, hold on...</td>
                    </tr>
                </tbody>
)
        }     
    }




    return (
        <div>
            <NavbarDrone />
            <h4>Information Image {nameSpecificImage} on Drone.</h4>

            <div >
                            <button className="buttonBlue" type="button" >
                                <Link className="a" to={'/drones/' + idSpecificDrone + '/images'}>Back</Link>
                            </button>        
            </div>
        <br/>

        <table>

            <InfoImage />
        </table>

    </div>
    )
}
