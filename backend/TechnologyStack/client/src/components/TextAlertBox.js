import {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

// component: the text that needs displayed in the window alert box when for example a docker container is deployed, stopped, etc.
export const TextAlertBox = () => {

    const { textAlertBox,  CleanupTextAlertBox} = useContext(GlobalContext);

    if(textAlertBox !== undefined){
        window.alert(textAlertBox)
        CleanupTextAlertBox()
    }

    return null
}
