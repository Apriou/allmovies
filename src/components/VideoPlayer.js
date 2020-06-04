import React, { Component } from 'react'
import ReactPlayer from 'react-player'

import '../css/VideoPlayer.css'

class VideoPlayer extends Component {



    render() {
        //const videoUrl = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
        //const imgSrc = "./images/Fast_large.jpg"
        return( 
            <div className="videoPlayer">
                <ReactPlayer 
                    url={this.props.videoUrl}
                    config={{
                        youtube: {
                          playerVars: { showinfo: 1 }
                        }                     
                      }}
                    controls
                    playing={false}
                    with="100%"
                    height="100%"
                    style={{ position: "absolute", top: "0", left: "0" }}
                    light={this.props.imageUrl}
                    onEnded={this.props.handleEnded}
                />       
            </div>
        )
    }
}

export { VideoPlayer } 