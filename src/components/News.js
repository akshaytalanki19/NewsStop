import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [], // Initialize with an empty array
      loading: false,
    };
  }

  async componentDidMount() {
    try {
      let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=3087bb46c64e41148e49ec999a2fbe00";
      let data = await fetch(url);
      let parseData = await data.json();
      console.log(parseData);
      if (parseData && parseData.articles) {
        this.setState({ articles: parseData.articles });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  render() {
    return (
      <div className="container my-3">
        <h2>NewsStop</h2>
        <div className="row">
          {this.state.articles?.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title.slice(0, 45) : ""}
                description={element.description ? element.description.slice(0, 88) : ""}
                imageurl={element.urlToImage}
                newsurl={element.url}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
