import React, { Component } from 'react'

export default class NewsItem extends Component {
  

  render() {
    let {title, description, imageurl, newsurl} = this.props;
    return (
      <div className="my-3">
         <div className="card" style={{ width: '18rem' }}>
          <img src={imageurl?imageurl:"https://s.abcnews.com/images/US/abc_news_default_2000x2000_update_16x9_992.jpg"} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title?title:"new title"}</h5>
            <p className="card-text">{description?description:"new description"}</p>
            <a href={newsurl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}
