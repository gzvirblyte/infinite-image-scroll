import React from 'react';
import axios from 'axios';

class Photos extends React.Component {
    constructor() {
        super();
        this.state = {
            photos: [],
            perpage: 10,
            page: 1,
            pages: null,
            scrolling: false
        }
    }

    componentDidMount() {
        this.loadPhotos()
        this.scrollListener = window.addEventListener('scroll', (e) => {
            this.handleScroll(e)
        })
    }

    handleScroll = (e) => {
        const { scrolling, pages, page } = this.state
        if (scrolling) {
            return
        }
        if (pages <= page) {
            return
        }
        const lastItem = document.querySelector('.row:last-of-type');
        const lastItemOffset = lastItem.offsetTop + lastItem.clientHeight
        const pageOffset = window.pageYOffset + window.innerHeight
        let bottomOffset = 20
        if (pageOffset > lastItemOffset - bottomOffset) {
            this.loadMore()
        }
    }

    loadPhotos = () => {
        const { perpage, page, photos } = this.state;
        axios.get(`http://localhost:3000/photos`)
            //axios.get(`https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=00ac5f70d662304b87e7da585bbdef9d&gallery_id=72157713970734808&per_page=${perpage}&page=${page}&format=json&nojsoncallback=1`)
            .then(response => {
                console.log(response.data.photos.photo);
                this.setState({
                    photos: [...photos, ...response.data.photos.photo],
                    scrolling: false,
                    pages: response.data.photos.pages
                })
            })
    }

    loadMore = () => {
        this.setState(prevState => ({
            page: prevState.page + 1,
            scrolling: true,
        }), this.loadPhotos)
    }

    sort = () => {
        this.setState((prevState) => ({
            ...this.state,
            photos: prevState.photos.sort((a, b) => a.title > b.title ? 1 : -1)
        }))
    }

    render() {
        let photos = this.state.photos;
        return (
            <div className="container">
                <button onClick={this.sort} className="waves-effect waves-light btn-large">SORT ALPHABETICALLY</button>
                {photos.map(photo =>
                    <div className="col s12" key={photo.id}>
                        <div className="card horizontal">
                            <div className="card-image" style={{backgroundImage:`url(https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg)`}}></div>
                            <div className="card-stacked">
                                <div className="card-content valign-wrapper">
                                    <p className="left-align flow-text">{photo.title}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Photos;