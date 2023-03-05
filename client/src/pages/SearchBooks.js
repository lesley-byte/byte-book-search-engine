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
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  return (
    <div>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for Books!</h1>
          <Form>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>{}</h2>
        <CardColumns>{}</CardColumns>
      </Container>
    </div>
  );
};

export default SearchBooks;
