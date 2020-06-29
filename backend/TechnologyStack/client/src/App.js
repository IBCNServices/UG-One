import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//components
import { Header } from './components/Header';
import { Navigationbar } from './components/Navigationbar';
import { Home } from './components/Home'
import { MainDrones } from './components/Drones/MainDrones';
import { MainImages } from './components/DockerImages/MainImages';

import { GlobalProvider} from './context/GlobalState'

import { TextAlertBox } from './components/TextAlertBox'

import './App.css';

// main component everything starts from here
function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <div className="App">
          <div className="container">
            <Header />
            <Navigationbar/>
            <TextAlertBox />
            <Route exact path="/" component={ Home }/>
            <Route path="/drones" component={ MainDrones } />
            <Route path="/dockerimages" component={ MainImages }/>

            
          </div>

        </div>
      </BrowserRouter>
      </GlobalProvider>

  );
}

export default App;
