import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    axios.get('http://localhost:3000/photos')
      .then(response => {
       console.log(response.data.photos.photo);
        this.setState({
          data: response.data.photos.photo
        })
      })
  }
  render() {
    let photos = this.state.data;
    return (
      <div className="App">
        
        <div className="row">
          {/* <div className="col s6"><img src="" alt={photo.title}/></div> */}
          <div className="col s6">{photos.map(photo => <p key={photo.id}>{photo.title}</p> )}</div>
        </div>
     
      </div>
    );
  }
}
export default App;
