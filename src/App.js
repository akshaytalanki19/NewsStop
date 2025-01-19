import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  pageSize=15;
  apiKey="3087bb46c64e41148e49ec999a2fbe00"
  state={
     progress:0
  }
 
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        {/* Use BrowserRouter instead of Router */}
        <Router>
          <Navbar />
          <LoadingBar
                color="RED"
            progress={this.state.progress}
            height={30}
            
          />
          <Routes>
            {/* Use element prop to specify the component to render */}
            <Route
              exact
              path="/"
              element={<News setProgress={this.setProgress} apiKey={this.apiKey}    key="general" pageSize={this.pageSize} country="us" category="general" />}
            />
            <Route
              exact
              path="/business"
              element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="business" pageSize={this.pageSize} country="us" category="business" />}
            />
            <Route
              exact
              path="/entertainment"
              element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="entertainment" pageSize={this.pageSize} country="us" category="entertainment" />}
            />
            <Route
              exact
              path="/general"
              element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="general" pageSize={this.pageSize} country="us" category="general" />}
            />
            <Route
              exact
              path="/health"
              element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="health" pageSize={this.pageSize} country="us" category="health" />}
            />
            <Route
              exact
              path="/science"
              element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="science" pageSize={this.pageSize} country="us" category="science" />}
            />
            <Route
              exact
              path="/sports"
              element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="sports" pageSize={this.pageSize} country="us" category="sports" />}
            />
            <Route
              exact
              path="/technology"
              element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="technology" pageSize={this.pageSize} country="us" category="technology" />}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
