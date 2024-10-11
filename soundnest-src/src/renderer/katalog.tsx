import TopBar from './topbar';
import SideBar from "./sidebar";
import './App.css';

export default function Katalog() {
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
          <h1>SIEMA FAJNY KATALOG BOSKO</h1>
        </div>
      </div>
      <div className='bottombar'>
          <h1>123</h1>
      </div>
    </div>
  );
}
