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
import EditStudio from './Studio/EditStudio';
import AdminPanel from './Admin/AdminPanel';
import Regulamin from './Regulamin/reg';
import CreateItem from './Store/CreateItem';

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
        <Route path="createitem" element={<CreateItem />} />
        <Route path="item/:item_id" element={<Item />} />
        <Route path="editstudio/:studio_id" element={<EditStudio />} />
        <Route path="adminpanel" element={<AdminPanel />} />
        <Route path="Regulamin" element={<Regulamin />} />
      </Routes>
    </Router>
  );
}
