/* eslint-disable jsx-a11y/alt-text */
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCartShopping
} from '@fortawesome/free-solid-svg-icons';

import './BottomBar.css'
function BottomBar() {
  return (
    <div className="bottombar">
      <div className='cart'>
      <Link to="/library">
        <div className="linkLeft">
          <FontAwesomeIcon icon={faCartShopping} size="xl" />
        </div>
      </Link>
    </div>
    </div>
  );

}

export default BottomBar;
