import logo from './logo.svg';
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import MainView from './view/mainView/MainView';
import Login from './view/login/Login';
import NewGastos from './view/newGastos/NewGastos';
import Signup from './view/signup/Signup';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/mainView" element={<MainView />} />
          <Route exact path="/NewGastos" element={<NewGastos />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
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