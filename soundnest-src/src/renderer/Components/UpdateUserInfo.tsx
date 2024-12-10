import { backend_address } from "./Global"

export default function UpdateUserInfo() {
  fetch(backend_address + "/api/user_with_key/" + sessionStorage.getItem("id"))
  .then(response => response.json())
  .then(arg => {
    const userInfo = arg
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
    sessionStorage.setItem("lang", userInfo.lang)
    console.log("AAAAAA", userInfo.hasKey)
    sessionStorage.setItem("hasKey", userInfo.hasKey)
  })
  .catch(error => console.log(error))
}
