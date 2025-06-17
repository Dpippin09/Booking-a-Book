import { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useMutation, useApolloClient } from "@apollo/client";
import { REMOVE_FASHION_ITEM } from "../utils/mutations";
import { GET_ME } from "../utils/queries";
import Auth from "../utils/auth";
// If you have a removeFashionItemId utility for localStorage, import it here
// import { removeFashionItemId } from "../utils/localStorage";

const SavedFashionItems = () => {
  const [userData, setUserData] = useState({});
  const [removeFashionItem, { error }] = useMutation(REMOVE_FASHION_ITEM);
  const client = useApolloClient();
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
          return;
        }
        const { data, errors } = await client.query({
          query: GET_ME,
          context: {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        });
        if (errors) {
          throw new Error("something went wrong!");
        }
        setUserData(data.me);
      } catch (err) {
        console.error(err);
      }
    };
    getUserData();
  }, [userDataLength, client]);

  // Accepts the item's mongo _id value as param and deletes the item from the database.
  const handleDeleteItem = async (itemId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const { data } = await removeFashionItem({
        variables: { itemId },
      });
      if (data.errors) {
        throw new Error("Something went wrong during deletion.");
      }
      setUserData((prevData) => ({
        ...prevData,
        savedFashionItems: prevData.savedFashionItems.filter(
          (item) => item.itemId !== itemId
        ),
      }));
      // If you have a localStorage utility for fashion items, use it here:
      // removeFashionItemId(itemId);
    } catch (err) {
      console.error("Error during deletion:", error);
      alert("An error occurred while deleting the item. Please try again.");
    }
  };

  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Container fluid className="text-light bg-dark p-5">
        <h1>Viewing saved fashion items!</h1>
      </Container>
      <Container>
        <h2 className="pt-5">
          {userData.savedFashionItems.length
            ? `Viewing ${userData.savedFashionItems.length} saved ${
                userData.savedFashionItems.length === 1 ? "item" : "items"
              }:`
            : "You have no saved fashion items!"}
        </h2>
        <Row>
          {userData.savedFashionItems.map((item) => (
            <Col key={item.itemId} md="4">
              <Card border="dark">
                {item.image ? (
                  <Card.Img
                    src={item.image}
                    alt={`Image for ${item.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <p className="small">Category: {item.category}</p>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text>Price: ${item.price}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteItem(item.itemId)}
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