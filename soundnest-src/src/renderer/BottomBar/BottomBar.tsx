/* eslint-disable jsx-a11y/alt-text */
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import './BottomBar.css';
import { Badge } from '@mui/material';

function BottomBar() {
  let cartItems = JSON.parse("[" + sessionStorage.getItem('cart') + "]").length - 1
  return (
    <div className="bottombar">
      <Link to="/cart" className="cart">
        <div className="linkLeft">
          <Badge badgeContent={cartItems} color="primary">
            <FontAwesomeIcon icon={faCartShopping} size="xl" />
          </Badge>
        </div>
      </Link>
    </div>
  );
}

export default BottomBar;
