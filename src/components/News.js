import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [], // Initialize with an empty array
      loading: false,
      page:1,
    };
  }

  async componentDidMount() {
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=3087bb46c64e41148e49ec999a2fbe00&page=1&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({loading: false});
      console.log(parseData);
      if (parseData && parseData.articles) {
        this.setState({ articles: parseData.articles,totalArticles:parseData.totalResults });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  handleNextClick = async()=>{
    console.log("next");
    if(this.state.page+1>Math.ceil(this.state.totalResults/21)){
    
    }
else{
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=3087bb46c64e41148e49ec999a2fbe00&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({ articles: parseData.articles });
    this.setState({loading: false});
    this.setState({
      page:this.state.page+1,
      articles: parseData.articles,
  })
  
  }
  }
  handlePreviousClcik = async() =>{
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=3087bb46c64e41148e49ec999a2fbe00&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({loading: false});
    this.setState({ articles: parseData.articles });
    this.setState({
      page:this.state.page-1,
      articles: parseData.articles,
  })
  }
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">NewsStop - Top HeadLines</h2>
       {this.state.loading && <Spinner/> }
        <div className="row">
          {!this.state.loading && this.state.articles?.map((element) => (
            <div className="col-md-4" key={element.urlToImage}>
              <NewsItem
                title={element.title ? element.title.slice(0, 45) : ""}
                description={element.description ? element.description.slice(0, 88) : ""}
                imageurl={element.urlToImage}
                newsurl={element.url}
              />
            </div>
          ))}
        </div>
        <div className="container d-flex justify-content-between">
           <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClcik}> &larr; Previous</button>
           <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/5)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>        
        </div>
      </div>
    );
  }
}
