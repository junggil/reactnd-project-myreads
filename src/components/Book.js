import React from 'react';

const Book = ({ book, onChangeShelf }) => {
  const default_img = `http://books.google.com/books/content?id=\
  a_asDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`

  return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={
              { width: 128,
                height: 192,
                backgroundImage: `url("${(book.imageLinks && book.imageLinks.thumbnail) || default_img}")`
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
          <div className="book-authors">{book.authors ? book.authors.join('\n') : "Unknown authors"}</div>
        </div>
      </li>
  )
}

export default Book
