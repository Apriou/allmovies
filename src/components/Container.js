import React from 'react'
//import Fontawesome from 'react-fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faMoneyBill } from '@fortawesome/free-solid-svg-icons'

import '../css/Container.css'

//Composant fonctionnel
const Container = props => { 
    let icon
    switch (props.iconName)
    {
        case "clock":
            icon = faClock; 
            break;
        case "money":
            icon = faMoneyBill;
            break;
        default:
            break;
    }

    return (
           <div className="container">
       <FontAwesomeIcon icon={icon} size="3x" />
        <h3 className="container--title">{props.content}</h3>
    </div>
    ) 
}

export { Container } 