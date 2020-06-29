import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { GlobalContext } from '../../../../context/GlobalState'
import { NavbarDrone } from '../../NavbarDrone';

import { BytesToRightFormat } from '../../../../utils/BytesToRightFormat'

import "../../../../css/table.css"
import "../../../../css/button.css"
import "../../../../css/hyperlink.css"


// component: main component, in this component other components are implemented. the table of all the different images on the drone is displayed here
export const MainListImagesOnDrone = () => {
    // retrieve the variables/state and actions from globalcontext
    const { idSpecificDrone, getInfoAllDockerImages, listAllImagesOnDrone, saveImageIDAndNameToGlobalState, getInfoSpecificImageOnDrone, CleanupCancelContainerAction } = useContext(GlobalContext);


    useEffect(() => {
        CleanupCancelContainerAction(); // clean up data from the app state: specific state => default state
        getInfoAllDockerImages();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // save the imageid and name to the app level state and get the specific image on the drone
    const InfoImageButton = async (idImage, nameImage) => {

        await saveImageIDAndNameToGlobalState(idImage, nameImage)
        await getInfoSpecificImageOnDrone(idImage)
    }





    // html structure to display all the different images from the drone
    const TableImages = () => {


        // data retrieved
        if (listAllImagesOnDrone !== undefined) {



            return (
                //take the only element out of the array that is equal to the drone with the same id. Then select the hardware array and map over it     
                <tbody>
                {(listAllImagesOnDrone
                .map((imageInfo) =>
                    <tr key={imageInfo.image_id}>
                        <td>{imageInfo.name}</td>
                        <td>{BytesToRightFormat(imageInfo.size)}</td> 
                        <td>{imageInfo.created}</td>
                        <td>
                            <button className="buttonBlue" type="button" >
                                <Link className="a" className="a" to={'/drones/' + idSpecificDrone + '/images/info_image'} onClick={ async () => await InfoImageButton(imageInfo.image_id, imageInfo.name)}>Info</Link>
                            </button>
                        </td>
                        <td>            
                            <button className="buttonBlue" type="button" >
                                <Link className="a" className="a" to={'/drones/' + idSpecificDrone + '/images/remove_image'} onClick={ async () => await saveImageIDAndNameToGlobalState(imageInfo.image_id, imageInfo.name)}>Remove</Link>
                            </button>
                        </td>
                    </tr>

                   )
            )}
            </tbody>
            )
        }
        else {
            // data not retrieved
            return(
                <tbody>
                    <tr >
                        <td>Hold on: Image Data retrieving from the drone</td>
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
            <table className="table">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Size</td>
                        <td>Date UTC Created</td>
                        <td>Extra Info</td>
                        <td>Remove</td>
                    </tr>
                </thead>
                <TableImages />
            </table>

        </div>
    )
}


