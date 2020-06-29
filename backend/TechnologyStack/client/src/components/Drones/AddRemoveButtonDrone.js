import React from 'react'
import { Link } from 'react-router-dom'

import "../../css/button.css"
import "../../css/hyperlink.css"


// component: add and remove button to add or remove a drone
export const AddRemoveButtonDrone = () => {


    return (
        <div>
            
            <button type="button" className="buttonBlue" >
                <Link className="a" to='/drones/adddrone'>Add Drone</Link>
            </button>
            <button  type="button" className="buttonBlue">
                <Link className="a" to='/drones/removedrone'>Remove Drone</Link>
            </button>
            
        </div>
    )
}

