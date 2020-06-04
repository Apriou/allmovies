import { combineReducers } from 'redux'
import { movieReducer }  from './movies'

const rootReducer = combineReducers({
    myMovieReducer: movieReducer//,
    //users: userReducer //A titre d'exemple
})

//A ce niveaux si on tape store.getState() il nous renvoie un objet du type
/* {
        movies: {
            movies:[],
            number:0
        }
    } 
*/
export default rootReducer