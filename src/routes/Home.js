import React, { Component } from 'react'
import { HeaderImg, SearchBar, LoadButton } from '../components'
import { PosterList } from '../components'
import { connect } from 'react-redux'
import { getMovies } from '../actions/Movie'
import { renderLogin } from '../utils/helpers'

//on en a besoin pour la redirection vers la page loggin
import { withRouter } from 'react-router-dom'

const isLogged = renderLogin()

class HomeComponent extends Component {

    state = {
        isLogged: isLogged
    }
    
    componentDidMount() {
        if(!this.state.isLogged) { //On redirige vers la page login si on n'a pas effectué d'authentification
        this.props.history.push({pathname: '/login'});
        return;
        }
        this.props.getMovies();
    }

    render() {
        const {mtitle, mdesc, image, movies, loading} = this.props;
        return( 
            <div>
                <HeaderImg 
                    title={mtitle}
                    overview={mdesc}
                    imgSrc={image}
                />
                <SearchBar onSearchClick={this.props.onSearchClick} />
                <PosterList movies={movies} localFavorites={this.props.localFavorites} />
                <LoadButton onButtonClick={this.props.onButtonClick} loading={loading} />
            </div>
        )
    }
}

//Nécessaire pour lier les données du store avec une prop du composant créée pour l'occasion
const mapStateToProps = state => { //State global en parametre
    //Rappel notre state global ressemeble à 
/*     state = {
        movies: {
            movies: [],//favoris
            number
        }
    } */

    return {
        localFavorites: state.myMovieReducer.movies
    }
}

//Nécessaire pour mener une action sur le store (ici on demande la liste des favoris)
const mapDispatchToProps = dispatch => { //fonction dispatch en paramètre
    return {
         //Liaison entre l'action et une prop du composant créée pour l'occasion
        getMovies : () => dispatch(getMovies()) //getMovies() du fichier actions/Movies.js
    }
}

//On a withrouter car on veut avoir accès au this.props.history pour la redirection vers la page login
const Home = connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeComponent)) 

export { Home } 