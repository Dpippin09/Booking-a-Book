import { gql } from "@apollo/client";

// LOGIN_USER will execute the loginUser mutation set up using Apollo Server.
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        savedFashionItems {
          itemId
          title
          category
          description
          image
          price
        }
      }
    }
  }
`;

// ADD_USER will execute the addUser mutation.
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        savedFashionItems {
          itemId
          title
          category
          description
          image
          price
        }
      }
    }
  }
`;

// SAVE_FASHION_ITEM will execute the saveFashionItem mutation.
export const SAVE_FASHION_ITEM = gql`
  mutation saveFashionItem(
    $itemId: ID!
    $title: String!
    $category: String
    $description: String
    $image: String
    $price: Float
  ) {
    saveFashionItem(
      itemData: {
        itemId: $itemId
        title: $title
        category: $category
        description: $description
        image: $image
        price: $price
      }
    ) {
      itemId
      title
      category
      description
      image
      price
    }
  }
`;

// REMOVE_FASHION_ITEM will execute the removeFashionItem mutation.
export const REMOVE_FASHION_ITEM = gql`
  mutation removeFashionItem($itemId: ID!) {
    removeFashionItem(itemId: $itemId) {
      itemId
      title
      category
      description
      image
      price
    }
  }
`;