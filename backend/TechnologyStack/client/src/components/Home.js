import React from 'react'

// component: the welcome page of the web application
export const Home = () => {
    return (
        <div>
            <h2>Welcome to Ug-One Drone platform created by Martijn Gevaert and Karl-Erik Réculé</h2>
            <br/>
            <p>This platfrom offers users the possibility to manage their drones and
                <br/>
                link their Docker images from GitLab or Docker Hub to this platform.
            </p>
            <br/>
            <p>
                To add/remove and manage the resources, containers, hardware, etc. on the drone,
                <br/>
                go to tab drones.
            </p>
            <p>
                To link your existing Docker Images to the platform, go to tab Docker Images.
            </p>
        </div>
    )
}
