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
import { useState } from 'react';
import { useCustomEventListener } from 'react-custom-events';

export default function Logo() {
  let setTheme = sessionStorage.getItem("theme");
  let setLogo =  sessionStorage.getItem("logo");
  let logoArray = [logo, logo_red, logo_yellow, logo_green, logo_pink]
  let darkLogoArray = [logodark, logo_red_darker, logo_yellow_darker, logo_green_darker, logo_pink_darker]

  let classNames = ["root", "red", "yellow", "green", "pink"]
  let classNamesDark = ["dark", "red-dark", "yellow-dark", "green-dark", "pink-dark"]
  classNames.forEach(colour => {
    document.documentElement.classList.remove(colour)
  });
  classNamesDark.forEach(colour => {
    document.documentElement.classList.remove(colour)
  });
  if (sessionStorage.getItem("theme") == "light")
    document.documentElement.classList.add(classNames[setLogo])
  else
    document.documentElement.classList.add(classNamesDark[setLogo])

  // document.documentElement.classList.add("pink")
  const [currentLogo, setCurrentLogo] = useState(logo)
  useCustomEventListener("changeLogo", (theme) => {
    console.log(theme)
    if (theme === "light") {
      setCurrentLogo(logoArray[parseInt(setLogo)])
    }
    else {
      setCurrentLogo(darkLogoArray[parseInt(setLogo)])
    }
  })

  if (setLogo === null || setTheme === null) {
    return <img src={logo}/>
  }

  if (setTheme === "light") {
    return <img src={logoArray[parseInt(setLogo)]}/>
  }
  else {
    return <img src={darkLogoArray[parseInt(setLogo)]}/>
  }
}
