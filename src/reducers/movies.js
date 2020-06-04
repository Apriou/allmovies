import { ADD_MOVIE, REMOVE_MOVIE, GET_MOVIES, GET_NUMBER } from '../actions'


//State global initial
const initialState = {
    movies: [], //liste de films favoris
    number: 0
}

//Mise à jour du state global
export const movieReducer = (state = initialState, action) => {
    console.log('ACTION ', action);   
    switch (action.type) {
        case ADD_MOVIE:
            console.log('ADD_MOVIE ', action.payload);            
            return {
                movies: action.payload,
                number: action.payload.length //ou state.number+1 ???
            }
        case REMOVE_MOVIE:
            console.log('REMOVE_MOVIE', action.payload);
            return {
                movies: action.payload,
                number: state.number -1 
            }
        case GET_MOVIES:
            console.log('GET_MOVIES', action.payload);
            return {
                ...state, //copie du state précédent
                movies: action.payload //on met à jour le state.movies
            }
        case GET_NUMBER: 
            console.log('GET_NUMBER', action.payload);
            return {
                ...state, //copie du state précédent
                number: action.payload //on met à jour le state.number
            }
        default:
            return state        
    } 
}
//A ce niveaux si on tape store.getState() il nous renvoie un objet du type
/* {
    movies:[],
    number:0
} */