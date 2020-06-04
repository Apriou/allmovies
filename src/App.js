import React, { Component } from 'react';
import './App.css';
import { Header } from './components'
import { Home, Details, NotFound, MoviePlayer, Login, Payment } from './routes'
import { API_KEY, API_URL, IMAGE_BASE_URL, BACKDROP_SIZE } from './config'
import axios from 'axios' //Pour gérer les requetes http vers l'API
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Spinner } from './components'

//Firebase
import { initFirebase } from './utils/FireBase-config'

//Redux
import { Provider } from 'react-redux'
import store from './store'

class App extends Component{

  state = {
    loading: true,
    movies: [],
    badge: 0,
    image: null,
    mtitle: "",
    mdesc: "",
    activePage: 0,
    bottomPage: 0,
    searchText: ""

  }

  loadMore = async () => {
    try {
      this.setState({loading: true})
      const { data: {results, page, total_pages}} = await this.loadMovies()
      console.log('res: ', results);
      this.setState({
        movies: [...this.state.movies, ...results],
        loading: false,
        activePage: page,
        totalPages: total_pages,
        image: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${results[0].backdrop_path}`, 
        mtitle: results[0].title,
        mdesc: results[0].overview
      })
    }catch(e){
       console.log('Error Load More ', e);
    }   
  }

  async componentDidMount() {
    try{
      //INIT Firebase
      initFirebase();

      //const res = await this.loadMovies();
      //console.log('res: ', res);
      const { data: {results, page, total_pages}} = await this.loadMovies()
      console.log('res: ', results);
      this.setState({
        movies: results,
        loading: false,
        activePage: page,
        totalPages: total_pages,
        image: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${results[0].backdrop_path}`, 
        mtitle: results[0].title,
        mdesc: results[0].overview
      })
    } catch(e) {
      console.log('erreur :', e);      
    }
  }

  handleSearch = value => {
    try{
      //const res = await this.loadMovies();
      //console.log('res: ', res);
      this.setState({loading: true, searchText: value, image: null, activePage: 0}, async() => {
         const { data: {results, page, total_pages}} = await this.searchMovies()
          console.log('res: ', results);
          this.setState({
            movies: results,
            loading: false,
            activePage: page,
            totalPages: total_pages,
            image: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${results[0].backdrop_path}`, 
            mtitle: results[0].title,
            mdesc: results[0].overview
          })
      })
     
    } catch(e) {
      console.log('erreur :', e);      
    }
    
  }

  loadMovies = () => {
    const page = this.state.activePage + 1
    const url = `${API_URL}/discover/movie?api_key=${API_KEY}&language=fr&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
    console.log(url)
    return axios.get(url)
  }

  searchMovies = () => {
    const page = this.state.activePage + 1
    const url = `${API_URL}/search/movie?api_key=${API_KEY}&language=fr&query=${this.state.searchText}&page=${page}&include_adult=false`
    console.log(url)
    return axios.get(url)
  }

  render() {
    return (
      //<div className="App">
      //Browser router ne doit contenir qu'un seul enfant
      //Provider pour connecter redux à l'appli
      <Provider store={store}>
        <BrowserRouter>
            <div className="app">
              <Header badge={this.state.badge} />
              {!this.state.image ?
              (
                <Spinner />
              ) :
              (
                  <Switch>
                {/*  <route path=./ exact Component={Home} /> valable si on ne passe pas de propriétés à Home */}
                    <Route path="/" exact render={() => (
                          <Home  
                          {...this.state} //Copie du state entier
                          onSearchClick={this.handleSearch}
                          onButtonClick={this.loadMore}
                        />
                  )} />
                    <Route path='/Player' exact component={MoviePlayer} /> 
                    <Route path='/Player/:id' exact component={MoviePlayer} /> 
                    <Route path='/login' exact component={Login} /> 
                    <Route path='/payment' exact component={Payment} /> 
                    <Route path='/:id' exact component={Details} />    
                    <Route component={NotFound} />              
              </Switch>
              )}          
            </div>
        </BrowserRouter>
      </Provider> 
    );
  }
}

export default App;
