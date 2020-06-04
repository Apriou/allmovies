import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner} from '@fortawesome/free-solid-svg-icons'
import '../css/Spinner.css'

library.add(faSpinner)

const Spinner = props => {
    return(
        <div className="spinner--container">
            <FontAwesomeIcon 
                icon={faSpinner}
                pulse
                size="5x"
                className="fa-faSpinner"
            />
        </div>
       
    )
}

export { Spinner } 