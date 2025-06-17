import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";
import { GET_ME } from "../utils/queries";
import { SAVE_FASHION_ITEM } from "../utils/mutations"; // You should create this mutation for fashion items
import Auth from "../utils/auth";
import { searchFashionItems } from "../utils/API";

const SearchFashionItems = () => {
  const [searchedItems, setSearchedItems] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { data, refetch } = useQuery(GET_ME);
  const savedItemIds = data?.me?.savedFashionItems?.map((item) => item.itemId) || [];
  const [saveFashionItem] = useMutation(SAVE_FASHION_ITEM, {
    onCompleted: () => {
      refetch();
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) return false;
    try {
      const items = await searchFashionItems(searchInput);
      // Map API data to your app's data structure
      const itemData = items.map((item) => ({
        itemId: item.id,
        title: item.title,
        category: item.category,
        description: item.description,
        image: item.image,
        price: item.price,
      }));
      setSearchedItems(itemData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveItem = async (itemId) => {
    const itemToSave = searchedItems.find((item) => item.itemId === itemId);
    try {
      await saveFashionItem({
        variables: {
          ...itemToSave,
        },
      });
    } catch (err) {
      console.error("Error saving item:", err.message);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Fashion Accessories!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a fashion accessory"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className="pt-5">
          {searchedItems.length
            ? `Viewing ${searchedItems.length} results:`
            : "Search for a fashion accessory to begin"}
        </h2>
        <Row>
          {searchedItems.map((item) => (
            <Col md="4" key={item.itemId}>
              <Card border="dark">
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
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedItemIds?.some(
                        (savedItemId) => savedItemId === item.itemId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveItem(item.itemId)}
                    >
                      {savedItemIds?.some(
                        (savedItemId) => savedItemId === item.itemId
                      )
                        ? "This item has already been saved!"
                        : "Save this Item!"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SearchFashionItems;