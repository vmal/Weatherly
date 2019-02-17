import React, { Component } from 'react';
import './App.css';
import Text from './components/Text';

class App extends Component {
  render() {
    document.body.style.backgroundColor = 'DodgerBlue';
    return (
      <div className="App">
        <Text/>
      </div>
    );
  }
}

export default App;
