import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import SearchFashionItems from "./pages/SearchFashionItems";
import SavedFashionItems from "./pages/SavedFashionItems";

// Get the GraphQL endpoint from environment variables
const GRAPHQL_ENDPOINT =
  import.meta.env.VITE_GRAPHQL_ENDPOINT || "http://localhost:3001/graphql";

// Construct our main GraphQL API endpoint.
const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header.
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Define the custom cache with merge function for savedFashionItems.
const cache = new InMemoryCache({
  typePolicies: {
    User: {
      fields: {
        savedFashionItems: {
          merge(existing = [], incoming = []) {
            const existingItems = new Map(
              existing.map((item) => [item.itemId, item])
            );
            const incomingItems = new Map(
              incoming.map((item) => [item.itemId, item])
            );
            // Combine the items, favoring incoming data in case of conflicts.
            return [...existingItems.values(), ...incomingItems.values()];
          },
        },
      },
    },
  },
});

// Create Apollo Client instance with the custom cache.
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<SearchFashionItems />} />
          <Route path="/saved" element={<SavedFashionItems />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;