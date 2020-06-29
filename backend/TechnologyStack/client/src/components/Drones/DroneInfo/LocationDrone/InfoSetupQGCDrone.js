import React from 'react'
const pathQGCSetupPart1 = require("../../../../Images/QGCSetup/SetupQGCPart1.png")
const pathQGCSetupPart2 = require("../../../../Images/QGCSetup/SetupQGCPart2.png")
const pathQGCSetupPart3 = require("../../../../Images/QGCSetup/SetupQGCPart3.png")
const pathQGCSetupPart4 = require("../../../../Images/QGCSetup/SetupQGCPart4.png")

// component: give information to the user how to setup QGroundControl 
export const InfoSetupQGCDrone = () => {
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <h4>How to setup QGroundControl: </h4>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Start QGroundControl and press the purple button in the upper left cornor.</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img src={pathQGCSetupPart1} alt="QGroundControl Setup Part 1" style={imgQGCStyle}/>     
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Then press the button Comm Links to set up the communication between the UDP Port forward server and QGroundControl.</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img src={pathQGCSetupPart2} alt="QGroundControl Setup Part 2" style={imgQGCStyle}/>      
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Fill in the name of the new Link connection, select the type UDP. Press the button start location and fill in the field Listening Port the number that is displayed on top of the page.</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>When you are ready, press the button OK.</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img src={pathQGCSetupPart3} alt="QGroundControl Setup Part 3" style={imgQGCStyle}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Now the link has been added. Press the button connect to start receiving Mavlink Messages from the drone.</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img src={pathQGCSetupPart4} alt="QGroundControl Setup Part 4" style={imgQGCStyle}/>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}


const imgQGCStyle = {
    width: 900,
    height: 450
}