import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import BookShelfs from './BookShelfs'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = (book, shelf) => {
    let otherBooks = this.state.books.filter((b) => b.id !== book.id)
    let updatedBook = book
    updatedBook.shelf = shelf

    this.setState((state) => ({
      books: otherBooks.concat([ updatedBook ])
    }))

    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      <div className="app">
       <Route path='/search' render={() => (
         <SearchBooks
          searchBook={this.searchBook}
          onChangeShelf={this.changeShelf}
          />
        )}/>
       <Route exact path='/' render={() => (
         <BookShelfs
          books={this.state.books}
          onChangeShelf={this.changeShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
