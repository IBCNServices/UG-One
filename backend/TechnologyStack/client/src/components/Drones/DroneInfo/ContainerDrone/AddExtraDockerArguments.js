import React, {useState, useContext} from 'react';
import { GlobalContext } from '../../../../context/GlobalState';

// component: form to give the user the possibility to add extra Docker depoy arguments for example port, volume, etc. 
export const AddExtraDockerArguments = () => {
    // state
    const [nameDockerArgument, setNameDockerArgument] = useState('')
    const [valueDockerArgument, setValueDockerArgument] = useState('')
    const [typeDockerArgument, setTypeDockerArgument] = useState('')

    // retrieve the variables/state and actions from globalcontext
    const { addDockerArgumentToDockerArgumentsObject } = useContext(GlobalContext)


    const onSubmit = e =>{
        e.preventDefault();

        // add the extra docker argument to the list of docker arguments
        addDockerArgumentToDockerArgumentsObject(nameDockerArgument, valueDockerArgument, typeDockerArgument);

        // set the state to default
        setNameDockerArgument('');
        setValueDockerArgument('');

    }





    return (
        <>
            <form onSubmit={onSubmit}> 
                <table className="table">
                    <thead>
                        <tr>
                            <td><label>Name Argument</label></td>
                            <td><label>Value Argument</label></td>
                            <td><label>Type Argument</label></td>
                        </tr>
                    </thead>
                    <tbody>

                    <tr>
                        <td>
                            <input type="text" value={nameDockerArgument} onChange={(e) => setNameDockerArgument(e.target.value)} placeholder="Enter name of the Docker argument" required/>
                        </td>
                        <td>
                            <textarea value={valueDockerArgument} onChange={(e) => setValueDockerArgument(e.target.value)} placeholder="Enter value of the Docker argument" required rows="20" cols="30"></textarea>
                        </td>
                        <td>
                            <select value={typeDockerArgument} onChange={(e) => setTypeDockerArgument(e.target.value)} required >
                                <option value="string" defaultValue="string">String</option>
                                <option value="number">Number</option>
                                <option value="boolean">Boolean</option>
                                <option value="list">List</option>
                                <option value="dictionary">Dictionary</option>
                            </select>
                        </td>
                    </tr>


                    </tbody>
                </table>
                <button className="buttonBlue">Add Docker Argument</button>

            </form>
            <br/>
            <label>Extra arguments can be found at: <a href="https://docker-py.readthedocs.io/en/stable/containers.html" target="_blank">Extra Docker Arguments</a></label>
        </>
    )
}
