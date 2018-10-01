import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';


class BookDetails extends Component {
  displayBookDetails = () => {
    const { book } = this.props.data;
    if(book){
      return(
        <div>
          <h2>{ book.name }</h2>
          <p>{ book.genre }</p>
          <p>{ book.author.name }</p>
          <p>Other books by this Author</p>
          <ul className='other-books'>
            {
              book.author.books.map(book => {
                return <li key={ book.id }>{ book.name }</li>
              })
            }
          </ul>
        </div>
      )
    } else {
      return(
        <div id='no-book-selected'>Click a book to see the details</div>
      )
    }
  }
  
  render(){
    
    return(
      <div className='book-details'>
        { this.displayBookDetails() }
      </div>
    );
  }
};

export default graphql(getBookQuery,  
  {options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }}
)(BookDetails)