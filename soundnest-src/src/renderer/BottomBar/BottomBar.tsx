/* eslint-disable jsx-a11y/alt-text */
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import './BottomBar.css';

function BottomBar() {
  return (
    <div className="bottombar">
      <Link to="/library" className="cart">
        <div className="linkLeft">
          <FontAwesomeIcon icon={faCartShopping} size="xl" />
        </div>
      </Link>
    </div>
  );
}

export default BottomBar;
