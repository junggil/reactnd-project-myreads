import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import SearchBooks from './components/SearchBooks'
import BookShelfs from './components/BookShelfs'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    bookShelfs: []
  }
  componentDidMount() {
    BooksAPI.getAll().then(bookShelfs => {
      this.setState({ bookShelfs })
    })
  }

  searchBook = (query) => {
    if (query) {
      BooksAPI.search(query, 20).then(books => {
        let sortedBooks = books
        sortedBooks.sort(sortBy('title'))
        this.setState({ books: sortedBooks })
      })
    } else {
      this.setState({ books: [] })
    }
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      this.setState(state => {
        book.shelf = shelf
        bookShelfs: state.bookShelfs
                    .filter(b => b.id !== book.id)
                    .concat([book])
      })
    })
  }

  clearSearchPage = () => {
    this.setState({ books: [] })
  }

  render() {
    return (
      <div className="app">
       <Route path='/search' render={() => (
         <SearchBooks
          books={this.state.books}
          searchBook={this.searchBook}
          onChangeShelf={this.changeShelf}
          clearSearchPage={this.clearSearchPage}
          />
        )}/>
       <Route exact path='/' render={() => (
         <BookShelfs
          books={this.state.bookShelfs}
          onChangeShelf={this.changeShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
