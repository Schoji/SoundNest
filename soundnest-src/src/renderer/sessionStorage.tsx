import React, { useState, useEffect } from "react";
import backend_address from "./main"
function SessionStorage = (event) => {

  const [data, setData] = useState([]);


  event.preventDefault();

  const Fetch = () => {

    // fetch(backend_address + "/api/users/" + event.target.username.value + "/" + event.target.password.value)
    fetch("http://127.0.0.1:5000/api/users/johndoe123/P@ssw0rd123")
    .then(response => response.json())
    .then((d) => setData(d))
    .catch((error) => {
      console.log(error)
    })
    console.log(data)
  }
  useEffect(() => {
    Fetch();
  }, []);
  return (JSON.stringify(data));
}
export default SessionStorage;
