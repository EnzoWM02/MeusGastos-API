import './App.css';
import { React, useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './view/home/Home';
import Login from './view/login/Login';
import NewGastos from './view/newGastos/NewGastos';
import Signup from './view/signup/Signup';
import { ToastContainer } from 'react-toastify';
import {useCookies} from "react-cookie";

const App = () => {

  const [cookies, setCookie] = useCookies(['user']);

  const isLoggedIn = () => {
    const token = cookies.token;
    let loggedIn;
    token ? (loggedIn = true) : (loggedIn = false);

    return loggedIn;
  };

  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route exact path="/login" element={<Login setLoggedIn={setLoggedIn}/>} />
          <Route exact path="/home" element={loggedIn ? <Home /> : <Navigate to="/login" /> } />
          <Route exact path="/NewGastos" element={<NewGastos />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            closeButton={false}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
      </>
    </Router>
  );
};

/*class App extends Component {
  state = {
    gastos: []
  };

  async componentDidMount() {
    const response = await fetch('/api');
    const body = await response.json();
    this.setState({gastos: body});
  }

  render() {
    const {gastos} = this.state;
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="App-intro">
              <h2>Gastos</h2>
              {gastos.map(gastos =>
                  <div key={gastos.id}>
                    {gastos.name} ({gastos.description}, Valor: {gastos.value})
                  </div>
              )}
            </div>
          </header>
        </div>
    );
  }
} */
export default App;