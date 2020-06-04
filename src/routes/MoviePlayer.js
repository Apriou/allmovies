import React, { Component } from 'react'
import { VideoPlayer, MvPlayerList, Spinner } from '../components'
import { API_KEY, IMAGE_BASE_URL, API_URL, BACKDROP_SIZE} from '../config'
import axios from 'axios'
import _ from 'lodash'
import { calcTime } from '../utils/helpers'

import '../css/MoviePlayer.css'

import { renderLogin, ENABLE_SUBSCRIPTION } from '../utils/helpers'

import firebase from 'firebase'

const isLogged = renderLogin()

let newMovies = []

class MoviePlayer extends Component {

    state = {
        movies: [
            {
                id: 0,
                position: 0,
                title: "",
                duration: "",
                imageUrl: "",
                videoUrl: ""
            }
        ],
        selectedMovie: {
            id: 0,
            position: 0,
            title: "",
            duration: "",
            imageUrl: "",
            videoUrl: ""
        },
        loading: true,
        isLogged : isLogged,
        enableSubscription: ENABLE_SUBSCRIPTION,
        didMount: false
    }

    async componentDidMount () {

        if(!this.state.isLogged) { //On redirige vers la page login si on n'a pas effectué d'authentification
            this.props.history.push({pathname: '/login'});
            return;
        }

        //Si le système d'abonnement est actf
        if(this.state.enableSubscription) {
            console.log('Système abonnement actif')

            //On est obligé de passer par onAuthStateChanged car la demande de l'authentification firebase.auth() est asynchrone
            firebase.auth().onAuthStateChanged((user) => { 
                let dbRef
                if (user) {
                    // User is signed in.
                    console.log('Utilisateur connecté');
                    console.log('user.uid ', user.uid);  
                    dbRef = firebase.database().ref(`users/${user.uid}`);     
                    dbRef.on('value', async snapshot => {
                            const data = snapshot.val();
                            console.log('snapshot.data', data);    
                            if(data) {
                                const targetDate = data.validUntil;
                                const now = new Date().getTime();
                                if(targetDate > now) { //Abonnement valide
                                    console.log('Abonnement valide');    
                                    await this.stateUpdate();
                                } else { //Abonnement expiré
                                    console.log('Abonnement expiré'); 
                                    this.props.history.push({pathname: '/payment'});   
                                    //return;
                                }     
                            } else { //l'utilisateur n'a pas d'abonnement --> redirection vers ^payment
                                console.log('Pas d abonnement'); 
                                this.props.history.push({pathname: '/payment'});   
                                //return;
                            }                        
                        })
                } else {
                    // No user is signed in.
                    console.log('Utilisateur non connecté');       
                    this.props.history.push({pathname: '/login'});  
                    //return;     
                }
            })   

        } else {
            console.log('Système abonnement inactif')
            await this.stateUpdate();
        }

                 
    }

