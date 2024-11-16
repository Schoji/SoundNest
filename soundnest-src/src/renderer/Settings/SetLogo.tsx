import logo from '../../../assets/icons/48x48.png';
import logodark from '../../../assets/icons/icons-dark/48x48.png';

import logo_red from '../../../assets/icons/logo-red.png';
import logo_yellow from '../../../assets/icons/logo-yellow.png';
import logo_green from '../../../assets/icons/logo-green.png';
import logo_pink from '../../../assets/icons/logo-pink.png';

import logo_red_darker from '../../../assets/icons/logo-red-darker.png';
import logo_yellow_darker from '../../../assets/icons/logo-yellow-darker.png';
import logo_green_darker from '../../../assets/icons/logo-green-darker.png';
import logo_pink_darker from '../../../assets/icons/logo-pink-darker.png';

export default function logoChange() {
  let setTheme = sessionStorage.getItem("theme");
  let setLogo =  sessionStorage.getItem("logo");
  let logoArray = [logo, logo_red, logo_yellow, logo_green, logo_pink]
  let darkLogoArray = [logodark, logo_red_darker, logo_yellow_darker, logo_green_darker, logo_pink_darker]
  // document.documentElement.classList.add("pink")
  if (setLogo === null || setTheme === null) {
    return <img src={logo}/>
  }

  if (setTheme === "light") {
    return <img src={logoArray[parseInt(setLogo)]}/>
  }
  else {
    console.log("LOL")
    return <img src={darkLogoArray[parseInt(setLogo)]}/>
  }
}
