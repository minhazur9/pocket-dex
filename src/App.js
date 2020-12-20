import './App.css';
import Navbar from './components/Navbar'
import Routes from './config/routes';

function App() {

  // cache storage expiration and refresh
const timeout = 1000 * 60 * 60 * 12;
const currentTime = new Date().getTime();
const localTime = localStorage.getItem('local-time')
if(localTime) {
    const ttl = Number(currentTime) - parseInt(localTime)
    if(ttl > timeout) {
        localStorage.removeItem('local-time')
        localStorage.removeItem('pokemon-list-data')
    }
}
else {
    localStorage.setItem('local-time',JSON.stringify(currentTime))
}

  return (
    <div className="App">
      <Navbar/>
      <Routes/>
    </div>
  );
}

export default App;
