import { Link } from 'react-router-dom';
import LibraryMusicRoundedIcon from '@mui/icons-material/LibraryMusicRounded';
import GraphicEqRoundedIcon from '@mui/icons-material/GraphicEqRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import './SideBar.css';

export default function SideBar() {
  let cartItems = JSON.parse("[" + sessionStorage.getItem('cart') + "]").length - 1;
  return (
    <div className="sidebar">
      <Link to="/library" className="sideButton">
        <div><LibraryMusicRoundedIcon /></div>
        <p>Library</p>
      </Link>
      <Link to="/studios" className="sideButton">
        <div><GraphicEqRoundedIcon /></div>
        <p>Studios</p>
      </Link>
      <Link to="/store" className="sideButton">
        <div><LocalMallRoundedIcon /></div>
        <p>Store</p>
      </Link>
      {sessionStorage.getItem("is_admin") == "true" ? (
      <Link to="/adminpanel" className="sideButton">
        <div><ManageAccountsRoundedIcon /></div>
        <p>Admin panel</p>
      </Link>
      ) : (null)}
      <div> </div>
      <Link to="/cart" className="cartButton">
        <div className="cartButtonIcon">
          <ShoppingCartRoundedIcon />
          {cartItems !== 0 ? (
            <div className="cartButtonBadge"> {cartItems} </div>
          ) : null}
        </div>
        <p>Cart</p>
      </Link>
    </div>
  );
}
