/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import '../App.css';
import { Form, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import './AdminPanel.css'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { Avatar, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import default_album from '../../../assets/album.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const backend_address = 'http://localhost:5000';

export default function AdminPanel() {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [studios, setStudios] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [selectedStudio, setSelectedStudio] = useState(0);
  const Fetch = () => {
    fetch(backend_address + "/api/users/")
      .then((response) => response.json())
      .then((d) => setData(d))
      .catch((error) => {
        console.log(error);
      });
    console.log(data);
  };

  const getProducts = () => {
    fetch(backend_address + "/api/products/")
      .then((response) => response.json())
      .then((d) => setProducts(d))
      .catch((error) => {
        console.log(error);
      });
  };

  const getStudios = () => {
    fetch(backend_address + "/api/studios/")
      .then((response) => response.json())
      .then((d) => setStudios(d))
      .catch((error) => {
        console.log(error);
      });
  };

  const makeAdmin = (user_id) => {
    fetch(backend_address + "/api/make_admin/" + user_id)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  }

  const deleteAdmin = (user_id) => {
    fetch(backend_address + "/api/make_admin/" + user_id +  "/", {method: "DELETE"})
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    Fetch();
    getProducts();
    getStudios();
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
      params.row.is_admin != true ? <Button variant='contained' color='info' onClick={() => {
        makeAdmin(params.row.id)
      }}>
          Make admin</Button> : <Button variant='contained' color='error' onClick={() => {
            deleteAdmin(params.row.id)
          }}>Delete admin</Button>
    ),},
  ]
  const paginationModel = { page: 0, pageSize: 5 };

  const handleChange = (event) => {
    setSelectedProduct(event.target.value as string);
  };

  const handleStudioChange = (event) => {
    setSelectedStudio(event.target.value as string);
  };

  const changeOwnership = (event) => {
    event.preventDefault()
    console.log(event)
  }

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
        <div>
          <h1>Album</h1>
          {products.length > 0 && studios.length > 0 ?
          <form>
            <select
                id="product"
                // value={selectedProduct}
                onChange={handleChange}
              >
              {products.length > 0 && products?.map((product, index) => (
                <option value={product.id}>{product.album}</option>
              ))}
              </select>

              <select
                id="studio"
                // value={selectedStudio}
                onChange={handleStudioChange}
              >
              {studios.length > 0 && studios?.map((studio, index) => (
                <option value={studio.id}>{studio.name}</option>
              ))}
              </select>

                <div>
                  {products[selectedProduct] === '/' || products[selectedProduct] === undefined ? (
                    <img src={default_album} />
                  ) : (
                    <img src={`data:image/jpeg;base64,${products[selectedProduct].item_path}`} />
                  )}
                  <ArrowForwardIcon/>
                  {studios[selectedStudio] === '/' || studios[selectedStudio] === undefined ? (
                    <img src={default_album} />
                  ) : (
                    <img src={`data:image/jpeg;base64,${studios[selectedStudio].studio_dir}`} />
                  )}

                </div>
                <Button variant='contained' color='success' onClick={changeOwnership}>Save</Button>

          </form>
          : <h1>Loading</h1> }
        </div>
      </div>
    </div>
  );
}
