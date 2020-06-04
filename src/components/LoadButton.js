import React, { Component } from 'react'
import '../css/LoadButton.css'
import { Spinner } from './index'

class LoadButton extends Component {

    render() {
        return( 
            <>
                {this.props.loading ? (
                    <Spinner />
                ) : ( //Ici on peut mettre onButtonClick directement sans fonction arrow (cad () => this.props.onButtonClick) car onButtonClick n'accepte pas de state comme argument 
                        <div onClick={this.props.onButtonClick} className="loadButton"> 
                            <h3 className="loadButton--text">VOIR PLUS</h3>
                        </div>
                )}
            </>
        )
    }
}

export { LoadButton } 