import { Link } from 'react-router-dom';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import './BottomBar.css';

function BottomBar() {
  let cartItems = JSON.parse("[" + sessionStorage.getItem('cart') + "]").length - 1;
  return (
    <div className="bottombar">
      <Link to="/cart" className="cart">
        <div className="cartIcon">
          <ShoppingCartRoundedIcon />
          {cartItems !== 0 ? (
            <div className="cartBadge"> {cartItems} </div>
          ) : null}
        </div>
        <h3>Cart</h3>
      </Link>
    </div>
  );
}

export default BottomBar;
