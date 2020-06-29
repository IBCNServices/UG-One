# Ug-One_back-end

The back-end of the UG-One platform. Through this platform, people can manage their drone fleet as the applications on the drones, through the Ug-One API on the drone. 

## setup

Before the back-end can be deployed, the user needs to fill in his IP Address in 3 different files. 
- In the first file (path: TechnologyStack/api/config/config.yml), the user needs to fill in his IP address. If the user wants to deploy the back-end on the Virtual Wall then he needs to set the variable STAGINGVW to true otherwise to false.
- In the second file (path: TechnologyStack/client/src/context/GlobalState.js), the user needs to fill in the IP Address and the stagingVW to true or false.
- In the last file (path: TechnologyStack/portforward/config/config.yml) the user needs to fill in his IP address. If the user wants to deploy the back-end on the Virtual Wall then he needs to set the variable STAGINGVW to true otherwise to false.

If the configuration is done, the back-end can be deployed through docker-compose. Because there are 3 different scenario's (locally, Virtual wall with UDP Port Forward Server and Virtual wall with applications without UDP Port Forward Server) there are 3 docker-compose files created. 

### To start the Ug-One backend on locally on your pc/laptop

Go to the TechnologyStack folder and execute the following command:
`docker-compose up --build`


### On the virtual wall, the UDP Port Forward Server and user applications can't run at the same time. Therefor 2 docker-compose files were created.
#### To start the Ug-One backend on the virtual wall with the UDP Port Forward Server

Go to the TechnologyStack folder and execute the following command:
`docker-compose -f docker-compose_vw_app.yml up --build`

#### To start the Ug-One backend on the virtual wall with the user applications

Go to the TechnologyStack folder and execute the following command:
`docker-compose -f docker-compose_vw_udpPFS.yml up --build`