    stateUpdate = async () => {
        console.log('Mise à jour du state à partir du store');
        //On va chercher à mettre à jour le state avec les données du store et aller chercher la durée du
        //film en requêtant sur l'API

        //1.On va chercher les films à afficher depuis les favoris (le store)
        const oldMovies = JSON.parse(localStorage.getItem('movies')); //Renvoie undefined si dans le storage movies=[] et renvoie null si il n'existe pas
     
        //2.On va chercher la durée de tous ces films (puisque on ne les avait pas)
        const results = await this.getNewMovies(oldMovies);
        console.log('results: ', results);
        

        if (results.length ===0) {
            newMovies = [];
        } else {
            console.log('Formatage de newMovies');
            
            //3.On formate l'objet newMovies[] pour qu'il s'adapte et se formate au movies[] du state
            newMovies = oldMovies.map((oldMovie,index) => {
                return {
                    id: oldMovie.id,
                    position: index + 1,
                    title: oldMovie.title,
                    duration: results[index],
                    imageUrl: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${oldMovie.backdrop_path}`,
                    //TODO Videos à aller rechercher sur TMDB ou ailleur
                    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                }
            })
        }    

        //4.On cherche le film sélectionné
        const id = this.props.match.params.id; //on regarde le paramètre de la route
        if(id) {//route /Player/:id
            const selectedMovie = this.getSelectedMovie(newMovies, id);
            this.setState({ //MAJ du state
                movies: [...newMovies],
                selectedMovie: selectedMovie
            })
        } else {//route /Player/
            if (newMovies.length === 0) { //Si pas de favoris
                //this.props.history.push({
                //    pathname: `/Player` })                
                this.setState({ //MAJ du state
                    loading: false,
                    movies: [...newMovies],
                    selectedMovie: {}
                })  
            } else {
                const selectedMovie = newMovies[0]
                this.setState({ //MAJ du state
                    loading: false,
                    movies: [...newMovies],
                    selectedMovie: newMovies[0]
                })           
                this.props.history.push({ //navigation vers le premier film de la liste
                        pathname: `/Player/${selectedMovie.id}` 
                })
            }     
        }       
    }

    getSelectedMovie = (movies, movieId) => { //On cherche le film sélectionné dans movies avec son id
        const selectedMovie = _.find(movies, { id : parseInt(movieId, 10)});
        return selectedMovie;
    }

    handleEnded = () => { //On arrive à la fin d'un film on veut selectionner le prochain de la liste
        console.log('handleEnded');      
        const { movies, selectedMovie } = this.state;
        const movieIndex = movies.findIndex(movie => selectedMovie.id === movie.id);
        //Si on a lu le dernier film jusqu'à la fin on cherche a revenir au debut de la liste pour lire le premier film
        //Attention on travaille sur les index et nom pas sur les id
        const nextMovieIndex = movieIndex === movies.length - 1 ? 0 : movieIndex + 1
        const nextSelectedMovie = movies[nextMovieIndex]    
        //On force la navigation vers le prochain film de la liste (ou celui du début si on était à la fin)
        this.props.history.push({ 
            pathname: `/Player/${nextSelectedMovie.id}`
        })
        //On met a jour le state
        this.setState({
            selectedMovie: nextSelectedMovie
        })

    }

    getTime = movieId => {
        return new Promise((resolve, reject) => {
            const url = `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr`
            axios.get(url)
                .then(data => {
                    const duration = data.data.runtime;
                    resolve(duration)
                }).catch(e => {
                    console.log('Erreur getTime: ', e)
                    reject('Erreur',e)
                })
        })
    }

    getNewMovies = async oldMovies =>{
        let promises = [];
        console.log('olmovies', oldMovies)
        if (oldMovies === undefined || oldMovies === null) {// si rien dans le store
            return [];
        }
        for(let i=0;i<oldMovies.length;i++) {
            const element = oldMovies[i];
            const id = element.id;
            const time = await this.getTime(id)
            promises.push(calcTime(time));
        }
        return Promise.all(promises);
    }

    async componentDidUpdate(prevProps) { //appelé lorsque l'on clic sur un film de la liste (MvPlayerListItem => composant enfant se rerender) le composant parent s'update
        console.log('componentDidUpdate, prevProps.match.params.id: ', prevProps.match.params.id)
        //console.log('componentDidUpdate, prevProps.match.params: ', prevProps.match.loading.params)
        
        console.log('componentDidUpdate, this.props.match.params.id: ', this.props.match.params.id)     
        //console.log('componentDidUpdate, this.props.match.params: ', this.props.match.params) 

        //On gère le cas ou l'utilisateur reclic sur le coeur on recharge la page
        if(this.state.didMount && prevProps.match.params.id === undefined && this.props.match.params.id === undefined)
        {
            await this.stateUpdate();
            return;
        }

        if(prevProps.match.params.id !== this.props.match.params.id) { //On cherche id de la route
            const id = this.props.match.params.id
            const selectedMovie = this.getSelectedMovie(newMovies,id);
            this.setState({ //mise à jour de selectedMovie
                selectedMovie,
                didMount: true
            })
        }

    }

    render() {
        const { movies, selectedMovie } = this.state;
        return(           
            <div className="moviePlayer">
                {this.state.loading ? (
                    <Spinner />
                ) : (
                    <>  {this.state.selectedMovie !==undefined ? (
                            <VideoPlayer 
                            videoUrl={selectedMovie.videoUrl}
                            imageUrl={selectedMovie.imageUrl}
                            handleEnded={this.handleEnded}
                            />
                        ) : (
                            null
                        )}
                         {this.state.selectedMovie !==undefined ? (
                              <MvPlayerList 
                              movies={movies}
                              selectedMovie={selectedMovie}
                            />  
                        ) : (
                            null
                        )}                    
                      
                    </>                 
                )}                 
            </div>
        )
    }
}

export { MoviePlayer } 