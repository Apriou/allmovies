import React, { Component } from 'react'
/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons' */

import '../css/PosterList.css'

import { Poster } from './index'
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config'
import FlatList from 'flatlist-react';

let wish;

class PosterList extends Component {

    renderPoster= () => {
        //console.log(this.props.movies)
        return this.props.movies.map(movie => {

            if (!movie.poster_path) return; //Si il n'y a pas de poster on affiche rien

            const imgSrc = `${IMAGE_BASE_URL}/${POSTER_SIZE}/${movie.poster_path}`;
            
            wish = false;
            if (this.props.localFavorites){
                this.props.localFavorites.forEach(localFavorite =>{
                    if(movie.id === localFavorite.id){
                        wish = true;
                    }
                })
            }

            return (
                <Poster 
                    key={movie.id}
                    imgSrc={imgSrc}
                    wished={wish} 
                    movie={movie}
                    mtitle={movie.title}
                    mdesc={movie.desc}
                    id={movie.id}
                    />
            )
        })
    }

    render() {
        return( 
            //On met des () à renderPoster() car il n'ai pas assigné à un attribut d'une balise
            <div className="posterList">
                <h3 className="posterList--title">FILMS POPULAIRES</h3>                                
                <div className="posterList--grid"> 
                    {this.renderPoster()}                
                </div>
    
            </div>
        )
    }

  /*   //Travail eventuel à faire avec FlatList
    render() {
        return( 
            //On met des () à renderPoster() car il n'ai pas assigné à un attribut d'une balise
            <div className="posterList">
                <h3 className="posterList--title">FILMS POPULAIRES</h3>    
                <FlatList className="posterList--grid"
                    list={this.props.movies}
                    renderItem={this.renderPoster}
                    hasMoreItems={true}
                    loadMoreItems={this.props.onButtonClick}
                />
              
            </div>
        )
    } */
}

export { PosterList } 