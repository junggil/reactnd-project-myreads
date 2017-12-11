import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'


class SearchBooks extends Component {
  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState({ query })
    if (query) {
      BooksAPI.search(query, 20).then((books) => {
        let sortedBooks = books
        sortedBooks.sort(sortBy('title'))
        this.setState({ books: sortedBooks })
      })
    } else {
      this.setState({ books: [] })
    }
  }

  render() {
    const { onChangeShelf } = this.props
    const { query, books } = this.state

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
