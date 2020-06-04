import { createStore, compose } from 'redux'

import rootReducer from '../reducers'

//Pour utiliser REDUX devtools dans le navigateur 
const enhancers = compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//createStore créer un store qui contiendra les reducers (présent dans rootReducer) et un state global (qu'il créer aussi)
const store = createStore(rootReducer, {}, enhancers) 

export default store