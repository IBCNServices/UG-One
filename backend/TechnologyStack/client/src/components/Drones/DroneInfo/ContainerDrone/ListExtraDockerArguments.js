import React, { useContext } from 'react';
import { GlobalContext } from '../../../../context/GlobalState';

import "../../../../css/button.css"

// component: list all the extra docker arguments the user wants to add
export const ListExtraDockerArguments = () => {

    // retrieve the variables/state and actions from globalcontext
    const { dockerExtraArgumentsObject, DeleteDockerArgument } = useContext(GlobalContext);

    // function which helps to display booleans, objects, arrays on the web page
    const ChangeValuesToStringForDisplay = argument => {

        if (Array.isArray(argument) === true){ // array
            return "[ " + argument.join() + " ]"
        }
        else if(typeof argument === "boolean"){ // boolean

            if (argument === true)
                return "true"
            else         
                return "false"
        }
        else if(typeof argument === "object" && argument !== null){ // dictionary (null is also seen as an object)
            return JSON.stringify(argument)
        }             
        else { // string and number
            return argument
        }
    }

    return (
        <div>
            <ul className="list">

                {
                    Object.entries(dockerExtraArgumentsObject).map( arrayOneArgument => (
                        
                        <li key={arrayOneArgument[0]}> 
                            <button className="deleteButton" onClick={() => DeleteDockerArgument(arrayOneArgument[0])}>x</button>
                            {arrayOneArgument[0]}  {ChangeValuesToStringForDisplay(arrayOneArgument[1])} 
                        </li>

                    ))

                }

            </ul>
        </div>
    )
}




