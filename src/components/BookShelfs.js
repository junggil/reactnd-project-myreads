import React from 'react';
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'

const BookShelfs = ({ books, onChangeShelf }) => {
  const shelfs = ['currentlyReading', 'wantToRead', 'read']
  const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      {shelfs.map((shelf) => (
        <div key={shelf} className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{capitalize(shelf)}</h2>
              <ListBooks
                books={books.filter((book) => book.shelf === shelf)}
                onChangeShelf={onChangeShelf}
                divClassName="bookshelf-books"
              />
            </div>
          </div>
        </div>
      ))}
      <div className="open-search">
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  )
}

export default BookShelfs
