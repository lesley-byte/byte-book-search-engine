import React, { useState } from "react";
import { link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ME,
  QUERY_USER,
  QUERY_BOOKS,
  QUERY_SINGLE_BOOK,
  QUERY_ME,
} from "../utils/queries";
import {
  ADD_BOOK,
  DELETE_BOOK,
  LOGIN_USER,
  ADD_USER,
  SAVE_BOOK,
  REMOVE_BOOK,
} from "../utils/mutations";

import Auth from "../utils/auth";

import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";

import { saveBookIds, getSavedBookIds } from "../utils/localStorage";

const SearchBooks = () => {
  const { loading, data } = useQuery(QUERY_BOOKS);
  const userData = data?.me || {};
  const [addBook, { error }] = useMutation(ADD_BOOK);

  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addBook({
        variables: { ...userData },
      });
    } catch (e) {
      console.error(e);
    }
  };
  const handleDeleteBook = async (bookId) => {
    bookId.preventDefault();

    try {
      await deleteBook({
        variables: { bookId },
      });
    } catch (e) {
      console.error(e);
    }
  };
  

  return (
    <div>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for Books!</h1>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Form onSubmit={handleFormSubmit}>
              <Form.Row>
                <Col xs={12} md={8}>
                  <Form.Control
                    name="searchInput"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    type="text"
                    size="lg"
                    placeholder="Search for a book"
                  />
                </Col>
                <Col xs={12} md={4}>
                  <Button type="submit" variant="success" size="lg">
                    Submit Search
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          )}
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : "Search for a book to begin"}
        </h2>
        <CardColumns>
          {searchedBooks.map((book) => {
            return (
              <Card key={book.bookId} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    id={book.bookId}
                    onClick={handleDeleteBook}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </div>
  );
};

export default SearchBooks;
