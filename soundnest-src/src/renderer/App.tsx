import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import TopBar from './topbar';

function Content() {
  return <h1>Siema</h1>;
}

function AppBody() {
  return (
    <div className='all'>
      <div className='topbar'>
        <TopBar />
      </div>
      <div className='content'>
        <div className='sidebar'>
          <Content />
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
