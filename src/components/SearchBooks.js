import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import { Debounce } from 'react-throttle';

class SearchBooks extends Component {
  updateQuery = query => {
    this.setState({ query })
    this.props.searchBook(query)
  }

  componentWillUnmount() {
    this.props.clearSearchPage();
  }

  render() {
    const { onChangeShelf, books } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="500" handler="onChange">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={(event) => this.updateQuery(event.target.value)}
                />
              </Debounce>
          </div>
        </div>
        <ListBooks
          books={books}
          onChangeShelf={onChangeShelf}
          divClassName="search-books-results"
        />
      </div>
    )
  }
}

export default SearchBooks
