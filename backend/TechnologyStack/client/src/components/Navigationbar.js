import React from 'react'
import { Link } from 'react-router-dom'
import '../css/navigationbar.css'

// linked with css for navigationbar
// component: the main navigation bar of the web applicaton
export const Navigationbar = () => {
    return (
        <nav >
            <div className="topnav">

                <Link to='/drones'>Drones</Link>
    
                <Link to='/dockerimages'>Docker Images</Link>
    
                <Link to='/database'>Database</Link>

                <Link to='/datalink'>DataLink</Link>

                <Link to='/mission'>Mission</Link>

            </div>
        </nav>
    )
}

