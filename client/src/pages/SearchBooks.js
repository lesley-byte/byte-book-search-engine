import { link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
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
