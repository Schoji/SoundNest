import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/icons/48x48.png';
import logodark from '../../../assets/icons/icons-dark/48x48.png';
import logo1 from '../../../assets/icons/images.png';
import tux from '../../../assets/icons/tux.png'

export default function log() {
  let settedTheme = sessionStorage.getItem("theme");
  let settedLogo =  sessionStorage.getItem("logo");
  if (settedLogo === "1") {
    if (settedTheme === "light") {
      return(<img src={logo}/>);
    }
    else if (settedTheme === "dark"){
      return(<img src={logodark}/>);
    }
  }
  else if (settedLogo === "2") {
    if (settedTheme === "light") {
      return(<img src={logo1}/>);
    }
    else if (settedTheme === "dark"){
      return(<img src={logo1}/>);
    }
  }
  else if (settedLogo === "3") {
    if (settedTheme === "light") {
      return(<img src={tux}/>);
    }
    else if (settedTheme === "dark"){
      return(<img src={tux}/>);
    }
  }
  else {
    if (settedTheme === "light") {
      return(<img src={logo}/>);
    }
    else if (settedTheme === "dark"){
      return(<img src={logodark}/>);
    }
  }
}
