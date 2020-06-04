import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as RHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as SHeart} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import { addMovie, removeMovie } from '../actions/Movie'
import { connect } from 'react-redux'

import '../css/Poster.css'

class PosterComponent extends Component {

    state = {
        hover: false
    }

    showOverlay = () => {
        if (this.state.hover) {
            return
        }
        this.setState({hover:true})
    }

    hideOverlay = () => {
        this.setState({hover:false})
    }

    remove = () => {
        //à implementer avec redux
        console.log('remove avec redux');
        this.props.removeM(this.props.id)
    }

    add = () => {
        //à implementer avec redux
        console.log('add avec redux');
        this.props.addM(this.props.movie)
    }

    render() {
        return( 
            <div className="poster"
                onMouseEnter={this.showOverlay}
                onMouseLeave={this.hideOverlay}
            >
                <Link to={{ pathname: `/${this.props.id}`}} >
                    <img className="poster--img" src={this.props.imgSrc} alt="poster" />                   
                </Link>
                {this.state.hover ? (
                        <div className="poster--overlay">
                            <h3 className="poster--overlay__text">Favoris</h3>
                            {this.props.wished ? (
                                <FontAwesomeIcon onClick={this.remove} className="poster--icon" icon={SHeart} size="3x" />
                            ) : (
                                <FontAwesomeIcon onClick={this.add} className="poster--icon__not" icon={RHeart} size="3x" />
                            )}
                        </div>
                    ) : null}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => { //fonction dispatch en paramètre
    return {
         //Liaison entre l'action et une prop du composant créée pour l'occasion
        addM : movie => dispatch(addMovie(movie)), //addMovie() du fichier actions/Movies.js
        removeM : id => dispatch(removeMovie(id))
    }
}

const Poster = connect(null, mapDispatchToProps)(PosterComponent) 

export { Poster } 