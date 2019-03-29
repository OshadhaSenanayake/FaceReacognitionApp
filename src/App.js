import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';
import Signin from './Components/SignIn/Signin';
import Register from './Components/Register/Register'
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';
import './App.css';

const app = new Clarifai.App({
  apiKey : '95663b843479471f825a0300afe9b458'
}); 

 const particleOptions = {
                particles: {
                  number:{
                    value: 100,
                    density: {
                      enable: true,
                      value_area: 800 
                    }
                  }
                }
              }

class App extends Component {
  constructor(){
    super();
    this.state = {
      input:'',
      imageUrl:'',
      route:'Signin',
      isSignedIn: false
    }
  }


  //onChange a event will be triggered 
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }


  //when button is clicked 
  onButtonSubmit = () => {
    this.setState({ imageUrl:this.state.input});
    app.models
    .predict(
      Clarifai.COLOR_MODEL,
      this.state.input)
    .then(
      function(response) {
        console.log(response);
      },
      function(err) {
      }
    ); 
  }

  onRouteChange = (route) => {
    if(route === 'Signout') {
      this.setState( {isSignedIn: false} )
    }else if(route === 'home') {
      this.setState( {isSignedIn: true} )
    }
      this.setState( {route: route} );
  }

  render() {
    const { isSignedIn, route, imageUrl } = this.state;  //destructuring
    return (
      <div className="App">
        <Particles className='particles' params={particleOptions}/>

        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
          {route === 'home'
          ?
            <div>
              <Logo/>
              <ImageLinkForm 
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition imageUrl={imageUrl} />
            </div>  
          :
            (route === 'Signin' || route === 'Signout'
              ?
              <Signin onRouteChange={this.onRouteChange} />
              :
              <Register onRouteChange={this.onRouteChange} />
            )
            
          }
      </div>
    );
  }
}

export default App;
