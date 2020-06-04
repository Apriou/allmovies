import React, { Component } from 'react'
import { HeaderDetails, Spinner, ActorList} from '../components'
import axios from 'axios'
import { API_URL, API_KEY} from '../config'
import { renderLogin } from '../utils/helpers'

const isLogged = renderLogin()

class Details extends Component {

    state = {
        loading: true,
        actors: [],
        mtitle: "",
        mdesc: "",
        imgSrc: '',
        runtime: "",
        revenue: "",
        status: "",
        vote: "",
        isLogged: isLogged
    }

    loadInfos = url => axios.get(url)

    async componentDidMount() {
        try{
            
            if(!this.state.isLogged) { //On redirige vers la page login si on n'a pas effectué d'authentification
                this.props.history.push({pathname: '/login'});
                return;
            }

            const movieId = this.props.match.params.id
            const url = `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr`
            const { 
                data : { 
                    overview, 
                    title, 
                    runtime, 
                    vote_average, 
                    poster_path,  
                    revenue, 
                    status }
            } = await this.loadInfos(url) //Attend une réponse avant de passer à la suite
            this.setState({ 
                mtitle: title,
                mdesc: overview,
                imgSrc: poster_path, 
                runtime, //équivalent à runtime: runtime
                revenue,
                status,
                vote: vote_average
             }, async () =>{ // Fonction de callback. Deuxième requête API pour avoir les acteurs
                const url = `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=fr`
                 const { 
                     data: {
                         cast
                     }
                
                } = await this.loadInfos(url)
                 //console.log('Res Credits:', res);
                 this.setState({
                    loading: false,
                    actors: [...cast]
                    })
             })
                      
        } catch(e) {
            console.log('Erreur: ', e)
        }
    }

    render() {
        const { loading, actors, mtitle, mdesc, imgSrc, runtime, revenue, status, vote } = this.state
        return( 
            <div className="app">
               {loading ? (
                   <Spinner />
               ) : (
                   <>
                    <HeaderDetails 
                        mtitle={mtitle}
                        mdesc={mdesc}
                        imgSrc={imgSrc}
                        runtime={runtime}
                        revenue={revenue}
                        status={status}
                        vote={vote}
                    />
                    <ActorList actors={actors} />
                   </>
               )}
            </div>
        )
    }
}

export { Details } 