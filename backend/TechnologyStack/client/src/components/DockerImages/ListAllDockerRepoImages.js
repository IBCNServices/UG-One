import React, { useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';

import "../../css/listOfItems.css"
import "../../css/hyperlink.css"


// component: list all the Docker images from GitLab as Docker Hub
export const ListAllDockerRepoImages = () => {
    // retrieve the variables/state and actions from globalcontext
    const { nameAllImagesDockerHub, nameAllImagesGitlab, getNameAllImages, getInfoSpecificImageFromNamespaceDockerHub, getInfoSpecificImageGitlab } = useContext(GlobalContext);

    useEffect(() => {       
        getNameAllImages(); 
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);


    const getInfoSpecificImageDockerHub = (namespace, name) =>{
        const namespaceAndNameObject={
            namespace,
            name
        }

        // retrieve extra info of a Docker image from docker hub
        getInfoSpecificImageFromNamespaceDockerHub(namespaceAndNameObject)
    }



    return (
        <>
        <div>
            <label><strong>Images from Gitlab</strong></label>

            <div className="vertical-menu">

                {nameAllImagesGitlab.map(imageGitlab => (
                        <Link className="a" to ={'/dockerimages/gitlab/' + imageGitlab.path.replace(new RegExp(/\//g), '_') + '/overview'} onClick={() => getInfoSpecificImageGitlab(imageGitlab.path)} >{imageGitlab.path}</Link>
                ))

                }
            </div>
            <br/>
            <label><strong>Images from Docker Hub</strong></label>
            <div className="vertical-menu">
                {nameAllImagesDockerHub.map(imageDockerHub => (
                    
                        <Link className="a" to ={'/dockerimages/docker_hub/' + imageDockerHub.namespace + '_'+ imageDockerHub.name + '/overview'} onClick={() => getInfoSpecificImageDockerHub(imageDockerHub.namespace, imageDockerHub.name)} >{imageDockerHub.namespace + '/'+ imageDockerHub.name}</Link>

                ))

                }
            </div>
        </div>
        </>
      );
}
