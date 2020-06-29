import React, { useContext} from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { Link } from 'react-router-dom'

// component: is the navigation bar of actions that can be performed on the drone
export const NavbarDrone = () => {

    // retrieve the variables/state and actions from globalcontext
    const { idSpecificDrone } = useContext(GlobalContext);



    return (
        <nav >
            <div className="topnavDrone">

                <Link to={'/drones/'+ idSpecificDrone + '/overview'}>Overview</Link>
        
                <Link to={'/drones/'+ idSpecificDrone + '/location'}>Location</Link>
        
                <Link to={'/drones/'+ idSpecificDrone + '/hardware'}>Hardware</Link>
    
                <Link to={'/drones/'+ idSpecificDrone + '/resources'}>Resources</Link>
        
                <Link to={'/drones/'+ idSpecificDrone + '/containers'}>Containers</Link>
        
                <Link to={'/drones/'+ idSpecificDrone + '/images'}>Images</Link>

            </div>
        </nav>
    )
}

