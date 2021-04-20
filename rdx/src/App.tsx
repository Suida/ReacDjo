import {
  Link,
  Switch,
  Route,
} from 'react-router-dom';
import Icon from '@material-ui/core/Icon'
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <ul className="nav-list">
            <li>
              <Link to="/">主页</Link>
            </li>
            <li>
              <Link to="/article">文章</Link>
            </li>
            <li>
              <Link to="/lab">实验场</Link>
            </li>
            <li>
              <Link to="/category">其他 </Link>
            </li>
          </ul>
        </nav>
        <input className="search" type="search" />
      </header>
      <main>

      </main>
      <footer></footer>
    </div>
  );
}

export default App;
