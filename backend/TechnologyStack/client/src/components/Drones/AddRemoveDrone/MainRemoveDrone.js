import React, { useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../../context/GlobalState';

// component: list up all the drones from the database. when clicked on a specific drone, the drone will be deleted
export const MainRemoveDrone = () => {
    // retrieve the variables/state and actions from globalcontext
    const { nameAllDrones, getNameAllDrones, deleteDroneFromDatabase } = useContext(GlobalContext);

    useEffect(() => {
        getNameAllDrones();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);




    return (
        <>
            <h3>Click on the drone you want to remove from the system.</h3>
            <ul className="list">
                {nameAllDrones.map(drone => (
                    
                    <li key={drone._id}> 
                        <Link className="a_List" to ='/drones' onClick={() => deleteDroneFromDatabase(drone._id)}>{drone.nameDrone}</Link>

                    </li>
                ))

                }
            </ul>

        </>
      );
}
