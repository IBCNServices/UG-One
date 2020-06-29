import React from 'react'
import { Link } from 'react-router-dom'

import "../../css/button.css"
import "../../css/hyperlink.css"


// component: buttons to remove/add images 
export const AddRemoveButtonImage = () => {
    return (
        <div>
            
            <button type="button" className="buttonBlue">
                <Link className="a" to='/dockerimages/addimage'>Add Image</Link>
            </button>
            <button  type="button" className="buttonBlue">
                <Link className="a" to='/dockerimages/removeimage'>Remove Image</Link>
            </button>
            
        </div>
    )
}
