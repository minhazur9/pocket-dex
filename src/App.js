import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Navbar from './components/Navbar'
import Routes from './config/routes';


const { REACT_APP_GRAPHQL_URI } = process.env;

const client = new ApolloClient({
  uri: REACT_APP_GRAPHQL_URI
})


function App() {

  // cache storage expiration and refresh
  const timeout = 1000 * 60 * 60 * 12;
  const currentTime = new Date().getTime();
  const localTime = localStorage.getItem('local-time')
  if (localTime) {
    const ttl = Number(currentTime) - parseInt(localTime)
    if (ttl > timeout) {
      localStorage.removeItem('local-time')
      localStorage.removeItem('pokemon-list-data')
    }
  }
  else {
    localStorage.setItem('local-time', JSON.stringify(currentTime))
  }

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Navbar />
        <Routes />
      </div>
    </ApolloProvider>
  );
}

export default App;
