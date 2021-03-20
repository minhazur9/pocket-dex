import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Navbar from './components/Navbar'
import Routes from './config/routes';
import { useDispatch } from 'react-redux'
import { logIn } from './actions';



export const getCookie = () => {
  const cookie = document.cookie.split('; ')
  const token = cookie.find(value => /^jwtToken=/.test(value));
  if(token) return token.slice(9);
  else return undefined;
}

const client = new ApolloClient({
  uri: 'https://main.d3pt0m0fidcvhg.amplifyapp.com/graphql',
  fetchOptions: {
    credentials: "include"
  },
  headers: {
    authorization: `JWT ${getCookie() || ''}`
  }
})



function App() {

  // cache storage expiration and refresh
  const timeout = 1000 * 10 * 60 * 12;
  const currentTime = new Date().getTime();
  const localTime = localStorage.getItem('local-time')
  if (localTime) {
    const ttl = Number(currentTime) - parseInt(localTime)
    if (ttl > timeout) {
      localStorage.removeItem('local-time')
      localStorage.removeItem('pokemon-list-data')
      localStorage.removeItem('abilities-data')
      localStorage.removeItem('moves-data')
      localStorage.removeItem('items-data')
    }
  }
  else {
    localStorage.setItem('local-time', JSON.stringify(currentTime))
  }

  const dispatch = useDispatch();

  const cookie = document.cookie.split('; ')
  if(cookie.find(value => /^jwtToken=/.test(value))) dispatch(logIn())

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
