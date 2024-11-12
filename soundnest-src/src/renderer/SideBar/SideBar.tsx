import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStore,
  faRecordVinyl,
  faMicrophoneLines,
  faUser,
  faGear,
  faUserCog,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './SideBar.css';

export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebuttons">
        <div className="sideobject">
          <Link to="/library" className="link1">
            <div className="linkAreaLeft">
              <FontAwesomeIcon icon={faRecordVinyl} size="xl" />
            </div>
            <div className="linkAreaRight">
              <p>Library</p>
            </div>
          </Link>
        </div>
        <div className="sideobject">
          <Link to="/studios" className="link1">
            <div className="linkAreaLeft">
              <FontAwesomeIcon icon={faMicrophoneLines} size="xl" />
            </div>
            <div className="linkAreaRight">
              <p>Studio</p>
            </div>
          </Link>
        </div>
        <div className="sideobject">
          <Link to="/katalog" className="link1">
            <div className="linkAreaLeft">
              <FontAwesomeIcon icon={faStore} size="xl" />
            </div>
            <div className="linkAreaRight">
              <p>Store</p>
            </div>
          </Link>
        </div>
        <div className="sideobject">
          <Link to="/settings" className="link1">
            <div className="linkAreaLeft">
              <FontAwesomeIcon icon={faGear} size="xl" />
            </div>
            <div className="linkAreaRight">
              <p>Settings</p>
            </div>
          </Link>
        </div>
        {sessionStorage.getItem("is_admin") == "true" ? (
          <div className="sideobject">
            <Link to="/adminpanel" className="link1">
              <div className="linkAreaLeft">
                <FontAwesomeIcon icon={faUserCog} size="xl" />
              </div>
              <div className="linkAreaRight">
                <p>Admin</p>
              </div>
            </Link>
          </div>
        ) : (null)}
      </div>
    </div>
  );
}
