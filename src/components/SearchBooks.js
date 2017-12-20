import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'

class SearchBooks extends Component {
  state = {
    query: '',
  }

  updateQuery = query => {
    this.setState({ query })
    this.props.searchBook(query)
  }

  componentWillUnmount() {
    this.props.clearSearchPage();
  }

  render() {
    const { onChangeShelf, books } = this.props
    const { query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
              />

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
