import React, {useState, useContext} from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import { Link } from 'react-router-dom';

import "../../../css/button.css"
import "../../../css/hyperlink.css"


// component: form to add dockerhub and gitlab images
export const AddFormImage = () => {
    //state
    const [nameDockerhubUserRepo, setNameDockerhubUserRepo] = useState('');
    const [nameDockerhubUserImage, setNameDockerhubUserImage] = useState('');
    const [nameDockerImage, setNameDockerImage] = useState('');
    const [namePathImageGitlab, setNamePathImageGitlab] = useState('');
    const [projectIDGitlab, setProjectIDGitlab] = useState(null);
    const [privateTokenGitlab, setPrivateTokenGitlab] = useState('');


    // retrieve the variables/state and actions from globalcontext
    const { addImagesFromNamespaceDockerHub, addSpecificImageFromNamespaceDockerHub, addSpecificImageFromGitlab } = useContext(GlobalContext);

    // get a specific image from gitlab
    const getSpecificDockerImageFromGitlab = async e =>{
        e.preventDefault();

        // if everything is filled in, add a specific image
        if (namePathImageGitlab !== ""  && projectIDGitlab !== null && privateTokenGitlab !== "")
        {
            const sendData = {
                private_token: privateTokenGitlab,
                pathImage: namePathImageGitlab,
                idProject: projectIDGitlab
            }
                
            //action: adding a specific image from GitLab
            await addSpecificImageFromGitlab(sendData);

            // reset the state to empty strings and null
            setNameDockerhubUserRepo("");
            setNameDockerhubUserImage("");
            setNameDockerImage("");
            setNamePathImageGitlab("");
            setProjectIDGitlab(null);
            setPrivateTokenGitlab("");
        }
        else{
            window.alert("not all boxes are filled in, to add the image from gitlab.")
        }
        
    }

    // get a specific image from Docker Hub
    const getSpecificDockerImage = async e =>{
        e.preventDefault();

        // if everything is filled in, a request can be send
        if (nameDockerhubUserImage !== "" && nameDockerImage !== "")
        {
            const sendData = {
                namespace: nameDockerhubUserImage,
                nameImage: nameDockerImage
            }
    
            
            //action
            await addSpecificImageFromNamespaceDockerHub(sendData);


            // reset the state to empty strings and null
            setNameDockerhubUserRepo("");
            setNameDockerhubUserImage("");
            setNameDockerImage("");
            setNamePathImageGitlab("");
            setProjectIDGitlab(null);
            setPrivateTokenGitlab("");

        }
        else{
            window.alert("not all boxes are filled in, to add the image from docker hub.")
        }
        
    }

    // get all the images from a specific dockerhub registry and save the names in the database
    const getImagesFromNameSpaceFromDockerHub = async e =>{
        e.preventDefault();
        if(nameDockerhubUserRepo !== ""){
            const sendData = {
                namespace: nameDockerhubUserRepo,
            }
    
            // add all the images name in the database
            await addImagesFromNamespaceDockerHub(sendData)
            
            // reset the state to empty strings and null
            setNameDockerhubUserRepo("");
            setNameDockerhubUserImage("");
            setNameDockerImage("");
            setNamePathImageGitlab("");
            setProjectIDGitlab(null);
            setPrivateTokenGitlab("");

        }
        else{
            window.alert("not all boxes are filled in, to add the images from a registry from docker hub.")
        }

        
    }

    return (
        <>
            <h2>Add images from docker hub</h2>
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td><h4>Add a specific Docker image from GitLab Ilabt IMEC</h4></td>
                        </tr>
                        <tr>
                            <td>
                                <label>namespace/project/name_image : </label>
                            </td>
                            <td>
                                <input type="text" required value={namePathImageGitlab} onChange={(e) => setNamePathImageGitlab(e.target.value)} placeholder="Enter path of the image on gitlab."/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Project id: </label>
                            </td>
                            <td>
                                <input type="number" required value={projectIDGitlab} onChange={(e) => setProjectIDGitlab(e.target.value)} placeholder="Enter the ID of the project."/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Private Token GitLab: </label>
                            </td>
                            <td>
                                <input type="text" required value={privateTokenGitlab} onChange={(e) => setPrivateTokenGitlab(e.target.value)} placeholder="Enter the Private Token."/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>How to get Private Token from GitLab: <a href="https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html" target="_blank">Private Token</a></label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div onClick={getSpecificDockerImageFromGitlab}>
                                    <button type="button" className="buttonBlue">
                                        <Link className="a" to={'/dockerimages/'}>Add specific Docker image from Gitlab.</Link>

                                    </button>
                                </div>
  
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <br/>
                                <hr/>
                            </td>
                        </tr>
                        <tr>
                            <td><h4>Add a specific Docker image from Docker Hub</h4></td>
                        </tr>
                        <tr>
                            <td>
                                <label>Username Docker Hub / docker image : </label>
                            </td>
                            <td>
                                <input type="text" required value={nameDockerhubUserImage} onChange={(e) => setNameDockerhubUserImage(e.target.value)} placeholder="Enter namespace"/>
                            </td>
                            <td>
                                <label> / </label>
                            </td>
                            <td>
                                <input type="text" required value={nameDockerImage} onChange={(e) => setNameDockerImage(e.target.value)} placeholder="Enter image name"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div onClick={getSpecificDockerImage}>
                                    <button className="buttonBlue">
                                        Add specific Docker image from Docker Hub
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <br/>
                                <hr/>
                            </td>
                        </tr>
                        <tr>
                            <td><h4>Add a registry from Docker Hub</h4></td>
                        </tr>
                        <tr>
                            <td>
                                <label>namespace Docker Hub </label>
                            </td>
                            <td>
                                <input type="text" required value={nameDockerhubUserRepo} onChange={(e) => setNameDockerhubUserRepo(e.target.value)} placeholder="Enter account name"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div onClick={getImagesFromNameSpaceFromDockerHub}>
                                    <button className="buttonBlue" >
                                        Add registry from Docker hub
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>



        
        
        
        </>
    )
}

