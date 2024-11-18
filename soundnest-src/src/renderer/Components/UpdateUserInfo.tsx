import { backend_address } from "./global"
export default function UpdateUserInfo() {
  const id = sessionStorage.getItem("id")
  // sessionStorage.clear()
  fetch(backend_address + "/api/users/" + id)
  .then(response => response.json())
  .then((user) => {
    sessionStorage.setItem("id", user.id)
    sessionStorage.setItem("credits", user.credits)
    sessionStorage.setItem("avatar_dir", user.avatar_dir)
    sessionStorage.setItem("prefered_theme", user.prefered_theme)
    sessionStorage.setItem("is_admin", user.is_admin)
    sessionStorage.setItem("credits", user.credits)
    sessionStorage.setItem("username", user.username)
    sessionStorage.setItem("email", user.email)
    sessionStorage.setItem("surname", user.surname)
    sessionStorage.setItem("name", user.name)
  })
  .catch(error => console.log(error))
}
