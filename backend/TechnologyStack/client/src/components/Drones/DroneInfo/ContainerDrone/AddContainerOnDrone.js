import React, {useState, useContext} from 'react';
import { GlobalContext } from '../../../../context/GlobalState';
import { Link } from 'react-router-dom';

import { NavbarDrone } from '../../NavbarDrone';
import { AddExtraDockerArguments } from './AddExtraDockerArguments'
import { ListExtraDockerArguments } from './ListExtraDockerArguments'

// component: form for adding the arguments that wants to be used for deploying a container on the drone
export const AddContainerOnDrone = () => {
    // state
    const [nameContainer, setNameContainer] = useState('')
    const [nameImage, setNameImage] = useState('')
    const [nameImageServer, setNameImageServer] = useState('None')
    const [reservedMemory, setReservedMemory] = useState(128)
    const [cpuShares, setCpuShares] = useState(1024)
    const [overwriteExisting, setOverwriteExisting] = useState(false)
    const [autoRemove, setAutoRemove] = useState(true)

    // retrieve the variables/state and actions from globalcontext
    const { CreateNewContainerOnDrone, idSpecificDrone, nameAllImagesDockerHub, nameAllImagesGitlab } = useContext(GlobalContext)
    
    // function for changing string to bool
    const ChangeStringToBoolean = value => {
        if (value === "false")
            return false
        else if (value === "true")
            return true
        else
            return value
    }

    // when a user wants to deploy a docker container, he has two option, the first one is filling in the name of the image, the second choice is choosing an image that is stored
    // on the database. This function gives the different options that a user can choose as Docker image
    const InputSelectImagesFromServer = () => {
        
        return(
            <select value={nameImageServer} onChange={(e) => setNameImageServer(e.target.value)} required >
                <option value="None" defaultValue="None">None</option>

                {nameAllImagesDockerHub.map( imageDockerHub => 
                    <option key={imageDockerHub.namespace + "/" + imageDockerHub.name} value={imageDockerHub.namespace + "/" + imageDockerHub.name}>{imageDockerHub.namespace}/{imageDockerHub.name}</option>
                )}

                {nameAllImagesGitlab.map( imageGitlab => 
                    <option key={imageGitlab.path} value={imageGitlab.location}>{imageGitlab.path}</option>
                )}
            </select>

        )

    }

    
    const CreateContainerButton = async () =>{
        var dataInfoCreateContainer = {
            nameContainer,
            reservedMemory: parseInt(reservedMemory),
            cpuShares: parseInt(cpuShares),
            overwriteExisting: ChangeStringToBoolean(overwriteExisting),
            autoRemove: ChangeStringToBoolean(autoRemove)
        }

        // when no name is given to the docker container, the name of image is used, normally this can not happen
        if(nameImageServer !== "None"){
            dataInfoCreateContainer.nameImage= nameImageServer
        }
        else{
            dataInfoCreateContainer.nameImage= nameImage

        }



        // deploy a new container on the drone
        await CreateNewContainerOnDrone(dataInfoCreateContainer)
            .then(function(message) {
                console.log("container successfully created")
            })
            .catch(function(error){
                console.log("container not successfully created")
            })
    }


    return (
        <>
        <NavbarDrone />
        <br/>
        <form > 
        <button className="buttonStart" type="button" >
                            <Link className="a" to={'/drones/' + idSpecificDrone + '/containers'} onClick={ async () => await CreateContainerButton()}>Create Container</Link>
        </button>
        <button className="buttonStop" type="button" >
                                <Link className="a" to={'/drones/' + idSpecificDrone + '/containers'}>Back</Link>
        </button>
        <br/>
        <br/>
        <table className="table">
            <thead>
            <tr>
                <td>
                    <label>Argument</label>
                </td>
                <td>
                    <label>Value</label>
                </td>
                <td><label>Information</label></td>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td><label>Name Container: </label></td>
                <td>
                    <input type="text" value={nameContainer} onChange={(e) => setNameContainer(e.target.value)} placeholder="Enter name of the container" required/>
                </td>
                <td><label>Name for the container that will be created</label></td>
            </tr>
            <tr>
                <td><label>Image for Container: </label></td>
                <td>
                    <input type="text" value={nameImage} onChange={(e) => setNameImage(e.target.value)} placeholder="Enter name of the image"/>
                    <br/>
                    <br/>
                    OR
                    <br/>
                    <br/>
                    <InputSelectImagesFromServer />
                </td>
                <td><label>The image to run, can include the tag, e.g. 'imagename:tag'. Enter the name of an image and select None or select an image.</label></td>
            </tr>
            <tr>
                <td><label>Required Memory: </label></td>
                <td>
                    <input type="number" value={reservedMemory} onChange={(e) => setReservedMemory(e.target.value)} placeholder="128" min="10"/>
                </td>
                <td><label>The amount of memory reserved for this image in MB</label></td>
            </tr>
            <tr>
                <td><label>CPU shares: </label></td>
                <td>
                    <input type="number" value={cpuShares} onChange={(e) => setCpuShares(e.target.value)} placeholder="1024" min="2" max="262144"/>
                </td>
                <td><label>Relative weight of CPU-time claim containerized application will get</label></td>
            </tr>
            <tr>
                <td><label>Overwrite existing: </label></td>
                <td>
                    <select value={overwriteExisting} onChange={(e) => setOverwriteExisting(e.target.value)} required >
                                <option value={false} defaultValue={false}>False</option>
                                <option value={true} >True</option>
                    </select>
                </td>
                <td><label>If a container with the chosen name already exists,stops and deletes that container before reusing the name.</label></td>
            </tr>
            <tr>
                <td><label>auto remove: </label></td>
                <td>
                    <select value={autoRemove} onChange={(e) => setAutoRemove(e.target.value)} required >
                                <option value={true} defaultValue={true}>True</option>
                                <option value={false} >False</option>
                    </select>
                </td>
                <td><label>Remove the container when it stops running.</label></td>
            </tr>
            <tr>
                
            </tr>

            </tbody>
        </table>
    </form>
    <br/>
    <br/>

    <AddExtraDockerArguments />

    <ListExtraDockerArguments />



    </>
    )
}
