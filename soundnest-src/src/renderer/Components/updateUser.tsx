import React, { useEffect, useState } from 'react';

const backend_address = 'http://localhost:5000/';

export default function updateUser() {
  const Fetch = () => {
    // fetch(backend_address + "/api/userproducts/" + sessionStorage.getItem('id'))
    fetch(backend_address + "/api/users/" + sessionStorage.getItem('id'))
      .then((response) => response.json())
      .then((data) => {
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(data)
  };
  useEffect(() => {
    Fetch();
  }, []);
  return (
    null
  );
}
