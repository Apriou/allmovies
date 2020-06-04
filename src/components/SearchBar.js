import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import '../css/SearchBar.css'

class SearchBar extends Component {
    state = {
        value:""
    }

    handleChange = e => {
        this.setState({value: e.target.value})
    }

    render() {
        const {value} = this.state;
        return( 
            <div className="searchBar--container">
                <div className="searchBar">
                    <input className="searchBar--input" 
                        type="text" 
                        placeholder="Rechercher un film"
                        value={value}
                        onChange={this.handleChange}
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) { //Si on press enter on déclenche la recherche
                                this.props.onSearchClick(value)
                            }
                        }}
                    />
                    <div 
                        onClick={() => this.props.onSearchClick(value)} //Attention ici on met bien onSearchClick dans une fonction arrow car sinon onSearchClick serait appelée à chaque fois que le state change (autrement dit à chaque fois que l'on tape une lettre or ce n'est pas ce qu'on veut ici)
                        className="searchBarSubmit">
                        <FontAwesomeIcon className="searchIcon" icon={faSearch} />
                    </div>
                </div>
    
            </div>
        )
    }
}

export { SearchBar } 