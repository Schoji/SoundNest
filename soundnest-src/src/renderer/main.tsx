import TopBar from './topbar';
import SideBar from "./sidebar";
import './App.css';

export default function Main() {
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

        </div>
      </div>
      <div className='bottombar'>
          <h1>123</h1>
      </div>
    </div>
  );
}
