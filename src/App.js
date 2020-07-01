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
        //console.log(response.data.photos.photo);
        this.setState({
          data: response.data.photos.photo
        })
      })
  }
  render() {
    let photos = this.state.data;
    return (
      <div className="App">
        {photos.map(photo =>
          <div className="row" key={photo.id}>
            <div className="col s6">
              <img src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} alt={photo.title} />
            </div>
            <div className="col s6">
              <p>{photo.title}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default App;
