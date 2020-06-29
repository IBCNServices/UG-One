import React from 'react';
import LogoImec from '../Images/imec_logo.png';
import LogoUG1 from '../Images/logoUG1.png';
import Login from '../Images/userlogin.png'

import { Link } from 'react-router-dom';

// component: the header of the webpage
export const Header = () => {
    return (
        <div className="header">
            <table style={ tableStyle }>
                <tbody>

                <tr>
                    <td style={{width:"40%"}}>
                    <a href="https://www.imec.be/nl/" 
                    target="_blank">                            
                        <img src={ LogoImec } style= { imglogoimecStyle } alt="Logo IMEC" className=""/>
                    </a>
                    </td>
                    <td style={{width:"40%"}}>
                        <Link to="/">
                            <img src={ LogoUG1 } style= { imglogougoneStyle } alt="Logo IMEC" className=""/>
                        </Link>
                    </td>
                    <td style={{width:"5%"}}>
                        <h4>John Doe </h4>
                    </td>
                    <td style={{width: "15%"}}>
                         <img src={ Login } style= { imglogouserStyle } alt="User Login" className=""/>

                    </td>
                </tr>
            </tbody>
            </table>
        </div>
    )

}


const tableStyle= {
    tableLayout: "auto",
    width: "100%"

}

const buttonsStyle = {
    float: "right",
    backgroundColor: "#0F7EC0",
    border: "none",
    color: "#ffffff",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "13px",
    margin: "4px 2px",
    cursor: "pointer",
}



const imglogoimecStyle = {
    width: 100,
    height: 50
}

const imglogougoneStyle = {
    width: 80,
    height: 80
}

const imglogouserStyle = {
    width: 50,
    height: 50
}
