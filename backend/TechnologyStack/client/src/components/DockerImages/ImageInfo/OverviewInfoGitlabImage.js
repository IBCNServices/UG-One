import React, { useContext } from 'react'

import { GlobalContext } from '../../../context/GlobalState';

import "../../../css/table.css"

// component: display info of a gitlab image
export const OverviewInfoGitlabImage = () => {

    // retrieve the variables/state and actions from globalcontext
    const { infoSpecificGitlabImageObject  } = useContext(GlobalContext);

    const TbodyDisplayInfoImage = () => {


        if(infoSpecificGitlabImageObject === undefined)
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
        else if(infoSpecificGitlabImageObject === null)
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
                        <h4>name of the image: </h4>
                    </td>
                    <td>
                        {infoSpecificGitlabImageObject.name}
                    </td>
                </tr>
                <tr>
                    <td>
                        <h4>path of the image:  </h4>
                    </td>
                    <td>
                        {infoSpecificGitlabImageObject.path}
                    </td>
                </tr>
                <tr>
                    <td>
                        <h4>ID of the image: </h4>
                    </td>
                    <td>
                        {infoSpecificGitlabImageObject.image_id}
                    </td>
                </tr>
                <tr>
                    <td>
                        <h4>Data of creation (UTC): </h4>
                    </td>
                    <td>
                        {infoSpecificGitlabImageObject.created_at}
                    </td>
                </tr>
                <tr>
                    <td>
                        <h4>Project ID: </h4>
                    </td>
                    <td>
                        {infoSpecificGitlabImageObject.project_id}
                    </td>
                </tr>
                <tr>
                    <td>
                        <h4>Location of the image: </h4>
                    </td>
                    <td>
                        {infoSpecificGitlabImageObject.location}
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
