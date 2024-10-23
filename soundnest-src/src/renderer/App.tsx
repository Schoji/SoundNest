/* eslint-disable @typescript-eslint/no-unused-vars */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './TopBar/TopBar.css';
import Studio from './Studio/Studio';
import Katalog from './Store/Store';
import Library from './Library/Library';
import Login from './Login/Login'
import Settings from './Settings/Settings';
import CreateStudio from './Studio/CreateStudio';
import Item from './Store/Item';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="library" element={<Library />} />
        <Route path="studio" element={<Studio />} />
        <Route path="katalog" element={<Katalog />} />
        <Route path="settings" element={<Settings />} />
        <Route path="createstudio" element={<CreateStudio />} />
        <Route path="item/:item_id" element={<Item />} />
      </Routes>
    </Router>
  );
}
