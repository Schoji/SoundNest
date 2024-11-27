import { backend_address } from "./global"
export default function UpdateUserInfo() {
  // sessionStorage.clear()
  console.log(sessionStorage.getItem("id"))
  fetch(backend_address + "/api/users/" + sessionStorage.getItem("id"))
  .then(response => response.json())
  .then((arg) => {
    const userInfo = JSON.parse(arg)
    sessionStorage.setItem('id', userInfo.id);
    sessionStorage.setItem('username', userInfo.username);
    sessionStorage.setItem('name', userInfo.name);
    sessionStorage.setItem('surname', userInfo.surname);
    sessionStorage.setItem('email', userInfo.email);
    sessionStorage.setItem('prefered_theme', userInfo.prefered_theme);
    sessionStorage.setItem('prefered_colour', userInfo.prefered_colour);
    sessionStorage.setItem('bio', userInfo.bio);
    sessionStorage.setItem('credits', userInfo.credits);
    sessionStorage.setItem('avatar_dir', userInfo.avatar_dir);
    sessionStorage.setItem('is_admin', userInfo.is_admin);
    sessionStorage.setItem('cart', '0');
    sessionStorage.setItem("logo", "0")
    sessionStorage.setItem("lang", userInfo.lang)
    sessionStorage.setItem("hasKey", userInfo.hasKey)
  })
  .catch(error => console.log(error))
}
