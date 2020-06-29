import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';


//componenten
import { ListAllDrones } from './ListAllDrones';
import { AddRemoveButtonDrone } from './AddRemoveButtonDrone';

import { MainAddDrone } from './AddRemoveDrone/MainAddDrone';
import { MainRemoveDrone } from './AddRemoveDrone/MainRemoveDrone';

import { OverviewDrone } from './DroneInfo/Overview/OverviewDrone';
import { LocationDrone } from './DroneInfo/LocationDrone/MainLocationDrone';
import { HardwareDrone } from './DroneInfo/HardwareDrone';
import { ResourcesDrone } from './DroneInfo/ResourcesDrone';

import { MainListContainersOnDrone } from './DroneInfo/ContainerDrone/MainListContainersOnDrone';
import { AddContainerOnDrone } from './DroneInfo/ContainerDrone/AddContainerOnDrone';
import { StopContainerOnDrone } from './DroneInfo/ContainerDrone/StopContainerOnDrone';
import { DeleteContainerOnDrone } from './DroneInfo/ContainerDrone/DeleteContainerOnDrone';
import { RestartContainer } from './DroneInfo/ContainerDrone/RestartContainerOnDrone';
import { DockerSystemPruneOnDrone } from './DroneInfo/ContainerDrone/DockerSystemPruneOnDrone';
import { InfoSpecificContainerOnDrone } from './DroneInfo/ContainerDrone/InfoSpecificContainerOnDrone';

import { MainListImagesOnDrone } from './DroneInfo/ImageDrone/MainListImagesOnDrone'
import { InfoSpecificImageOnDrone } from './DroneInfo/ImageDrone/InfoSpecificImageOnDrone'
import { DeleteImageOnDrone } from './DroneInfo/ImageDrone/DeleteImageOnDrone'


// component: in this main component, all the different components are implemented. these components are related to everything that can happen and be obtained from the drone.
export const MainDrones = () => {
    return (
        <BrowserRouter>
        <div>
            <table>
            <tbody>
                <tr>
                    <td>
                    <AddRemoveButtonDrone/>

                        <ListAllDrones />
                    </td>
                    <td>
                        <table>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td>
                                        <br/>
                                        <Route path="/drones/adddrone" component={MainAddDrone} />
                                        <Route path="/drones/removedrone" component={MainRemoveDrone} />
                                        <Route path="/drones/:id/overview" component={OverviewDrone} />
                                        <Route path="/drones/:id/location" component={LocationDrone} />
                                        <Route path="/drones/:id/hardware" component={HardwareDrone} />
                                        <Route path="/drones/:id/resources" component={ResourcesDrone} />
                                        <Route exact path="/drones/:id/containers" component={MainListContainersOnDrone} />
                                        <Route exact path="/drones/:id/containers/add_container" component={AddContainerOnDrone} />
                                        <Route exact path="/drones/:id/containers/start_container" component={RestartContainer} />
                                        <Route exact path="/drones/:id/containers/stop_container" component={StopContainerOnDrone} />
                                        <Route exact path="/drones/:id/containers/remove_container" component={DeleteContainerOnDrone} />
                                        <Route exact path="/drones/:id/containers/prune_unused-objects" component={DockerSystemPruneOnDrone} />
                                        <Route exact path="/drones/:id/containers/info_container" component={InfoSpecificContainerOnDrone} />
                                        <Route exact path="/drones/:id/images/" component={MainListImagesOnDrone} />
                                        <Route exact path="/drones/:id/images/info_image" component={InfoSpecificImageOnDrone} />
                                        <Route exact path="/drones/:id/images/remove_image" component={DeleteImageOnDrone} />
                                        
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

