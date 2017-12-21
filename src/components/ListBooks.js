import React from 'react';
import Book from './Book'

const ListBooks = ({ books, divClassName, onChangeShelf }) => {
  const default_img = `http://books.google.com/books/content?id=\
  a_asDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`

  return (
    <div className={divClassName}>
      <ol className="books-grid">
        {books.map(book =>
          <Book book={book} key={book.id} onChangeShelf={onChangeShelf} />
        )}
      </ol>
    </div>
  )
}

export default ListBooks
