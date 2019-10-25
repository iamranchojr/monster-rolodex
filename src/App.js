import React from "react";

import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";

import "./App.css";

class App extends React.Component {
  constructor() {
    // Always call the super constructor
    super();

    // define the state of your component if u need to maintain state
    this.state = {
      monsters: [],
      searchField: ""
    };
  }

  // using arrow functions automatically binds the function to
  // the class in which it was declared
  handleChange = e => {
    this.setState({ searchField: e.target.value });
  };

  /**
   * This method is called when React adds our component to the DOM
   */
  componentDidMount() {
    // using javascript native fetch method to fetch response from api
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response =>
        // console.log(response)
        // convert response to json
        response.json()
      )
      .then(users =>
        // log the users when the promise is resolved
        // console.log(users)

        // modify state to set monsters to the users array
        this.setState({ monsters: users })
      );
  }

  /**
   * This function is called by react anytime the state changes
   */
  render() {
    // multiple initialization
    const { monsters, searchField } = this.state;

    // filtering using filter and includes
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      // Even though, it looks like html, but it's actually not html
      // It's called JSX
      <div className="App">
        <h1>Monsters Rolodex </h1>
        <SearchBox
          placeholder="search monsters"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
