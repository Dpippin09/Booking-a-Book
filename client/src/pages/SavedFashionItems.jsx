import { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import Auth from "../utils/auth";
// import { REMOVE_FASHION_ITEM } from "../utils/mutations";
// import { useMutation, useApolloClient } from "@apollo/client";
// import { GET_ME } from "../utils/queries";

const SavedFashionItems = () => {
  // Replace with your actual user data fetching logic
  const [userData, setUserData] = useState({
    savedFashionItems: [],
  });

  // Example: useEffect to fetch user data
  // useEffect(() => { ... }, []);

  return (
    <>
      <Container fluid className="text-light bg-dark p-5 text-center">
        <h1>Viewing saved fashion items!</h1>
      </Container>
      <Container>
        <h2 className="pt-5 text-center">
          {userData.savedFashionItems.length
            ? `Viewing ${userData.savedFashionItems.length} saved ${
                userData.savedFashionItems.length === 1 ? "item" : "items"
              }:`
            : "You have no saved fashion items!"}
        </h2>
        <Row className="justify-content-center">
          {userData.savedFashionItems.map((item) => (
            <Col key={item.itemId} md={4} className="d-flex justify-content-center">
              <Card className="w-100">
                {item.image && (
                  <Card.Img
                    src={item.image}
                    alt={`Image for ${item.title}`}
                    variant="top"
                  />
                )}
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <p className="small">Category: {item.category}</p>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text>Price: ${item.price}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    // onClick={() => handleDeleteItem(item.itemId)}
                  >
                    Delete this Item!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedFashionItems;