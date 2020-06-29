import React, { useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../../context/GlobalState';


//component: form remove a Docker Image
export const RemoveFormImage = () => {
    // retrieve the variables/state and actions from globalcontext
    const { nameAllImagesDockerHub, nameAllImagesGitlab, getNameAllImages, deleteDockerHubImageFromDatabase, deleteGitlabImageFromDatabase } = useContext(GlobalContext); 

    useEffect(() => {
        getNameAllImages(); // get the name of all the images from that are stored in the database
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);



    return (
         <>
            <h3>Click on the Image you want to remove from the system.</h3>
            <label><strong>Images from Gitlab</strong></label>

            <ul className="list">
                {nameAllImagesGitlab.map(imageGitlab => (
                    
                    <li key={imageGitlab.image_id}> 
                        <Link className="a_List" to ={'/dockerimages'} onClick={() => deleteGitlabImageFromDatabase(imageGitlab.image_id)} >{imageGitlab.path}</Link>

                    </li>
                ))
                }
            </ul>
            <br/>
            <br/>
            <label><strong>Images from Docker Hub</strong></label>
            <ul className="list">
                {nameAllImagesDockerHub.map(imageDockerHub => (
                    
                    <li key={imageDockerHub._id}> 
                        <Link className="a_List" to ={'/dockerimages'} onClick={() => deleteDockerHubImageFromDatabase(imageDockerHub._id)} >{imageDockerHub.namespace + '/'+ imageDockerHub.name}</Link>

                    </li>
                ))

                }
            </ul>

        </>
      );
}

