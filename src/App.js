import React, { Component } from 'react';

import AppHeader from './pages/AppHeader';
import AppBody from './pages/AppBody';
import AppFooter from './pages/AppFooter';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <AppHeader />
        </header>
        <br />
        <br />

        <div className = "container">
          <AppBody />
        </div>
        <br />
        <br />
        <br />

        <footer >
          <AppFooter />
        </footer>
      </div>
    );
  }
}

export default App;
