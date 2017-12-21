import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import SearchBooks from './components/SearchBooks'
import BookShelfs from './components/BookShelfs'
import NoMatch from './components/NoMatch'
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
        if(typeof books.error === 'undefined') {
          let sortedBooks = books
          sortedBooks.sort(sortBy('title'))
          sortedBooks.map(book => {
            let bookInShelf = this.state.bookShelfs.find(item => item.id === book.id)
            if (bookInShelf) book.shelf = bookInShelf.shelf
            return book
          })
          this.setState({ books: sortedBooks })
        } else {
          this.clearSearchPage()
        }
      })
    } else {
      this.setState({ books: [] })
    }
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      book.shelf = shelf
      this.setState({
        bookShelfs: this.state.bookShelfs
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
        <Switch>
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
          <Route component={NoMatch}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp
