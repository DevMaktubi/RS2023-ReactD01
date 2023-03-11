import { ApolloProvider } from "@apollo/client";
import { Homepage } from "./components/pages/Homepage";
import { client } from "./lib/apollo";

function App() {
  return (
    <ApolloProvider client={client}>
      <Homepage />
    </ApolloProvider>
  );
}

export default App;
