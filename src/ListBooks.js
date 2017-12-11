import React, { Component } from 'react';
import PropTypes from 'prop-types'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  render() {
    const { books, divClassName, onChangeShelf } = this.props

    return (
      <div className={divClassName}>
        <ol className="books-grid">
          {books.filter((book) => book && book.id && book.imageLinks && book.authors && book.title).map((book) =>
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={
                    { width: 128,
                      height: 192,
                      backgroundImage: `url(${book.imageLinks.thumbnail})`
                    }}>
                  </div>
                  <div className="book-shelf-changer">
                    <select value={book.shelf || 'none'}
                      onChange={(event) => onChangeShelf(book, event.target.value)}
                    >
                      <option value="none" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors.join('\n')}</div>
              </div>
            </li>
          )}
        </ol>
      </div>
    )
  }
}

export default ListBooks
