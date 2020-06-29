import React from 'react'

import { NavbarDrone } from '../../NavbarDrone';
import { StartQGCDrone } from './startQGCDrone'
import { StopQGCDrone } from './stopQGCDrone'
import { StartInfoQGCDrone } from './startInfoQGCDrone'
import { StopInfoQGCDrone } from './stopInfoQGCDrone'
import { InfoSetupQGCDrone } from './InfoSetupQGCDrone'

// component: main component where other components are implemented. 
export const LocationDrone = () => {

    return (
        <div>
            <NavbarDrone />
            <br/>
            <br/>
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>
                                <StartQGCDrone />
                            </td>
                            <td>
                                <StopQGCDrone />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <StartInfoQGCDrone />
                            </td>                            
                        </tr>
                        <tr>
                            <td>
                                <StopInfoQGCDrone />
                            </td>                            
                        </tr>

                    </thead>
                </table>
            </div>
            <InfoSetupQGCDrone />


        </div>
    )
}
