import './App.css';
import Main from './views/Main'
import {Router} from '@reach/router'
import Detail from './Components/Details'
import Login from './views/Login'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
      <Main path="/"/>
      <Detail path="/Detail/:id"/>
      <Login path="/login/"/>
      </Router>
    </div>
  );
}

export default App;
