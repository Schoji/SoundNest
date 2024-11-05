import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/icons/48x48.png';
import logodark from '../../../assets/icons/icons-dark/48x48.png';
import logo1 from '../../../assets/icons/images.png';
import tux from '../../../assets/icons/tux.png'

export default function logoChange() {
  let setTheme = sessionStorage.getItem("theme");
  let setLogo =  sessionStorage.getItem("logo");
  if (setLogo === "1") {
    if (setTheme === "light") {
      return(<img src={logo}/>);
    }
    else if (setTheme === "dark"){
      return(<img src={logodark}/>);
    }
  }
  else if (setLogo === "2") {
    if (setTheme === "light") {
      return(<img src={logo1}/>);
    }
    else if (setTheme === "dark"){
      return(<img src={logo1}/>);
    }
  }
  else if (setLogo === "3") {
    if (setTheme === "light") {
      return(<img src={tux}/>);
    }
    else if (setTheme === "dark"){
      return(<img src={tux}/>);
    }
  }
  else {
    if (setTheme === "light") {
      return(<img src={logo}/>);
    }
    else if (setTheme === "dark"){
      return(<img src={logodark}/>);
    }
    else {
      return(<img src={logo}/>);
    }
  }
}
