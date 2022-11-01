import React, { Component } from "react";
import NewsItem from "../NewsItem";

export class News extends Component {
  constructor() {
    super();

    console.log("hello i am constructor from news component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=6674a2f6098d4cc5867993d3fe9085ee&page=1&pageSize=20";
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({ articles: parseData.articles, totalResults:parseData.totalResults });
  }

   handlePreviousclick = async () => {
    console.log("previous click");
      let url =
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=6674a2f6098d4cc5867993d3fe9085ee&page=${this.state.page -1}&pageSize=20`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({ 
        page : this.state.page -1,
        articles: parseData.articles 
    });
  }


   handleNextClick = async () => {
    console.log("next click");
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/20))
    {

    }
    else{
    let url =
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=6674a2f6098d4cc5867993d3fe9085ee&page=${this.state.page + 1}&pageSize=20`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      page: this.state.page + 1,
      articles: parseData.articles
    });
  }
}

  render() {
    return (
      <div className="container my-3">
        <h2>News Monkey - Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousclick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
