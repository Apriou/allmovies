import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as starS} from '@fortawesome/free-solid-svg-icons'
import { faStar as starR } from '@fortawesome/free-regular-svg-icons'
import '../css/Stars.css'

//Composant fonctionnel
const Stars = props => { //accolades car on a un return

    const renderStars1 = () => { //const obligé car on n'est pas dans une classe
        return props.fakeArray1.map((element,i) => {
                return (
                    <FontAwesomeIcon 
                    key={i}
                    className="stars"
                    icon={starS} 
                    size="2x" />
                )
            }
        )
    }

    const renderStars2 = () => {
        return props.fakeArray2.map((element,i) => {
                return (
                    <FontAwesomeIcon 
                    key={i}
                    className="stars"
                    icon={starR} 
                    size="2x" />
                )
            }
        )
    }

    return (
        <div className="stars--container">
            {renderStars1()}
            {renderStars2()}       
        </div>
    )
}

export { Stars } 