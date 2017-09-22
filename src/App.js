import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
const axios = require("axios");
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 

today = yyyy + '-' + mm + '-' + dd;
document.write(today);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      showTimes: []
    };
    this.refreshMovieReviews = this.refreshMovieReviews.bind(this);
  }

  refreshMovieReviews() {
    axios
      .get(
        "https://api.nytimes.com/svc/movies/v2/reviews/all.json?api-key=cf67d38f5bf1448aaa502bdb8e1d00cc"
      )
      .then(reviews => {
        this.setState({ reviews: reviews.data.results });
      })
  }

  refreshInTheatres() {
  axios
    .get(
      "https://api.themoviedb.org/3/discover/movie?api_key=610065ea33e19e926ee3ee685de3f3f0&primary_release_date.gte=" + today + "&primary_release_date.lte=" + today + '"'
    )
    .then(showingNow => {
      this.setState({ showTimes: showingNow.data.results });
    })
  }

  renderInTheatre(item) {
    return (
      <div className='movieDiv'>
        <img width="30%" height="45%" src={`http://image.tmdb.org/t/p/w185/${item.poster_path}`}/>
        <h2>{item.title}</h2>
        <h4>
          User Rating:{item.vote_average} Popularity:{item.popularity}
        </h4>
        <h3>{item.overview}</h3>
        <p>
          Release Date: {item.release_date}
        </p>
        <h6>Cited from The Movie Database</h6>
      </div>
    );
  }
  
  renderAllInTheatre() {
    return (
      this.state.showTimes.map(item => {
      return this.renderInTheatre(item)})
    );
  }

  renderReview(item) {
    return (
      <div className='movieDiv'>
        <img width="30%" height="45%" src={item.multimedia.src}/>
        <h2>{item.display_title}</h2>
        <h4>RATED: {item.mpaa_rating}</h4>
        <h3>{item.headline}</h3>
        <h4>Article review written by {item.byline}</h4>
        <p>{item.summary_short}</p>
        <a href={item.link.url}>New York Times Article!</a>
        <p>
          Opening Date: {item.opening_date}, Publication Date:{item.publication_date}
        </p>
      </div>
    );
  }

  renderReviews() {
    return (
      this.state.reviews.map(item => {
      return this.renderReview(item)})
    );
  }


  render() {
    return (
      <div className="masterDiv text-center">
        <h3 className="pageTitle">Movie Reviews!</h3>
        {this.renderReviews()}
        <h3 className="pageTitle">What's in Theatres!</h3>
        {this.renderAllInTheatre()}
        <button className='bigBlueButton' onClick={() => {this.refreshMovieReviews(); this.refreshInTheatres()}}>The Big Blue Button</button>
      </div>
    );
  }
}

export default App;
