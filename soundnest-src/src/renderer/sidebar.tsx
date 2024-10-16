import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './App.css';

export default function SideBar() {
  return (
    <div className="sidebuttons">
      <div className="sideobject">
        <Link to="/library" className="link1">
          <div className='linkAreaLeft'>
            <FontAwesomeIcon icon={faCoffee} />
          </div>
          <div className='linkAreaRight'>
            <p>Library</p>
          </div>
        </Link>
      </div>
      <div className="sideobject">
        <Link to="/main" className="link1">
          <div className='linkAreaLeft'>
            <FontAwesomeIcon icon={faCoffee} />
          </div>
          <div className='linkAreaRight'>
            <p>Studio</p>
          </div>
        </Link>
      </div>
      <div className="sideobject">
        <Link to="/katalog" className="link1">
        <div className='linkAreaLeft'>
            <FontAwesomeIcon icon={faCoffee} />
          </div>
          <div className='linkAreaRight'>
            <p>Store</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
