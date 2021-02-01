import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Navbar from './components/Navbar'
import Routes from './config/routes';
import { useDispatch } from 'react-redux'
import { logIn } from './actions';
import { parse } from 'graphql';


const { REACT_APP_GRAPHQL_URI } = process.env;

const client = new ApolloClient({
  uri: REACT_APP_GRAPHQL_URI,
  fetchOptions: {
    credentials: "include"
  },
  headers: {
    authorization: `JWT ${localStorage.getItem('jwtToken') || ''}`
  }
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
      localStorage.removeItem('abilites-data')
      localStorage.removeItem('moves-data')
      localStorage.removeItem('items-data')
    }
  }
  else {
    localStorage.setItem('local-time', JSON.stringify(currentTime))
  }

  const dispatch = useDispatch();

  if (localStorage.getItem("jwtToken")) dispatch(logIn())


  if ((localStorage.getItem("jwtToken"))) {
    const ttl = Number(currentTime) - parseInt(localTime)
    const tokenTimeOut = 1000 * 60 * 15;
    if (ttl > tokenTimeOut) {
      localStorage.removeItem('jwtToken')
    }
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
