import React, { useContext } from 'react'

import { GlobalContext } from '../../../context/GlobalState'

import "../../../css/table.css"

// component: display info of a Docker hub image
export const OverviewInfoDockerHubImage = () => {
    
    // retrieve the variables/state and actions from globalcontext
    const { infoSpecificDockerHubImageObject  } = useContext(GlobalContext);

    const TbodyDisplayInfoImage = () => {


        if(infoSpecificDockerHubImageObject === undefined)
        {

            return(
                <tbody> 
                    <tr>
                        <td>
                            <h4>Failed To retrieve the data of the image.</h4>
                        </td>
                    </tr>
                </tbody>
            )
        }
        else if(infoSpecificDockerHubImageObject === null)
        {

            return(
                <tbody> 
                    <tr>
                        <td>
                            <h4>Image does not exist anymore in the database.</h4>
                        </td>
                    </tr>
                </tbody>
            )
        }
        else{

            return(
                <tbody>
                    <tr>
                        <td>
                            <h4>namespace of the Docker image:</h4>
                        </td>
                        <td>
                            {infoSpecificDockerHubImageObject.namespace}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4>name of the Docker image: </h4>
                        </td>
                        <td>
                            {infoSpecificDockerHubImageObject.name}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4>user of the Docker image:</h4>
                        </td>
                        <td>
                            {infoSpecificDockerHubImageObject.user}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4>Description of the Docker image:</h4>
                        </td>
                        <td>
                            {infoSpecificDockerHubImageObject.description}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4>Docker image last last_updated:</h4>
                        </td>
                        <td>
                            {infoSpecificDockerHubImageObject.last_updated}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4>Docker image repository type:</h4>
                        </td>
                        <td>
                            {infoSpecificDockerHubImageObject.repository_type}
                        </td>
                    </tr>
                </tbody>
            )
        }

    }

    return (
        <div>
        <table className="table">
           <TbodyDisplayInfoImage />
        </table>
 
    </div>
    )



}
