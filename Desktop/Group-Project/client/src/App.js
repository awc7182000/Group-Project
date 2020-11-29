import './App.css';
import Galleries from './views/galleries'
import {Router} from '@reach/router'
import Detail from './Components/Details'
import Login from './views/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthRoutes from './authroutes';

function App() {
  return (
    <div className="App">
      <Router>
        <Login path="/"/>
        <AuthRoutes path="/*" />
      </Router>
    </div>
  );
}

export default App;
