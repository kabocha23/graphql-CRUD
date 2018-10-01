import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAllBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails'


class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBook: null,
    }
  }

  displayAllBooks = () => {
    const { data } = this.props;
    if(data.loading){
      return( <div><h2>Loading books...</h2></div>)
    }else{
      return data.books.map(book => {
        return(
          <li key={ book.id } onClick={(e) => {this.setState({selectedBook: book.id})} }>{ book.name }</li>
        );
      });
    };
  }

  render(){
    const { selectedBook } = this.state;
    return(
      <div>
        <ul className='book-list'>
          { this.displayAllBooks() }
        </ul>
        <BookDetails bookId={ selectedBook }/>
      </div>
    );
  }
};

export default graphql(getAllBooksQuery)(BookList);