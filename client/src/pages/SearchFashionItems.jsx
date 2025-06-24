import { useState } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";
import Auth from "../utils/auth";
import { searchFashionItems } from "../utils/API";

const SearchFashionItems = () => {
  const [searchedItems, setSearchedItems] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) return false;
    try {
      const items = await searchFashionItems(searchInput);
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

  return (
    <>
      <div className="text-light bg-dark p-5 text-center">
        <Container>
          <h1 className="snatched-title">Snatched It!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row className="justify-content-center">
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a fashion accessory"
                  className="mb-3"
                />
              </Col>
              <Col xs={12} md="auto">
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className="pt-5 text-center">
          {searchedItems.length
            ? `Viewing ${searchedItems.length} results:`
            : "Search for a fashion accessory to begin"}
        </h2>
        <Row className="justify-content-center">
          {searchedItems.map((item) => (
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
                  {Auth.loggedIn() && (
                    <Button
                      className="btn-block btn-info"
                      // Add your save handler here
                      disabled={false}
                    >
                      Save this Item!
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