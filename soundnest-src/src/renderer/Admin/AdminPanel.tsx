/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import './AdminPanel.css'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';

const backend_address = 'http://localhost:5000';

export default function AdminPanel() {
  const [data, setData] = useState([]);
  const Fetch = () => {
    fetch(backend_address + "/api/users/")
      .then((response) => response.json())
      .then((d) => setData(d))
      .catch((error) => {
        console.log(error);
      });
    console.log(data);
  };
  useEffect(() => {
    Fetch();
  }, []);

  const DeleteUser = (user_id) => {
    fetch(backend_address + "/api/users/" + user_id, {method: "DELETE"})
    .catch((error) => {
      console.log(error);
    })
    Fetch();
    Fetch();
  };
  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID'},
    {field: 'avatar_dir', headerName: "Image",
      renderCell: (params) => (
      <Avatar variant='rounded' src={`data:image/jpeg;base64,${params.value}`}/>
    ),},
    {field: 'username', headerName: "Username"},
    {field: 'surname', headerName: "Surname"},
    {field: 'email', headerName: "Email"},
    {field: 'password', headerName: "Password"},
    {field: 'prefered_theme', headerName: "Prefered Theme"},
    {field: 'credits', headerName: "Credits"},
    {field: 'is_admin', headerName: "Admin"},
    {field: 'Delete', headerName: "Delete",renderCell: (params) => (
      params.row.id != sessionStorage.getItem("id") ? <Button variant='contained' color='error' onClick={() => {
        DeleteUser(params.row.id)
        }}>
          Delete</Button>: null
    ),},
    {field: 'Admin', headerName: "Add Admin",renderCell: (params) => (
      params.row.id != sessionStorage.getItem("id") ? <Button variant='contained' color='info'>
          Make admin</Button> : <Button variant='contained' color='error'>Resign</Button>
    ),},
  ]
  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div className="all">
      <TopBar />
      <SideBar />
      <div className="main">
        <div className="users">
          <h1>Users</h1>
          <DataGrid
            rows={data}
            columns={columns}
            disableRowSelectionOnClick={true}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
            />
        </div>
      </div>
    </div>
  );
}
