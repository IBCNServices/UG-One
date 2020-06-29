import React, { useContext, useEffect } from 'react'

import { GlobalContext } from '../../../context/GlobalState'

import { NavbarDrone } from '../NavbarDrone';

// component: displays the resources of the drone
export const ResourcesDrone = () => {
    // retrieve the variables/state and actions from globalcontext
    const { dataResourcesDrone, getDroneResources } = useContext(GlobalContext);

     useEffect(() => {
            getDroneResources();
            // eslint-disable-next-line react-hooks/exhaustive-deps

        // every 10 seconds the resources will be retrieved from the drone
         const interval = setInterval(() => {
                getDroneResources();
                // eslint-disable-next-line react-hooks/exhaustive-deps
             
            }, 10000); // in miliseconds (10 seconds) 
        return () => clearInterval(interval);

    }, []);

    // function which will return a table with the computation load
    const TableComputationalLoad = () => {
        if (dataResourcesDrone !== undefined && dataResourcesDrone.computationalLoad !== null && dataResourcesDrone.computationalLoad !== undefined ) {
            
            return (
                <tbody>
                    <tr>
                        <td><label>Number of CPU Cores:</label></td>
                        <td>{dataResourcesDrone.computationalLoad.cpu_stats.cpu_count}</td>
                    </tr>
                    <tr><td><br/></td></tr>
                    <tr>
                        <td><label>Current CPU Frequency: </label></td>
                        <td>{dataResourcesDrone.computationalLoad.cpu_stats.cpu_freq.current}</td>
                        <td>MHz</td>
                    </tr>
                    <tr>
                        <td><label>Minimum CPU Frequency: </label></td>
                        <td>{dataResourcesDrone.computationalLoad.cpu_stats.cpu_freq.min}</td>
                        <td>MHz</td>
                    </tr>
                    <tr>
                        <td><label>Maximum CPU Frequency: </label></td>
                        <td>{dataResourcesDrone.computationalLoad.cpu_stats.cpu_freq.max}</td>
                        <td>MHz</td>
                    </tr>
                    <tr><td><br/></td></tr>
                    <tr>
                        <td><label>CPU Load: </label></td>
                        <td>{dataResourcesDrone.computationalLoad.cpu_stats.cpu_percent}</td>
                        <td>MHz</td>
                    </tr>
                </tbody>
            )
        }
        else {
            return(
            <tbody>
                <tr >
                    <td>No Data available</td>
                </tr>
            </tbody>)
        }   

    }

    // function which will return a table with the memory storage
    const TableMemoryStorage = () => {

        if (dataResourcesDrone !== undefined && dataResourcesDrone.memoryOnDrone !== null && dataResourcesDrone.memoryOnDrone !== undefined
             && dataResourcesDrone.memoryContainerUsageDrone !== null && dataResourcesDrone.memoryContainerUsageDrone !== undefined
             && dataResourcesDrone.diskStatsOnDrone !== null && dataResourcesDrone.diskStatsOnDrone !== undefined ) {

            return (
                <tbody>
                    <tr>
                        <td><label>Available Memory</label></td>
                        <td>{dataResourcesDrone.memoryOnDrone.mem_available}</td>
                        <td>MB</td>
                    </tr>
                    <tr>
                        <td><label>Total Memory</label></td>
                        <td>{dataResourcesDrone.memoryOnDrone.mem_total}</td>
                        <td>MB</td>
                    </tr>
                    <tr>
                        <td><label>Current Memory usage Containers</label></td>
                        <td>{dataResourcesDrone.memoryContainerUsageDrone.memory_current_usage}</td>
                        <td>MB</td>
                    </tr>
                    <tr>
                        <td><label>Maximum Memory usage Containers</label></td>
                        <td>{dataResourcesDrone.memoryContainerUsageDrone.memory_max_usage}</td>
                        <td>MB</td>
                    </tr>
                    <tr><td><br/></td></tr>
                    <tr>
                        <td><label>Total Disk space usage</label></td>
                        <td>{dataResourcesDrone.diskStatsOnDrone.percent_used}</td>
                        <td>%</td>
                    </tr>
                    <tr>
                        <td><label>Free Disk space</label></td>
                        <td>{dataResourcesDrone.diskStatsOnDrone.free}</td>
                        <td>MB</td>
                    </tr>
                    <tr>
                        <td><label>Total Disk space</label></td>
                        <td>{dataResourcesDrone.diskStatsOnDrone.total}</td>
                        <td>MB</td>
                    </tr>
                </tbody>
            )

        }
        else {
            return(
                <tbody>
                    <tr >
                        <td>No Data available</td>

                    </tr>
                </tbody>)
        }  

    }

    // function which will return a table with the connectivity parameters of the drone
    const TableConnectivity = () => {

        if (dataResourcesDrone !== undefined && dataResourcesDrone.connectivity !== null && dataResourcesDrone.connectivity !== undefined){
            
            return (
                <tbody>
                    <tr>
                        <td><label>Ip Drone</label></td>
                        <td>{dataResourcesDrone.connectivity.ipDrone}</td>
                    </tr>
                    <tr>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </tr>
                    
                </tbody>
            )
        }
        else {
            return(
            <tbody>
                <tr >
                    <td>No Data Available</td>

                </tr>
            </tbody>)
        }   
    }

    // function which will return a table with which devices are connected on the drone
    const TableDevicesConnectedToDrone = () => {

        if (dataResourcesDrone !== undefined && dataResourcesDrone.devicesConnectedOnDrone !== null && dataResourcesDrone.devicesConnectedOnDrone !== undefined){
            
            return (
                <tbody>
                    {dataResourcesDrone.devicesConnectedOnDrone.map(deviceConnectedToDrone => 
                                        <tr key={deviceConnectedToDrone.id}>
                                            <td>{deviceConnectedToDrone.device}</td>
                                            <td>{deviceConnectedToDrone.tag}</td>
                                        </tr>
                    )}
                    <tr>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </tr>
                    
                </tbody>
            )
            
        }
        else {
            return(
            <tbody>
                <tr >
                    <td>No Data</td>
                </tr>
            </tbody>
)
        }   
    }
 
   
    

    return (
        <div>
            <NavbarDrone />
            <table>
                <tbody>
                <tr>
                    <td>
                        <fieldset>
                            <legend>Computational load</legend>
                            <table>
                                <thead>
                                <tr>
                                    <td><h4>Resource</h4> </td>
                                    <td><h4>Value</h4></td>
                                    <td><h4>Unit</h4></td>
                                </tr>
                                </thead>
                                <TableComputationalLoad />
                            </table>
                        </fieldset>
                    </td>
                    <td>
                        <fieldset>
                            <legend>Connectivity</legend>
                            <table>
                                <thead>
                                <tr>
                                    <td><h4>Resource</h4> </td>
                                    <td><h4>Value</h4></td>

                                </tr>

                                </thead>
                                <TableConnectivity />
                            </table>
                        </fieldset>
                    </td>
                </tr>
                <tr>
                    <td>

                        <fieldset>
                            <legend>Memory & Storage</legend>
                            <table>
                                <thead>
                                <tr>
                                    <td><h4>Resource</h4> </td>
                                    <td><h4>Value</h4></td>
                                    <td><h4>Unit</h4></td>

                                </tr>
                                </thead>
                                <TableMemoryStorage/>
                            </table>

                        </fieldset>
                    </td>
                    <td>
                        <fieldset>
                            <legend>Devices Connected</legend>
                            <table>
                                <thead>
                                <tr>
                                    <td><h4>Device</h4> </td>
                                    <td><h4>Tag</h4></td>

                                </tr>
                                
                                </thead>
                                 <TableDevicesConnectedToDrone />
                            </table>

                        </fieldset>
                    </td>
                </tr>
                </tbody>
            </table>

            
        </div>
    )
}


