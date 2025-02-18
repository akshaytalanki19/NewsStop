import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize:8,
    category: 'general',
    
  }
  static propTypes = {
    country : PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [], // Initialize with an empty array
      loading: false,
      page:1,
    };
    document.title=this.props.category;
  }
  async updateNews(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();
    this.setState({ articles: parseData.articles });
    this.props.setProgress(70);
    this.setState({loading: false});
    this.setState({
      
      articles: parseData.articles,
  })
  this.props.setProgress(100);
  }
  fetchMoreData = async() => {
    this.setState({page: this.state.page+1});
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parseData =await data.json();
    this.setState({loading: false});
    this.setState({
      
      articles: this.state.articles.concat(parseData.articles),
  })
  };

  async componentDidMount() {
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
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
   this.setState({page: this.state.page+1});
   this.updateNews();
  }
  handlePreviousClcik = async() =>{
  this.setState({page: this.state.page-1});
  this.updateNews();
  }
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">NewsStop - Top HeadLines</h2>
       {/* {this.state.loading && <Spinner/> } */}
       <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalArticles}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
          { this.state.articles?.map((element) => (
            <div className="col-md-4" key={element.urlToImage}>
              <NewsItem
                title={element.title ? element.title.slice(0, 45) : ""}
                description={element.description ? element.description.slice(0, 88) : ""}
                imageurl={element.urlToImage}
                newsurl={element.url} author={element.author} date={element.publishedAt}
              />
            </div>
            
          ))}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
           <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClcik}> &larr; Previous</button>
           <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/5)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>        
        </div> */}
      </div>
    );
  }
}
