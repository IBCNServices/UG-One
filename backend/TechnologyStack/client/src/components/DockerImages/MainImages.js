import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';


// componenten
import { ListAllDockerRepoImages } from './ListAllDockerRepoImages';
import { AddRemoveButtonImage } from './AddRemoveButtonImage';
import { AddFormImage } from './AddRemoveUpdateImage/MainAddImage';
import { RemoveFormImage } from './AddRemoveUpdateImage/MainRemoveImage';
import { OverviewInfoDockerHubImage } from './ImageInfo/OverviewInfoDockerHubImage';
import { OverviewInfoGitlabImage } from './ImageInfo/OverviewInfoGitlabImage';

import "../../css/listOfItems.css"

// main component where all the other components, listed above, are placed
export const MainImages = () => {
    return (
        <BrowserRouter>
        <div>
            <table>
            <tbody>
                <tr>
                    <td></td>
                    <td>
                        <AddRemoveButtonImage/>

                    </td>
                </tr>
                <tr>
                    <td>
                        <ListAllDockerRepoImages />
                    </td>
                
                    <td>

                        <table>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td>
                                        <Route exact path="/dockerimages/addimage" component={AddFormImage} />
                                        <Route exact path="/dockerimages/removeimage" component={RemoveFormImage} />
                                        <Route exact path="/dockerimages/docker_hub/:namespace_name/overview" component={OverviewInfoDockerHubImage} />
                                        <Route exact path="/dockerimages/gitlab/:namespace_name/overview" component={OverviewInfoGitlabImage} />

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
    </BrowserRouter>

    )
}
