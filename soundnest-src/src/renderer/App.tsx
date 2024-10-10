import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import icon from '../../assets/icon.svg';
import './App.css';
import TopBar from './topbar';

function Content() {
  return <h1>Siema</h1>;
}

function SideBar() {
  return (
    <div className='sidebuttons'>
      <div className='sideobject'>
          <div>
            <FontAwesomeIcon icon={faCoffee} />
          </div>
          <div>
            <p>XD</p>
          </div>
      </div>
      <div className='sideobject'>
          <div>
            <FontAwesomeIcon icon={faCoffee} />
          </div>
          <div>
            <p>XD</p>
          </div>
      </div>
      <div className='sideobject'>
          <div>
            <FontAwesomeIcon icon={faCoffee} />
          </div>
          <div>
            <p>XD</p>
          </div>
      </div>
    </div>
  );
}

function AppBody() {
  return (
    <div className='all'>
      <div className='topbar'>
        <TopBar />
      </div>
      <div className='content'>
        <div className='sidebar'>
          <SideBar />
        </div>
        <div className='main'>
          <Content />
        </div>
      </div>
      <div className='bottombar'>
          <Content />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppBody />} />
      </Routes>
    </Router>
  );
}
