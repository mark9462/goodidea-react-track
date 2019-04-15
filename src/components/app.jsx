import React, { Component } from "react";
import { hot } from "react-hot-loader/root";

import Search from "./search";
import Products from "./products";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booksData: [],
      searchItems: [],
      getBookList: false
    };
  }

  getBooksList = () => {
    fetch("https://bookshelf.goodideas-studio.com/api/")
      .then(response => response.json())
      .then((data) => {
        const booksList = data.list;
        this.setState({
          booksData: booksList,
          searchItems: booksList,
          getBookList: true
        });
      })
      .catch(error => console.log("Opps", error));
  };

  filterbooks = (searchItems) => {
    this.setState({
      searchItems
    });
  };

  componentDidMount() {
    this.getBooksList();
  }

  render() {
    const { booksData, searchItems, getBookList } = this.state;
    let showProducts = "";
    if (getBookList === true) {
      showProducts = <Products searchItems={searchItems} />;
    } else {
      showProducts = "Loading...";
    }
    return (
      <div>
        <Search books={booksData} onChangeSearch={this.filterbooks} />
        {showProducts}
      </div>
    );
  }
}

export default hot(App);
