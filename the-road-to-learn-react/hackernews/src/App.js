import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
}, {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
}];
const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: list,
      searchTerm: ''
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  onDismiss(id) {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({list: updatedList});
  }

  onSearchChange(event) {
    console.log(event.target.value);
    this.setState({searchTerm: event.target.value})
  }

  
  render() {
    return (
      <div className="App">
      <from>
        <input type="text" onChange={this.onSearchChange}/>
      </from>
      {this.state.list.filter(isSearched(this.state.searchTerm)).map(item => item.title)
      }
        {this.state.list.map(item => {
          return (
          <div key={item.objectID}>
            <a href={item.url}>{item.title}</a>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>

            <span>
              <button onClick={() => this.onDismiss(item.objectID)}>
              Dismiss
              </button>
            </span>
          
          </div>
        );
        })}
      </div>
    );
  }
}

export default App;
