import Contas from './views/home.js'
import Regras from './views/regras.js'
import {
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <div>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Contas</Link>
          </li>
          <li>
            <Link to="/regras">Regras</Link>
          </li>
        </ul>
      </nav> */}

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/regras">
          <Regras />
        </Route>
        <Route path="/">
          <Contas />
        </Route>
      </Switch>
    </div>
  );
}