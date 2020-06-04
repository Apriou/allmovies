import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getNumber } from '../actions/Movie'

import '../css/Header.css'

class HeaderComponent extends Component {

    componentDidMount() {
        this.props.getNumber();
    }

    render() {
        return(
            <div className="header">
                <Link to={{ pathname: '/'}} >
                    <FontAwesomeIcon className="header--movie" icon={faFilm} size="5x" />
                </Link>               
                <h3>AllMovies</h3>
                <Link to={{ pathname: '/Player'}} >
                    <FontAwesomeIcon className="header--heart" icon={faHeart} size="4x"/>
                    <div className="header--badge">
                        {this.props.badge}
                    </div>
                </Link>              
            </div>
        )
    }
}

//Nécessaire pour lier les données du store avec une prop du composant créée pour l'occasion
const mapStateToProps = state => { //State global en parametre
    //Rappel notre state global ressemeble à 
/*     state = {
        movies: {
            movies: [],
            number
        }
    } */

    return {
        badge: state.myMovieReducer.number
    }
}

//Nécessaire pour mener une action sur le store (ici on demande le nombre de favoris)
const mapDispatchToProps = dispatch => { //fonction dispatch en paramètre
    return {
        //Liaison entre l'action et une prop du composant créée pour l'occasion
        getNumber : () => dispatch(getNumber()) //getNumber() du fichier actions/Movies.js
    }
}

//liaison avec le reducer
const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent) 

export { Header }