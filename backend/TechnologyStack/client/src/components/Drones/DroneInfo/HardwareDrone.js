import React, { useContext, useEffect } from 'react'

import { GlobalContext } from '../../../context/GlobalState'

import { NavbarDrone } from '../NavbarDrone';

import "../../../css/table.css"

// component: displays all the hardware that is on the drone
export const HardwareDrone = () => {
    // retrieve the variables/state and actions from globalcontext
    const { hardwareSpecificDrone, getDroneHardware } = useContext(GlobalContext);


    useEffect(() => {

        getDroneHardware();// retrieve drone hardware

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // if no data is retrieved from the server, no data will be displayed, otherwise, a table structure will be displayed of the different hardware components on the drone.
    function DisplayHardware(){

        if (hardwareSpecificDrone !== undefined) {


            return (

                //take the only element out of the array that is equal to the drone with the same id. Then select the hardware array and map over it     
                (hardwareSpecificDrone
                .map((hardwarepiece) =>
                    <tr key={hardwarepiece._id}>
                        <td><img src={require(`../../../Images/hardware/${hardwarepiece.imageNameHardware}.jpg`)} alt={hardwarepiece.nameHardware} style= { imghardwarestyle }  /></td>
                        <td>{hardwarepiece.nameHardware}</td> 
                        <td>{hardwarepiece.descriptionHardware}</td>
                    </tr>

                   )
            ))
        }
        else {
            return(
            <tr >
                <td>No Data</td>

            </tr>)
        }     
    }



    return (
        <div>
            <NavbarDrone />
            <br/>
            <table className="table">
                <thead>
                    <tr>
                        <td>
                            
                        </td>
                        <td>
                            <h4>Hardware</h4>
                        </td>
                        <td>
                            <h4>Description</h4>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <DisplayHardware />

                </tbody>
            </table>
        </div>
    )
}


const imghardwarestyle = {
    width: 150,
    height: 150
}
