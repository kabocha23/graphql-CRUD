import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAllAuthorsQuery, addBookMutation, getAllBooksQuery } from '../queries/queries';


class AddBook extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: '',
    }
  }


  displayAuthors = () => {
    const { getAllAuthorsQuery } = this.props;
    const authorsData = getAllAuthorsQuery;
    if(authorsData.loading){
      return( <option disabled>Loading Authors...</option>)
    }else{
      return authorsData.authors.map(author => {
        return(
          <option key={ author.id } value={ author.id }>{ author.name }</option>
        );
      });
    };
  }

  submitForm = (e) => {
    e.preventDefault();
    const { addBookMutation } = this.props;
    const { name, genre, authorId } = this.state;

    addBookMutation({
      variables: {
        name: name, 
        genre: genre, 
        authorId: authorId
      },
      refetchQueries: [
        { query: getAllBooksQuery }
      ],
    });
    this.setState({
      name: '',
      genre: '',
      authorId: '',
    });
  }

  render(){
    return(
      <form className='add-book' onSubmit={ this.submitForm }>
        <div className='field'>
          <label>Book Name:</label>
          <input type='text' onChange={(e) => this.setState({name: e.target.value})}/>
        </div>

        <div className='field'>
          <label>Genre:</label>
          <input type='text' onChange={(e) => this.setState({genre: e.target.value})}/>
        </div>
        
        <div className='field'>
          <label>Author:</label>
          <select onChange={(e) => this.setState({authorId: e.target.value})}>
            <option>Select Author</option>
            { this.displayAuthors() }
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
};
  
export default compose(
  graphql(getAllAuthorsQuery, { name: "getAllAuthorsQuery"}), 
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
