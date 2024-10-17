import TopBar from '../TopBar/TopBar';
import SideBar from "../SideBar/SideBar";
import '.././App.css';
import './Studio.css'

import BottomBar from '../BottomBar/BottomBar'

export default function Studio() {
  return (
    <div className='all'>
      <TopBar />
      <div className='content'>
        <SideBar />
        <div className='main'>
          <h1>Hello i'm a studio</h1>

        </div>
      </div>
      <BottomBar/>
    </div>
  );
}
